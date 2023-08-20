import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiKey, HiMail, HiOutlineLogin, HiUserCircle } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { BiMoney } from "react-icons/bi";
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
import backendURL from "../../BackendURL";

import {
    IndexDropdown,
    KanbanCardPopup,
    TableDropdown,
    UserDropdown,
} from "../../components";
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

export default function MoreDetails() {
    const [userInput, setUserInput] = useState({
        name: "",
        maxp: 0,
        gst: "",
        role: "",
    });
    const { currentTheme, colors } = useSelector((state) => state.theme)

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


    // useEffect(() => {
    //     if (!success && showToast) {
    //         toast(message);
    //     }
    //     return () => dispatch(toastReset());
    // }, [showToast, message, dispatch, success]);

    // if (isLoading) {
    // 	return <div className="text-2xl text-white">Loading...</div>
    // }


    const signupHandler = (e) => {
        e.preventDefault();


        var data = JSON.stringify({
            "user": "parthshukla@gmail.com",
            "vendor_tier": vendor,
            "max_purchases": userInput.maxp,
            "gst_number": userInput.gst,
        });

        console.log(data);
        var config = {
            method: 'post',
            url: `${backendURL}accounts/vendor-profile/`,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNDQ5NzUyLCJpYXQiOjE2OTIxOTA1NTIsImp0aSI6Ijk4ODJlZGM0YTA3MTQ5ODZiYjE3Zjg3ZTE1OWQ4OGVjIiwidXNlcl9pZCI6M30.fsK5CJ_6d4TQodR0GI3GZ-NvMsSvT2s7f5v608SoScc',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                toast("Rules updated successfully , Now you change it after 3 weeks");

                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });



    };

    const inputChangeHandlerVendor = (event) => {
        const { value } = event.target;
        setvendor(Number(value));
    }
    return (
        <form className="max-w-4xl bg-white px-8 py-7 rounded-2xl ">
            <h2 className="text-2xl mb-6 font-normal text-slate-500">
                Additional Details :
            </h2>
            <ToastContainer />
            <div className="relative w-full mb-3">
                <label
                    className="flex items-center text-slate-500 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                >
                    <CgProfile className="mr-1" />
                    GST Number
                </label>
                <input
                    value={userInput.gst}
                    onChange={inputChangeHandler}
                    name="gst"
                    type="text"
                    className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
                    placeholder="GST6..."
                    required
                />
            </div>
            <div className="relative w-full mb-3">
                <label
                    className="flex items-center text-slate-500 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                >
                    <BiMoney className="mr-1" />
                    Max Purchases
                </label>
                <input
                    value={userInput.maxp}
                    onChange={inputChangeHandler}
                    name="maxp"
                    type="number"
                    className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
                    // placeholder="Enter your email address..."
                    required
                />
            </div>

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
            {/* <div className="relative w-full mb-3">
                <label
                    className="flex items-center text-slate-500 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                >
                    <HiUserCircle className="mr-1" />
                    Select Tier
                </label>
                <select
                    onChange={inputChangeHandlerVendor}
                    name="role"
                    type="number"
                    class="select"
                    className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
                >
                    <option value={1}>Tier 1</option>
                    <option value={2}>Tier 2</option>
                    <option value={3}>Tier 3</option>
                    <option value={4}>Tier 4</option>
                </select>
            </div> */}
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
                    className={`${currentTheme
                        ? colors.bg[currentTheme].dark
                        : "bg-purple-800 active:bg-purple-700"
                        } flex items-center justify-center text-white active:bg-blueGray-600 text-lg font-base px-6 py-2 rounded-xl shadow outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}
                    type="submit"
                    disabled={!pan}
                    onClick={signupHandler}
                >
                    <HiOutlineLogin className="mr-2 h-6 w-6" />
                    Submit
                </button>
            </div>
        </form>
    );
}