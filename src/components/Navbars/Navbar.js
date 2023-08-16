import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { HiSearch } from "react-icons/hi"
import { GiCartwheel } from "react-icons/gi"
import { logout } from "../../store/slices/auth/authSlice"
import { Button, ThemeToggle } from ".."
import UserNavCard from "../Cards/UserNavCard"
import axios from "../../Services/axios"
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import RenderIf from "../RenderIf/RenderIf"
import Confetti from 'react-confetti'
// import WheelComponent from 'react-wheel-of-prizes'

export default function Navbar() {
	var width = 1200, height = 800;
	const [adminInfo, setAdminInfo] = useState(null)
	const [open, setOpen] = useState(false)
	const [confetti, setConfetti] = useState(false)
	const { profile } = useSelector((state) => state.employee)
	const { isEmployee, isAdmin, isHr } = useSelector((state) => state.auth)
	const dispatch = useDispatch()
	const logoutHandler = () => {
		dispatch(logout())
		window.location = "/auth/login"
	}
	const [counter, setCounter] = useState(0);
	useEffect(() => {
		const getAdmin = async () => {
			const res = await axios.get("user/profile/")
			const data = await res.data
			setAdminInfo(data?.data)
		}
		if (isAdmin) {
			getAdmin()
		}
	}, [isAdmin])
	const cancelButtonRef = useRef(null)
	// import 'react-wheel-of-prizes/dist/index.css'

	const segments = [
		'better luck next time',
		'won 70',
		'won 10',
		'better luck next time',
		'won 2',
		'won uber pass',
		'better luck next time',
		'won a voucher'
	]
	const segColors = [
		'#EE4040',
		'#F0CF50',
		'#815CD1',
		'#3DA5E0',
		'#34A24F',
		'#F9AA1F',
		'#EC3F3F',
		'#FF9000'
	]
	const onFinished = (winner) => {
		console.log(winner)
		setConfetti(true)
	}
	// return (
	// 	<WheelComponent
	// 		segments={segments}
	// 		segColors={segColors}
	// 		onFinished={(winner) => onFinished(winner)}
	// 		primaryColor="black"
	// 		contrastColor="white"
	// 		buttonText="Spin"
	// 		isOnlyOnce={false}
	// 		size={190}
	// 		upDuration={500}
	// 		downDuration={600}
	// 		fontFamily="Arial"
	// 	/>
	// )

	return (
		<>
			{/* Navbar */}
			<nav className="absolute top-0 left-0 w-full md:flex-row md:flex-nowrap md:justify-start md:flex items-center p-2 hidden border-b borderColor ">
				<div className="w-full mx-autp  flex justify-end md:flex-nowrap flex-wrap md:px-10 px-4">
					<div className="flex items-center">
						{/* Form */}
						{/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
							<div className="relative flex w-full flex-wrap items-stretch">
								<span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
									<HiSearch className="fas fa-search dark:text-slate-400 text-slate-600"></HiSearch>
								</span>
								<input
									type="text"
									placeholder="Search here..."
									className="border borderColor px-3 py-2 placeholder-slate-500 dark:text-slate-200 text-slate-700 relative  dark:customPurpleBg_2   rounded text-sm outline-none focus:outline-none w-full pl-10"
								/>
							</div>
						</form> */}
						{/* Dark mode toggle */}
						<ThemeToggle />
						<div onClick={() => setOpen(!open)} className="border text-xl rounded-md duration-300 active:bg-purple-400 active:border-purple-400 hover:bg-purple-300 hover:border-purple-300 dark:hover:border-purple-300 dark:active:border-purple-400 dark:hover:text-black cursor-pointer ml-auto borderColor dark:text-yellow-300">
							<GiCartwheel className="p-2 text-4xl" />
						</div>
						{/* User */}
						<ul className="flex-col md:flex-row list-none items-center hidden md:flex ml-2">
							<RenderIf isTrue={isEmployee || isHr}>
								<UserNavCard
									logout={logoutHandler}
									name={
										profile?.first_name +
										" " +
										profile?.middle_name +
										" " +
										profile?.last_name
									}
									email={profile?.email}
								/>
							</RenderIf>
							<RenderIf isTrue={true}>
								<UserNavCard
									logout={logoutHandler}
									name={adminInfo?.first_name || ""}
									email={adminInfo?.email || ""}
								/>
							</RenderIf>
						</ul>
					</div>
				</div>
			</nav>
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => {
					setOpen(false);
					setConfetti(false);
				}}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<Dialog.Panel className="transform justify-center align-middle rounded-lg text-center shadow-xl transition-all ">
									{/* <WheelComponent
										segments={segments}
										segColors={segColors}
										onFinished={(winner) => onFinished(winner)}
										primaryColor="black"
										contrastColor="white"
										buttonText="Spin"
										isOnlyOnce={false}
										size={230}
										upDuration={500}
										downDuration={600}
										fontFamily="Arial"
									/> */}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			{confetti &&
				<div className="fixed inset-0 z-20">
					<Confetti
						width={width}
						height={height}
					/>
				</div>}
			{/* End Navbar */}
		</>
	)
}
