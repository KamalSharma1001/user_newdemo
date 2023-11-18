import React, { useEffect, useState } from 'react'
import TextQuillEditor from './TextQuillEditor';


const ReportsTab = () => {
  const [data, setData] = useState({
    patientName: '',
    modality: '',
    studydate: ''
  })

  const [showFileUpload, setShowFileUpload] = useState(false);
  const [editor, setEditorState] = useState(false)
  const handleCheckboxChange = () => {
    alert("Sever not set to upload the any file");
    setShowFileUpload(!showFileUpload);
  };

  const handleUploadClick = () => {
    if (showFileUpload) {
      alert("Server is not set up to upload files.");
    }
  };

  const fetchData = async () => {
    const apiUrl = `https://busy-lime-bream-sock.cyclic.app/api/v2/getstudydata?studyId=4009`;
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
      setData({
        patientName: result.patientName,
        modality: result.modality,
        studydate: result.studyDate
      })
      //console.log(result)
    } catch (error) {
      console.error('API request error:', error.message);
    }
  };


  const handleEditor = () => {

  }


  useEffect(() => {
    fetchData();

  }, []);

  const googleDocsUrl = 'https://docs.google.com/document/d/1e5g66iZrhgDyoPoXDubYS7Mg9ZN43ou0TXQBXUzblT0/edit';


  return (
    <>
      <br /><br />
      <div style={containerStyle}>
        <p style={pStyle}>{data.patientName}</p>
        {/* <p style={pStyle1}>Sex</p> */}
        <p style={pStyle1}>{data.studydate}</p>
        <p style={pStyle1}>{data.modality}</p>
      </div>

      <div style={{
        background: '#b8b2b2', boxSizing: 'border-box',
        padding: '10px',
        margin: '10px'
      }}>
        <p><b>Body Part Tempalte Preloaded Reports</b></p>
        <div style={selectContainerStyle}>
          <select style={selectStyle}>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </select>
          <select style={selectStyle}>
            <option value="Option A">Option A</option>
            <option value="Option B">Option B</option>
            <option value="Option C">Option C</option>
          </select>
          <select style={selectStyle}>
            <option value="Choice X">Choice X</option>
            <option value="Choice Y">Choice Y</option>
            <option value="Choice Z">Choice Z</option>
          </select>
        </div>
        <div style={checkboxContainerStyle}>
          <label style={checkboxStyle}>
            <input type="radio" name="editor" onClick={(e) => { setEditorState(true) }} /> Advanced Editor
          </label>
          <label style={checkboxStyle}>
            <input type="radio" name="editor" onChange={handleCheckboxChange} /> Attach a file
          </label>
          {showFileUpload && (
            <>
              <input type="file" style={selectStyle} />
              <button onClick={handleUploadClick} style={{ background: "#525df7", color: "#fff", border: "none", padding: "5px 4px", cursor: "pointer" }}>
                <b> Upload</b>
              </button>
            </>
          )}
          <select style={selectStyle}>
            <option value="Drafted">Drafted</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Signed off">Signed off</option>
          </select>
        </div>

      </div>

      <TextQuillEditor/>


      {/* {
        editor ? <>
          <div style={containerStyleFrame}>
            <iframe
              src={googleDocsUrl}
              style={iframeStyle}
              title="Google Docs"
            ></iframe>
          </div>
        </> : ""
      } */}
    </>
  )
}

const containerStyleFrame = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Center vertically
};

const iframeStyle = {
  maxWidth: '100%',
  width: '100%',
  height: '100%',
};

const containerStyle = {
  border: '5px solid #000',
  boxSizing: 'border-box',
  padding: '10px',
  margin: '10px'
};
const pStyle = {
  display: 'inline',
  margin: '0 10px',
};
const pStyle1 = {
  display: 'inline',
  margin: '0 100px',
};
const selectContainerStyle = {
  textAlign: 'center',
};

const selectStyle = {
  display: 'inline-block',
  margin: '5px 4px',
  padding: '0px',
  border: '2px solid #ccc',
};

const checkboxContainerStyle = {
  textAlign: 'center',
};

const checkboxStyle = {
  display: 'inline-block',
  margin: '0 10px',
};


const Editor = () => {
  const [content, setContent] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.innerHTML);
  };

  const handleSave = () => {
    // You can implement the save functionality here
    console.log('Text saved:', content);
  };

  return (
    <>
      <div>
        <h1>Text Editor</h1>
        <div
          contentEditable={true}
          style={{
            border: '1px solid #ccc',
            minHeight: '200px',
            padding: '10px',
            fontFamily: 'Arial, sans-serif',
          }}
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  )
}




export default ReportsTab