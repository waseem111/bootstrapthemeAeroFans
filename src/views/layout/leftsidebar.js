import React from 'react'
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faTachometerAlt, faAddressCard, faProjectDiagram, faUsers, faFileAlt, faDatabase, faList } from '@fortawesome/fontawesome-free-solid'
import $ from 'jquery';
const LeftSideBar = () => {
    const location = useLocation();
    function openSubmenu(c) {
        if ($("body").hasClass("sidebar-is-reduced")) {
            $("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
        }
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
                                    <div className="c-menu__item__inner">
                                    <FontAwesomeIcon icon={faTachometerAlt} />
                                        <div className="c-menu-item__title"><span>Dashboard </span></div>
                                    </div>
                                </NavLink>
                            </li>
                            <li className={(location?.pathname == "/addemployee" || location?.pathname == "/employees") ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Employees" onClick={() => openSubmenu("Employees-show")}>
                                <div className="c-menu__item__inner">
                                    <FontAwesomeIcon icon={faAddressCard} />
                                    <div className="c-menu-item__title"><span>Employees </span>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </div>
                                </div>
                                <ul className={location?.pathname == "/addemployee" || location?.pathname == "/employees" ? "Employees-show submenu show" : "Employees-show submenu"}>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/addemployee">
                                            Add Employee
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/employees">
                                            List of Employees
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className={location?.pathname == "/addcompany" || location?.pathname == "/companies" ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Customers" onClick={() => openSubmenu("Customers-show")}>
                                <div className="c-menu__item__inner">
                                    <FontAwesomeIcon icon={faUsers} />
                                    <div className="c-menu-item__title"><span>Companies </span>   <FontAwesomeIcon icon={faCaretDown} /></div>
                                </div>
                                <ul className={location?.pathname == "/addcompany" || location?.pathname == "/companies" 
                                || location?.pathname == "/addbranch" || location?.pathname.includes("/branches")
                                ? "Customers-show submenu show" : "Customers-show submenu"}>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/addcompany">
                                            Add Company
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/companies">
                                            List of Company
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/addbranch">
                                            Add Branch
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/branches">
                                            List of Branches
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className={location?.pathname == "/addproject" || location?.pathname == "/projects" ||
                                location?.pathname == "/addunit" || location?.pathname == "/units" ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Projects" onClick={() => openSubmenu("Projects-show")}>
                                <div className="c-menu__item__inner">
                                    <FontAwesomeIcon icon={faProjectDiagram} />
                                    <div className="c-menu-item__title"><span>Projects </span>  <FontAwesomeIcon icon={faCaretDown} /></div>
                                </div>
                                <ul className={location?.pathname == "/addproject" || location?.pathname == "/projects" || location?.pathname == "/addunit" || location?.pathname == "/units" ? "Projects-show submenu show" : "Projects-show submenu"}>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/addproject">
                                            Add Project
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/projects">
                                            List of Projects
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/addunit">
                                            Add Unit
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/units">
                                            List of Units
                                        </NavLink>
                                    </li> */}
                                </ul>
                            </li>
                            <li className={location?.pathname == "/createquotation" || location?.pathname == "/quotations" ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Quotations" onClick={() => openSubmenu("Quotations-show")}>
                                <div className="c-menu__item__inner">
                                    <FontAwesomeIcon icon={faFileAlt} />
                                    <div className="c-menu-item__title"><span>Quotations </span>  <FontAwesomeIcon icon={faCaretDown} /></div>
                                </div>
                                <ul className={location?.pathname == "/createquotation" || location?.pathname == "/quotations" ? "Quotations-show submenu show" : "Quotations-show submenu"}>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/createquotation">
                                            Create Quotation
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/quotations">
                                            List of Quotations
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>


                            <li className={location?.pathname == "/fansdata" ? "c-menu__item is-active" : "c-menu__item"} data-toggle="tooltip" title="Dashboard">
                                <NavLink to="/fansdata">
                                    <div className="c-menu__item__inner">
                                        <FontAwesomeIcon icon={faDatabase} />
                                        <div className="c-menu-item__title" style={{ marginRight: "50px" }}><span>Fan Data </span></div>
                                    </div>
                                </NavLink>
                            </li>

                            {/* <li className={location?.pathname == "/motors" ? "c-menu__item is-active" : "c-menu__item"} data-toggle="tooltip" title="Motor">
                                <NavLink to="/motors">
                                    <div className="c-menu__item__inner">
                                        <FontAwesomeIcon icon={faDatabase} />
                                        <div className="c-menu-item__title" style={{ marginRight: "50px" }}><span>Motor Data </span></div>
                                    </div>
                                </NavLink>
                            </li> */}

                            <li className={location?.pathname == "/addmotor" || location?.pathname == "/motors" ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Motors" onClick={() => openSubmenu("Motors-show")}>
                                <div className="c-menu__item__inner">
                                    <FontAwesomeIcon icon={faFileAlt} />
                                    <div className="c-menu-item__title"><span>Motors </span>  <FontAwesomeIcon icon={faCaretDown} /></div>
                                </div>
                                <ul className={location?.pathname == "/addmotor" || location?.pathname == "/motors" ? "Motors-show submenu show" : "Motors-show submenu"}>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/addmotor">
                                            Create Motor
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/motors">
                                            List of Motors
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className={location?.pathname == "/fans" || location?.pathname == "/unitconversions" || location?.pathname == "/roleprivileges" ? "c-menu__item has-submenu is-active" : "c-menu__item has-submenu"}
                                data-toggle="tooltip" title="Lookups" onClick={() => openSubmenu("Lookups-show")}>
                                <div className="c-menu__item__inner">

                                    <FontAwesomeIcon icon={faList} />
                                    <div className="c-menu-item__title"><span>Lookups </span> <FontAwesomeIcon icon={faCaretDown} /></div>
                                </div>
                                <ul className={location?.pathname == "/fans" || location?.pathname == "/unitconversions" || location?.pathname == "/roleprivileges" ? "Lookups-show submenu show" : "Lookups-show submenu"}>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/fans">Fans
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/unitconversions">
                                            Unit Conversions
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className={(navData) => navData.isActive ? "link-active" : ""} to="/roleprivileges">
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