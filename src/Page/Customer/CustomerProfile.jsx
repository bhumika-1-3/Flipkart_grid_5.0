import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiProfileLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import {
    TableContainer,
    Tbody,
    Thead,
    Th,
    Td,
    Table,
} from "../../components/Tables/TableStyles";
import { SectionHeader } from "../../components";
import axios from "axios";
import backendURL from "../../BackendURL";

const CustomerProfile = () => {
    const token = localStorage.getitem('token')
    const [add,setAdd] = useState("")

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${backendURL}accounts/user-profile/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setAdd(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const [role, setRole] = useState("user")
    const data = {
        "totalPeopleUsedCode": 10,
        "totalCoinsEarned": 250,
        "userStats": [
            {
                "userId": "user123",
                "coinsEarned": 25
            },
            {
                "userId": "user456",
                "coinsEarned": 10
            },
            {
                "userId": "user789",
                "coinsEarned": 50
            },
            {
                "userId": "user101",
                "coinsEarned": 15
            },
            {
                "userId": "user202",
                "coinsEarned": 30
            }
        ]
    }

    useEffect(() => {
        const role2 = localStorage.getItem("role");
        setRole(role2)
    }, [role])

    // const { isLoading, genderData, leavesData, bloodGroupData } = useSelector(
    //   (state) => state.charts
    // );
    // console.log(genderData);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(fetchGenderData());
    //   dispatch(fetchLeavesData());
    //   dispatch(fetchBloodGroupData());
    // }, [dispatch]);

    const buttonClick = () => {

    };
    const { currentTheme, colors } = useSelector((state) => state.theme);
    const activeLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex ${currentTheme ? colors.text[currentTheme].dark : "text-purple-700"
        }  ${currentTheme ? colors.bg[currentTheme].medium : "bg-purple-300"
        } dark:bg-purple-900 dark:text-slate-200 rounded-md duration-300`;
    const inActiveLink = `items-center text-sm capitalize py-2 px-2 my-1 font-semibold flex text-slate-700 dark:text-slate-300 ${currentTheme ? colors.bg[currentTheme].hover : "hover:bg-purple-300"
        } dark:hover:bg-purple-900  hover:rounded-md duration-300`;

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                // handle success
                console.log('File uploaded successfully');
            })
            .catch(error => {
                // handle error
                console.error('Error uploading file:', error);
            });
    }
    function handleFileUpload(event) {
        const file = event.target.files[0];
        uploadFile(file);
    }

    // const role = localStorage.getItem("role");
    const alldata = localStorage.getItem("alldata");
    return (
        <div>
            {/* <BigText onMouseOver={buttonClick}>Profile</BigText> */}
            <div className="page">
                <button onMouseOver={buttonClick} className="p-2 text-3xl">
                    {role === "user" ? <span>Welcome</span> : null}
                    {role === "contentcreator" ? <span>Content Creator</span> : null}
                    {role === "moderator" ? <span>Moderator</span> : null}
                </button>
            </div>
            <section className="pt-1 bg-blueGray-50">
                <div className="w-full md px-4 mx-auto">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6 rounded-lg border-2 border-slake-200">
                            <div className="flex flex-wrap">
                                <div className="grid grid-cols-2 gap-10 justify-between">
                                    <div className="w-full px-4 flex justify-start">
                                        {/* <div className=""> */}
                                        <img
                                            alt="..."
                                            src="https://media.istockphoto.com/id/653952640/vector/p-logo-hipster-letter-black-and-white-monogram-simple-overlapping-minimalistic-style-ribbon.jpg?s=612x612&w=0&k=20&c=ggLqfidJSfwPFEqtyC78sJ4BtYUcJ7_lkWzCJDYPsh8="
                                            className="shadow-xl rounded-full align-left float-left border-none h-56 w-56 mt-2"
                                        />
                                        {/* </div> */}
                                    </div>
                                    <div className="justify-center mt-5">
                                        <h3 className="text-5xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                                            {add?.firstname} {add?.lastname}
                                        </h3>
                                        <div className="text-lg leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                            <CgProfile className="mr-1 inline" />
                                            {add?.email}
                                        </div>
                                        <div className="text-lg leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                            Contract Address - {add?.contract}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src="https://pbs.twimg.com/profile_images/3234971560/c024c9660698fd91133a417c4831810a_400x400.png"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                    {/* </div> */}
                            </div>
                            <div className="p-4 text-xl">
                                Referral code : 12$2br6
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div >
                Referral Stats
            </div>
            <TableContainer>
                <Table>
                    <Thead>
                        <Th>#</Th>
                        <Th>ID</Th>
                        <Th>Coins Earned</Th>
                    </Thead>
                    {
                        data?.userStats?.map((i, x) => {
                            return <Tbody key={i.id}>
                                <Td>{x + 1}</Td>
                                <Td>{i.userId}</Td>
                                <Td>{i.coinsEarned}</Td>
                            </Tbody>
                        })
                    }
                </Table>
            </TableContainer>
        </div>
    );
};

export default CustomerProfile;
