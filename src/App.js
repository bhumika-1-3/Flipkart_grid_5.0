import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { useEffect } from "react"
// import PrivateRoutes from "./routes/PrivateRoutes"
import Profile from "./views/Auth/Profile"
import Login from "./views/Auth/Login"
import DashboardLayout from "./layouts/DashboardLayout"
import AOS from "aos";
import "aos/dist/aos.css";
// import Finance from "./views/Dashboard/Finance/Finance"
// import Finan2 from "./views/Dashboard/Finance/Finan2"
import Signup from "./views/Auth/Signup"
import More from "./views/Auth/MoreDetails"
import AlanHooks from "./AlanHooks"
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Products from "./Page/Vendor/Products"
import ErrorPage from "./Page/Auth/ErrorPage"
import ProductList from "./Page/Customer/ProductList"
import Customer_dashboard from "./Page/Customer/Customer_dashboard"
import AddProduct from "./Page/Vendor/AddProduct"
import ProfileVendor from "./Page/Vendor/ProfileVendor"
import SupercoinsRules from "./Page/Vendor/SupercoinsRules"
import Analysis from "./Page/Vendor/Analysis"
import ForgotPassword from "./views/Auth/ForgotPassword"
import CoinExclusive from "./Page/Customer/CoinExclusive"
// import PysQuestions from "./Questionaire"

function App() {
	useEffect(() => {
		// AlanHooks();
		AOS.init({
			once: false,
			duration: 1000
		});


	}, []);

	const router = createBrowserRouter([
		{
			path: "/",
			element: <center className="m-14"><Login /></center>,
		},
		{
			path: "/signup",
			element: <center className="m-14"><Signup /></center>,
		},
		{
			path: "/forgotpassword",
			element: <ForgotPassword />
		},
		{
			path: "/vendor",
			element: <DashboardLayout />,
			errorElement: <ErrorPage />,
			children: [
				{
					element: <ProfileVendor />,
					path: "profile",
				},
				{
					element: <Products />,
					path: "products",
				},
				{
					element: <AddProduct />,
					path: "addproduct",
				},
				{
					element: <SupercoinsRules />,
					path: "rules",
				},
				{
					element: <Analysis />,
					path: "analysis",
				}
			]
		},
		{
			path: "/customer",
			element: <DashboardLayout />,
			errorElement: <ErrorPage />,
			children: [
				{
					element: <Customer_dashboard />,
					path: "products",
				},
				{
					element: <Profile />,
					path: "profile",
				},
				{
					element: <CoinExclusive />,
					path: "exclusive",
				}
			]
		}
	]);

	return (
		<Provider store={store}>
			<RouterProvider router={router} />
			<Router>
				<Routes>
					<Route path="/Profile" element={<Profile />}></Route>

					{/* <Route path="/signup" element={<center className="m-14"><Signup /></center>}></Route> */}
					{/* <Route path="/questions" element={<PysQuestions />}></Route> */}
					{/* <Route path="/more" element={<center className="m-14"><More /></center>}></Route> */}
					{/* <Route path="/login" element={<center className="m-14"><Login /></center>}></Route> */}
					{/* <Route path="/admin/finance/:id" element={<Finan2 />}></Route> */}
					{/* <Route path="/dashboard" element={<center className="m-14"><DashboardLayout /></center>}></Route> */}
				</Routes>
				{/* <PrivateRoutes /> */}
			</Router>
		</Provider>
	)
}

export default App
