import React from 'react'
import Navbar from './Navbar'
import CustomDataTable from './DataComponent/CustomDataTable';
import { Link } from 'react-router-dom';


const Templates = () => {
    const headerColumns = [
        {
            name: 'S.No.',
            selector: 'sNo', // Assuming you have a property named 'sNo' in your data
            sortable: false,
        },
        {
            name: 'Node Name',
            selector: 'nodeName', // Assuming you have a property named 'nodeName' in your data
            sortable: true,
        },
        {
            name: 'Modality',
            selector: 'modality', // Assuming you have a property named 'modality' in your data
            sortable: true,
        },
        {
            name: 'Add HTML Template',
            selector: 'htmlTemplate', // Assuming you have a property named 'htmlTemplate' in your data
            sortable: false,
        },
        {
            name: 'Add RTF Template',
            selector: 'rtfTemplate', // Assuming you have a property named 'rtfTemplate' in your data
            sortable: false,
        },
        {
            name: 'Add TEXTAREA Template',
            selector: 'textareaTemplate', // Assuming you have a property named 'textareaTemplate' in your data
            sortable: false,
        }
    ];

    const sampleData = [
        {
            sNo: 1,
            nodeName: 'Node 1',
            modality: 'CT',
            htmlTemplate: <Link to="/user/dashboard/addHtmlTemplate?node1" className='ml-5 text-blue-500 font-bold underline'>Add</Link>,
            rtfTemplate: <Link to="/user/dashboard/rtfTemplate?node1" className='ml-5 text-blue-500 font-bold underline'>Add</Link>,
            textareaTemplate: <Link to="/user/dashboard/textareaTemplate?node1" className='ml-5 text-blue-500 font-bold underline'>Add</Link>,
        },
        {
            sNo: 2,
            nodeName: 'Node 2',
            modality: 'MR',
            htmlTemplate: <Link to="/user/dashboard/addHtmlTemplate" className='ml-5 text-blue-500 font-bold underline'>Add</Link>,
            rtfTemplate: <Link to="/user/dashboard/rtfTemplate" className='ml-5 text-blue-500 font-bold underline'>Add</Link>,
            textareaTemplate: <Link to="/user/dashboard/textareaTemplate" className='ml-5 text-blue-500 font-bold underline'>Add</Link>,
        }
    ];

    return (
        <>
            <Navbar />
            <CustomDataTable tittleName="Template Node Details" headers={headerColumns} filterData={sampleData} />
        </>
    )
}

export default Templates