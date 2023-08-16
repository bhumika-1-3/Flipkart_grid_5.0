import React from 'react'
import { AttendanceTable } from '../../components'
import Groups from '../../views/Dashboard/Organization/Groups'
import { toast } from 'react-toastify';

const Products = () => {

    const firstime = localStorage.getItem("firstime");
    if(firstime == 1){
        toast("You have earned 10 supercoins for logging in today!");
        localStorage.setItem("firstime", 0);
    }
    return (
        <div><Groups/></div>
    )
}

export default Products