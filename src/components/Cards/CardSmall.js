import { useSelector } from "react-redux";

const CardSmall = ({ idx, name, type, children }) => {
	console.log(name, type);
	const { currentTheme, colors } = useSelector((state) => state.theme);
	return (
		<>
			{type === 'Suggested'
				?
				(<div className="grid grid-cols-2">
					{name["food_ecommerce_offers"]?.map((i) => {
						return 	<div className={`m-1 shadow-sm border borderColor px-4 py-3 rounded-lg bg-gradient-to-r dark:bg-purple_5
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
											{i.percentage_offer}
										</p>
										<p className="font-normal dark:text-zinc-300 text-slate-900 pb-1 font-sans">
											MAX $20.00
										</p>
										<p className="font-normal dark:text-zinc-300 text-xl text-white-900 pb-1 font-sans">
											{i.reason}
										</p>
									</div>
									<div className="float-right">
										{i && (
											<p className={`font-bold dark:text-zinc-200 text-3xl text-slate-700 font-sans pb-2`}>
												{i.coupon_code}
											</p>
										)}
										<p className="font-normal dark:text-zinc-300 text-slate-900 font-sans">
											Coupon Expires 03/12
										</p>
									</div>
								</div>
								{/* {children} */}
							</div>
					})
					}
				</div>
				)

				:
				
				<div className={`m-4 shadow-sm border borderColor px-4 py-3 h-64 p-4 rounded-lg bg-gradient-to-r dark:bg-purple_5
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
								{name.name}
							</p>
							<p className="font-normal dark:text-zinc-300 text-slate-900 pb-1 font-sans">
								MAX {name.percent_limit}% or ₹{name.amount_limit}
							</p>
							<p className="font-normal dark:text-zinc-300 text-xl text-white-900 pb-1 font-sans">
								Min cart value ₹{name.cart_limit}
							</p>
						</div>
						<div className="float-right">
							{name && (
								<p className={`font-bold dark:text-zinc-200 text-3xl text-slate-700 font-sans pb-2`}>
									{name.dynamic_coupen ? name.dynamic_coupen[0] : name.coupens_static}
								</p>
							)}
							<p className="font-normal dark:text-zinc-300 text-slate-900 font-sans">
								Coupon Expires {name.valid_date}
							</p>
						</div>
					</div>
					{/* {children} */}
				</div>
			}

			{ }
		</>
	)
};

export default CardSmall;
