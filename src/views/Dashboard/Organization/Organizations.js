import { useState, useTransition, Suspense, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../../assets/styles/react-tabs.css";
import data from "../../../MCQdata/data";
import { LoadingSpinner } from "../../../components";
import "react-datepicker/dist/react-datepicker.css";
// Importing components for other tabs
import Department from "./Department";
import Designation from "./Designation";
import Location from "./Location";
import Holidays from "./Holidays";
import AllOrganizations from "./AllOrganizations";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiPlusCircle, HiQuestionMarkCircle, HiMail } from "react-icons/hi";
import { FiType } from "react-icons/fi";
import { AiOutlineBook } from "react-icons/ai";
import { FlashcardComponent } from 'react-flashcard'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom"
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import {
	// Allowance
	allAllowances,
	createAllowance,
	deleteAllowance,
	// Dedution
	allDeductions,
	createDeductions,
	deleteDeduction,
	toastReset,
} from "../../../store/slices/finance/financeSlice";
// Components
import {
	Button,
	Modal,
	SectionHeader,
	InputTag,
	TransitionBtoT,
	RenderIf,
} from "../../../components";
import {
	SubHeading,
	TextareaTag,
	FadedText,
	AllowanceTable,
	WarningModal,
} from "../../../components";
// Importing componts for tabs
import Bank from "../Organization/Bank";
import Expenses from "../Finance/Expenses";
import Cards from "../Finance/Cards";
// import Temp from "./tempCards";
import { SuggestData } from "./SuggestedData"
import Temp from "../Finance/tempCards"
import AlanHooks from "../../../AlanHooks";
import SMS from "./SMS";
var axios = require('axios');
var FormData = require('form-data');

const Organizations = () => {
	console.log(data);
	const All = [
		"HTML",
		"CSS",
		"Javascript",
		"JQUery",
		"React",
		"Vue",
	]
	const Static = [
		"Django",
		"Node",
		"DWF",
	]
	const Dynamic = [
		"pandas",
		"power BI",
		"Numpy",
		"excel",
		"SQL"
	]
	const Blockchain = [
		"Hardhat",
		"NFT",
		"solidity",
		"Smart contracts",
	]
	const Learning = [
		"Questions",
	]

	const [currentTab, setCurrentTab] = useState(0);
	const [isPending, startTransition] = useTransition();

	const tabChangeHandler = (idx) => {
		startTransition(() => {
			setCurrentTab(idx);
		});
	};
	const [file, setFile] = useState();
	const [name, setName] = useState();
	const [couponData, setCoupon] = useState({
		name: "om",
		cart_limit: "2000",
		category: "food",
		amount_limit: "100",
		percent_limit: "20",
		valid_date: "",
		code: "TRY",
		numberOfcoupens: "2",
		lengthofcode: "5",
		is_static: false,
		limit_coupens: "10"
	})
	const [allCoupons, setAllCoupons] = useState([])


	const [showDeductionWarning, setShowDeductionWarning] = useState(false);


	const [startDate, setStartDate] = useState(new Date());
	const [selectedValue, setSelectedValue] = useState("");

	function handleSelectChange(e) {
		setSelectedValue(e.target.value);
	}

	useEffect(() => {
		var config = {
			method: 'get',
			url: 'http://127.0.0.1:8000/coupons/coupen-get/',
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc4ODA4NjY1LCJpYXQiOjE2Nzg1NDk0NjUsImp0aSI6ImVhZWY5YzRhOGNiZDRhMDRiNDFjYjI3OGMwMTIwODA3IiwidXNlcl9pZCI6MX0.rRjJVtJjbjeFeTiDOj_ldOQpZqymlcma6YIrCOCFlUI'
			}
		};

		axios(config)
			.then(function (response) {
				console.log(response.data);
				setAllCoupons(response.data);

			})
			.catch(function (error) {
				console.log(error);
			});
	}, [])


	return (
		<div>

			<Tabs
				selectedIndex={currentTab}
				selectedTabClassName="tabs-styles"
				onSelect={tabChangeHandler}>
				<TabList className="tab_list-styles ">
					<Tab className="tab-styles">
						Analysis
					</Tab>
					<Tab className="tab-styles">Feedbacks</Tab>

					{/* <Tab className="tab-styles">Department</Tab>
					<Tab className="tab-styles">Designation</Tab>
					<Tab className="tab-styles">Location</Tab>
					<Tab className="tab-styles">Holidays</Tab> */}
				</TabList>

				<Suspense fallback={<LoadingSpinner />}>
					<TabPanel><div>
						<PowerBIEmbed
							embedConfig={{
								type: 'report',   // Supported types: report, dashboard, tile, visual and qna
								id: 'c325f9de-187d-4a74-8484-5db327831b10',
								accessToken:"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDFmMTQzNDgtZjFiNS00YTA5LWFjOTktN2ViZjIxM2NiYzgxLyIsImlhdCI6MTY4ODg4NDIxOCwibmJmIjoxNjg4ODg0MjE4LCJleHAiOjE2ODg4ODg2ODUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFNWUtiVDV4S2pXQXRMcWRNVzkyZXpCblAvYUw5b3VxQ2RNOS9ielRjYVg4NkxtcmtmM2RmQktwdDVPSHhFUm5PIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTUFOR0UiLCJnaXZlbl9uYW1lIjoiQkhVTUlLQSIsImlwYWRkciI6IjE2NS4yMjUuMTA2LjE3MiIsIm5hbWUiOiJCSFVNSUtBIE1BTkdFIC0gNjAwMDQyMDAwNjUiLCJvaWQiOiJlYjBjMmI4OS1mM2E4LTRhYzMtODc4ZS02NTVhYTRmNTk3ODEiLCJwdWlkIjoiMTAwMzIwMDExNDU1RkJBRCIsInJoIjoiMC5BVDBBU0VQeDBiWHhDVXFzbVg2X0lUeThnUWtBQUFBQUFBQUF3QUFBQUFBQUFBQTlBTkEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoibjRpREZJQm96ZDQyZ3FrenhyRVBiWWZHRktvLTdKaUpJeWFaeXdZZ243VSIsInRpZCI6ImQxZjE0MzQ4LWYxYjUtNGEwOS1hYzk5LTdlYmYyMTNjYmM4MSIsInVuaXF1ZV9uYW1lIjoiQkhVTUlLQS5NQU5HRTY1QHN2a21tdW1iYWkub25taWNyb3NvZnQuY29tIiwidXBuIjoiQkhVTUlLQS5NQU5HRTY1QHN2a21tdW1iYWkub25taWNyb3NvZnQuY29tIiwidXRpIjoieExTZGpwOGhqRWFXdEhWR19xSThBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.GiLbS2JLPPsHUo3NveMnQc3v16Sy9Y0kNIN5gyayYxv5kB-wlkCKA6zCryA75kMdi6zkFxLTTHAjuKiFC3xhZaftZwzhEIb4H_gWyMG96RrWL2cU984-1WPzTh07Dyi9hT8GlnMLB7m48o8bYUueRdsPU0WQ4clTO25zamK7wiODVqcKpWhq-35hrwZst37dk1_xmnMpvHLZPfX_hto7sSlZLksImfS8Y1aALRF47ISlUN2F884K714o8wCJZ_bKP3LVBiroC3BXiQfZkjxqCs1B5fzQL1KbR9k6XxbLWNyI23XqaLhKkOtFe4AbV3U0lpkAE4NUIyngw7T0vQW-tA",
								embedUrl: "https://app.powerbi.com/reportEmbed?reportId=c325f9de-187d-4a74-8484-5db327831b10&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
								tokenType: models.TokenType.Aad,
								settings: {
									panes: {
										filters: {
											expanded: false,
											visible: true
										}
									},
								}
							}}

							eventHandlers={
								new Map([
									['loaded', function () { console.log('Report loaded'); }],
									['rendered', function () { console.log('Report rendered'); }],
									['error', function (event) { console.log(event.detail); }]
								])
							}

							cssClassName={"Embed-container"}

							getEmbeddedComponent={(embeddedReport) => {
								window.report = embeddedReport;
							}}
						/>
					</div></TabPanel>
					<TabPanel>{!isPending && <SMS temp={SuggestData} id="4" type={"Suggested"} />}</TabPanel>
				</Suspense>
			</Tabs>
		</div >
	)
}

export default Organizations;
