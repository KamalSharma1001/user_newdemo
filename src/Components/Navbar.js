import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('email')
    console.log(user)

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('accessToken');

        // Navigate to the login page
        navigate('/user/login');
    };

    return (
        <div>
            <header class="text-gray-600 body-font  bg-blue-600 text-white">
                <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-white justify-center">
                        <Link class="mr-5 hover:text-grey-900" to='/user/dashboard'>Dashboard</Link>
                        <Link class="mr-5 hover:text-grey-900" to='/user/dashboard/template'>Templates</Link>
                        <Link class="mr-5 hover:text-grey-900" to='/user/dashboard/academics'>Academics</Link>
                        <Link class="mr-5 hover:text-grey-900" to='/user/dashboard/profile'>Profile</Link>

                    </nav>
                    <div className='text-white mr-4'>
                        {user} <span className='m-1'>✔ </span>
                    </div>
                    <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-black mt-4 md:mt-0" onClick={handleLogout} >LogOut
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </header>
        </div>
    )
}

export default Navbar