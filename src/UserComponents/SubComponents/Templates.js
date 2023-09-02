import React from 'react';
import Navbar from './Navbar';

const Templates = () => {
    return (
        <>
            <Navbar />
            <center>
                <div className="main-container">
                    <div className="xs-pd-20-10 pd-ltr-20">
                        <div className="pd-20 card-box mb-30">
                            <div className="clearfix mb-20">
                                <div className="pull-left">
                                    <h4 className="text-blue h4">Templates</h4>
                                </div>
                            </div>

                            <TemplatesTable />

                        </div>
                    </div>
                </div>
            </center>
        </>
    );
}

export default Templates;


const TemplatesTable = () => {
    return (
        <>
            <h1>Table</h1>
            
        </>
    );
}