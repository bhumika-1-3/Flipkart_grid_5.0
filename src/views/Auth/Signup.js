import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiKey, HiMail, HiOutlineLogin, HiUserCircle } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { AiFillCreditCard } from "react-icons/ai";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "react-toastify/dist/ReactToastify.css";
import { login, toastReset, setRole } from "../../store/slices/auth/authSlice";
import axios from "axios";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

import {
  IndexDropdown,
  KanbanCardPopup,
  TableDropdown,
  UserDropdown,
} from "../../components";
var FormData = require('form-data');
var data = new FormData();
let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
let first = alphabets[Math.floor(Math.random() * alphabets.length)];
let second = Math.floor(Math.random() * 10);
let third = Math.floor(Math.random() * 10);
let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
let sixth = Math.floor(Math.random() * 10);
var captcha =
  first.toString() +
  second.toString() +
  third.toString() +
  fourth.toString() +
  fifth.toString() +
  sixth.toString();

export default function Signup() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const [haveMetamask, sethaveMetamask] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [pan, setPan] = useState(true);
  const [vendor, setvendor] = useState(false);
  const panNumber = useRef(null);
  const { ethereum } = window;
  const [accountBalance, setAccountBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const verify = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      url: 'https://pan-card-verification1.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_pan',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'a04137f7cbmshc876eb77e0693b3p16632djsn96b0499cd09b',
        'X-RapidAPI-Host': 'pan-card-verification1.p.rapidapi.com'
      },
      data: {
        "task_id": "74f4c926-250c-43ca-9c53-453e87ceacd1",
        "group_id": "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",
        "data": {
          "id_number": panNumber.current.value
        }
      }
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setPan(true);
        toast.success("Pan number verified", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Pan number not valid", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (ethereum == undefined) {
        sethaveMetamask(false);
      }
      else {
        sethaveMetamask(true);
      }
      if (ethereum)
        connectMetamask();

    };
    // console.log(haveMetamask);
    checkMetamaskAvailability();
  }, []);

  const connectMetamask = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);

      // console.log(accounts[0]);
      toast.success("Connected to Metamask")
    } catch (error) {
      setIsConnected(false);
    }
  };
  // var captcha = "";
  const { success, showToast, message, isAuthenticated, role } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const inputChangeHandler = (e) => {
    if (e.target.target === "role" && e.target.value === "creator")
      setPan(true);
    setUserInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginHandler = () => {
    if (userInput.captcha != captcha && userInput.role == "admin") {
      alert("Invalid Captcha!");
      return;
    }
    if (!userInput.email.includes("@")) {
      alert("Enter a valid email address!");
      return;
    }
    if (userInput.email.length === 0) {
      alert("Email field can't be empty!");
      return;
    }
    if (userInput.password.length === 0) {
      alert("Password field can't be empty!");
      return;
    }

    dispatch(login(userInput));
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setRole());
    }
    if (role === "SUPER_ADMIN") {
      window.location = "/admin/dashboard/";
    }
    if (role === "HR") {
      window.location = "/hr/dashboard/";
    }
    if (role === "INVENTORY") {
      window.location = "/inventory/dashboard/";
    }
    if (role === "FINANCE") {
      window.location = "/finance/dashboard/";
    }
    if (role === "EMPLOYEE") {
      window.location = "/employee/dashboard/";
    }
  }, [isAuthenticated, success, dispatch, role]);

  useEffect(() => {
    if (!success && showToast) {
      toast(message);
    }
    return () => dispatch(toastReset());
  }, [showToast, message, dispatch, success]);

  // if (isLoading) {
  // 	return <div className="text-2xl text-white">Loading...</div>
  // }
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const links = [
    { href: "/account-settings", label: "Account settings" },
    { href: "/support", label: "Support" },
    { href: "/license", label: "License" },
    { href: "/sign-out", label: "Sign out" },
  ];


  const signupHandler = (e) => {
    e.preventDefault();

    if (!isConnected) {
      toast.error("Please Connect to Metamask", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (!userInput.email.includes("@")) {
      alert("Enter a valid email address!");
      return;
    }
    if (userInput.email.length === 0) {
      alert("Email field can't be empty!");
      return;
    }
    if (userInput.password.length === 0) {
      alert("Password field can't be empty!");
      return;
    }


    toast("User created");
    var axios = require('axios');
    var data = JSON.stringify({
      "email": userInput.email,
      "password": userInput.password,
      "firstname": userInput.name.split(' ')[0],
      "lastname": userInput.name.split(' ')[1],
      "vendor": vendor,
      "address": accountAddress
    });
    console.log(data);
    var config = {
      method: 'post',
      url: 'https://backendom5.onrender.com/api/accounts/signup/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (!vendor)
          navigate("/customer/products");
        else
          navigate("/vendor/profile");
      })
      .catch(function (error) {
        console.log(error);
      });


  };

  const inputChangeHandlerVendor = (event) => {
    const { value } = event.target;
    setvendor(value === 'true');
  }
  return (
    <form className="max-w-sm bg-white px-8 py-7 rounded-2xl shadow-xl w-full">
      <h2 className="text-2xl mb-6 font-normal text-slate-500">
        Welcome to the Family
      </h2>
      <ToastContainer />
      <div className="relative w-full mb-3">
        <label
          className="flex items-center text-slate-500 text-xs font-semibold mb-2"
          htmlFor="grid-password"
        >
          <CgProfile className="mr-1" />
          Full name
        </label>
        <input
          value={userInput.name}
          onChange={inputChangeHandler}
          name="name"
          type="text"
          className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
          placeholder="Enter your name..."
          required
        />
      </div>
      <div className="relative w-full mb-3">
        <label
          className="flex items-center text-slate-500 text-xs font-semibold mb-2"
          htmlFor="grid-password"
        >
          <HiMail className="mr-1" />
          Email
        </label>
        <input
          value={userInput.email}
          onChange={inputChangeHandler}
          name="email"
          type="email"
          className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
          placeholder="Enter your email address..."
          required
        />
      </div>

      <div className="relative w-full mb-3">
        <label
          className="flex items-center text-slate-500 text-xs font-semibold mb-2"
          htmlFor="grid-password"
        >
          <HiKey className="mr-1" />
          Password
        </label>
        <input
          value={userInput.password}
          onChange={inputChangeHandler}
          name="password"
          type="password"
          className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
          placeholder="Enter password..."
          required
        />
      </div>
      <div className="relative w-full mb-3">
        <label
          className="flex items-center text-slate-500 text-xs font-semibold mb-2"
          htmlFor="grid-password"
        >
          <HiUserCircle className="mr-1" />
          Select Role
        </label>
        <select
          onChange={inputChangeHandlerVendor}
          name="role"
          type="text"
          class="select"
          className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
        >
          <option value={false}>Customer</option>
          <option value={true}>Vendor</option>
        </select>
      </div>
      {userInput.role === "creator" && (
        <div className="flex">
          <div className="relative w-full mb-3">
            <label
              className="flex items-center text-slate-500 text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              <AiFillCreditCard className="mr-1" />
              Pan Number
            </label>
            <input
              ref={panNumber}
              type="text"
              className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
              placeholder="Enter your pancard number..."
              required
            />
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-purple-600 hover:bg-purple-700 flex justify-end text-white active:bg-blueGray-600 text-xl font-base px-6 py-3 rounded-xl shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
              onClick={verify}
            >
              {/* <HiOutlineLogin className="mr-2 h-6 w-6" /> */}
              <TiTick />
            </button>
          </div>
        </div>
      )}

      {userInput.role === "user" && (
        <>
          <div className="flex">
            <div className="relative w-full mb-3">
              <label
                className="flex items-center text-slate-500 text-xs font-semibold mb-2"
                htmlFor="grid-password"
              >
                <AiFillCreditCard className="mr-1" />
                School Name
              </label>
              <input
                name="school"
                onChange={inputChangeHandler}
                type="text"
                className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
                placeholder="Enter your pancard number..."
                required
              />
            </div>
          </div>

          <div className="flex">
            <div className="relative w-full mb-3">
              <label
                className="flex items-center text-slate-500 text-xs font-semibold mb-2"
                htmlFor="grid-password"
              >
                <AiFillCreditCard className="mr-1" />
                Grade
              </label>
              <input
                name="grade"
                onChange={inputChangeHandler}
                type="text"
                className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
                placeholder="Enter your pancard number..."
                required
              />
            </div>
          </div>
        </>
      )}

      <div className="text-center mt-6">
        <button
          className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white active:bg-blueGray-600 text-lg font-base px-6 py-2 rounded-xl shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
          disabled={!pan}
          onClick={signupHandler}
        >
          <HiOutlineLogin className="mr-2 h-6 w-6" />
          Sign Up
        </button>
      </div>
      <div className="mt-2">
        <Link
          className="underline text-slate-400 text-center block text-sm duration-200 hover:text-slate-700 tracking-wider"
          to="/">
          Already have an account ? Login
        </Link>
      </div>
    </form>
  );
}