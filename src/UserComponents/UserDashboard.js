import React, { useEffect } from 'react'
import { Academics, AddToAcademics, Navbar, PushStudy, UserDataTable } from './SubComponents'
import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Simulate some asynchronous operation like an API call for inserting data
      // For the purpose of this example, we'll use setTimeout to simulate the delay
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <br />
      <center>
        <h1 className='' style={{ fontSize: '40px' }}>Dasboard</h1>
      </center>

      {/* Study Data Here */}
      {/* Template */}
      {/* Push Study */}
      {/* Add to academices */}
      {/* <AddToAcademics /> */}
      {/* <Academics /> */}
      {/* <PushStudy /> */}
      {/* Academics */}
      {/* <UserDataTable /> */}
    </>
  )
}

export default UserDashboard