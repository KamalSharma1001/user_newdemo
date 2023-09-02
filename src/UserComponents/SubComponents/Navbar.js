import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };


  return (
    <>
      <header class="text-white body-font bg-green-700">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span class="ml-3 text-xl"></span>
          </a>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center ">
            <Link to='/user/dashboard' class="mr-5 hover:text-gray-900 hover:bg-white hover:rounded-lg">Dashboard</Link>
            <Link to='/user/dashboard/template' class="mr-5 hover:text-gray-900 hover:bg-white hover:rounded-lg">Template</Link>
            <Link to='/user/dashboard/pushstudy' class="mr-5 hover:text-gray-900 hover:bg-white hover:rounded-lg">Push Study</Link>
            <Link to='/user/dashboard/AddToAcademics' class="mr-5 hover:text-gray-900 hover:bg-white hover:rounded-lg">Add To Academics</Link>
            <Link to='/user/dashboard/Academics' class="mr-5 hover:text-gray-900 hover:bg-white hover:rounded-lg">Acadamics</Link>

            <button
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-black mt-4 md:mt-0"
              onClick={handleLogout}
            >
              Logout

            </button>
          </nav>

        </div>
      </header>
    </>
  )
}

export default Navbar