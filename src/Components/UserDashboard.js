import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import StudiesPart from './StudiesPart';



const UserDashboard = () => {
    const navigate = useNavigate()

    // Check if the user is logged in by checking localStorage
    const isUserLoggedIn = !!localStorage.getItem('accessToken');
    console.log(localStorage.getItem(""))

    // If user is not logged in, redirect to the login page
    if (!isUserLoggedIn) {
        return navigate("/user/login");
    }

    // If user is logged in, show the dashboard
    return (
        <>
            <Navbar />
            <StudiesPart />
        </>
    )
}

export default UserDashboard