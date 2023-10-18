import React, { useEffect } from 'react'
import { useState } from 'react'
import DataTable from 'react-data-table-component'
import { useParams } from 'react-router-dom'

const TotalStudyData = () => {
    const { id } = useParams()

    const [data, setData] = useState({
        result: "",
        seriesList: ""
    });

    const [studyId, setStudyId] = useState('')
    const fetchData = async () => {
        //const apiUrl = `http://localhost:8000/api/data/${id}`;
        const apiUrl = `https://busy-lime-bream-sock.cyclic.app/api/v2/getstudydata?studyId=4009`;
        //https://busy-lime-bream-sock.cyclic.app/api/v2/getstudydata?studyId=4009
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
            const result = await response.json();
            //setData(result.seriesList);
            setData({
                result: result,
                seriesList: result.seriesList
            });
            setStudyId(result.studyInstanceUID)

        } catch (error) {
            console.error('API request error:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const Headercolumns = [

        {
            name: 'Seies No.',
            //selector: row => row.PatientName,
            //cell: row => <div className="table-plus datatable-nosort">{row.PatientName}</div>,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Body Part',
            selector: row => row.body,
        },
        {
            name: 'Images',
            selector: row => row.Images,

        },
        {
            name: 'View.',
            selector: row => row.View,

        }
    ];

    const handleView = () => {
        const newWindow = window.open(`https://viwer-study-main.vercel.app/index.html?studyId=` + studyId, '_blank', 'width=1500,height=760');

        // Check if the new window is closed and reload the page
        const checkClosed = () => {
            if (newWindow && newWindow.closed) {
                window.location.reload();
            } else {
                setTimeout(checkClosed, 1000); // Check every second
            }
        };
        checkClosed();
    }


    return (
        <div className='container mx-auto mt-10 text-black'>
            <table style={{ borderCollapse: 'collapse', width: '100%',textAlign:'center' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Series No</th>
                        <th style={tableHeaderStyle}>Description</th>
                        <th style={tableHeaderStyle}>Body Part</th>
                        <th style={tableHeaderStyle}>Images</th>
                        <th style={tableHeaderStyle}>View</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data.seriesList) ? (
                        data.seriesList.map((series, index) => (
                            <tr key={index} style={tableRowStyle}>
                                <td style={tableCellStyle}>{series.seriesNumber}</td>
                                <td style={tableCellStyle}>{series.seriesDescription}</td>
                                <td style={tableCellStyle}>{data.result.studyDescription}</td>
                                <td style={tableCellStyle}>{series.instanceList.length}</td>
                                <td style={tableCellStyle}>
                                    <a target="_blank" style={linkStyle} onClick={handleView}>
                                        View
                                    </a>

                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Loading...</td>
                        </tr>
                    )}
                </tbody>


            </table>
        </div>
    )
}
const tableHeaderStyle = {
    background: '#b8b2b2',
    border: '1px solid #000',
    padding: '8px',
    textAlign: 'left',    
};

const tableRowStyle = {
    border: '1px solid #000',
};

const tableCellStyle = {
    border: '1px solid #000',
    padding: '8px',
};

const linkStyle = {
    color: 'blue',
    textDecoration: 'underline',
    cursor:"pointer "
};



export default TotalStudyData