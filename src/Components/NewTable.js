import React, { useEffect, useState } from 'react'
import CustomDataTable from './DataComponent/CustomDataTable';

const NewTable = () => {
    const [data, setData] = useState([])
    const [APIdata, setAPIdata] = useState([]);
    const [modOptions, setModOptions] = useState([]);
    const [selectedMods, setSelectedMods] = useState([]);
    const [patientName, setPatientName] = useState("");
    const [patientID, setPatientID] = useState("");
    const [bodyPart, setBodyPart] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedCenter, setSelectedCenter] = useState("");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [centerOptions, setCenterOptions] = useState([]);
    const [timeOptions, setTimeOptions] = useState([]);

    useEffect(() => {
        fetchAPI();
    }, []);


    const fetchAPI = async () => {
        try {
            //old api data fetch url
            //const responseAPI = await fetch("https://busy-lime-bream-sock.cyclic.app/api/data");
            //New schema data API
            const responseAPI = await fetch("https://busy-lime-bream-sock.cyclic.app/api/v2/getdata");
            const resJson = await responseAPI.json();
            const processedData = resJson.map(item => ({
                patient: item.patient || {},
                study: item.study || {},
                series: item.series || {},
                image: item.image || {},
            }));
            console.log(processedData)

            setAPIdata(processedData);
            setCenterOptions([...new Set(resJson.map(item => item.center))]);
            setTimeOptions(
                resJson.map(item => new Date(item.scanDateTime)).sort(
                    (a, b) => a - b
                )
            );
            setModOptions([...new Set(processedData.map(item => item.series.Modality))]);
            setSelectedMods([...new Set(resJson.map(item => item.series.Modality))]);
        } catch (err) {
            console.log("API Error Study: ", err);
        }
    };

    const handleModChange = (e) => {
        const option = e.target.value;
        if (option === "All") {
            setSelectedMods(modOptions);
        } else {
            setSelectedMods((prevSelected) =>
                prevSelected.includes(option)
                    ? prevSelected.filter((mod) => mod !== option)
                    : [...prevSelected, option]
            );
        }
    };

    const handleSelectAllMods = () => {
        if (selectedMods.length === modOptions.length) {
            setSelectedMods([]);
        } else {
            setSelectedMods(modOptions);
        }
    };

    const HeaderColumns = [
        {
            name: 'Patient ID',
            selector: row => row.PatientId,
        },
        {
            name: 'Patient Name',
            selector: row => row.PatientName,
            cell: row => <div className="table-plus datatable-nosort">{row.PatientName}</div>,
            sortable: true,
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
            name: 'Mod.',
            selector: row => row.Modality,
        },
        {
            name: 'Center',
            selector: row => row.Center,
        },
        {
            name: 'Scan Date/Time',
            selector: row => row.StudyDate,
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
        },
        // {
        //   name: 'Status',
        //   selector: row => row.Status,
        // },
        {
            name: 'Reported By',
            selector: row => row.PerformingPhysiciansName,
        },
        {
            name: 'Lock',
            selector: row => row.lock,
            cell: row => <div>🔐</div>
        },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: false,
            cell: row => <div className="datatable-nosort"><span className='text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 text-xs'>View/Download</span></div>,
        },
    ];

    const combinedData = APIdata.map(item => ({
        ...item.patient,
        ...item.series,
        ...item.study,
    }));


    return (<>
        <div>NewTable</div>
        <CustomDataTable tittleName={""} headers={HeaderColumns} filterData={combinedData} filterControls={""} onRowSelected={""} />
    </>
    )
}

export default NewTable