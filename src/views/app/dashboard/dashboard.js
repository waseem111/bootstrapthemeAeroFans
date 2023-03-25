import React, { Fragment } from 'react';
import Header from '../../layout/header';
import LeftSideBar from '../../layout/leftsidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faProjectDiagram, faUsers, faFileAlt } from '@fortawesome/fontawesome-free-solid'
import './dashboard.css';
import { Vortex } from 'react-loader-spinner';
const Dashboard = () => {
    return (
        <>
            <Header />
            <LeftSideBar />

            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Dashboard</h1>
                    <div className="row">
                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="align-self-center">
                                                <FontAwesomeIcon icon={faUsers} className="primary font-large-2 float-left" />
                                            </div>
                                            <div className="media-body text-right">
                                                <h3>278</h3>
                                                <span>Companies</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="align-self-center">
                                                <FontAwesomeIcon icon={faProjectDiagram} className="warning font-large-2 float-left" />
                                            </div>
                                            <div className="media-body text-right">
                                                <h3>156</h3>
                                                <span>Projects</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-sm-4 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="align-self-center">
                                                <FontAwesomeIcon icon={faFileAlt} className="font-large-2 float-left" />
                                            </div>
                                            <div className="media-body text-right">
                                                <h3>64</h3>
                                                <span>Quotations</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Vortex
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
/>

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