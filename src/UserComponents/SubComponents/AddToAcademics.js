import React from 'react'
import Navbar from './Navbar';


const AddToAcademics = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Add to Academics</h4>
                                </div>
                                <nav aria-label="breadcrumb" role="navigation">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Form Basic
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="pd-20 card-box mb-30">
                        <div className="clearfix mb-20">
                            <div className="pull-left">
                                <h4 className="text-blue h4">Add to Academics</h4>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Patient Name</th>
                                        <th scope="col">MRN</th>
                                        <th scope="col">Sex</th>
                                        <th scope="col">Age</th>
                                        <th scope="col">Accession No.</th>
                                        <th scope="col">Modality</th>
                                        <th scope="col">Body Part</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td>M</td>
                                        <td>024Y</td>
                                        <td></td>
                                        <td>CT</td>
                                        <td>NCCT HEAD</td>
                                    </tr>
                                    <tr>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td>M</td>
                                        <td>024Y</td>
                                        <td></td>
                                        <td>CT</td>
                                        <td>NCCT HEAD</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div class="row">
                                    <div class="col-md-4 col-sm-4">
                                        <label for="selectField" class="custom-label">
                                            Root Folders
                                        </label>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <select class="form-control custom-input" id="selectField">
                                            <option value="option1">Select</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        id="commentInput"
                                        style={{ height: "133px" }}
                                        rows="4"
                                        placeholder="Type your comment here..."
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12">
                                        <button
                                            style={{ padding: "0.719rem 40px" }}
                                            type="button"
                                            class="btn btn-success"
                                        >
                                            Push
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Assigned folder list</h4>
                                </div>
                                <div className="mt-4" style={{ borderBottom: "1px solid #000", fontWeight: "bold" }}>
                                    <span style={{ marginRight: "5px", fontWeight: "bold" }}>#</span>
                                    Folder Path
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddToAcademics