import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import CustomDataTable from './DataComponent/CustomDataTable'

const Academics = () => {
  return (
    <>
      <Navbar />
      <AcademicsData />
    </>
  )
}

export default Academics

const AcademicsData = () => {
  const [data, setData] = useState([])


  const handleSearch = () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  const handleClearSearch = () => {
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
  };


  useEffect(() => {
    // Fetch data from API using the access token
    const fetchData = async () => {
      //const apiUrl = 'https://busy-lime-bream-sock.cyclic.app/api/patients';
      //const apiUrl = 'http://localhost:8000/api/data'
      const apiUrl = 'https://busy-lime-bream-sock.cyclic.app/api/v2/getdata'
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
          console.log('Data after setting:', processedData[0]);
        })
        .catch(error => {
          console.error('API request error:', error.message);
          // Handle error, display error messages, etc.
        });

    };

    fetchData();
  }, []);

  // const data = [
  //   {
  //     patientName: 'John Doe',
  //     patientID: '123456',
  //     age: 30,
  //     sex: 'Male',
  //     bodyPart: 'Head',
  //     mod: 'CT',
  //     center: 'Center 1',
  //     scanDateTime: '2023-08-15 10:00 AM',
  //     reportedBy: 'Dr. Smith'
  //   },
  //   {
  //     patientName: 'Jane Smith',
  //     patientID: '789012',
  //     age: 25,
  //     sex: 'Female',
  //     bodyPart: 'Chest',
  //     mod: 'MR',
  //     center: 'Center 2',
  //     scanDateTime: '2023-08-16 02:30 PM',
  //     status: 'Singed On',
  //     reportedBy: 'Dr. Johnson'
  //   }
  // ];

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
      name: 'Accession No',
      selector: row => row.AccessionNumber,
      sortable: true,
    },
    {
      name: 'Scan Date Time',
      selector: row => row.StudyDate,
      sortable: true,
    },
    {
      name: 'Folder Path',
      selector: row => row.folderpath,
      sortable: true,
    },
    {
      name: 'Comments',
      selector: row => row.comments,
      sortable: true,
    },
    {
      name: 'View Reports',
      selector: row => row.view,
      sortable: false,
      cell: row => <div className="datatable-nosort"><span className='text-center mt-2 leading-none flex pl-4 absolute bottom-0 left-0 w-full py-4 text-xs'>View/Download</span></div>,
    },
  ];

  const combinedData = data.map(item => ({
    ...item.patient,
    ...item.series,
    ...item.study,
  }));


  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-2 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <div class="flex-grow">
                  <label for="full-name" class="leading-7 text-sm  text-gray-600">Root Folder</label>
                  <select
                    id="full-name"
                    name="full-name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option>Select folder</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <div class="mb-4 ml-16">
                  <label for="startDate" class="block text-sm  text-gray-700">Scan Start Date</label>
                  <input type="date" id="startDate" name="startDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div class="mb-4 ml-10">
                  <label for="endDate" class="block text-sm text-gray-700">Scan End Date</label>
                  <input type="date" id="endDate" name="endDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <div class="flex justify-center ml-16">
                  <button onClick={handleSearch} class="inline-flex text-white bg-indigo-500 border-0 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Search</button>
                  <button onClick={handleClearSearch} class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Clear Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomDataTable tittleName={""} headers={Headercolumns} filterData={combinedData} />
    </>
  )
}


