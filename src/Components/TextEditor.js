import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function TextEditor() {
    const [text, setText] = useState('');
    const [url, seturl] = useState('')
    const navigate  = useNavigate()


    useEffect(() => {
        const urlData = window.location.href
        if (urlData.includes("/addHtmlTemplate?node1")) {
            seturl("add Html Template - Node 1")
        }
        else if (urlData.includes("/addHtmlTemplate?node2")) {
            seturl("add Html Template - Node 2")
        }
    }, [])

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleTextBox = () => {
        window.confirm("Do you want to save this data ?");
        alert("Action saved !!")
        navigate("/user/dashboard")
    }

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto flex flex-col">
                <div class="lg:w-4/6 mx-auto">
                    <div className="p-4">
                        <h1 className="text-xl font-semibold mb-4">{url.toUpperCase()}</h1>
                        <div className="border rounded-lg p-4">
                            <textarea
                                className="w-full h-48 p-2 border rounded-lg resize-none"
                                placeholder="Start typing here..."
                                value={text}
                                onChange={handleTextChange}
                            />
                        </div>
                        <div className="mt-4">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" onClick={handleTextBox}>
                                Save
                            </button>
                        </div>
                    </div>
                </div></div>
        </section>
    );
}

export default TextEditor;
