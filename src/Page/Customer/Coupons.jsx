import React, { useEffect } from 'react'
import { CardSmall, TransitionBtoT, SubHeading } from '../../components'
import backendURL from '../../BackendURL';
const SuggestData = [
    {
        "jeans_and_pants_offers": [
            {
                "coupon_code": "BOGO50",
                "percentage_offer": "50%",
                "reason": "Buy One, Get One 50% Off"
            },
            {
                "coupon_code": "FREESHIP50",
                "percentage_offer": "100%",
                "reason": "Free Shipping on Orders Over $50"
            },
            {
                "coupon_code": "STUDENT15",
                "percentage_offer": "15%",
                "reason": "Student Discount"
            },
            {
                "coupon_code": "SEASONAL20",
                "percentage_offer": "20%",
                "reason": "Seasonal Sale"
            },
            {
                "coupon_code": "SOCIAL10",
                "percentage_offer": "10%",
                "reason": "Social Media Promotion"
            },
            {
                "coupon_code": "SUMMER20",
                "percentage_offer": "20%",
                "reason": "Summer Sale"
            },
            {
                "coupon_code": "FALL25",
                "percentage_offer": "25%",
                "reason": "Fall Sale"
            },
            {
                "coupon_code": "WINTER30",
                "percentage_offer": "30%",
                "reason": "Winter Sale"
            }
        ],
        "food_ecommerce_offers": [
            {
                "coupon_code": "NEW10",
                "percentage_offer": "10%",
                "reason": "New Customer Discount"
            },
            {
                "coupon_code": "FREEGIFT",
                "percentage_offer": "100%",
                "reason": "Free Gift with Purchase"
            },
            {
                "coupon_code": "BUNDLE20",
                "percentage_offer": "20%",
                "reason": "Bundle Deal"
            },
            {
                "coupon_code": "REFERRAL15",
                "percentage_offer": "15%",
                "reason": "Referral Program"
            },
            {
                "coupon_code": "FLASHSALE25",
                "percentage_offer": "25%",
                "reason": "Limited-Time Sale"
            },
            {
                "coupon_code": "SPOOKY20",
                "percentage_offer": "20%",
                "reason": "Halloween Sale"
            },
            {
                "coupon_code": "GIVETHANKS15",
                "percentage_offer": "15%",
                "reason": "Thanksgiving Sale"
            },
            {
                "coupon_code": "JOLLY25",
                "percentage_offer": "25%",
                "reason": "Christmas Sale"
            },
            {
                "coupon_code": "CHEERS20",
                "percentage_offer": "20%",
                "reason": "New Year's Sale"
            },
            {
                "coupon_code": "LOVE10",
                "percentage_offer": "10%",
                "reason": "Valentine's Day Sale"
            },
            {
                "coupon_code": "SPRING15",
                "percentage_offer": "15%",
                "reason": "Spring Sale"
            },
            {
                "coupon_code": "EASTER20",
                "percentage_offer": "20%",
                "reason": "Easter Sale"
            }
        ]
    }
]
const Coupons = () => {

    const [data, setData] = React.useState(null);

    useEffect(() => {
        const axios = require('axios');
        const token = localStorage.getItem('token');
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${backendURL}products/redeem-coupon/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div>
            <SubHeading>Coupons</SubHeading>
            {
                (data == null || data?.length == 0)  && <div className="text-center">No Coupons Available</div>
            }
            {data?.map((item, idx) => (
                <TransitionBtoT key={idx}>
                    <CardSmall props={item}></CardSmall>
                </TransitionBtoT>
            ))}
        </div>
    )
}

export default Coupons