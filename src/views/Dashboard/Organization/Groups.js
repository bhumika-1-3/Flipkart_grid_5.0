import React, { useState } from "react";
import {
  TableContainer,
  Tbody,
  Thead,
  Th,
  Td,
  Table,
} from "../../../components/Tables/TableStyles";
import {
  Modal,
  SectionHeader,
  InputTag,
  TransitionBtoT,
  RenderIf,
} from "../../../components";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsCoin } from "react-icons/bs";
import { Chips } from "../../../components";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai"
import "./Dashboard.css";
import { Button } from "../../../components";
import { HiPlusCircle } from "react-icons/hi";
import TableData from "./TableData";
import { Fragment } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { AiOutlineCloseCircle, AiOutlineStar } from "react-icons/ai"
import { useNavigate } from "react-router-dom";

const product = {
  name: 'Basic Tee 6-Pack ',
  price: '$192',
  rating: 3.9,
  reviewCount: 117,
  href: '#',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
  imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: true },
    { name: 'XXXL', inStock: false },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Groups = (props) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [name, setName] = useState("");
  const [people, setPeople] = useState("");
  const [coupon, setCoupon] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [open, setOpen] = useState(false);
  const [studentData, setStudentData] = useState(TableData);
  const data = [
    {
      "id": "p001",
      "name": "Example Product 1",
      "weight": "1.5 kg",
      "size": "Medium",
      "price": 199.99,
      "stock": 100,
      "description": "This is an example product description.",
      "images": [
        "https://example.com/product1-image1.jpg",
        "https://example.com/product1-image2.jpg"
      ],
      "supercoins_earned": 20,
      "tags": ["electronics", "gadgets"],
      "stock_status": "available"
    },
    {
      "id": "p002",
      "name": "Example Product 2",
      "weight": "2.2 kg",
      "size": "Large",
      "price": 349.99,
      "stock": 50,
      "description": "Another example product description.",
      "images": [
        "https://example.com/product2-image1.jpg",
        "https://example.com/product2-image2.jpg"
      ],
      "supercoins_earned": 30,
      "tags": ["clothing", "fashion"],
      "stock_status": "restock"
    },
    {
      "id": "p003",
      "name": "Example Product 3",
      "weight": "0.8 kg",
      "size": "Small",
      "price": 99.99,
      "stock": 15,
      "description": "Yet another example product description.",
      "images": [
        "https://example.com/product3-image1.jpg",
        "https://example.com/product3-image2.jpg"
      ],
      "supercoins_earned": 10,
      "tags": ["electronics", "accessories"],
      "stock_status": "restock-urgent"
    },
    {
      "id": "p004",
      "name": "Example Product 4",
      "weight": "1.0 kg",
      "size": "Small",
      "price": 149.99,
      "stock": 75,
      "description": "A versatile product for everyday use.",
      "images": [
        "https://example.com/product4-image1.jpg",
        "https://example.com/product4-image2.jpg"
      ],
      "supercoins_earned": 15,
      "tags": ["home", "kitchen"],
      "stock_status": "available"
    },
    {
      "id": "p005",
      "name": "Example Product 5",
      "weight": "3.5 kg",
      "size": "Large",
      "price": 599.99,
      "stock": 3,
      "description": "Premium quality with advanced features.",
      "images": [
        "https://example.com/product5-image1.jpg",
        "https://example.com/product5-image2.jpg"
      ],
      "supercoins_earned": 50,
      "tags": ["electronics", "premium"],
      "stock_status": "restock-urgent"
    }
    // Add more products...
  ]





  const changeName = (event) => {
    setName(event.target.value);
  };


  const transferValue = (event) => {
    event.preventDefault();
    const val = {
      name,
      people,
      coupon,
      start,
      end,
    };
    props.func(val);
    clearState();
  };

  const clearState = () => {
    setName("");
    setPeople("");
  };
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between pb-5">
        <p className="text-3xl pb-6 dark:text-slate-300">
          Products Listed:
        </p>
        <SectionHeader>
          <Modal
            title="Add new coupon"
            className="float-right"
            activator={({ setShow }) => (
              <Button Icon={HiPlusCircle} onClick={() => {
                navigate("/vendor/addproduct")
              }}>
                Add
              </Button>
            )}
          >
            {/* <form style={{ display: "none" }} ref={form}>
              <input type="text" name="from_name" value="Om Shukla" />
              <input
                type="email"
                name="reply_to"
                value="bhumikamange13@gmail.com"
              />
              <input
                name="message"
                value="You have received new coupon check it out"
              />
            </form> */}
            {/* <form onSubmit={creatingCoupon}> */}
            <InputTag
              // Icon={FiType}
              label="Name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={changeName}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputTag
                // Icon={FiType}
                notRequired={true}
                label="Coupon Code"
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                }}
              />
              <InputTag
                // Icon={FiType}
                label="People Influenced"
                notRequired={true}
                type="text"
                placeholder="Enter No. of People Influenced"
                value={people}
                onChange={(e) => {
                  setPeople(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputTag
                // Icon={FiType}
                notRequired={true}
                label="Start Date"
                type="text"
                placeholder="Enter Start Date"
                value={start}
                onChange={(e) => {
                  setStart(e.target.value);
                }}
              />
              <InputTag
                // Icon={FiType}
                label="End Date"
                notRequired={true}
                type="text"
                placeholder="Enter End Date"
                value={end}
                onChange={(e) => {
                  setEnd(e.target.value);
                }}
              />
            </div>
            {/* <div className="relative w-full mb-3">
                <h1 className="text-slate-700 dark:text-slate-300 text-sm font-normal mb-2 flex items-center">
                  End Date
                </h1>
                <DatePicker
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 bg-gray-200
								 dark:bg-transparent dark:border rounded-md text-sm shadow-sm outline-none w-full ease-linear transition-all duration-150`}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div> */}

            <Button onClick={transferValue} Icon={HiPlusCircle}>
              Create
            </Button>
            {/* <Button onClick={sendEmail} Icon={HiMail}>
                Send Promation mail
              </Button> */}
            {/* </form> */}
          </Modal>
        </SectionHeader>
      </div>
      <TableContainer>
        <Table>
          <Thead>
            <Th>#</Th>
            <Th>Id</Th>
            <Th>Title</Th>
            <Th>Price/unit</Th>
            <Th>Quantity</Th>
            <Th>Stocks</Th>
            <Th>Supercoins Earned</Th>
            <Th><center>Action</center></Th>
          </Thead>
          {
            data?.map((i, x) => {
              return <Tbody key={i.id}>
                <Td>{x + 1}</Td>
                <Td>{i.id}</Td>
                <Td>{i.name}</Td>
                <Td>₹ {i.price}</Td>
                <Td>{i.stock}</Td>
                <Td>
                  <Chips
                    green={i?.stock_status == "available"}
                    red={i?.stock_status == "restock-urgent"}
                    yellow={i?.stock_status == "restock"}
                  >
                    {i.stock_status}
                  </Chips>
                </Td>
                <Td><center>{i.supercoins_earned}</center></Td>
                <Td>

                  <Button children="Restock" onClick={()=>{
                    navigate("/vendor/addproduct")
                  }} restock={true} Icon={MdOutlineAddShoppingCart} className="bg-green-500"></Button>
                  <Button onClick={() => setOpen(!open)} children="View" view={true} Icon={AiOutlineEye} className="bg-green-500"></Button>
                  <Button children="Delete" danger={true} Icon={AiOutlineDelete} className="bg-green-500"></Button>
                </Td>
              </Tbody>
            })
          }
        </Table>
      </TableContainer>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <AiOutlineCloseCircle className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img src={product.imageSrc} alt={product.imageAlt} className="object-cover object-center" />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.name}</h2>

                        <section aria-labelledby="information-heading" className="mt-2">
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-2xl text-gray-900">{product.price}</p>

                          {/* Reviews */}
                          <div className="mt-6">
                            <h4 className="sr-only">Reviews</h4>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <AiOutlineStar
                                    key={rating}
                                    className={classNames(
                                      product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                      'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                              <p className="sr-only">{product.rating} out of 5 stars</p>
                              <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                {product.reviewCount} reviews
                              </a>
                            </div>
                          </div>
                        </section>

                        <section aria-labelledby="options-heading" className="mt-10">
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>

                          <form>
                            {/* Colors */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">Color</h4>

                              <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                <span className="flex items-center space-x-3">
                                  {product.colors.map((color) => (
                                    <RadioGroup.Option
                                      key={color.name}
                                      value={color}
                                      className={({ active, checked }) =>
                                        classNames(
                                          color.selectedClass,
                                          active && checked ? 'ring ring-offset-1' : '',
                                          !active && checked ? 'ring-2' : '',
                                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                        )
                                      }
                                    >
                                      <RadioGroup.Label as="span" className="sr-only">
                                        {color.name}
                                      </RadioGroup.Label>
                                      <span
                                        aria-hidden="true"
                                        className={classNames(
                                          color.class,
                                          'h-8 w-8 rounded-full border border-black border-opacity-10'
                                        )}
                                      />
                                    </RadioGroup.Option>
                                  ))}
                                </span>
                              </RadioGroup>
                            </div>

                            {/* Sizes */}
                            <div className="mt-10">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-900">Size</h4>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                  Size guide
                                </a>
                              </div>

                              <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                <div className="grid grid-cols-4 gap-4">
                                  {product.sizes.map((size) => (
                                    <RadioGroup.Option
                                      key={size.name}
                                      value={size}
                                      disabled={!size.inStock}
                                      className={({ active }) =>
                                        classNames(
                                          size.inStock
                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                          active ? 'ring-2 ring-indigo-500' : '',
                                          'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                          {size.inStock ? (
                                            <span
                                              className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                'pointer-events-none absolute -inset-px rounded-md'
                                              )}
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <span
                                              aria-hidden="true"
                                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                            >
                                              <svg
                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                stroke="currentColor"
                                              >
                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                              </svg>
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>

                            <button
                              type="submit"
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Add to bag
                            </button>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Groups;
