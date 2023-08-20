import React from 'react'
import { CardSmall, TransitionBtoT,SubHeading } from '../../components'
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
    return (
        <div>
        <SubHeading>Coupons :)</SubHeading>
            {SuggestData?.map((item, idx) => (
                <TransitionBtoT key={idx}>
                    <CardSmall idx={idx + 1} name={item} type='Suggested'></CardSmall>
                </TransitionBtoT>
            ))}
        </div>
    )
}

export default Coupons