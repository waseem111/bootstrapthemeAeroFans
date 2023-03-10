import React from 'react'
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import $ from 'jquery';
const LeftSideBar = () => {
    const location = useLocation();
    function openSubmenu(c) {
        var elems = document.querySelectorAll(".submenu");
        [].forEach.call(elems, function (el) {
            el.classList.remove("show");
        });
        $("." + c).toggleClass("show");
    }

    return (
        <>
            <div className="l-sidebar">
                <div className="logo">
                    <div className="logo__txt">
                        <img className="icon1" src="https://aeronautfans.com/wp-content/uploads/2022/10/aerologo.png" style={{ width: "60%" }} alt='' />
                        <img className="icon2" src="https://aeronautfans.com/wp-content/uploads/2022/10/cropped-favicon-180x180.png" style={{ width: "70%", borderRadius: "24px" }} alt='' />
                    </div>
                </div>
                <div className="l-sidebar__content">
                    <nav className="c-menu js-menu">
                        <ul className="u-list">
                            <li className={location?.pathname == "/dashboard" ? "c-menu__item is-active" : "c-menu__item"} data-toggle="tooltip" title="Dashboard">
                                <NavLink to="/dashboard">
                                    <div className="c-menu__item__inner"><i className="fa fa-tachometer" aria-hidden="true"></i>
                                        <div className="c-menu-item__title"><span>Dashboard </span></div>
                                    </div>
                                </NavLink>
                            </li>
                            <li className={(location?.pathname == "/addemployee" || location?.pathname == "/employees") ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Employees" onClick={() => openSubmenu("Employees-show")}>
                                
                                    <div className="c-menu__item__inner"><i className="fa fa fa-users" aria-hidden="true"></i>
                                        <div className="c-menu-item__title"><span>Employees </span>   <i className="fa fa-caret-down first"></i></div>
                                    </div>
                                    <ul className="Employees-show submenu">
                                    <li>
                                        <NavLink to="/addemployee">
                                            Add Employee
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/employees">
                                            List of Employees
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className={location?.pathname == "/addcustomer" || location?.pathname == "/customers" ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Customers" onClick={() => openSubmenu("Customers-show")}>
                                
                                    <div className="c-menu__item__inner"><i className="fa fa fa-users" aria-hidden="true"></i>
                                        <div className="c-menu-item__title"><span>Customers </span>   <i className="fa fa-caret-down first"></i></div>
                                    </div>
                                    <ul className="Customers-show submenu">
                                        <li>
                                            <NavLink to="/addcustomer">
                                                Add Customer
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/customers">
                                                List of Customers
                                            </NavLink>
                                        </li>
                                    </ul>
                            </li>
                            
                            <li className={location?.pathname == "/addproject" || location?.pathname == "/projects" ||
                                location?.pathname == "/addunit" || location?.pathname == "/units" ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Projects" onClick={() => openSubmenu("Projects-show")}>
                                
                                    <div className="c-menu__item__inner"><i className="fa fa fa-users" aria-hidden="true"></i>
                                        <div className="c-menu-item__title"><span>Projects </span>   <i className="fa fa-caret-down first"></i></div>
                                    </div>
                                    <ul className="Projects-show submenu">
                                    <li>
                                        <NavLink to="/addproject">
                                            Add Project
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/projects">
                                            List of Projects
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/addunit">
                                            Add Unit
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/units">
                                            List of Units
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className={location?.pathname == "/createquotation" || location?.pathname == "/quotations" ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Quotations" onClick={() => openSubmenu("Quotations-show")}>
                                
                                    <div className="c-menu__item__inner"><i className="fa fa fa-users" aria-hidden="true"></i>
                                        <div className="c-menu-item__title"><span>Quotations </span>   <i className="fa fa-caret-down first"></i></div>
                                    </div>
                                    <ul className="Quotations-show submenu">
                                    <li>
                                        <NavLink to="/createquotation">
                                            Create Quotation
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/quotations">
                                            List of Quotations
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            

                          
                            <li className={location?.pathname == "/fansdata" ? "c-menu__item is-active" : "c-menu__item"} data-toggle="tooltip" title="Dashboard">
                                <NavLink to="/fansdata">
                                    <div className="c-menu__item__inner"><i className="fa fa-tachometer" aria-hidden="true"></i>
                                        <div className="c-menu-item__title"><span>Fan Data </span></div>
                                    </div>
                                </NavLink>
                            </li>


                            <li className={location?.pathname == "/fans" || location?.pathname == "/unitconversions" || location?.pathname == "/roleprivileges" ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Lookups" onClick={() => openSubmenu("Lookups-show")}>
                                    <div className="c-menu__item__inner"><i className="fa fa fa-users" aria-hidden="true"></i>
                                        <div className="c-menu-item__title"><span>Lookups </span>   <i className="fa fa-caret-down first"></i></div>
                                    </div>
                                    <ul className="Lookups-show submenu">
                                    <li>
                                        <NavLink to="/fans">
                                            Fans
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/unitconversions">
                                            Unit Conversions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/roleprivileges">
                                            Roles & Privileges
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>


                        </ul>
                    </nav>

                </div>
            </div>
        </>

    )
}

export default LeftSideBar