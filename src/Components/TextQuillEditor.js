import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import { useEffect } from "react";

const TextQuillEditor = () => {
    const [data, setData] = React.useState({
        patientName: '',
        modality: '',
        studydate: ''
    })
    const [showFileUpload, setShowFileUpload] = useState(false);

    const modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [
                { "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
            ["table"]
        ],

    }

    const formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
        "table", "cell", "row"
    ];
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
        } catch (error) {
            console.error('API request error:', error.message);
        }
    };

    let link;
    let blob;
    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        localStorage.setItem("strippedContent", doc.body.textContent || "");
        return doc.body.textContent || "";
    };

    const handleProcedureContentChange = (content) => {
        const editContent = "  " + content
        blob = new Blob([stripHtmlTags(editContent)], {
            type: "text/plain;charset=utf-8",
        });
        link = document.createElement("a");
    };

    useEffect(() => {
        fetchData()
    }, [])

    const editorValue = () => {
        const drafted = localStorage.getItem(data.patientName)
        return (
            drafted ?
                drafted : " Patient Name: <b>" + data.patientName + "</b>   <br/> " + "Modality: <b>" + data.modality + "</b>   <br/> " + "Study Date: <b>" + data.studydate + "</b><br/>" + "<br/><br/><br/> " + "<p></p>"
        )
    }

    const handleDraftClick = () => {
        const saveData = localStorage.getItem("strippedContent")
        localStorage.setItem(data.patientName, saveData)
    };

    const handleSaveClick = () => {
        link.download = "Doc_" + data.patientName + ".rtf";
        link.href = window.URL.createObjectURL(blob);

        document.body.appendChild(link);
        link.click();

    };

    return (
        <>
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

            </div>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <button onClick={handleDraftClick} style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>
                    Draft
                </button>
                <button onClick={handleSaveClick} style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '5px' }}>
                    Save
                </button>
            </div>
            <div style={{ display: "grid", justifyContent: "center", backgroundColor: "white" }}>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="Enter your content here..."
                    value={
                        editorValue()
                    }
                    onChange={handleProcedureContentChange}
                    style={{ height: "80vh", width: "80vw", padding: "10px 40px" }}
                >
                </ReactQuill>
            </div>
        </>
    );
}


const selectContainerStyle = {
    textAlign: 'center',
};

const selectStyle = {
    display: 'inline-block',
    margin: '5px 4px',
    padding: '0px',
    border: '2px solid #ccc',
};


export default TextQuillEditor;
