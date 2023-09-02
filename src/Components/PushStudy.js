import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import CustomDataTable from './DataComponent/CustomDataTable'

const PushStudy = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const handleBack = () => {
        navigate('/user/dashboard')
    }
    const handlePusher = () => {
        alert("Under Development")
    }

    useEffect(() => {
        // Fetch data from API using the access token
        const fetchData = async () => {
            //const apiUrl = 'https://busy-lime-bream-sock.cyclic.app/api/patients';
            //const apiUrl = 'http://localhost:8000/api/data'
            const apiUrl = 'https://busy-lime-bream-sock.cyclic.app/api/data'
            const accessToken = localStorage.getItem('accessToken')

            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else if (response.status === 403) {
                        throw new Error('Access denied: Check authorization and permissions.');
                    } else if (response.status === 401) {
                        throw new Error('Unauthorized: Check credentials.');
                    } else {
                        throw new Error('Request failed: ' + response.statusText);
                    }
                })
                .then(result => {
                    //console.log(result[0])
                    const processedData = result.map(item => ({
                        patient: item.patient || {},
                        study: item.study || {},
                        series: item.series || {},
                        image: item.image || {},
                    }));

                    setData(processedData);
                    // console.log(processedData[0].series)
                })
                .catch(error => {
                    console.error('API request error:', error.message);
                    // Handle error, display error messages, etc.
                });

        };

        fetchData();
    }, []); 

    const combinedData = data.map(item => ({
        ...item.patient,
        ...item.series,
        ...item.study,
    }));


    const Headercolumns = [
        {
            name: 'Patient ID',
            selector: row => row.PatientId,
            sortable: true,
        }, {
            name: 'Patient Name',
            selector: row => row.PatientName,
            sortable: true,
            cell: row => <div className="table-plus datatable-nosort">{row.PatientName}</div>,
        },
        {
            name: 'Accession No',
            selector: row => row.AccessionNumber,
            sortable: true,
        },
        {
            name: 'Modality',
            selector: row => row.Modality,
            sortable: true,
        },

        {
            name: 'Scan Date/Time',
            cell: row => {
                const isoDateString = row.StudyDate;
                const date = new Date(isoDateString);
                const formattedDate = date.toLocaleString('default', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                });
                return <div className="table-plus datatable-nosort">{formattedDate}</div>;
            }
          
        }
    ];

    // const sampleData = [
    //     {
    //         patientName: 'John Doe',
    //         patientID: 'P12345',
    //         accession: 'A67890',
    //         modality: 'MRI',
    //         scanDateTime: '2023-08-16 10:30 AM',
    //     },
    //     {
    //         patientName: 'Jane Smith',
    //         patientID: 'P67890',
    //         accession: 'A12345',
    //         modality: 'CT',
    //         scanDateTime: '2023-08-15 03:15 PM',
    //     },
    //     // Add more sample data objects as needed
    // ];

    return (
        <>

            <div className="container mt-4 bg-white h-[80vh] px-5 py-10 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl rounded">
                <div className="flex justify-between items-center py-4">
                    <button className="" onClick={handleBack}>
                        <i className="bi bi-arrow-left"></i> <span className='text-lg'>⬅</span> Back
                    </button>
                    {/* <button class="text-black border-0 focus:outline-none py-1 px-8 hover:bg-indigo-600 hover:text-white rounded text-lg" onClick={handleBack}>⬅ Back</button> */}
                    <div className="flex space-x-4">
                        <label htmlFor="groupSelect" className="text-gray-700">
                            Select a Group:
                        </label>
                        <select
                            id="groupSelect"
                            className="bg-gray-200 border border-gray-300 rounded-full px-2 text-sm md:text-base text-gray-700"
                        >
                            <option value="Select a Group">Select...</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                        <button className="bg-blue-600 hover:bg-blue-800 text-white px-4  rounded-full transition-all duration-200"
                            onClick={handlePusher}>
                            Push
                        </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-600 px-4  rounded-full transition-all duration-200" >
                            Cancel
                        </button>
                    </div>
                </div>
                <CustomDataTable tittleName={"Push Study"} headers={Headercolumns} filterData={combinedData} />
            </div>


        </>
    )
}

export default PushStudy