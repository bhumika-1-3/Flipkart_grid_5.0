import React from 'react'
import { Paper } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';


const Promotion = () => {
    return (
        <div>
            <Splide options={{
                rewind: true,
                gap: '1rem',
                perPage: 3,
                perMove: 1,
                autoplay: true, // Enable auto play
                interval: 3000,
            }}
                aria-label="My Favorite Images">

                <SplideSlide>
                    <a href="https://www.bajajfinserv.in/investments/fixed-deposit" target="_blank" rel="noreferrer">
                        <Paper style={{ cursor: "pointer" }} sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                            <img alt="bajaj" src="https://cms-assets.bajajfinserv.in/is/image/bajajfinance/fixed-deposite-v1?scl=1&fmt=png-alpha" width={350} height={180}></img>
                        </Paper>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <a href="https://www.bajajfinserv.in/rbl-dbs-credit-cards" target="_blank" rel="noreferrer">
                        <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                            <img alt="bajaj" src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/vineet/Amazon-Pay-Later/Nov_21/770x350_Bajaj-Finserv.jpg" width={350} height={180}></img>
                        </Paper>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <a href="https://www.bajajfinserv.in/rbl-dbs-credit-cards" target="_blank" rel="noreferrer">
                        <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                            <img alt="bajaj" src="https://cms-assets.bajajfinserv.in/is/image/bajajfinance/credit-card-banner-4?scl=1&fmt=png-alpha" width={350} height={180}></img>
                        </Paper>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <a href="https://www.bajajfinserv.in/emi-network" target="_blank" rel="noreferrer">
                        <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                            <img alt="bajaj" src="https://cms-assets.bajajfinserv.in/is/image/bajajfinance/car-insurance-v1-5?scl=1&fmt=png-alpha" width={350} height={180}></img>
                        </Paper>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                        <img alt="bajaj" src="https://cms-assets.bajajfinserv.in/is/image/bajajfinance/mutual-fund-v1-1?scl=1&fmt=png-alpha" width={350} height={180}></img>
                    </Paper>
                </SplideSlide>


            </Splide>
        </div>
    )
}

export default Promotion