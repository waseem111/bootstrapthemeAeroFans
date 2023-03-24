import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import authContext from "../../auth-context";

import $ from 'jquery';
const Header = () => {
    const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
    const [openAccount, setOpenAccount] = useState(false);
    function openMyAccount() {
        setOpenAccount(!openAccount);
    }

    function sidebarChangeWidth() {
        $("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
        $(".hamburger-toggle").toggleClass("is-opened");
        var elems = document.querySelectorAll(".submenu");
        [].forEach.call(elems, function (el) {
            el.classList.remove("show");
        });
    };


    const [clickedOutside, setClickedOutside] = useState(false);
    const myRef = useRef();

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setClickedOutside(true);
            setOpenAccount(false);
        }
    };

    const handleClickInside = () => {
        setClickedOutside(false);
        setOpenAccount(!openAccount);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <>
            <header className="l-header">
                <div className="l-header__inner clearfix">
                    <div className="c-header-icon js-hamburger" onClick={sidebarChangeWidth}>
                        <div className="hamburger-toggle is-opened"><span className="bar-top"></span><span className="bar-mid"></span><span className="bar-bot"></span></div>
                    </div>
                    <div className="header-icons-group">
                        {/* <div className="c-header-icon basket">
                <div className="btn-group pull-right top-head-dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="c-header-icon basket">
                            <span className="c-badge c-badge--header-icon animated shake">12</span>
                            <i className="fa fa-bell"></i>
                        </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <li>
                            <a href="#" className="top-text-block">
                                <div className="top-text-heading">You have <b>3 new themes</b> trending</div>
                                <div className="top-text-light">15 minutes ago</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="top-text-block">
                                <div className="top-text-heading">New asset recommendations in <b>Gaming Laptop</b></div>
                                <div className="top-text-light">2 hours ago</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="top-text-block">
                                <div className="top-text-heading">New asset recommendations in <b>5 themes</b></div>
                                <div className="top-text-light">4 hours ago</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="top-text-block">
                                <div className="top-text-heading">Assets specifications modified in themes</div>
                                <div className="top-text-light">4 hours ago</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="top-text-block">
                                <div className="top-text-heading">We crawled <b>www.dell.com</b> successfully</div>
                                <div className="top-text-light">5 hours ago</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="top-text-block">
                                <div className="top-text-heading">Next crawl scheduled on <b>10 Oct 2016</b></div>
                                <div className="top-text-light">6 hours ago</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="top-text-block">
                                <div className="top-text-heading">You have an update for <b>www.dell.com</b></div>
                                <div className="top-text-light">7 hours ago</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="top-text-block">
                                <div className="top-text-heading"><b>"Gaming Laptop"</b> is now trending</div>
                                <div className="top-text-light">7 hours ago</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="top-text-block">
                                <div className="top-text-heading">New asset recommendations in <b>Gaming Laptop</b></div>
                                <div className="top-text-light">7 hours ago</div>
                            </a>
                        </li>
                        <li>
                            <div className="loader-topbar"></div>
                        </li>
                    </ul>
                </div>
            </div> */}

                        <div className="c-header-icon logout" ref={myRef} onClick={handleClickInside}>
                            <div className={openAccount ? "btn-group open" : "btn-group"} >
                                <div className="dropdown-toggle">
                                    <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" className="dropdown-toggle" data-toggle="dropdown" style={{ width: "20px" }} />
                                    <span> Hi, {loggedInUser?.first_name}</span>
                                </div>


                                <ul className="dropdown-menu" role="menu" style={{ left: "unset", right: 0 }}>
                                    <li> <NavLink to="/dashboard">
                                        <span>Profile</span>
                                    </NavLink></li>

                                    <li className="divider"></li>
                                    <li onClick={() => logout()}><a href="">Logout</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

        </>
    )
}

export default Header;