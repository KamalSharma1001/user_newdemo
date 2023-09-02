import React from 'react'
import Navbar from './Navbar';

const Academics = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Academics</h4>
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
                                <div class="row">
                                    <div class="col-md-6 col-sm-6">
                                        <label for="selectField" class="custom-label">
                                            Scan Start Date
                                        </label>
                                        <select class="form-control custom-input" id="selectField">
                                            <option value="option1">12-01-2023</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <label for="selectField" class="custom-label">
                                            Scan End Date
                                        </label>
                                        <select class="form-control custom-input" id="selectField">
                                            <option value="option1">22-01-2023</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12">
                                        <button style={{ padding: "0.719rem 40px" }} type="button" class="btn btn-success">Push</button>
                                        <span style={{ marginLeft: 31 }}> <button style={{ padding: "0.719rem 40px" }} type="button" class="btn btn-outline-danger">
                                            Cancel
                                        </button></span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pd-20 card-box mb-30">
                        <div className="clearfix mb-20">
                            <div className="pull-left">
                                <h4 className="text-blue h4">Academics</h4>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Patient Name</th>
                                        <th scope="col">Patient ID</th>
                                        <th scope="col">Sex</th>
                                        <th scope="col">Accession No.</th>
                                        <th scope="col">Scan Date/Time</th>
                                        <th scope="col">Folder Path</th>
                                        <th scope="col">Comments</th>
                                        <th scope="col">View Report</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td>M</td>
                                        <td></td>
                                        <td>27-01-2023 17:59:42</td>
                                        <td>Neck Congenital</td>
                                        <td>van der knaap</td>
                                        <td><a>View</a></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td>M</td>
                                        <td></td>
                                        <td>27-01-2023 17:59:42</td>
                                        <td>Neck Congenital</td>
                                        <td>van der knaap</td>
                                        <td><a>View</a></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td>M</td>
                                        <td></td>
                                        <td>27-01-2023 17:59:42</td>
                                        <td>Neck Congenital</td>
                                        <td>van der knaap</td>
                                        <td><a>View</a></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td>M</td>
                                        <td></td>
                                        <td>27-01-2023 17:59:42</td>
                                        <td>Neck Congenital</td>
                                        <td>van der knaap</td>
                                        <td><a>View</a></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td>M</td>
                                        <td></td>
                                        <td>27-01-2023 17:59:42</td>
                                        <td>Neck Congenital</td>
                                        <td>van der knaap</td>
                                        <td><a>View</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Academics