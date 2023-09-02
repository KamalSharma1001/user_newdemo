import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomDataTable from './DataComponent/CustomDataTable'


const AddToAcademics = () => {
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
                    //console.log('Result array:', result);  // Log the result array before setting the data
                    const processedData = result.map(item => ({
                        patient: item.patient || {},
                        study: item.study || {},
                        series: item.series || {},
                        image: item.image || {},
                    }));

                    setData(processedData);
                    //console.log('Data after setting:', processedData[0]);
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
            name: 'Patient Name',
            selector: row => row.PatientName,
            sortable: true,
            cell: row => <div className="table-plus datatable-nosort">{row.PatientName}</div>,
        },
        {
            name: 'MRN',
            selector: row => row.mrn,
            sortable: true,
        },
        {
            name: 'Sex',
            selector: row => row.Sex,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.Age,
            sortable: true,
        }, {
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
            name: "Body Part",
            selector: row => row.BodyPartExamined,
            sortable: true,
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
        <div className="container mt-4 bg-white h-auto px-5 py-10 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl rounded">
            <div className="flex justify-between items-center py-4">
                <button className="text-gray-600 hover:text-gray-800" onClick={handleBack}>
                    <i className="bi bi-arrow-left"></i> <span className='text-lg'>⬅</span>   Assign to teaching Folder
                </button>
            </div>
            <CustomDataTable tittleName={""} headers={Headercolumns} filterData={combinedData} />
            <section class="text-gray-600 body-font">
                <div class="container px-5 py-2 mx-auto">
                    <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                        <div class="p-2 py-5 sm:w-1/2 w-full">
                            <label for="full-name" class="leading-7 text-sm  text-gray-600">Root Folder</label>
                            <select
                                id="full-name"
                                name="full-name"
                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            >
                                <option>Select folder</option>
                            </select>
                        </div>
                        <div class="p-2 sm:w-1/2 w-full">
                            <div class="relative flex-grow w-full ">
                                <textarea
                                    id="comment"
                                    name="Comment"
                                    class="w-full mt-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Write comment here'
                                ></textarea>
                                <button class="text-white bg-indigo-500 border-0 py-1 px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm">Push</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <section class="text-gray-600 body-font">
                <div class="container  mx-auto flex flex-wrap">
                    <div class="w-full sm:p-4 px-4 ">
                        <h1 class="title-font font-medium text-xl text-gray-900">Assigned Folder List</h1>
                    </div>
                    <div class="text-gray-600 body-font">
                        <div class="container mx-auto">
                            <div class="flex justify-center">
                                <table class="ml-4 min-w-max w-full table-auto">
                                    <thead>
                                        <tr class="bg-indigo-500 border-0 text-white text-sm leading-normal">
                                            <th class="py-1 px-6 text-left">S.No.</th>
                                            <th class="py-1 px-6 text-left">Folder List</th>
                                            <div className='stripe bg-black' />
                                        </tr>
                                    </thead>
                                    <tbody class="text-gray-600 text-sm font-light">
                                        <tr class="bg-gray-100 text-gray-600 text-sm">
                                            <td class="px-6 text-center">1</td>
                                            <td class="px-6 text-center">C:</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </div >

    )
}

export default AddToAcademics