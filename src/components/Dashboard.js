import React, { Fragment, useEffect } from 'react';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import '../Styles/DashboardStyle.css';

const Dashboard = () => {

  return (
<>

    <Header />
    <LeftSideBar />

    <main className="l-main">
        <div className="content-wrapper content-wrapper--with-bg">
            <h1 className="page-title">Dashboard</h1>
            <div className="row">
                <div className="col-xl-3 col-sm-3 col-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="media d-flex">
                                    <div className="align-self-center">
                                        <i className="fa fa-pencil primary font-large-2 float-left"></i>
                                    </div>
                                    <div className="media-body text-right">
                                        <h3>278</h3>
                                        <span>New Posts</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-3 col-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="media d-flex">
                                    <div className="align-self-center">
                                        <i className="fa fa-commenting-o warning font-large-2 float-left"></i>
                                    </div>
                                    <div className="media-body text-right">
                                        <h3>156</h3>
                                        <span>New Comments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-3 col-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="media d-flex">
                                    <div className="align-self-center">
                                        <i className="fa fa-bar-chart success font-large-2 float-left"></i>
                                    </div>
                                    <div className="media-body text-right">
                                        <h3>64.89 %</h3>
                                        <span>Bounce Rate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-3 col-12">
                    <div className="card">
                        <div className="card-content">
                            <div className="card-body">
                                <div className="media d-flex">
                                    <div className="align-self-center">
                                        <i className="fa fa-users danger font-large-2 float-left"></i>
                                    </div>
                                    <div className="media-body text-right">
                                        <h3>423</h3>
                                        <span>Total Visits</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
            <div className="card-body">
                <form>
    <div className="form-row">
        <div className="form-group col-md-3">
        <label htmlFor="inputEmail4">Name</label>
        <input type="email" className="form-control" id="" />
        </div>
        <div className="form-group col-md-3">
        <label htmlFor="inputPassword4">Email</label>
        <input type="password" className="form-control" id="" />
        </div>
    </div>
    <div className="form-group col-md-3">
        <label htmlFor="inputAddress">Mobile</label>
        <input type="text" className="form-control" id="" />
    </div>
    <div className="form-group col-md-3">
        <label htmlFor="inputState">Type</label>
        <select id="inputState" className="form-control">
            <option defaultValue={'DEFAULT'}>Choose...</option>
            <option>...</option>
        </select>
    </div>
    <div className="form-group col-md-12 text-center">
        <button type="submit" className="btn btn-primary">Search</button>
            <button type="button" className="btn btn-info">Reset</button>
                    </div>
    
    </form>
            </div>
            
            </div>
    
            <div className=" shadow ">

    <div className="card-header py-3">
        <div className="row">
            
        <div className="col-md-8">
            <h6 className="m-0 font-weight-bold text-primary">Data Tables </h6>
        </div>
            
        </div>
        
                                
    
                            </div>
                <div className="page-content">
                        <div className="row">
                    <div className="col-md-8">
                    <div>
                        <label style={{display: "inline-flex",lineHeight: 2}}>
                            Show 
                            <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm" style={{marginLeft: "5px",marginRight: "5px"}}>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select> entries</label>
                        </div>
                    </div>
                    
                <div className="col-md-4" style={{textAlign: "right"}}>
                        <div className="btn-group">
                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Export <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu">
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
                <nav aria-label="Page navigation example" style={{textAlign: "right"}}>
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
    
            <div className="alert alert-primary" role="alert">
                This is a primary alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div className="alert alert-secondary" role="alert">
                This is a secondary alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div className="alert alert-success" role="alert">
                This is a success alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div className="alert alert-danger" role="alert">
                This is a danger alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div className="alert alert-warning" role="alert">
                This is a warning alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div className="alert alert-info" role="alert">
                This is a info alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div className="alert alert-light" role="alert">
                This is a light alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
            </div>
            <div className="alert alert-dark" role="alert">
                This is a dark alert with <a href="#" className="alert-link">an example link</a>. Give it a click if you like.
            </div>
        </div>
    </main>



</>
  )
};

export default Dashboard;