import React from "react";
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import { contentControlEvent, contextualSpacingProperty } from "@syncfusion/ej2-react-documenteditor";
import { useEffect } from "react";

const TextQuillEditor = () => {
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

    const [data, setData] = React.useState({
        patientName: '',
        modality: '',
        studydate: ''
    })


    const handleProcedureContentChange = (content, delta, source, editor) => {
        console.log(content)

    };

    useEffect(() => {
        fetchData()
    }, [])

    const editorValue = () => {
        return (
            "Patient Name: <b>" + data.patientName + "</b><br/>" + "Modality: <b>" + data.modality + "</b><br/>" + "Study Date: <b>" + data.studydate + "</b><br/>" + "<br/><br/><br/>" + "<p></p>"
        )
    }

    const handleDraftClick = () => {
        console.log("Draft button clicked. Data:", data);
    };

    const handleSaveClick = () => {
        // Create a new Blob with the HTML content
        const blob = new Blob(['<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body>' + editorValue() + '</body></html>'], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        const link = document.createElement("a");
        link.download = "document.docx";
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
                <button onClick={handleDraftClick} style={{ marginRight: "10px",backgroundColor:'green' }}>Draft</button>
                <button onClick={handleSaveClick} style={{ marginRight: "10px", backgroundColor: 'blue' }}>Save</button>
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

export default TextQuillEditor;
