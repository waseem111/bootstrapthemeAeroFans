import React, { Fragment } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import '../../../../App.css'
const Quotations = () => {
    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Quotations</h1>
                   

                    
                </div>
            </main>
        </>
    )
};

export default Quotations;