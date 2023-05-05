import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import CompanyService from '../../../services/companyservices';
import authContext from '../../../../auth-context';
import ProjectForm from '../../../components/forms/projectform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faEdit, faTrash, faLink } from '@fortawesome/fontawesome-free-solid'
import * as xlsx from "xlsx";
import UnitService from '../../../services/unitservices';
import LookupService from '../../../services/lookupservices';
import UnitDataForm from '../../../components/forms/unitdataform';
import { Table } from "antd";
import FansDataService from '../../../services/fansdataservice';
import ProjectService from '../../../services/projectservices';
import { global } from '../../../constants/global';
import Modal from "react-modal";
import MotorsPopup from '../../motors/motorspopup/motorspopup';

// Modal.setAppElement("#root")

const UnitData = () => {
    const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
    //console.log(loggedInUser);
    const navigate = useNavigate();
    const { id } = useParams();
    const [unit, setUnit] = useState(null);
    const [notify, setNotify] = useState({ options: [], visible: false });
    const [lookupProjects, setLookupProjects] = useState([]);
    const [lookupDiameter, setLookupDiameter] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [searchFanCriteria, setSearchFanCriteria] = useState("ap");
    const [diffuser, setDiffuser] = useState("no");
    const [endDiameter, setEndDiameter] = useState(null);
    const [endAngle, setEndAngle] = useState(null);
    const [selectedFan, setSelectedFan] = useState({});
    const {
        register,
        watch,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({ mode: "all" });


    const columns = [
        {
            title: 'Diameter(mm)',
            dataIndex: 'mm',
            key: 'mm',
            align: 'center',
            sorter: {
                compare: (a, b) => a?.mm - b?.mm
            },
        },
        {
            title: 'Angle(°)',
            dataIndex: 'ang',
            key: 'ang',
            align: 'center',
            sorter: {
                compare: (a, b) => a?.ang - b?.ang
            },
        },
        {
            title: 'Airflow(CFM)',
            dataIndex: 'g',
            key: 'g',
            align: 'center',
            sorter: {
                compare: (a, b) => a?.g - b?.g,
            },
        },
        {
            title: 'Pressure(Pa)',
            dataIndex: 'p',
            key: 'p',
            align: 'center',
            sorter: {
                compare: (a, b) => a?.p - b?.p,
            },
        },
        {
            title: 'Fan Velocity(m/s)',
            align: 'center',
            key: Math.random(),
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return ((record?.g / global.fan_velocity_constant) / record?.fan_area).toFixed(2)
                    case 'sd':
                        return ((record?.g / global.fan_velocity_constant) / record?.sd_area).toFixed(2)
                    case 'ld':
                        return ((record?.g / global.fan_velocity_constant) / record?.ld_area).toFixed(2)
                    default:
                        return ((record?.g / global.fan_velocity_constant) / record?.fan_area).toFixed(2)
                }
            },
            sorter: {
                compare: (a, b) => {
                    switch (diffuser) {
                        case 'no':
                            return (a?.g / global.fan_velocity_constant) / a?.fan_area - (b?.g / global.fan_velocity_constant) / b?.fan_area;
                        case 'sd':
                            return (a?.g / global.fan_velocity_constant) / a?.sd_area - (b?.g / global.fan_velocity_constant) / b?.sd_area;
                        case 'ld':
                            return (a?.g / global.fan_velocity_constant) / a?.ld_area - (b?.g / global.fan_velocity_constant) / b?.ld_area;
                        default:
                            return (a?.g / global.fan_velocity_constant) / a?.fan_area - (b?.g / global.fan_velocity_constant) / b?.fan_area;
                    }
                }
            },
        },
        {
            title: 'Velocity Pressure(Pa)',
            align: 'center',
            key: Math.random(),
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return (global.fan_velocity_pressure * ((record?.g / global.fan_velocity_constant) / record?.fan_area) * ((record?.g / global.fan_velocity_constant) / record?.fan_area)).toFixed(2)
                    case 'sd':
                        return (global.fan_velocity_pressure * ((record?.g / global.fan_velocity_constant) / record?.sd_area) * ((record?.g / global.fan_velocity_constant) / record?.sd_area)).toFixed(2)
                    case 'ld':
                        return (global.fan_velocity_pressure * ((record?.g / global.fan_velocity_constant) / record?.ld_area) * ((record?.g / global.fan_velocity_constant) / record?.ld_area)).toFixed(2)
                    default:
                        return (global.fan_velocity_pressure * ((record?.g / global.fan_velocity_constant) / record?.fan_area) * ((record?.g / global.fan_velocity_constant) / record?.fan_area)).toFixed(2)
                }
            },
            sorter: {
                compare: (a, b) => {
                    switch (diffuser) {
                        case 'no':
                            return global.fan_velocity_pressure * ((a?.g / global.fan_velocity_constant) / a?.fan_area) * ((a?.g / global.fan_velocity_constant) / a?.fan_area) -
                                global.fan_velocity_pressure * ((b?.g / global.fan_velocity_constant) / b?.fan_area) * ((b?.g / global.fan_velocity_constant) / b?.fan_area);
                        case 'sd':
                            return global.fan_velocity_pressure * ((a?.g / global.fan_velocity_constant) / a?.sd_area) * ((a?.g / global.fan_velocity_constant) / a?.sd_area) -
                                global.fan_velocity_pressure * ((b?.g / global.fan_velocity_constant) / b?.sd_area) * ((b?.g / global.fan_velocity_constant) / b?.sd_area);
                        case 'ld':
                            return global.fan_velocity_pressure * ((a?.g / global.fan_velocity_constant) / a?.ld_area) * ((a?.g / global.fan_velocity_constant) / a?.ld_area) -
                                global.fan_velocity_pressure * ((b?.g / global.fan_velocity_constant) / b?.ld_area) * ((b?.g / global.fan_velocity_constant) / b?.ld_area);
                        default:
                            return global.fan_velocity_pressure * ((a?.g / global.fan_velocity_constant) / a?.fan_area) * ((a?.g / global.fan_velocity_constant) / a?.fan_area) -
                                global.fan_velocity_pressure * ((b?.g / global.fan_velocity_constant) / b?.fan_area) * ((b?.g / global.fan_velocity_constant) / b?.fan_area);
                    }
                }
            },
        },
        {
            title: 'Static Pressure(Pa)',
            align: 'center',
            key: Math.random(),
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return (record?.p - (global.fan_velocity_pressure * ((record?.g / global.fan_velocity_constant) / record?.fan_area) * ((record?.g / global.fan_velocity_constant) / record?.fan_area))).toFixed(2)
                    case 'sd':
                        return (record?.p - (global.fan_velocity_pressure * ((record?.g / global.fan_velocity_constant) / record?.sd_area) * ((record?.g / global.fan_velocity_constant) / record?.sd_area))).toFixed(2)
                    case 'ld':
                        return (record?.p - (global.fan_velocity_pressure * ((record?.g / global.fan_velocity_constant) / record?.ld_area) * ((record?.g / global.fan_velocity_constant) / record?.ld_area))).toFixed(2)
                    default:
                        return (record?.p - (global.fan_velocity_pressure * ((record?.g / global.fan_velocity_constant) / record?.fan_area) * ((record?.g / global.fan_velocity_constant) / record?.fan_area))).toFixed(2)
                }
            },
        },
        {
            title: 'Fan Speed(rpm)',
            align: 'center',
            dataIndex: 'n',
            key: 'n',
            render: (record) => (record).toFixed(2),
            sorter: {
                compare: (a, b) => a?.n - b?.n,
            },
        },
        {
            title: 'Power(kW)',
            align: 'center',
            dataIndex: 'N_FAN',
            key: 'N_FAN',
            sorter: {
                compare: (a, b) => a?.N_FAN - b?.N_FAN,
            },
        },
        {
            title: 'Power VFD(kW)',
            align: 'center',
            key: Math.random(),
            render: (record) => (record?.N_FAN * global.vfd_constant).toFixed(2),
            sorter: {
                compare: (a, b) => a?.N_FAN * global.vfd_constant - b?.N_FAN * global.vfd_constant,
            },
        },
        {
            title: 'Total Efficiency',
            align: 'center',
            dataIndex: 'EFF_TT',
            key: 'EFF_TT',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.EFF_TT - b?.EFF_TT,
            },
        },
        {
            title: 'Total Static Efficiency',
            align: 'center',
            dataIndex: 'EFF_TS',
            key: 'EFF_TS',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.EFF_TS - b?.EFF_TS,
            },
        },
        {
            title: 'Total Pressure(Pa)',
            align: 'center',
            dataIndex: 'PRTT',
            key: 'PRTT',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.PRTT - b?.PRTT,
            },
        },
        {
            title: 'Static Pressure(Pa)',
            align: 'center',
            dataIndex: 'PRTS',
            key: 'PRTS',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.PRTS - b?.PRTS,
            },
        },
        {
            title: 'LpA',
            align: 'center',
            dataIndex: 'LpA',
            key: 'LpA',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.LpA - b?.LpA,
            },
        },
        {
            title: 'Lp',
            align: 'center',
            dataIndex: 'Lp',
            key: 'Lp',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.Lp - b?.Lp,
            },
        },
        {
            title: 'LwAt',
            align: 'center',
            dataIndex: 'LwAt',
            key: 'LwAt',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.LwAt - b?.LwAt,
            },
        },
        {
            title: 'Lwt',
            align: 'center',
            dataIndex: 'Lwt',
            key: 'Lwt',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.Lwt - b?.Lwt,
            },
        },
        {
            title: 'LwAi',
            align: 'center',
            dataIndex: 'LwAi',
            key: 'LwAi',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.LwAi - b?.LwAi,
            },
        },
        {
            title: 'Lwi',
            align: 'center',
            dataIndex: 'Lwi',
            key: 'Lwi',
            className: 'hidden',
            sorter: {
                compare: (a, b) => a?.Lwi - b?.Lwi,
            },
        },
        {
            title: 'Max Torque Required(Nm)',
            align: 'center',
            key: Math.random(),
            render: (record) => (((record?.N_FAN * 1000) * 60) / (2 * 3.14 * record?.n)).toFixed(2),
            sorter: {
                compare: (a, b) => ((a?.N_FAN * 1000) * 60) / (2 * 3.14 * a?.n) - ((b?.N_FAN * 1000) * 60) / (2 * 3.14 * b?.n),
            },
        },
        {
            title: 'Total Efficiency(%)',
            align: 'center',
            key: Math.random(),
            render: (record) => (record?.EFF_TT * 100).toFixed(2),
            sorter: {
                compare: (a, b) => a?.EFF_TT * 100 - b?.EFF_TT * 100,
            },
        },
        {
            title: 'Static Efficiency(%)',
            align: 'center',
            key: Math.random(),
            render: (record) => ((((record?.g / global.fan_velocity_constant) * record?.p) / 1000) / record?.N_FAN).toFixed(2),
            sorter: {
                compare: (a, b) => (((a?.g / global.fan_velocity_constant) * a?.p) / 1000) / a?.N_FAN - (((b?.g / global.fan_velocity_constant) * b?.p) / 1000) / b?.N_FAN,
            },
        },
        {
            title: 'Inlet Sound Power Level(dbA)',
            align: 'center',
            dataIndex: 'LwAi',
            key: 'LwAi',
            sorter: {
                compare: (a, b) => a?.LwAi - b?.LwAi,
            },
        },
        {
            title: 'Outlet Sound Power Level(dbA)',
            align: 'center',
            dataIndex: 'LwAi',
            key: 'LwAi',
            sorter: {
                compare: (a, b) => a?.LwAi - b?.LwAi,
            },
        },
        {
            title: 'Sound Pressure Level(dbA)',
            align: 'center',
            dataIndex: 'LpA',
            key: 'LpA',
            sorter: {
                compare: (a, b) => a?.LpA - b?.LpA,
            },
        },
        {
            title: 'Breakout Sound Power Level',
            align: 'center',
            key: Math.random(),
            className: 'hidden'
        },
        {
            title: 'Breakout Sound Pressure Level',
            align: 'center',
            key: Math.random(),
            className: 'hidden'
        },
        {
            title: 'Specific Fan Power(kw/m³s)',
            align: 'center',
            key: Math.random(),
            render: (record) => (record?.N_FAN / (record?.g / global.fan_velocity_constant)).toFixed(2),
            sorter: {
                compare: (a, b) => a?.N_FAN / (a?.g / global.fan_velocity_constant) - b?.N_FAN / (b?.g / global.fan_velocity_constant),
            },
        }
    ].filter(item => (item.diffuser == undefined || item.diffuser == diffuser));


    const [listData, setListData] = useState({
        data: [],
        pagination: null,
        sortField: null,
        sortOrder: null,
        filter: null,
        loading: true,
        tableChange: false,
        display: false
    });

    const searchfansdata = async (obj) => {
        setListData((prev) => ({ ...prev, loading: true }));
        await FansDataService.searchfansdata(obj)
            .then((res) => {
                if (res.is_success) {
                    setListData((prev) => ({
                        ...prev,
                        data: res?.data,
                        display: true,
                        loading: false,
                    }));
                }
                else {
                    setListData((prev) => ({ ...prev, data: [], loading: false }));
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: res?.message
                        }, visible: true
                    }));
                }

            })
            .catch((err) => {
                setListData((prev) => ({ ...prev, data: [], loading: false }));
                setNotify((prev) => ({
                    ...prev, options: {
                        type: "danger",
                        message: err?.message
                    }, visible: true
                }));
            });
    };

    const getunitdatabyid = async () => {
        await UnitService.getunitdatabyid(id)
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setUnit(
                            resp?.data
                        )
                    }
                    else {
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "danger",
                                message: resp?.message
                            }, visible: true
                        }));
                    }
                },
                (err) => {
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    const getprojects = async () => {
        await ProjectService.getprojects()
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setLookupProjects(resp?.data);
                    }
                    else {
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "danger",
                                message: resp?.message
                            }, visible: true
                        }));
                    }
                },
                (err) => {
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    const getlookupfans = async () => {
        await LookupService.getfans()
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setLookupDiameter(resp?.data);
                    }
                    else {
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "danger",
                                message: resp?.message
                            }, visible: true
                        }));
                    }
                },
                (err) => {
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    const getunitsbyprojectid = async (e) => {
        let proj_id = e.target.value;
        console.log(proj_id)
        await ProjectService.getunitsbyprojectid(proj_id)
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setUnitList(resp?.data);
                    }
                    else {
                        setUnitList(resp?.data);
                    }
                },
                (err) => {
                    setUnitList((prev) => ({ ...prev, loading: false }));
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    const getunitbyunitid = async (e) => {
        let pu_id = e.target.value;
        console.log(pu_id)
        await UnitService.getunitbyid(pu_id)
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setUnit(resp?.data);
                    }
                    else {
                        setUnit(resp?.data);
                    }
                },
                (err) => {
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    function onChangeValue(event) {
        setDiffuser(event.target.value);
    }

    function onChangeSearchFanValue(event) {
        setSearchFanCriteria(event.target.value);
    }

    const cancel = () => {
        reset();
    };

    useEffect(() => {
        if (diffuser) {

        }
    }, [diffuser]);

    useEffect(() => {
        if (unit) {
            reset(unit);
            // getrecordsbyairflowpressure({
            //     airflow: 50000,
            //     pressure: 490
            // })
        }
    }, [unit]);


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedFan(
                {
                    diameter : selectedRows[0]?.mm, 
                    angle : selectedRows[0]?.ang,  
                    air_flow : selectedRows[0]?.g,  
                    pressure : selectedRows[0]?.p,  
                    fan_velocity : parseFloat((() => {
                        switch (diffuser) {
                            case 'no':
                                return ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area)
                            case 'sd':
                                return ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.sd_area)
                            case 'ld':
                                return ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.ld_area)
                            default:
                                return ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area)
                        }
                    })()),  
                    velocity_pressure : parseFloat((() => {
                        switch (diffuser) {
                            case 'no':
                                return (global.fan_velocity_pressure * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area) * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area))
                            case 'sd':
                                return (global.fan_velocity_pressure * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.sd_area) * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.sd_area))
                            case 'ld':
                                return (global.fan_velocity_pressure * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.ld_area) * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.ld_area))
                            default:
                                return (global.fan_velocity_pressure * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area) * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area))
                        }
                    })()), 
                    static_pressure : parseFloat((() => {
                        switch (diffuser) {
                            case 'no':
                                return (selectedRows[0]?.p - (global.fan_velocity_pressure * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area) * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area)))
                            case 'sd':
                                return (selectedRows[0]?.p - (global.fan_velocity_pressure * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.sd_area) * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.sd_area)))
                            case 'ld':
                                return (selectedRows[0]?.p - (global.fan_velocity_pressure * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.ld_area) * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.ld_area)))
                            default:
                                return (selectedRows[0]?.p - (global.fan_velocity_pressure * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area) * ((selectedRows[0]?.g / global.fan_velocity_constant) / selectedRows[0]?.fan_area)))
                        }
                    })()),   
                    fan_speed : selectedRows[0]?.n,  
                    power : selectedRows[0]?.N_FAN,   
                    power_vfd : (selectedRows[0]?.N_FAN * global.vfd_constant),  
                    total_efficiency : selectedRows[0]?.EFF_TT, 
                    total_static_efficiency : selectedRows[0]?.EFF_TS,   
                    total_pressure : selectedRows[0]?.PRTT, 
                    static_pressure_prts : selectedRows[0]?.PRTS,  
                    lpa : selectedRows[0]?.LpA,   
                    lp : selectedRows[0]?.Lp,  
                    lwat : selectedRows[0]?.LwAt,  
                    lwt : selectedRows[0]?.Lwt,  
                    lwai : selectedRows[0]?.LwAi, 
                    lwi : selectedRows[0]?.Lwi,  
                    max_torque_required : (((selectedRows[0]?.N_FAN * 1000) * 60) / (2 * 3.14 * selectedRows[0]?.n)),
                    total_efficiency_percentage : (selectedRows[0]?.EFF_TT * 100),
                    static_pressure_percentage : ((((selectedRows[0]?.g / global.fan_velocity_constant) * selectedRows[0]?.p) / 1000) / selectedRows[0]?.N_FAN),  
                    inlet_sound_power_level : selectedRows[0]?.LwAi,  
                    outlet_sound_power_level : selectedRows[0]?.LwAi, 
                    sound_pressure_level : selectedRows[0]?.LpA,  
                    breakout_sound_power_level : null,  
                    breakout_sound_pressure_level : null,  
                    specific_fan_power : (selectedRows[0]?.N_FAN / (selectedRows[0]?.g / global.fan_velocity_constant)),
                    pu_id:  id
                }
            )
            console.log(selectedFan);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const onPageLoad = () => {
        if (id) {
            getunitdatabyid();
            getlookupfans();
        }
        else {
            getprojects();
        }
    };

    useEffect(() => onPageLoad(), []);


    useEffect(() => {
        if (notify.visible) {
            setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false })); }, 3000);
        }
    }, [notify]);

    const submit = async (obj) => {
        console.log(obj);
    };

    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <nav aria-label="breadcrumb" className="container-fluid" style={{ marginTop: "20px" }}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item "><NavLink to="/dashboard" >Dashboard</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/projects" >Projects</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to={`/editproject/${unit?.proj_id}`} >{unit?.pu_no}</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">{unit?.unit_name}</li>
                    </ol>
                </nav>
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Unit Data</h1>
                    {notify?.visible && <Notify options={notify?.options} />}
                    <div className="page-content">
                        <form>
                            {id &&
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label >Project Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="proj_name"
                                            disabled={true}
                                            {...register("proj_name", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                        />
                                        {errors.proj_name &&
                                            errors.proj_name.type == "required" && (
                                                <span className='error-text'>
                                                    Project name is a required field
                                                </span>
                                            )}

                                    </div>

                                    <div className="form-group col-md-6 ">
                                        <label>Unit Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="unit_name"
                                            disabled={true}
                                            {...register("unit_name", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                        />
                                        {errors.unit_name &&
                                            errors.unit_name.type == "required" && (
                                                <span className='error-text'>
                                                    Unit name is a required field
                                                </span>
                                            )}
                                    </div>
                                </div>}
                            {
                                !id && <div className="row">
                                    <div className="form-group col-md-6">
                                        <label >Project Name</label>
                                        <select
                                            className="form-control"
                                            defaultValue=""
                                            name="proj_id"
                                            onChange={(e) => getunitsbyprojectid(e)}
                                        >
                                            <option value="">Select Project</option>
                                            {lookupProjects?.map((elm) => (
                                                <option key={elm.proj_id} value={elm.proj_id}>
                                                    {elm.proj_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group col-md-6 ">
                                        <label>Unit Name</label>
                                        <select
                                            className="form-control"
                                            defaultValue=""
                                            name="proj_id"
                                            onChange={(e) => getunitbyunitid(e)}
                                        >
                                            <option value="">Select Unit</option>
                                            {unitList?.map((elm) => (
                                                <option key={elm.pu_id} value={elm.pu_id}>
                                                    {elm.unit_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            }
                            {unit &&
                                <UnitDataForm register={register} errors={errors} unit={unit} />
                            }
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <h5>Search Fan</h5>
                                    <label className="mr-40">
                                        <input
                                            type='radio'
                                            className='mr-10'
                                            name="fancriteria"
                                            {...register("fancriteria", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                            value={"ap"}
                                            onChange={onChangeSearchFanValue}
                                            checked={searchFanCriteria === "ap"}
                                        /> Airflow & Pressure
                                    </label>
                                    <label className="mr-40">
                                        <input
                                            type='radio'
                                            className='mr-10'
                                            name="fancriteria"
                                            {...register("fancriteria", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                            value={"apd"}
                                            onChange={onChangeSearchFanValue}
                                            checked={searchFanCriteria === "apd"}
                                        /> Airflow, Pressure, Diameter
                                    </label>
                                    <label className="mr-40">
                                        <input
                                            type='radio'
                                            className='mr-10'
                                            name="fancriteria"
                                            {...register("fancriteria", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                            value={"apda"}
                                            onChange={onChangeSearchFanValue}
                                            checked={searchFanCriteria === "apda"}
                                        /> Airflow, Pressure, Diameter & Angle
                                    </label>
                                    <label className="mr-40">
                                        <input
                                            type='radio'
                                            className='mr-10'
                                            name="fancriteria"
                                            {...register("fancriteria", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                            value={"apdr"}
                                            onChange={onChangeSearchFanValue}
                                            checked={searchFanCriteria === "apdr"}
                                        /> Airflow, Pressure, Diameter Range
                                    </label>
                                    <label className="mr-40">
                                        <input
                                            type='radio'
                                            className='mr-10'
                                            name="fancriteria"
                                            {...register("fancriteria", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                            value={"apdar"}
                                            onChange={onChangeSearchFanValue}
                                            checked={searchFanCriteria === "apdar"}
                                        />Airflow, Pressure, Diameter & Angle Range
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <label >Airflow</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="airflow"
                                        disabled={true}
                                        {...register("airflow", {
                                            required: {
                                                value: true,
                                            },
                                        })}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label>Pressure</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="pressure"
                                        disabled={true}
                                        {...register("pressure", {
                                            required: {
                                                value: true,
                                            },
                                        })}
                                    />
                                </div>
                                {(searchFanCriteria === "apd" || searchFanCriteria === "apda" || searchFanCriteria === "apdar") &&
                                    <div className="form-group col-md-3">
                                        <label>Diameter</label>
                                        <select
                                            className="form-control"
                                            defaultValue=""
                                            name="fan_diameter"
                                            {...register("fan_diameter", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                        >
                                            <option value="">Select Diameter</option>
                                            {lookupDiameter?.map((elm) => (
                                                <option key={elm.fan_id} value={elm.fan_diameter}>
                                                    {elm.fan_diameter}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                }
                                {(searchFanCriteria === "apda") &&
                                    <div className="form-group col-md-3">
                                        <label>Angle</label>
                                        <select
                                            className="form-control"
                                            defaultValue=""
                                            name="angle"
                                            {...register("angle", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                        >
                                            <option value="">Select Angle</option>
                                            {global.angles?.map((elm) => (
                                                <option key={elm} value={elm}>
                                                    {elm}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                }
                                {(searchFanCriteria === "apdr") &&
                                    <>
                                        <div className="form-group col-md-3">
                                            <label>Start Diameter</label>
                                            <select
                                                className="form-control"
                                                defaultValue=""
                                                name="fan_start_diameter"
                                                {...register("fan_start_diameter", {
                                                    required: {
                                                        value: true,
                                                    },
                                                })}
                                                onChange={(e) => setEndDiameter(e.target.value)}
                                            >
                                                <option value="">Select Diameter</option>
                                                {lookupDiameter?.map((elm) => (
                                                    <option key={elm.fan_id} value={elm.fan_diameter}>
                                                        {elm.fan_diameter}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label>End Diameter</label>
                                            <select
                                                className="form-control"
                                                defaultValue=""
                                                name="fan_end_diameter"
                                                {...register("fan_end_diameter", {
                                                    required: {
                                                        value: true,
                                                    },
                                                })}
                                            >
                                                <option value="">Select Diameter</option>
                                                {lookupDiameter.filter(x => x.fan_diameter > endDiameter)?.map((elm) => (
                                                    <option key={elm.fan_id} value={elm.fan_diameter}>
                                                        {elm.fan_diameter}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                }
                                {(searchFanCriteria === "apdar") &&
                                    <>
                                        <div className="form-group col-md-3">
                                            <label>Start Angle</label>
                                            <select
                                                className="form-control"
                                                defaultValue=""
                                                name="start_angle"
                                                {...register("start_angle", {
                                                    required: {
                                                        value: true,
                                                    },
                                                })}
                                                onChange={(e) => setEndAngle(e.target.value)}
                                            >
                                                <option value="">Select Angle</option>
                                                {global.angles?.map((elm) => (
                                                    <option key={elm} value={elm}>
                                                        {elm}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label>End Angle</label>
                                            <select
                                                className="form-control"
                                                defaultValue=""
                                                name="end_angle"
                                                {...register("end_angle", {
                                                    required: {
                                                        value: true,
                                                    },
                                                })}
                                            >
                                                <option value="">Select Angle</option>
                                                {global.angles.filter(x => x > endAngle)?.map((elm) => (
                                                    <option key={elm} value={elm}>
                                                        {elm}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                }
                            </div>

                            <div className="" style={{ width: "100%", display: "inline-block", textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }}>
                                <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(searchfansdata)}>Search</button>
                            </div>
                        </form>
                        {listData.display &&
                            <div>
                                <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                                    <label className="mr-40">
                                        <input
                                            type='radio'
                                            className='mr-10'
                                            name="diffuser"
                                            defaultValue={"no"}
                                            onChange={onChangeValue}
                                            checked={diffuser === "no"}
                                        /> No diffuser
                                    </label>
                                    <label className="mr-40">
                                        <input
                                            type='radio'
                                            className='mr-10'
                                            name="diffuser"
                                            value={"sd"}
                                            onChange={onChangeValue}
                                            checked={diffuser === "sd"}
                                        /> Short diffuser
                                    </label>
                                    <label className="mr-40">
                                        <input
                                            type='radio'
                                            className=''
                                            name="diffuser"
                                            value={"ld"}
                                            onChange={onChangeValue}
                                            checked={diffuser === "ld"}
                                        /> Long diffuser
                                    </label>
                                </div>
                                <Table
                                    columns={columns}
                                    rowSelection={{
                                        type: 'radio',
                                        ...rowSelection
                                    }}
                                    className='fans-data'
                                    rowKey="uuid"
                                    dataSource={listData.data}
                                    pagination={false}
                                    loading={listData.loading}
                                    scroll={{ x: true }}
                                />
                                <div className="" style={{ width: "100%", display: "inline-block", textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }}>
                                    <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Save Selected Fan</button>
                                    <button type="button" className="btn btn-primary mr-10" onClick={() =>{setIsOpen(true);}} style={{ backgroundColor: "#9ec023", borderColor: "#9ec023" }}>Check Motor</button>
                                    <button type="button" className="btn btn-primary" style={{ backgroundColor: "#007bff", borderColor: "#9ec023" }}>Show Graph</button>
                                </div>

                                <div><pre>{JSON.stringify(selectedFan, null, 2) }</pre></div>
                            </div>
                        }
                    </div>
                </div>
            </main>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
            >
              <MotorsPopup onClose={toggleModal} selectedFan={selectedFan}></MotorsPopup>
            </Modal>
        </>
    )
};

export default UnitData;