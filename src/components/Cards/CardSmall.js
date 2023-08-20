import { useSelector } from "react-redux";
import backendURL from "../../BackendURL";
import Button from "../Buttons/Button";

const CardSmall = ({ props }) => {
	const { pk, name, code, discount, active, expiry_date, price_tokens } = props;
	const { currentTheme, colors } = useSelector((state) => state.theme);

	const handleRedeem = () => {
		const axios = require('axios');
		let data = JSON.stringify({
			"code": code
		});
		const token = localStorage.getItem('token');
		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: `${backendURL}products/redeem-coupon/`,
			headers: { 
				'Content-Type': 'application/json', 
				'Authorization': `Bearer ${token}`
			},
			data : data
		};

		axios.request(config)
		.then((response) => {
			console.log(JSON.stringify(response.data));
		})
		.catch((error) => {
			console.log(error);
		});
	}
	return (
		<div className={`m-1 shadow-sm border borderColor px-4 py-3 rounded-lg bg-gradient-to-r dark:bg-purple_5
			${currentTheme ? colors.bg[currentTheme].light : "bg-purple_5"}
			`}>
			<h4
				className={`font-normal text-white text-sm px-2 rounded-lg mb-1.5  dark:bg-purple-800 inline-block ${currentTheme ? colors.bg[currentTheme].dark : "bg-purple-800"
					}`}
			>
				{/* {idx} */}
			</h4>
			<div className="grid grid-cols-2 gap-6">
				<div>
					<p className="font-bold dark:text-zinc-300 text-4xl text-slate-900 font-serif pb-1">
						{discount}
					</p>
					<p className="font-normal dark:text-zinc-300 text-slate-900 pb-1 font-sans">
						Price {price_tokens}
					</p>
					<p className="font-normal dark:text-zinc-300 text-xl text-white-900 pb-1 font-sans">
						Coupon Expires {expiry_date}
					</p>
				</div>
				<div className="float-right">
					<p className={`font-bold dark:text-zinc-200 text-3xl text-slate-700 font-sans pb-2`}>
						{code}
					</p>
					<p className="font-normal dark:text-zinc-300 text-slate-900 font-sans">
						<Button onClick={handleRedeem}>Redeem</Button>
					</p>
				</div>
			</div>
			{/* {children} */}
		</div>
	)
};

export default CardSmall;
