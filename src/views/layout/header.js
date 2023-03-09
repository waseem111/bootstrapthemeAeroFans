import React, { useEffect, useContext } from "react";
import authContext from "../../auth-context";
const Header = () => {
    const { token, userLogin, logout, isLoggedIn } = useContext(authContext);
  return (
<>
<header className="l-header">
    <div className="l-header__inner clearfix">
        <div className="c-header-icon js-hamburger">
            <div className="hamburger-toggle"><span className="bar-top"></span><span className="bar-mid"></span><span className="bar-bot"></span></div>
        </div>


        <div className="header-icons-group">
            <div className="c-header-icon basket">
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
            </div>
            <div className="c-header-icon logout">
                <div className="btn-group">
                    <img src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png" className="dropdown-toggle" data-toggle="dropdown" style={{width: "20px"}} />

                    <ul className="dropdown-menu" role="menu" style={{left: "unset",right: 0}}>
                        <li><a href="#">Ab.Waseem</a></li>
                        <li><a href="#">Profile</a></li>
                        <li className="divider"></li>
                        <li><button  onClick={() => logout()} >Logout</button></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</header>
</>
  )
}

export default Header