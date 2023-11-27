import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomDataTable from './DataComponent/CustomDataTable'
import JSZip from 'jszip'

const StudiesPart = () => {
    return (
        <>
            {/* Filter and data Table in the Component are bind */}
            <FilterPart />
        </>
    )
}
export default StudiesPart

const FilterPart = () => {
    const [data, setData] = useState([])
    const [ID, setID] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchAPI();
    }, []);

    const fetchAPI = async () => {
        try {
            const responseAPI = await fetch("https://busy-lime-bream-sock.cyclic.app/api/v2/getdata");
            const resJson = await responseAPI.json();
            const processedData = resJson.map(item => ({
                patient: item.patient || {},
                study: item.study || {},
                series: item.series || {},
                image: item.image || {},
                id: setID(item._id)
            }));
            ///console.log(processedData)
            setData(processedData);

        } catch (err) {
            console.log("API Error Study: ", err);
        }
    };

    const [studiesOpen, setStudiesOpen] = useState(false);
    const [selectedStudies, setSelectedStudies] = useState([]);

    const handleLock = () => {
        if (arePatientsSelected()) {
            // Toggle the studiesOpen state when the button is clicked
            setStudiesOpen(!studiesOpen);

            // Update the 'locked' property for selected studies based on the studiesOpen state
            const updatedData = data.map(study => {
                if (selectedStudies.includes(study.id)) {
                    return {
                        ...study,
                        locked: studiesOpen,
                    };
                }
                return study;
            });
            // Update your data with the modified 'locked' property
            setData(updatedData);
            // Open the new window
            //const newWindow = window.open('/viewerOpenHoga', '_blank', 'width=760,height=760');
            let studyDataID;
            combinedData.forEach(item => {
                studyDataID = item.StudyInstanceUid
            })
            //window.open(`http://localhost:3001/sampleview.html?studyId=` + studyDataID, '_blank', 'width=1500,height=760');
            const newWindow = window.open(`https://viwer-study-main.vercel.app/index.html?studyId=` + studyDataID, '_blank', 'width=1500,height=760');

            // Check if the new window is closed and reload the page
            const checkClosed = () => {
                if (newWindow && newWindow.closed) {
                    window.location.reload();
                } else {
                    setTimeout(checkClosed, 1000); // Check every second
                }
            };
            checkClosed();
        } else {
            alert("Please select one or more patients."); // Updated message to reflect patients
        }
    };

    const Headercolumns = [
        {
            name: 'Select the ID',
            cell: row => <input type="checkbox" name="" id="" onChange={() => handleRowSelection(row)} />,
        },
        {
            name: 'Patient Name',
            selector: row => row.PatientName,
            cell: row => <div className="table-plus datatable-nosort" onClick={handleLock}><u className='' style={{ cursor: 'pointer ' }}>
                <button onClick={handleTotalStudy}>➕</button>{row.PatientName}</u></div>,
            sortable: true,
        },
        {
            name: 'Patient ID',
            selector: row =>
                <div>
                    {row.PatientId},
                </div>
        },

        {
            name: 'Age',
            selector: row => row.Age,
        },
        {
            name: 'Sex',
            selector: row => row.Sex,
        },
        {
            name: 'Body Part',
            selector: row => row.BodyPartExamined,

        },
        {
            name: 'Modality.',
            selector: row => row.Modality,

        },
        {
            name: 'Center',
            selector: row => (!row.center ? 'NA' : row.center),

        },
        {
            name: 'Scan Date',
            selector: row => row.StudyDate,
            cell: row => {
                // const isoDateString = row.StudyDate;
                // const date = new Date(isoDateString);
                // const formattedDate = date.toLocaleString('default', {
                //     year: 'numeric',
                //     month: 'short',
                //     day: 'numeric',
                //     hour: 'numeric',
                //     minute: 'numeric'
                // });
                const isoDateString = row.StudyDate;
                const date = new Date(isoDateString);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const hour = date.getHours();
                const minute = date.getMinutes();
                const formattedDate = `${day}-${month < 10 ? '0' : ''}${month}-${year}, ${hour}:${minute}`;
                return <div className="table-plus datatable-nosort">{formattedDate}</div>;
            }
        },
        // {
        //     name: 'Status',
        //     selector: row => row.status,

        // },
        {
            name: 'Reported By',
            selector: row => row.PatientId,

        },
        {
            name: 'Actions',
            selector: row => row.action,
            sortable: false,
            cell: row => <div className="datatable-nosort"><span className='text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 text-xs'>
                {/* <button onClick={handleViewData}>View</button> */}
                <button onClick={handleLock}>View</button>

                <button onClick={handleDownloadData}>/Download</button>
            </span>
            </div>,
        },

        {
            name: 'Reports',
            //selector: row => row.group,
            cell: row => <div>
                <button onClick={handleReportsPatient}>📜</button>
            </div>
        },

        {
            name: 'Lock',
            selector: row => row.lock,
            cell: row => (
                <div>
                    {studiesOpen ? '🔒 Lock' : '🔓 Unlock'}
                </div>
            ),
        },
    ];
    const combinedData = data.map(item => ({
        ...item.patient,
        ...item.series,
        ...item.study,
        ...item.image
    }));

    const handleViewData = () => {
        let studyDataID;
        combinedData.forEach(item => {
            studyDataID = item.StudyInstanceUid
        })
        //window.open(`http://localhost:3001/sampleview.html?studyId=` + studyDataID, '_blank', 'width=1500,height=760');
        window.open(`https://viwer-study-main.vercel.app/index.html?studyId=` + studyDataID, '_blank', 'width=1500,height=760');
    }
    const handleDownloadData = async () => {
        alert("Please wait, Downloding start shortly...")
    };

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

    const [selectedPatients, setSelectedPatients] = useState([]);

    const handleRowSelection = (selectedRow) => {
        setSelectedPatients(prevSelectedPatients => {
            if (prevSelectedPatients.some(patient => patient.id === selectedRow.id)) {
                return prevSelectedPatients.filter(patient => patient.id !== selectedRow.id);
            } else {
                return [...prevSelectedPatients, selectedRow];
            }
        });
    };

    const history = useNavigate();

    const arePatientsSelected = () => {
        return selectedPatients.length > 0;
    };

    const handleZVPF = () => {
        if (arePatientsSelected()) {
            const selectedIds = selectedPatients.map(patient => patient);
            const queryString = selectedIds.map(id => `${id.StudyID}`).join('&');
            //history(`/user/dashboard/zvpf/${queryString}`);
            window.open(`/user/dashboard/zvpf/${queryString}`, '_blank', 'width=760,height=760');
        } else {
            alert("Please select one or more studies.");
        }
    }

    const handlePushStudyWindow = () => {
        if (arePatientsSelected()) {
            navigate("/user/dashboard/pushstudy")
        }
        else {
            alert("Please select one or more studies.")

        }
    }
    const handleAddToAcadmics = () => {
        if (arePatientsSelected()) {
            navigate("/user/dashboard/addtoacadmics")
        }
        else {
            alert("Please select one or more studies.")
        }
    }

    // **************************** Total Study ****************************
    let totalStudyWindow;

    const handleTotalStudy = () => {
        if (arePatientsSelected()) {
            const width = 650;
            const height = 400;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;

            const selectedIds = selectedPatients.map(patient => patient);

            const queryString = selectedIds.map(id => `${id.StudyID}`).join('&');
            // Open the new window and store its reference
            // Set the title of the new tab
            totalStudyWindow = window.open(`/user/totalstudies/${queryString}`, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
            totalStudyWindow.document.title = 'Your New Tab Title';


            totalStudyWindow.addEventListener('blur', () => {
                setTimeout(() => {
                    if (totalStudyWindow) {
                        totalStudyWindow.close();
                    }
                }, 60000); // 1 minute = 60,000 milliseconds
            });
            totalStudyWindow.document.title = 'Hey';
        }
        else {
            alert("Please select one or more studies.");
        }

    };

    // **************************** Reports open ****************************

    const handleReportsPatient = () => {
        if (arePatientsSelected()) {
            const width = 1000;
            const height = 600;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;

            const selectedIds = selectedPatients.map(patient => patient);
            const queryString = selectedIds.map(id => `${id.StudyID}`).join('&');
            // Open the new window and store its reference
            totalStudyWindow = window.open(`/user/reports/${queryString}`, '_blank', `width=${width},height=${height},left=${left},top=${top}`);

            totalStudyWindow.addEventListener('blur', () => {
                setTimeout(() => {
                    if (totalStudyWindow) {
                        totalStudyWindow.close();
                    }
                }, 600000); // 1 minute = 60,000 milliseconds
            });
        }
        else {
            alert("Please select one or more studies.");
        }
    }

    return (
        <>
            
            <section class="text-gray-600 body-font ">
                <div class="container mx-auto ml-10">
                    <div class="flex flex-wrap">
                        {/* ... (Other search filter components) */}
                        <div className="xl:w-1/6 lg:w-1/2 md:w-100 text-center py-24 border-gray-200 border-opacity-60">
                            <div className="grid grid-cols-2 gap-2">
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

                        {/* Patients */}
                        <div class="xl:w-1/5 lg:w-1/2 md:w-full py-6  border-gray-200 border-opacity-60">
                            <div>
                                <div className="row ml-5 mt-2">
                                    <div className="mr-2">
                                        <label htmlFor="patientName" className="form-label">Patient Name: </label>
                                        <input
                                            type="text"
                                            class="mt-1 py-2 px-2 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            id="patientName"
                                            placeholder="Enter patient's name"
                                            style={{ fontSize: "14px" }}
                                            value={searchPatientName}
                                            onChange={(e) => setSearchPatientName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mr-2">
                                        <label htmlFor="patientID" className="form-label" style={{ fontSize: "14px" }}>Patient ID:</label>
                                        <input
                                            type="text"
                                            class="mt-1 py-2 px-2 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            id="patientID"
                                            placeholder="Enter patient's ID"
                                            style={{ fontSize: "14px" }}
                                            value={searchPatientID}
                                            onChange={(e) => setSearchPatientID(e.target.value)}
                                        />
                                    </div>
                                    <div className="mr-2">
                                        <label htmlFor="bodyPart" className="form-label" style={{ fontSize: "14px" }}>Body Part:</label>
                                        <input
                                            type="text"
                                            class="mt-1 py-2 px-2 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            id="bodyPart"
                                            placeholder="Enter affected body part"
                                            style={{ fontSize: "14px" }}
                                            value={searchBodyPart}
                                            onChange={(e) => setSearchBodyPart(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Serach  button */}
                        <div class="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-[70px]  border-gray-200 border-opacity-60 mt-10">
                            <div className="row d-flex justify-content-center ">
                                <button type="button" class="text-white bg-blue-600  border-0 px-6 py-2 focus:outline-none hover:bg-blue-700 rounded-2xl text-lg">Search</button>
                                <button
                                    type="button"
                                    class=" ml-2 text-white bg-slate-300 border-0  px-6 py-2 focus:outline-none hover:bg-blue-600 rounded-xl text-lg"
                                    onClick={() => {
                                        setSearchPatientName('');
                                        setSearchPatientID('');
                                        setSearchBodyPart('');
                                        setSelectedStatus('All');
                                        setSelectedCenter('All');
                                        setStartDate('');
                                        setEndDate('');
                                    }}
                                >
                                    Clear Search
                                </button>
                            </div>
                        </div>

                        {/* Search Date  */}
                        <div class="xl:w-1/3 lg:w-1/2 md:w-full py-6  border-gray-200 border-opacity-60">
                            <div class="py-8 px-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="mb-4">
                                        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                                        <select id="status" name="status" class="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleStatusChange}>
                                            <option value="All">All</option>
                                            <option value="completed">Singed Off</option>
                                            <option value="cancelled">Singed On</option>
                                        </select>
                                    </div>

                                    <div class="mb-4">
                                        <label for="center" class="block text-sm font-medium text-gray-700">Center</label>
                                        <select id="center" name="center" class="mt-1 py-2 block  w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleCenterChange}>
                                            <option value="center1">Center 1</option>
                                            <option value="center2">Center 2</option>
                                            <option value="center3">Center 3</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="grid grid-cols-2 gap-8  ">
                                    <div class="mb-4">
                                        <label for="startDate" class="block text-sm font-medium text-gray-700">Scan Start Date</label>
                                        <input type="date" id="startDate" name="startDate" class="mt-1 py-2 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleStartDateChange} />
                                    </div>
                                    <div class="mb-4">
                                        <label for="endDate" class="block text-sm font-medium text-gray-700">Scan End Date</label>
                                        <input type="date" id="endDate" name="endDate" class="mt-1 py-2 px-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={handleEndDateChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Load study Buttons */}
            {/* <LoadStudyBtns /> */}

            <section class="text-gray-600 body-font text-xs">
                <div class="px-10 mx-auto flex items-center md:flex-row flex-col">
                    <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
                        <h1 class="md:text-3xl text-2xl font-medium title-font text-gray-900">Reports 📜</h1>
                    </div>
                    <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
                        <div className="flex justify-center space-x-4">
                            <button
                                className="bg-slate-400 hover:bg-blue-600 py-3 w-100 text-white font-semibold  px-4 rounded-full"
                                //onClick={() => alert("Please select one or more studies.")}
                                onClick={handleLock}
                                style={{ fontSize: "14px" }}
                            >
                                {/* <Link to='/viewerOpenHoga'> */}
                                Load Studies
                                {/*  </Link> */}
                            </button>
                            <button
                                className="bg-slate-400 hover:bg-blue-600 text-white font-semibold px-4 rounded-full"
                                onClick={handleZVPF}
                                style={{ fontSize: "14px" }}
                            >
                                ZVPF Load Studies
                            </button>

                            <button
                                className="bg-slate-400 hover:bg-blue-600 text-white font-semibold  px-4 rounded-full"
                                onClick={handlePushStudyWindow}
                                style={{ fontSize: "14px" }}
                            >
                                {/* <Link to='/user/dashboard/pushstudy'> */}
                                Push Study
                                {/* </Link> */}

                            </button>
                            <button
                                className="bg-slate-400 hover:bg-blue-600 text-white font-semibold  px-4 rounded-full"
                                onClick={handleAddToAcadmics}
                                style={{ fontSize: "14px" }}
                            >
                                {/* <Link to='/user/dashboard/addtoacadmics'> */}
                                {/* /teachingreference?studyInstanceUID=1.2.840.113619.2.354.3.2831209226.627.1692935261.973 */}
                                Add to Acadmics
                                {/* </Link> */}

                            </button>


                            {/* {buttonData.map((label, index) => (
                            <button
                                key={index}
                                className="bg-slate-400 hover:bg-blue-600 text-white font-semibold  px-4 rounded-full"
                            >
                                <Link to={/user/dashboard/${label.replace(/ /g, '').toLowerCase()}}>
                                    {label}
                                </Link>


                            </button>
                        ))} */}
                            <label htmlFor="groupSelect" className="text-gray-700 py-3" style={{ fontSize: "14px", fontWeight: "bold" }}>
                                Select a Group:
                            </label>
                            <select
                                id="groupSelect"
                                className="bg-gray-200 border border-gray-300 rounded-xl px-8 py-1 text-sm text-gray-700"

                            >
                                <option value="Select a Group">
                                    Select...
                                </option>
                                {/* <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option> */}
                            </select>

                            <button
                                className="bg-blue-600 hover:bg-blue-900 text-white font-semibold  px-8 rounded-2xl" style={{ fontSize: "14px" }}
                            >
                                Assign
                            </button>
                        </div>
                    </div>
                </div>
            </section>

           

            <CustomDataTable tittleName={""} headers={Headercolumns} filterData={filteredData} filterControls={filterControls} onRowSelected={handleRowSelection} />
        </>
    )
}

const filterControls = (
    <section className="text-gray-600 body-font text-xs">
        <div className="dropdown">
            <a
                className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
            >
                <i className="dw dw-more"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                <a className="dropdown-item" href="#">
                    <i className="dw dw-eye"></i> View /
                </a>
                <a className="dropdown-item" href="#">
                    <i className="icon-copy bi bi-download"></i> Download
                </a>
            </div>
        </div>
    </section>
);

// const LoadStudyBtns = () => {
//     // const buttonData = [
//     //     "Load Studies", "ZVPF Load Studies", "Push Study", "Add to Acadmics"
//     // ]

//     return (

//         <section class="text-gray-600 body-font text-xs">
//             <div class="px-10 mx-auto flex items-center md:flex-row flex-col">
//                 <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
//                     <h1 class="md:text-3xl text-2xl font-medium title-font text-gray-900">Reports 📜</h1>
//                 </div>
//                 <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
//                     <div className="flex justify-center space-x-4">
//                         <button
//                             className="bg-slate-400 hover:bg-blue-600 text-white font-semibold  px-4 rounded-full"
//                             onClick={() => alert("Please select one or more studies.")}
//                         >
//                             <Link to='/viewerOpenHoga'>
//                                 Load Studies
//                             </Link>
//                         </button>
//                         <button
//                             className="bg-slate-400 hover:bg-blue-600 text-white font-semibold px-4 rounded-full"

//                         >
//                             <span

//                                 style={{ cursor: 'pointer' }}
//                             >
//                                 ZVPF Load Studies
//                             </span>
//                         </button>
//                         <button
//                             className="bg-slate-400 hover:bg-blue-600 text-white font-semibold  px-4 rounded-full"
//                             onClick={() => alert("Please select one or more studies.")}
//                         >
//                             <Link to='/user/dashboard/pushstudy'>
//                                 Push Study
//                             </Link>

//                         </button>
//                         <button
//                             className="bg-slate-400 hover:bg-blue-600 text-white font-semibold  px-4 rounded-full"
//                             onClick={() => alert("Please select one or more studies.")}
//                         >
//                             <Link to='/'>
//                                 {/* /teachingreference?studyInstanceUID=1.2.840.113619.2.354.3.2831209226.627.1692935261.973 */}
//                                 Add to Acadmics
//                             </Link>

//                         </button>


//                         {/* {buttonData.map((label, index) => (
//                             <button
//                                 key={index}
//                                 className="bg-slate-400 hover:bg-blue-600 text-white font-semibold  px-4 rounded-full"
//                             >
//                                 <Link to={`/user/dashboard/${label.replace(/ /g, '').toLowerCase()}`}>
//                                     {label}
//                                 </Link>


//                             </button>
//                         ))} */}
//                         <label htmlFor="groupSelect" className="text-gray-700">
//                             Select a Group:
//                         </label>
//                         <select
//                             id="groupSelect"
//                             className="bg-gray-200 border border-gray-300 rounded-full px-2 text-sm text-gray-700"
//                         >
//                             <option value="Select a Group">
//                                 Select...
//                             </option>
//                             <option value="option1">Option 1</option>
//                             <option value="option2">Option 2</option>
//                             <option value="option3">Option 3</option>
//                         </select>

//                         <button
//                             className="bg-blue-600 hover:bg-blue-900 text-white font-semibold  px-4 rounded"
//                         >
//                             Assign
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>





//     )
// }

