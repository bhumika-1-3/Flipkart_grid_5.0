import React from 'react'
import { Typography } from '@mui/material'
import UserDashboardData from './UserDashboardData'
import SalesAnalytics from './SalesAnalytics'

const Analysis = () => {
    return (
        <div>  <Typography variant="h5">Account Details</Typography>
            <UserDashboardData />
            {/* <ProductSales /> */}
            <SalesAnalytics /></div>
    )
}

export default Analysis