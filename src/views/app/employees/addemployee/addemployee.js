import React, { Fragment } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import './addemployee.css';
const Addemployees = () => {
    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Add Employee</h1>
                
                </div>
            </main>
        </>
    )
};

export default Addemployees;