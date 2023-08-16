import { useSelector } from "react-redux"

const Button = ({ onClick, type, danger, Icon, children, view ,restock }) => {
	const { currentTheme, colors } = useSelector((state) => state.theme)
	return (
		<button
			onClick={onClick}
			className={`${danger
				? "bg-red-600 active:bg-red-500"
				: view ? "bg-blue-600 active:bg-blue-500" :
				restock ? "bg-green-600 active:bg-green-500" :
					currentTheme
						? colors.bg[currentTheme].dark
						: "bg-purple-800 active:bg-purple-700"
				} text-slate-50 focus:outline-none  font-medium rounded-md hover:opacity-80 duration-300 text-sm px-3 py-1 text-center inline-flex items-center mt-3 mr-2 mb-2 dark:bg-purple-800 dark:active:bg-purple-700`}
			type={type}
		>
			{Icon && <Icon className="w-5 h-5 mr-2 -ml-1" />}
			{children}
		</button>
	)
}

export default Button
