import React, { useEffect, useState } from 'react'

import CustomDataTable from './Components/DataComponent/CustomDataTable';

const ApiData = () => {
    const [data, setData] = useState([])

    
    useEffect(() => {
        // Fetch data from API using the access token
        const fetchData = async () => {
            //const apiUrl = 'https://busy-lime-bream-sock.cyclic.app/api/patients';
            const apiUrl = 'http://localhost:8000/api/data'
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

                    //console.log('Data after setting:', processedData);
                })
                .catch(error => {
                    console.error('API request error:', error.message);
                    // Handle error, display error messages, etc.
                });

        };

        fetchData();
    }, []);

    const Headercolumns = [
        {
            name: 'Patient Name',
            selector: row => row.PatientName,
            sortable: true,
            cell: row => <div className="table-plus datatable-nosort">{row.PatientName}</div>,
        },
        {
            name: 'Patient ID',
            selector: row => row.PatientId,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.Age,
            sortable: true,
        },
        {
            name: 'Sex',
            selector: row => row.Sex,
            sortable: true,
        },
        {
            name: 'Body Part',
            selector: row => row.BodyPartExamined,
            sortable: true,
        },
        {
            name: 'Mod.',
            selector: row => row.Modality,
            sortable: true,
        },
        {
            name: 'Center',
            selector: row => row.center,
            sortable: true,
        },
        {
            name: 'Scan Date/Time',
            selector: row => row.StudyDate,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Reported By',
            selector: row => row.PerformingPhysiciansName,
            sortable: true,
        },
        {
            name: 'Lock',
            selector: row => row.lock,
            sortable: true,
            cell: row => <div>🔐</div>
        },
        {
            name: 'Group',
            selector: row => row.group,
            sortable: true,
            cell: row => <div></div>
        },
        {
            name: 'Action (UnderDev)',
            selector: row => row.action,
            sortable: false,
            cell: row => <div className="datatable-nosort"><span className='text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 text-xs'>View/Download</span></div>,
        },
    ];

    const combinedData = data.map(item => ({
        ...item.patient,
        ...item.series,
        ...item.study,
    }));

    const modalityOptions = ['CT', 'MR', 'DT', 'All']; // Add any other modalities here
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchPatientName, setSearchPatientName] = useState('');
    const [searchPatientID, setSearchPatientID] = useState('');
    const [searchBodyPart, setSearchBodyPart] = useState('');

    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        setSelectedFilters((prevFilters) => {
            if (prevFilters.includes(checkboxValue)) {
                return prevFilters.filter((filter) => filter !== checkboxValue);
            } else {
                return [...prevFilters, checkboxValue];
            }
        });
    };
    // const handleSearch = (item) => {
    //     const nameMatch = item.PatientName.toLowerCase().includes(searchPatientName.toLowerCase());
    //     const idMatch = item.PatientId.includes(searchPatientID.toLocaleUpperCase());
    //     const bodyPartMatch = item.BodyPartExamined.toLowerCase().includes(searchBodyPart.toLowerCase());

    //     return nameMatch && idMatch && bodyPartMatch;
    // };
    const filteredModalityData = selectedFilters.length > 0
        ? combinedData.filter(item => selectedFilters.includes(item.Modality) || selectedFilters.includes('All'))
        : combinedData;

    //const filteredData = filteredModalityData.filter(handleSearch);

    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedCenter, setSelectedCenter] = useState('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleCenterChange = (event) => {
        setSelectedCenter(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSearch = (item) => {
        const nameMatch = item.PatientName.toLowerCase().includes(searchPatientName.toLowerCase());
        const idMatch = item.PatientId.includes(searchPatientID);
        const bodyPartMatch = item.BodyPartExamined.toLowerCase().includes(searchBodyPart.toLowerCase());
        const statusMatch = selectedStatus === 'All' || item.status === selectedStatus;
        const centerMatch = selectedCenter === 'All' || item.center === selectedCenter;
        const dateMatch = (!startDate || item.StudyDate >= startDate) && (!endDate || item.StudyDate <= endDate);

        return nameMatch && idMatch && bodyPartMatch && statusMatch && centerMatch && dateMatch;
    };

    const filteredData = filteredModalityData.filter(handleSearch);

    return (
        <>
            <div>ApiData</div>
            <section className="text-gray-600 body-font text-xs">
                <div className="container px-10 mx-auto mr-10">
                    {/* ... (Other search filter components) */}
                    <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 text-center py-24 border-gray-200 border-opacity-60">
                        <div className="grid grid-cols-2 gap-4">
                            {modalityOptions.map(modality => (
                                <label className="flex items-center" key={modality}>
                                    <input
                                        type="checkbox"
                                        className="mr-2 leading-tight"
                                        value={modality}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>{modality}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <input
                            type="text"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 transition-colors duration-200 ease-in-out"
                            placeholder="Search Patient Name"
                            value={searchPatientName}
                            onChange={(e) => setSearchPatientName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 transition-colors duration-200 ease-in-out mt-2"
                            placeholder="Search Patient ID"
                            value={searchPatientID}
                            onChange={(e) => setSearchPatientID(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 transition-colors duration-200 ease-in-out mt-2"
                            placeholder="Search Body Part"
                            value={searchBodyPart}
                            onChange={(e) => setSearchBodyPart(e.target.value)}
                        />
                    </div>
                </div>
                {/* ... (Other filter components) */}
                {/* Search Date  */}
                <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6  border-gray-200 border-opacity-60">
                    <div class="p-8">
                        <div class="grid grid-cols-2 gap-8">
                            <div class="mb-4">
                                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                                <select id="status" name="status" class="mt-1  block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleStatusChange}>
                                    <option value="All">All</option>
                                    <option value="completed">Singed Off</option>
                                    <option value="cancelled">Singed On</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label for="center" class="block text-sm font-medium text-gray-700">Center</label>
                                <select id="center" name="center" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleCenterChange}>
                                    <option value="center1">Center 1</option>
                                    <option value="center2">Center 2</option>
                                    <option value="center3">Center 3</option>
                                </select>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-8 mt-8 ">
                            <div class="mb-4">
                                <label for="startDate" class="block text-sm font-medium text-gray-700">Scan Start Date</label>
                                <input type="date" id="startDate" name="startDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleStartDateChange} />
                            </div>
                            <div class="mb-4">
                                <label for="endDate" class="block text-sm font-medium text-gray-700">Scan End Date</label>
                                <input type="date" id="endDate" name="endDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleEndDateChange} />
                            </div>
                        </div>
                    </div>

                </div>
            </section >
            <CustomDataTable tittleName={""} headers={Headercolumns} filterData={filteredData} filterControls={""} />
        </>
    )
}

export default ApiData


