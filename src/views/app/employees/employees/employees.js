import React, { Fragment } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
const Employees = () => {
    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Employees</h1>
                   

                   
                        <div className="page-content">
                        <div className="row">
                        <div className="col-md-12">
                             <form>
                                <div className="form-row">
                                    <div className="form-group col-md-3 text-left">
                                        <label htmlFor="inputEmail4">Name</label>
                                        <input type="email" className="form-control" id="" />
                                    </div>
                                    <div className="form-group col-md-3 text-left">
                                        <label htmlFor="inputPassword4">Email</label>
                                        <input type="password" className="form-control" id="" />
                                    </div>
                                </div>
                                <div className="form-group col-md-3 text-left">
                                    <label htmlFor="inputAddress">Mobile</label>
                                    <input type="text" className="form-control" id="" />
                                </div>
                                <div className="form-group col-md-3 text-left">
                                    <label htmlFor="inputState">Type</label>
                                    <select id="inputState" className="form-control">
                                        <option defaultValue={'DEFAULT'}>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-12 text-center">
                                    <button type="submit" className="btn btn-primary" style={{marginRight: "20px"}}>Search</button>
                                    <button type="button" className="btn btn-info">Reset</button>
                                </div>

                            </form>
                        </div>
                           
                        </div>
                            <div className="row">
                                <div className="col-md-8 text-left">
                                    <div>
                                        <label style={{ display: "inline-flex", lineHeight: 2 }}>
                                            Show
                                            <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm" style={{ marginLeft: "5px", marginRight: "5px" }}>
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select> entries</label>
                                    </div>
                                </div>

                                <div className="col-md-4" style={{ textAlign: "right" }}>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Export <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu" style={{right: "0"}}>
                                            <li><a href="#">PPt</a></li>
                                            <li><a href="#">PDF</a></li>
                                            <li><a href="#">Excel</a></li>

                                        </ul>
                                    </div>
                                </div>

                                <div className="col-md-4">

                                </div>
                            </div>

                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation example" style={{ textAlign: "right" }}>
                                <ul className="pagination">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>

                        </div>
                  
                </div>
            </main>
        </>
    )
};

export default Employees;