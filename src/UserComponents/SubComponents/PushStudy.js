import React from 'react'
import Navbar from './Navbar';

const PushStudy = () => {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Push Study</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-4 col-sm-4"></div>
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
                                    <div class="col-md-12 col-sm-12">
                                        <button
                                            style={{ padding: "0.719rem 40px" }}
                                            type="button"
                                            class="btn btn-success"
                                        >
                                            Push
                                        </button>
                                        <span style={{ marginLeft: 31 }}>
                                            {" "}
                                            <button
                                                style={{ padding: "0.719rem 40px" }}
                                                type="button"
                                                class="btn btn-outline-danger"
                                            >
                                                Cancel
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pd-20 card-box mb-30">
                        <div className="clearfix mb-20">
                            <div className="pull-left">
                                <h4 className="text-blue h4">Push Study</h4>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <div class="dt-checkbox">
                                                <input
                                                    type="checkbox"
                                                    name="select_all"
                                                    value="1"
                                                    id="example-select-all"
                                                />
                                                <span class="dt-checkbox-label"></span>
                                            </div>
                                        </th>
                                        <th scope="col">Patient Name</th>
                                        <th scope="col">Patient ID</th>
                                        <th scope="col">Accession No.</th>
                                        <th scope="col">Modality</th>
                                        <th scope="col">Scan Date/Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div class="dt-checkbox">
                                                <input
                                                    type="checkbox"
                                                    name="select_all"
                                                    value="1"
                                                    id="example-select-all"
                                                />
                                                <span class="dt-checkbox-label"></span>
                                            </div>
                                        </th>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td></td>
                                        <td>CT</td>
                                        <td>27-01-2023 17:59:42</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="dt-checkbox">
                                                <input
                                                    type="checkbox"
                                                    name="select_all"
                                                    value="1"
                                                    id="example-select-all"
                                                />
                                                <span class="dt-checkbox-label"></span>
                                            </div>
                                        </th>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td></td>
                                        <td>CT</td>
                                        <td>27-01-2023 17:59:42</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="dt-checkbox">
                                                <input
                                                    type="checkbox"
                                                    name="select_all"
                                                    value="1"
                                                    id="example-select-all"
                                                />
                                                <span class="dt-checkbox-label"></span>
                                            </div>
                                        </th>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td></td>
                                        <td>CT</td>
                                        <td>27-01-2023 17:59:42</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="dt-checkbox">
                                                <input
                                                    type="checkbox"
                                                    name="select_all"
                                                    value="1"
                                                    id="example-select-all"
                                                />
                                                <span class="dt-checkbox-label"></span>
                                            </div>
                                        </th>
                                        <td>Example1</td>
                                        <td>24544</td>
                                        <td></td>
                                        <td>CT</td>
                                        <td>27-01-2023 17:59:42</td>
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

export default PushStudy