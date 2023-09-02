import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CustomDataTable from './Components/DataComponent/CustomDataTable';

const ZVPDF = () => {
    const { id } = useParams();
    const [data, setData] = useState([])

    const fetchData = async () => {
        //const apiUrl = `http://localhost:8000/api/data/${id}`;
        const apiUrl = `https://busy-lime-bream-sock.cyclic.app/api/data/${id}`;
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
            //console.log(result)
            const processedData = {
                patient: result.patient || {},
                study: result.study || {},
                series: result.series || {},
                image: result.image || {},
            };
            //console.log("Processed Data:", processedData);
            setData([processedData]);

        } catch (error) {
            console.error('API request error:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const combinedData = data.map(item => ({
        ...item.patient,
        ...item.series,
        ...item.study,
    }));

    //console.log(combinedData)

    const Headercolumns = [
        {
            name: 'Patient Id',
            //selector: row => row.Id,
            cell: row => <div className="table-plus datatable-nosort">{row.id}</div>,
            //sortable: true,
        },
        {
            name: 'Patient Name',
            //selector: row => row.PatientName,
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
            name: 'Modality.',
            selector: row => row.Modality,

        }
    ];


    return (
        <>
            {/* <div>
            <h1>Combined Data</h1>
            <div>
                <p><strong>Patient Data:</strong></p>
                <p>Patient Name: {combinedData.PatientName}</p>
                <p>Age: {combinedData.Age}</p>
            </div>
            <div>
                <p><strong>Study Data:</strong></p>
                <p>Study Date: {combinedData.StudyDate}</p>
                <p>Study Description: {combinedData.StudyDescription}</p>
            </div>
            <div>
                <p><strong>Series Data:</strong></p>
                <p>Series Description: {combinedData.SeriesDescription}</p>
                <p>Modality: {combinedData.Modality}</p>
            </div>
        </div> */}
            <CustomDataTable filterData={combinedData} headers={Headercolumns} tittleName={""} filterControls={""} onRowSelected={""} />
        </>
    );

}

export default ZVPDF