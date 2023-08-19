import { Paper } from '@mui/material'
import React from 'react'
import { Button, InputTag } from '../../components'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Tile = ({ data, setConveniences }) => {
    const [selected, setSelected] = useState(false);
    const select = () => {
        if (selected) {
            setConveniences((prev) => prev.filter((item) => item !== data));
            setSelected(!selected);
        } else {
            setConveniences((prev) => [...prev, data]);
            setSelected(!selected);
        }
    };
    return (
        <div
            onClick={() => select()}
            className={`flex px-4 py-2 gap-2 rounded outline shadow cursor-pointer bg-yellow-100 ${selected ? "outline-2" : "outline-0"
                }`}
        >
            {/* <CiWifiOn className="text-xl" /> */}
            <h1 className="">{data}</h1>
        </div>
    );
};

const AddProduct = () => {
    const [value, setValue] = useState('');
    const [conveniences, setConveniences] = useState([]);
    const [images, setImages] = useState();
    const [showImages, setShowImages] = useState([]);

    const handleimages = (e) => {
        const selectedFiles = Array.from(e.target.files);
        // console.log("files", e.target.files)
        setImages(selectedFiles);
        // showimage();
    }
	const { currentTheme, colors } = useSelector((state) => state.theme)

    const showimage = () => {
        console.log(images);
        const newShowImages = images?.map(file => URL.createObjectURL(file));
        setShowImages(newShowImages);
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-2 p-4">
                <Paper elevation={1} className='p-6'>
                    <label
                        className="flex items-center text-slate-700 text-base font-semibold mb-2"
                        htmlFor="grid-password">
                        {/* <HiMail className="mr-1" /> */}
                        Description
                    </label>
                    <div className="relative w-full mb-3">
                        <label
                            className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                            htmlFor="grid-password">
                            {/* <HiMail className="mr-1" /> */}
                            Product Name
                        </label>
                        <input
                            // value={userInput.email}
                            // onChange={inputChangeHandler}
                            name="name"
                            type="text"
                            className="px-3 py-3 placeholder-blueGray-300 text-slate-700 bg-gray-50 placeholder:text-slate-400 rounded-xl text-sm border borderColor  focus:outline-none  w-full ease-linear transition-all duration-150"
                            required
                        />
                    </div>
                    <label
                        className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                        htmlFor="grid-password">
                        {/* <HiMail className="mr-1" /> */}
                        Product Description
                    </label>
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                                    htmlFor="grid-password">
                                    {/* <HiMail className="mr-1" /> */}
                                    Price
                                </label>
                                <input
                                    className="px-4 py-3 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
                                    placeholder="₹"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label
                                    className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                                    htmlFor="grid-password">
                                    {/* <HiMail className="mr-1" /> */}
                                    Quantity
                                </label>
                                <input
                                    className="px-4 py-3 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
                                    placeholder="units"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <label
                                className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                                htmlFor="grid-password">
                                {/* <HiMail className="mr-1" /> */}
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <Tile data="Vegan" setConveniences={setConveniences} />
                                <Tile data="Veg" setConveniences={setConveniences} />
                                <Tile data="Non Veg" setConveniences={setConveniences} />
                                <Tile data="Egg" setConveniences={setConveniences} />
                                <Tile data="Gluten Free" setConveniences={setConveniences} />
                            </div>
                        </div>
                    </div>
                </Paper>
                <Paper elevation={1} className='p-6'>
                    <div class="mb-3">
                        <label
                            className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                            htmlFor="grid-password">
                            {/* <HiMail className="mr-1" /> */}
                            Product Images
                        </label>
                        <input
                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="formFileMultiple"
                            onChange={handleimages
                            }
                            multiple
                        />
                        <div className='float-right'>
                            <Button onClick={showimage}>show</Button>
                        </div>
                    </div>
                    <div className='grid grid-cols-4'>
                        {
                            showImages?.length > 0 &&
                            showImages?.map((item, index) => {
                                return <img src={item} alt="index" className='w-20 h-20 rounded-lg' />
                            })
                        }
                    </div>
                    <br />
                    <label
                        className="flex items-center text-slate-700 text-base font-semibold mb-2"
                        htmlFor="grid-password">
                        Shipping and Delivery
                    </label>
                    <label
                        className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                        htmlFor="grid-password">
                        {/* <HiMail className="mr-1" /> */}
                        Items Weight
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
                            type="text"
                        />
                        <select
                            // onChange={inputChangeHandler}
                            name="role"
                            type="text"
                            class="select"
                            className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
                        >
                            <option value="Kg" className="rounded-xl text-sm">Kg</option>
                            <option value="L">L</option>
                            <option value="Units">Units</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                            <label
                                className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                                htmlFor="grid-password">
                                {/* <HiMail className="mr-1" /> */}
                                Length
                            </label>

                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Inch</span>
                                    <input
                                        type="number"
                                        name="length"
                                        id="username"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label
                                className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                                htmlFor="grid-password">
                                {/* <HiMail className="mr-1" /> */}
                                Breadth
                            </label>

                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Inch</span>
                                    <input
                                        type="number"
                                        name="length"
                                        id="username"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label
                                className="flex items-center text-slate-500 text-sm font-semibold mb-2"
                                htmlFor="grid-password">
                                {/* <HiMail className="mr-1" /> */}
                                Width
                            </label>

                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Inch</span>
                                    <input
                                        type="number"
                                        name="length"
                                        id="username"
                                        autoComplete="username"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <label
                        className="flex mt-4 items-center text-slate-500 text-sm font-semibold mb-2"
                        htmlFor="grid-password">
                        {/* <HiMail className="mr-1" /> */}
                        Delivery Charge
                    </label>
                    <input
                        className="px-4 py-3 shadow text-sm text-gray-500 rounded-xl focus:outline-none"
                        placeholder="/km"
                        type="text"
                    />
                    <br/>
                    <button
                        // onClick={onClick}
                        className={`${currentTheme
                                        ? colors.bg[currentTheme].dark
                                        : "bg-purple-800 active:bg-purple-700"
                            } text-slate-50 focus:outline-none  font-medium rounded-md float-right hover:opacity-80 duration-300 text-lg px-8 py-3 text-center inline-flex items-center mt-3 mr-2 mb-2 dark:bg-purple-800 dark:active:bg-purple-700`}
                        type="button"
                    >
                        Submit
                    </button>
                </Paper>
            </div >
        </div >
    )
}

export default AddProduct