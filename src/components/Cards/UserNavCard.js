import { AiFillFire } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Typography, Modal, Box, DialogTitle } from "@mui/material";
import Dialog from '@mui/material/Dialog';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const UserNavCard = ({ name, email, logout }) => {
  const [counter, setCounter] = useState(0);
  const [open, setOpen] = useState(false)
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "hi,en,bn,fr,mr,gu,ur,te,ta,sd,sa,pa,or,mr,ml",
        layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    if (counter === 1) {
      var addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
      setCounter(2);
    }
    setCounter(1);
  }, [counter]);

  return (
    <div className="px-2 py-1 rounded-md border borderColor bg-white dark:bg-purple_5 flex md:items-center md:flex-row flex-col">
      <div className="flex items-center mr-3">
        <img onClick={() => setOpen(true)} className="cursor-pointer" width={"90"} src="https://www.pngitem.com/pimgs/m/3-31658_flipkart-supercoin-hd-png-download.png" alt="logo" />
        <h4 className="text-slate-700 dark:text-slate-200 font-semibold">
          1000
        </h4>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <DialogTitle id="modal-modal-title" variant="h6" component="h2">
              "360 supercoins are on the way"
            </DialogTitle>
            <h2>Supercoins T&C</h2>
            <ol>
              <li>Declaying natural of supercoins ie all SuperCoins not redeemed for 12 months will expire at the end of the period.</li>
              <li>Utilization of the existing reward and loyalty metrics of flipkart (Supercoin) for easy integration to existing system. </li>
              <li>Gamified user experience leading to earning more supercoins.</li>
              <li>Gamified user experience leading to earning more supercoins.</li>
              <li>Challenges to achieve purchasing target to receive supercoins leading to increase in sale as well as more engagement with flipkart platform</li>
              <li>Referral and social media engagement benefits .</li>
              <li>Enable users to use their tokens to access exclusive experiences, events, or content that would otherwise require traditional currency like (free delivery)</li>
              <li>Supercoins are credited once the return period of the item is completed →customer</li>
              <li>Supercoins are reclaimed if the products are removed by the vendor → security</li>
              <li>Vendor can only change the Criteria after 3 weeks period.</li>
            </ol>
          </Box>
        </Dialog>
        {/* <AiFillFire className="h-8 w-8 block mr-2 text-yellow-400 dark:text-slate-500" /> */}
        {/* <button
          data-tooltip-target="tooltip-default"
          data-tooltip-placement="bottom"
          className="text-slate-600"
          style={{ transform: "translateX(-10px)" }}>
          9
        </button> */}
        {/* <div
          id="tooltip-default"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Tooltip content
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div>
          <h4 className="text-sm text-slate-700 dark:text-slate-200 font-semibold">
            {!name.includes("undefined") ? name : "Name"}
          </h4>
          <span className="text-sm text-slate-400 font-normal -mt-1 block">
            {email || "example@email.com"}
          </span>
        </div>*/}
      </div>
      <button
        onClick={logout}
        className="px-2 py-1 rounded-md border-none bg-purple-600 text-slate-100 text-base font-bold md:mt-0 mt-2">
        Logout
      </button>
    </div >

  );
};

export default UserNavCard;

{/* <div id="google_translate_element"></div> */ }