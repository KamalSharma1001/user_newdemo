import React, { useState } from 'react'
import Navbar from './Navbar'
import CustomDataTable from './DataComponent/CustomDataTable'
import { useEffect } from 'react'

const Profile = () => {
    return (
        <>
            <Navbar />
            <center className='container mx-auto w-1/2 mt-10 text-sm'>
                <ProfileComponents />
            </center>
        </>
    )
}
export default Profile


const ProfileComponents = () => {
    const userName = localStorage.getItem('email')
    const [fullName, setFullName] = useState(userName);
    const [email, setEmail] = useState(userName);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // You can define functions to handle changes in the input fields
    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value);
    };


    const fetchData = async () => {
        const apiUrl = '' //= `http://localhost:8000/userauth/all`;
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Access denied: Check authorization and permissions.');
                } else if (response.status === 401) {
                    throw new Error('Unauthorized: Check credentials.');
                } else {
                    throw new Error('Request failed: ' + response.statusText);
                }
            }

            const result = await response.json()
            console.log(result)

        } catch (error) {
            console.error('API request error:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div className="main-container">
            <div className="xs-pd-20-10 pd-ltr-20">
                <div className="page-header">
                    <div className="col-md-6 col-sm-12">
                        <div className="row gap-4">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="flex flex-col items-center justify-center">
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                alt="Admin"
                                                className="rounded-circle w-20"
                                            />
                                            <div className="mt-3">
                                                <h4>{userName.toLocaleUpperCase()}</h4>
                                                <p className="text-secondary mb-1"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                            <div className="col-span-1">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-span-2 text-secondary">
                                                <input
                                                    type="text"
                                                    className="form-input w-full pl-2 rounded"
                                                    value={fullName}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                            <div className="col-span-1">
                                                <h6 className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-span-2 text-secondary">
                                                <input
                                                    type="text"
                                                    className="form-input w-full pl-2 rounded"
                                                    value={email}
                                                />
                                            </div>
                                        </div>

                                        <p className='text-red-900 font-bold ml-8 underline'> <span className=''>**</span>Under Development (for access purpose)</p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 mt-2">
                                            <div className="col-span-1">
                                                <h6 className="mb-0">Change Password</h6>
                                            </div>
                                            <div className="col-span-2 text-secondary">
                                                <input
                                                    type="password"
                                                    className="form-input w-full p-2 rounded"
                                                    placeholder="Current Password"
                                                    value={currentPassword}
                                                    onChange={handleCurrentPasswordChange}
                                                    disabled
                                                />
                                                <input
                                                    type="password"
                                                    className="form-input w-full mt-2 p-2 rounded"
                                                    placeholder="New Password"
                                                    value={newPassword}
                                                    onChange={handleNewPasswordChange}
                                                    disabled
                                                />
                                                <input
                                                    type="password"
                                                    className="form-input w-full mt-2 p-2 rounded"
                                                    placeholder="Confirm New Password "
                                                    value={confirmNewPassword}
                                                    onChange={handleConfirmNewPasswordChange}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <input
                                                type="button"
                                                className="inline-flex text-white bg-indigo-500 border-0 mt-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-sm "
                                                value="Save Changes"
                                                onClick={() => { alert("Save Changes") }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}