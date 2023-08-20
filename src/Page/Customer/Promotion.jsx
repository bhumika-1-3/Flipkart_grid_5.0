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
                            <img alt="bajaj" src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/faf94da1d0114e54b66daf7f0122aba5_9366/Graphic_Tee_Pink_IC6046_21_model.jpg" width={350} height={180}></img>
                        </Paper>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <a href="https://www.bajajfinserv.in/rbl-dbs-credit-cards" target="_blank" rel="noreferrer">
                        <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                            <img alt="bajaj" src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cc685791576a4273ad5eaed701484af6_9366/NMD_R1_Shoes_Red_GX9888_01_standard.jpg" width={350} height={180}></img>
                        </Paper>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <a href="https://www.bajajfinserv.in/rbl-dbs-credit-cards" target="_blank" rel="noreferrer">
                        <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                            <img alt="bajaj" src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/819a4a352e264f0c9a8aaf120142cc35_9366/AEROREADY_Training_Logo_Graphic_Short_Sleeve_Tee_White_H44740_23_hover_model.jpg" width={350} height={180}></img>
                        </Paper>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <a href="https://www.bajajfinserv.in/emi-network" target="_blank" rel="noreferrer">
                        <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                            <img alt="bajaj" src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e0b110f58bb54e77bb89ad470114fea0_9366/Face_Cover_-_Not_For_Medical_Use_Black_HC4698_012_hover_standard.jpg" width={350} height={180}></img>
                        </Paper>
                    </a>
                </SplideSlide>
                <SplideSlide>
                    <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                        <img alt="bajaj" src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4ddd69aebdd640d7b41eaedf01011da8_9366/Y-3_Classic_Puffy_Down_Hooded_Coat_Green_HS7455_23_hover_model.jpg" width={350} height={180}></img>
                    </Paper>
                </SplideSlide>


            </Splide>
        </div>
    )
}

export default Promotion