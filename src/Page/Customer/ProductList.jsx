import { useSelector } from "react-redux"
import { Button, Button2, Modal } from "../../components";
import { Transition } from '@headlessui/react'
import { Fragment, useState, React, useEffect } from 'react'
import { RxCrossCircled } from "react-icons/rx"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { IconButton } from "@mui/material";
import { Listbox } from '@headlessui/react'
import { BsCheck } from "react-icons/bs"
import { BiChevronUp } from "react-icons/bi"
import Drop from "../../views/Auth/Drop";
import backendURL from "../../BackendURL";

const productCart = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
]
const products = [
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },
    // More products...
]

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        // position={{ x: 100, y: 100 }}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function ProductList() {
    const { currentTheme, colors } = useSelector((state) => state.theme);
    const [products, setProducts] = useState(productCart);

    useEffect(() => {
        const axios = require('axios');
        const token = localStorage.getItem('token');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${backendURL}products/all-products/`,
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    return (
        <div className={` ${currentTheme ? "dark:bg-gray-800" : "bg-white"} p-3`}>
            <div className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <h2 className={`text-2xl font-bold tracking-tight  ${currentTheme == "dark" ? "text-gray-200" : "text-gray-900"} `}>Trending Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 m-5 sm:m-10">
                    {products.map((product) => (
                        <ItemCard props={product} />

                    ))}
                </div>
            </div>
        </div>
    )
}

function ItemCard({ props }) {
    const { currentTheme, colors } = useSelector((state) => state.theme)
    const [open, setOpen] = useState(false)
    const {
        pk,
        name,
        description,
        price,
        product_img,
    } = props;
    var rating = 4;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const people = [
        { name: 'Wade Cooper' },
        { name: 'Arlene Mccoy' },
        { name: 'Devon Webb' },
        { name: 'Tom Cook' },
        { name: 'Tanya Fox' },
        { name: 'Hellen Schmidt' },
    ]
    const [selected, setSelected] = useState(people[0]);
    console.log(props);
    return (
        <div
            className="flex flex-col p-2 border hover:scale-105 bg-white hover:bg-slate-50 cursor-pointer  justify-center items-start    border-slate-100 "
        >
            <div className="w-full relative">
                <img
                    src={product_img}
                    alt="product"
                    layout="fill" // required
                    objectFit="cover"
                // className=" h-60 "
                />
            </div>

            <div className="p-3">
                <h1 className="text-xl font-base ">{name ?? "Item name"}</h1>
                <h1 className="text-sm line-clamp-2 py-1 font-base ">
                    {description}
                </h1>
                <h1 className="text-sm font-semibold flex flex-row text-blue-500">
                    {[...Array(Math.floor(rating))].map((e, i) => (
                        <svg
                            key={e}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-yellow-400"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ))}
                    <span className="text-yellow-600 pr-5 ">{rating} </span>( {154})
                </h1>
                <div className="my-auto"></div>

                <h1 className="text-2xl font-semibold py-2">
                    {/* ${e.price}{" "} */}${price}
                    <span className="line-through text-base text-slate-500 font-normal px-3">
                        {(price / 100) * 12.96 + price}
                        {/* 879 */}
                    </span>
                    <span className=" text-base text-red-500 font-medium">
                        {(price + price * 0.36)}
                        {/* {discountPercentage}%OFF */}
                    </span>
                </h1>

                <h1 className="text-sm text-slate-400">10% Off on Select Cards</h1>
                <h1 className="text-xs text-slate-800 font-semibold">
                    Delivery within 2 days
                </h1>
                <Button children={"Add to cart"} onClick={() => setOpen(!open)} />
            </div>
            {/* <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setOpen(!open)}>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="absolute -inset-0.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <RxCrossCircled className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {productCart.map((product) => (
                                                                <li key={product.id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={product.imageSrc}
                                                                            alt={product.imageAlt}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <a href={product.href}>{product.name}</a>
                                                                                </h3>
                                                                                <p className="ml-4">{product.price}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <p className="text-gray-500">Qty {product.quantity}</p>

                                                                            <div className="flex">
                                                                                <button
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>$262.00</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <a
                                                        href="#"
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                             
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root> */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Your cart
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <RxCrossCircled />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <div className="mt-2">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {productCart.map((product) => (
                                    <li key={product.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={product.imageSrc}
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={product.href}>{product.name}</a>
                                                    </h3>
                                                    <p className="ml-4">{product.price}</p>
                                                </div>
                                                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty {product.quantity}</p>

                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        className={`${currentTheme
                                                            ? colors.text[currentTheme].dark
                                                            : "text-purple-800 active:text-purple-700"
                                                            } font-medium`}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="items-end justify-between text-sm mt-2">
                                                <p className="text-gray-500">Coupons available </p>
                                                <Drop/>
                                                {/* <select
                                                    // onChange={inputChangeHandler}
                                                    name="role"
                                                    type="text"
                                                    class="select"
                                                    className="px-3 py-3 placeholder-blueGray-300 text-slate-700 placeholder:text-slate-400 bg-gray-50  border borderColor rounded-xl text-sm  focus:outline-none w-full ease-linear transition-all duration-150"
                                                >
                                                    <option value="admin" className="rounded-xl text-sm">Admin</option>
                                                    <option value="creator">Creator</option>
                                                    <option value="user">User</option>
                                                </select> */}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$262.00</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <a
                                href="##"
                                className={`${currentTheme
                                    ? colors.bg[currentTheme].dark
                                    : "bg-purple-800 active:bg-purple-700"
                                    } flex items-center cursor-pointer justify-center rounded-md border border-transparent dark:bg-purple-800 dark:active:bg-purple-700 px-6 py-3 text-base font-medium text-white shadow-sm`}
                            >
                                Checkout
                            </a>
                        </div>

                    </div>
                </DialogContent>

            </Dialog>
        </div >
    );
}