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
import { faFilePdf, faSave, faChartArea } from '@fortawesome/fontawesome-free-solid'
import * as xlsx from "xlsx";
import UnitService from '../../../services/unitservices';
import LookupService from '../../../services/lookupservices';
import UnitDataForm from '../../../components/forms/unitdataform';
import { Table, Radio } from "antd";
import FansDataService from '../../../services/fansdataservice';
import ProjectService from '../../../services/projectservices';
import { global } from '../../../constants/global';
import Modal from "react-modal";
import MotorsPopup from '../../motors/motorspopup/motorspopup';
import GraphPopup from '../../../components/graph/graphpopup';
import Loader from '../../../components/loader/loader';
import MotorsPopupDetail from '../../motors/motorspopup/motorspopupdetail';
import Alert from '../../../components/alert/alert';
const UnitData = () => {
    const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [unit, setUnit] = useState(null);
    const [notify, setNotify] = useState({ options: [], visible: false });
    const [alert, setAlert] = useState({ options: [], visible: false });
    const [lookupProjects, setLookupProjects] = useState([]);
    const [lookupDiameter, setLookupDiameter] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [searchFanCriteria, setSearchFanCriteria] = useState("ap");
    const [diffuser, setDiffuser] = useState("no");
    const [endDiameter, setEndDiameter] = useState(null);
    const [endAngle, setEndAngle] = useState(null);
    const [selectedFan, setSelectedFan] = useState(null);
    const [checkSelectedFanMotor, setCheckSelectedFanMotor] = useState(null);
    const [popupMode, setPopupMode] = useState(null);
    const {
        register,
        watch,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({ mode: "all" });


    const _column = [
        {
            title: 'Action',
            fixed: true,
            width: 200,
            render: (record) => <div key={record?.unit_fan_id}>
                <Radio value={record?.unit_fan_id} name='unit_fan_id' checked={record?.unit_fan_id == unit?.unit_fan_id} onClick={() => setfanfromselectedfans(record?.unit_fan_id)}></Radio>
                <button className={record?.motor_id > 0 ? 'btn btn-info mr-10' : 'btn btn-light mr-10'} title='Check Motor' type='button' onClick={() => checkMotor(record)} ><img src={"../assets/images/electric-motor.png"} width={20} /></button>
                <button className='btn btn-success' type='button' onClick={() => plotgraph(record)} title='Show Graph'><FontAwesomeIcon icon={faChartArea} /></button>
            </div>,
        },
        {
            title: 'Diameter(mm)',
            dataIndex: 'diameter',
            key: 'diameter',
            align: 'center',
            fixed: true,
            width: 150
        },
        {
            title: 'Angle(°)',
            dataIndex: 'angle',
            key: 'angle',
            align: 'center',
            fixed: true,
            width: 150
        },
        {
            title: 'Airflow(CFM)',
            dataIndex: 'air_flow',
            key: 'air_flow',
            align: 'center',
            width: 150
        },
        {
            title: 'Pressure(Pa)',
            dataIndex: 'pressure',
            key: 'pressure',
            align: 'center',
            width: 150
        },
        {
            title: 'Fan Velocity(m/s)',
            dataIndex: 'fan_velocity',
            key: 'fan_velocity',
            align: 'center',
            width: 200,
            render: (record) => (record)?.toFixed(2),
        },
        {
            title: 'Velocity Pressure(Pa)',
            dataIndex: 'velocity_pressure',
            key: 'velocity_pressure',
            align: 'center',
            width: 200,
            render: (record) => (record)?.toFixed(2),
        },
        {
            title: 'Static Pressure(Pa)',
            dataIndex: 'static_pressure',
            key: 'static_pressure',
            align: 'center',
            width: 200,
            render: (record) => (record)?.toFixed(2),
        },
        {
            title: 'Fan Speed(rpm)',
            align: 'center',
            dataIndex: 'fan_speed',
            key: 'fan_speed',
            width: 150,
            render: (record) => (record)?.toFixed(2),
        },
        {
            title: 'Power(kW)',
            align: 'center',
            dataIndex: 'power',
            key: 'power',
            width: 150
        },
        {
            title: 'Power VFD(kW)',
            align: 'center',
            dataIndex: 'power_vfd',
            key: 'power_vfd',
            width: 150,
            render: (record) => (record)?.toFixed(2),
        },
        {
            title: 'Total Efficiency',
            align: 'center',
            dataIndex: 'total_efficiency',
            key: 'total_efficiency',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Total Static Efficiency',
            align: 'center',
            dataIndex: 'total_static_efficiency',
            key: 'total_static_efficiency',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Total Pressure(Pa)',
            align: 'center',
            dataIndex: 'total_pressure',
            key: 'total_pressure',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Static Pressure(Pa)',
            align: 'center',
            dataIndex: 'static_pressure_prts',
            key: 'static_pressure_prts',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'LpA',
            align: 'center',
            dataIndex: 'lpa',
            key: 'lpa',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Lp',
            align: 'center',
            dataIndex: 'lp',
            key: 'lp',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'LwAt',
            align: 'center',
            dataIndex: 'lwat',
            key: 'lwat',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Lwt',
            align: 'center',
            dataIndex: 'lwt',
            key: 'lwt',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'LwAi',
            align: 'center',
            dataIndex: 'lwai',
            key: 'lwai',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Lwi',
            align: 'center',
            dataIndex: 'lwi',
            key: 'lwi',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Max Torque Required(Nm)',
            align: 'center',
            dataIndex: 'max_torque_required',
            key: 'max_torque_required',
            width: 220,
            render: (record) => (record)?.toFixed(2),
        },
        {
            title: 'Total Efficiency(%)',
            align: 'center',
            dataIndex: 'total_efficiency_percentage',
            key: 'total_efficiency_percentage',
            width: 200,
            render: (record) => (record)?.toFixed(2),
        },
        {
            title: 'Static Efficiency(%)',
            align: 'center',
            dataIndex: 'static_pressure_percentage',
            key: 'static_pressure_percentage',
            width: 250,
            render: (record) => (record)?.toFixed(2),
        },
        {
            title: 'Inlet Sound Power Level(dbA)',
            align: 'center',
            dataIndex: 'lwai',
            key: 'lwai',
            width: 250
        },
        {
            title: 'Outlet Sound Power Level(dbA)',
            align: 'center',
            dataIndex: 'lwai',
            key: 'lwai',
            width: 250
        },
        {
            title: 'Sound Pressure Level(dbA)',
            align: 'center',
            dataIndex: 'sound_pressure_level',
            key: 'sound_pressure_level',
            width: 250
        },
        {
            title: 'Breakout Sound Power Level',
            align: 'center',
            dataIndex: 'breakout_sound_power_level',
            key: 'breakout_sound_power_level',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Breakout Sound Pressure Level',
            align: 'center',
            dataIndex: 'breakout_sound_pressure_level',
            key: 'breakout_sound_pressure_level',
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Specific Fan Power(kw/m³s)',
            align: 'center',
            dataIndex: 'specific_fan_power',
            key: 'specific_fan_power',
            width: 250,
            render: (record) => (record)?.toFixed(2),
        },
    ].filter(item => !item.hidden);

    const columns_ = [
        {
            title: 'Action',
            fixed: true,
            width: 200,
            // key: 'pu_id',
            render: (record) => <>
                <button className='btn btn-primary mr-10' title='Save Fan' onClick={() => saveselectedfandata(record, "save")} ><FontAwesomeIcon icon={faSave} /></button>
                <button className='btn btn-info mr-10' title='Check Motor' onClick={() => saveselectedfandata(record, "motor")} > <img src={"../assets/images/electric-motor.png"} width={20} /></button>
                <button className='btn btn-success' type='button' onClick={() => checkPlotgraph(record)} title='Show Graph'><FontAwesomeIcon icon={faChartArea} /></button>
            </>,
        },
        {
            title: 'Diameter(mm)',
            dataIndex: 'diameter',
            key: 'diameter',
            align: 'center',
            fixed: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.diameter - b?.diameter
            },
        },
        {
            title: 'Angle(°)',
            dataIndex: 'angle',
            key: 'angle',
            align: 'center',
            fixed: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.angle - b?.angle
            },
        },
        {
            title: 'Airflow(CFM)',
            dataIndex: 'air_flow',
            key: 'air_flow',
            align: 'center',
            width: 150,
            sorter: {
                compare: (a, b) => a?.air_flow - b?.air_flow,
            },
        },
        {
            title: 'Pressure(Pa)',
            dataIndex: 'pressure',
            key: 'pressure',
            align: 'center',
            width: 150,
            sorter: {
                compare: (a, b) => a?.pressure - b?.pressure,
            },
        },
        {
            title: '*Fan Area',
            key: Math.random(),
            align: 'center',
            width: 150,
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return (record?.fan_area)?.toFixed(2)
                    case 'sd':
                        return (record?.fan_area_sd)?.toFixed(2)
                    case 'ld':
                        return (record?.fan_area_ld)?.toFixed(2)
                    default:
                        return (record?.fan_area)?.toFixed(2)
                }
            },
            sorter: {
                compare: (a, b) => {
                    switch (diffuser) {
                        case 'no':
                            return a?.fan_area - b?.fan_area;
                        case 'sd':
                            return a?.fan_area_sd - b?.fan_area_sd;
                        case 'ld':
                            return a?.fan_area_ld - b?.fan_area_ld;
                        default:
                            return a?.fan_area - b?.fan_area;
                    }
                }
            },
        },
        {
            title: 'Airflow(m3/s)',
            dataIndex: 'air_flow_m3s',
            key: 'air_flow_m3s',
            align: 'center',
            width: 150,
            render: (record) => (record)?.toFixed(2),
            sorter: {
                compare: (a, b) => a?.air_flow_m3s - b?.air_flow_m3s,
            },
        },
        {
            title: 'Fan Velocity(m/s)',
            align: 'center',
            key: Math.random(),
            width: 200,
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return (record?.fan_velocity)?.toFixed(2)
                    case 'sd':
                        return (record?.fan_velocity_sd)?.toFixed(2)
                    case 'ld':
                        return (record?.fan_velocity_ld)?.toFixed(2)
                    default:
                        return (record?.fan_velocity)?.toFixed(2)
                }
            },
            sorter: {
                compare: (a, b) => {
                    switch (diffuser) {
                        case 'no':
                            return a?.fan_velocity - b?.fan_velocity;
                        case 'sd':
                            return a?.fan_velocity_sd - b?.fan_velocity_sd;
                        case 'ld':
                            return a?.fan_velocity_ld - b?.fan_velocity_ld;
                        default:
                            return a?.fan_velocity - b?.fan_velocity;
                    }
                }
            },
        },
        {
            title: 'Velocity Pressure(Pa)',
            align: 'center',
            key: Math.random(),
            width: 200,
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return (record?.velocity_pressure)?.toFixed(2)
                    case 'sd':
                        return (record?.velocity_pressure_sd)?.toFixed(2)
                    case 'ld':
                        return (record?.fan_velocity_ld)?.toFixed(2)
                    default:
                        return (record?.velocity_pressure)?.toFixed(2)
                }
            },
            sorter: {
                compare: (a, b) => {
                    switch (diffuser) {
                        case 'no':
                            return a?.velocity_pressure - b?.velocity_pressure;
                        case 'sd':
                            return a?.velocity_pressure_sd - b?.velocity_pressure_sd;
                        case 'ld':
                            return a?.velocity_pressure_ld - b?.velocity_pressure_ld;
                        default:
                            return a?.velocity_pressure - b?.velocity_pressure;
                    }
                }
            },
        },
        {
            title: 'Static Pressure(Pa)',
            align: 'center',
            key: Math.random(),
            width: 200,
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return (record?.static_pressure)?.toFixed(2)
                    case 'sd':
                        return (record?.static_pressure_sd)?.toFixed(2)
                    case 'ld':
                        return (record?.static_pressure_ld)?.toFixed(2)
                    default:
                        return (record?.static_pressure)?.toFixed(2)
                }
            },
            sorter: {
                compare: (a, b) => {
                    switch (diffuser) {
                        case 'no':
                            return a?.static_pressure - b?.static_pressure;
                        case 'sd':
                            return a?.static_pressure_sd - b?.static_pressure_sd;
                        case 'ld':
                            return a?.static_pressure_ld - b?.static_pressure_ld;
                        default:
                            return a?.static_pressure - b?.static_pressure;
                    }
                }
            },
        },
        {
            title: 'Fan Speed(rpm)',
            align: 'center',
            dataIndex: 'fan_speed',
            key: 'fan_speed',
            width: 150,
            render: (record) => (record)?.toFixed(2),
            sorter: {
                compare: (a, b) => a?.fan_speed - b?.fan_speed,
            },
        },
        {
            title: 'Power(kW)',
            align: 'center',
            dataIndex: 'power',
            key: 'power',
            width: 150,
            sorter: {
                compare: (a, b) => a?.power - b?.power,
            },
        },
        {
            title: 'Power VFD(kW)',
            align: 'center',
            dataIndex: 'power_vfd',
            key: 'power_vfd',
            width: 150,
            render: (record) => (record)?.toFixed(2),
            sorter: {
                compare: (a, b) => a?.power_vfd - b?.power_vfd,
            },
        },
        {
            title: 'Total Efficiency',
            align: 'center',
            dataIndex: 'total_efficiency',
            key: 'total_efficiency',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.total_efficiency - b?.total_efficiency,
            },
        },
        {
            title: 'Total Static Efficiency',
            align: 'center',
            dataIndex: 'total_static_efficiency',
            key: 'total_static_efficiency',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.total_static_efficiency - b?.total_static_efficiency,
            },
        },
        {
            title: 'Total Pressure(Pa)',
            align: 'center',
            dataIndex: 'total_pressure',
            key: 'total_pressure',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.total_pressure - b?.total_pressure,
            },
        },
        {
            title: 'Static Pressure(Pa)',
            align: 'center',
            dataIndex: 'static_pressure_prts',
            key: 'static_pressure_prts',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.static_pressure_prts - b?.static_pressure_prts,
            },
        },
        {
            title: 'LpA',
            align: 'center',
            dataIndex: 'lpa',
            key: 'lpa',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.lpa - b?.lpa,
            },
        },
        {
            title: 'Lp',
            align: 'center',
            dataIndex: 'lp',
            key: 'lp',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.lp - b?.lp,
            },
        },
        {
            title: 'LwAt',
            align: 'center',
            dataIndex: 'lwat',
            key: 'lwat',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.lwat - b?.lwat,
            },
        },
        {
            title: 'Lwt',
            align: 'center',
            dataIndex: 'Lwt',
            key: 'Lwt',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.lwt - b?.lwt,
            },
        },
        {
            title: 'LwAi',
            align: 'center',
            dataIndex: 'lwai',
            key: 'lwai',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.lwai - b?.lwai,
            },
        },
        {
            title: 'Lwi',
            align: 'center',
            dataIndex: 'lwi',
            key: 'lwi',
            //className: 'hidden',
            hidden: true,
            width: 150,
            sorter: {
                compare: (a, b) => a?.lwi - b?.lwi,
            },
        },
        {
            title: 'Max Torque Required(Nm)',
            align: 'center',
            dataIndex: 'max_torque_required',
            key: 'max_torque_required',
            //className: 'hidden',  
            //hidden: true,
            width: 200,
            render: (record) => (record)?.toFixed(2),
            sorter: {
                compare: (a, b) => a?.max_torque_required - b?.max_torque_required,
            },
        },
        {
            title: 'Total Efficiency(%)',
            align: 'center',
            dataIndex: 'total_efficiency_percentage',
            key: 'total_efficiency_percentage',
            //className: 'hidden',
            //hidden: true,
            width: 200,
            render: (record) => (record)?.toFixed(2),
            sorter: {
                compare: (a, b) => a?.total_efficiency_percentage - b?.total_efficiency_percentage,
            },
        },
        {
            title: 'Static Efficiency(%)',
            align: 'center',
            key: Math.random(),
            width: 200,
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return (record?.static_pressure_percentage)?.toFixed(2)
                    case 'sd':
                        return (record?.static_pressure_percentage_sd)?.toFixed(2)
                    case 'ld':
                        return (record?.static_pressure_percentage_ld)?.toFixed(2)
                    default:
                        return (record?.static_pressure_percentage)?.toFixed(2)
                }
            },
            sorter: {
                compare: (a, b) => {
                    switch (diffuser) {
                        case 'no':
                            return a?.static_pressure_percentage - b?.static_pressure_percentage;
                        case 'sd':
                            return a?.static_pressure_percentage_sd - b?.static_pressure_percentage_sd;
                        case 'ld':
                            return a?.static_pressure_percentage_ld - b?.static_pressure_percentage_ld;
                        default:
                            return a?.static_pressure_percentage - b?.static_pressure_percentage;
                    }
                }
            },
        },
        {
            title: 'Inlet Sound Power Level(dbA)',
            align: 'center',
            dataIndex: 'inlet_sound_power_level',
            key: 'inlet_sound_power_level',
            width: 250,
            sorter: {
                compare: (a, b) => a?.inlet_sound_power_level - b?.inlet_sound_power_level,
            },
        },
        {
            title: 'Outlet Sound Power Level(dbA)',
            align: 'center',
            dataIndex: 'outlet_sound_power_level',
            key: 'outlet_sound_power_level',
            width: 250,
            sorter: {
                compare: (a, b) => a?.outlet_sound_power_level - b?.outlet_sound_power_level,
            },
        },
        {
            title: 'Sound Pressure Level(dbA)',
            align: 'center',
            dataIndex: 'sound_pressure_level',
            key: 'sound_pressure_level',
            width: 250,
            sorter: {
                compare: (a, b) => a?.sound_pressure_level - b?.sound_pressure_level,
            },
        },
        {
            title: 'Breakout Sound Power Level',
            align: 'center',
            dataIndex: 'breakout_sound_power_level',
            key: 'breakout_sound_power_level',
            width: 150,
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Breakout Sound Pressure Level',
            align: 'center',
            dataIndex: 'breakout_sound_pressure_level',
            key: 'breakout_sound_pressure_level',
            width: 150,
            //className: 'hidden',
            hidden: true,
        },
        {
            title: 'Specific Fan Power(kw/m³s)',
            align: 'center',
            dataIndex: 'specific_fan_power',
            key: 'specific_fan_power',
            width: 250,
            render: (record) => (record)?.toFixed(2),
            sorter: {
                compare: (a, b) => a?.specific_fan_power - b?.specific_fan_power,
            },
        }
    ].filter(item => !item.hidden);


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

    const [listDataSelectedFans, setListDataSelectedFans] = useState({
        data: [],
        pagination: false,
        sortField: null,
        sortOrder: null,
        filter: null,
        loading: true,
        tableChange: false,
        display: false
    });

    const searchfansdata = async (obj) => {
        obj.created_by = loggedInUser?.emp_id;
        obj.pu_id = id;
        setLoading(true);
        setListData((prev) => ({ ...prev, loading: true }));
        await FansDataService.searchfansdata(obj)
            .then((res) => {
                if (res.is_success) {
                    setLoading(false);
                    setListData((prev) => ({
                        ...prev,
                        data: res?.data,
                        display: true,
                        loading: false,
                    }));
                }
                else {
                    setLoading(false);
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
                setLoading(false);
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
                        let obj = resp?.data;
                        obj.airflowwithunits = obj.airflow + " " + obj.airflow_luc_name;
                        obj.pressurewithunits = obj.pressure + " " + obj.pressure_luc_name;
                        obj.airflow_conversion_withunits = obj.airflow_conversion + " CFM";
                        obj.pressure_conversion_withunits = obj.pressure_conversion + " Pa";
                        setUnit(obj);
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

    const getselectedfans = async () => {
        await FansDataService.getselectedfans(id)
            .then(
                (resp) => {
                    setListDataSelectedFans((prev) => ({
                        ...prev,
                        data: resp?.data,
                        loading: false,
                        pagination: false,
                    }));
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

    useEffect(() => {
        if (unit) {
            reset(unit);
        }
    }, [unit]);

    const saveselectedfandata = async (obj, event) => {
        setSelectedFan(
            {
                diameter: obj?.diameter,
                angle: obj?.angle,
                air_flow: obj?.air_flow,
                pressure: obj?.pressure,
                fan_velocity: parseFloat((() => {
                    switch (diffuser) {
                        case 'no':
                            return (obj?.fan_velocity)
                        case 'sd':
                            return (obj?.fan_velocity_sd)
                        case 'ld':
                            return (obj?.fan_velocity_ld)
                        default:
                            return (obj?.fan_velocity)
                    }
                })()),
                velocity_pressure: parseFloat((() => {
                    switch (diffuser) {
                        case 'no':
                            return (obj?.velocity_pressure)
                        case 'sd':
                            return (obj?.velocity_pressure_sd)
                        case 'ld':
                            return (obj?.fan_velocity_ld)
                        default:
                            return (obj?.velocity_pressure)
                    }
                })()),
                static_pressure: parseFloat((() => {
                    switch (diffuser) {
                        case 'no':
                            return (obj?.static_pressure)
                        case 'sd':
                            return (obj?.static_pressure_sd)
                        case 'ld':
                            return (obj?.static_pressure_ld)
                        default:
                            return (obj?.static_pressure)
                        }
                })()),
                fan_speed: Math.floor(obj?.fan_speed),
                power: obj?.power,
                power_vfd: obj?.power_vfd,
                total_efficiency: obj?.total_efficiency,
                total_static_efficiency: obj?.total_static_efficiency,
                total_pressure: obj?.total_pressure,
                static_pressure_prts: obj?.static_pressure_prts,
                lpa: obj?.lpa,
                lp: obj?.lp,
                lwat: obj?.lwat,
                lwt: obj?.lwt,
                lwai: obj?.lwai,
                lwi: obj?.lwi,
                max_torque_required: obj?.max_torque_required,
                total_efficiency_percentage: obj?.total_efficiency_percentage,
                static_pressure_percentage: parseFloat((() => {
                    switch (diffuser) {
                        case 'no':
                            return obj?.static_pressure_percentage
                        case 'sd':
                            return obj?.static_pressure_percentage_sd
                        case 'ld':
                            return obj?.static_pressure_percentage_ld
                        default:
                            return obj?.static_pressure_percentage  
                    }
                })()),
                inlet_sound_power_level: obj?.inlet_sound_power_level,
                outlet_sound_power_level: obj?.outlet_sound_power_level,
                sound_pressure_level: obj?.sound_pressure_level,
                breakout_sound_power_level: obj?.breakout_sound_power_level,
                breakout_sound_pressure_level: obj?.breakout_sound_pressure_level,
                specific_fan_power: obj?.specific_fan_power,
                pu_id: id,
                created_by: loggedInUser?.emp_id,
                event: event
            }
        )
    };

    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        if (isOpen) {
            setPopupMode(null);
            setImageData([]);
            onPageLoad();
        }
        setIsOpen(!isOpen);
    }

    function handleOK() {
        debugger;
        setIsOpen(!isOpen);
        setPopupMode(null);
        setImageData([]);
        onPageLoad();
    }

    useEffect(() => {
        if (popupMode) {
            toggleModal();
        }
    }, [popupMode]);

    useEffect(() => {
        if (listDataSelectedFans?.data?.length > 0) {
            if (listDataSelectedFans?.data?.filter(item => (item?.unit_fan_id == unit?.unit_fan_id)).length > 0) {
                if (listDataSelectedFans?.data?.filter(item => (item?.unit_fan_id == unit?.unit_fan_id))[0].motor_id) {
                    setCheckSelectedFanMotor(listDataSelectedFans?.data?.filter(item => (item?.unit_fan_id == unit?.unit_fan_id))[0])
                }

            }
        }
    }, [listDataSelectedFans]);

    useEffect(() => {
        if (selectedFan) {
            if (selectedFan?.event == "save") {
                submit();
            }
            else if (selectedFan?.event == "motor") {
                setPopupMode("motor");
            }
            else if (selectedFan?.event == "selectmotor") {
                setPopupMode("selectmotor");
            }
            else if (selectedFan?.event == "motordetail") {
                setPopupMode("motordetail");
            }
        }
    }, [selectedFan]);

    const onPageLoad = () => {
        if (id) {
            getunitdatabyid();
            getselectedfans();
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

    const submit = async () => {
        setLoading(true);
        await UnitService.saveselectedfandata(selectedFan)
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setAlert((prev) => ({
                            ...prev, message: resp?.message, heading: "Saved"
                        }));
                        setPopupMode("alert");
                    }
                    else {
                        setAlert((prev) => ({
                            ...prev, message: resp?.message, heading: "Already Exist"
                        }));
                        setPopupMode("alert");
                    }
                    setLoading(false);
                },
                (err) => {
                    setLoading(false);
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    const setfanfromselectedfans = async (unit_fan_id) => {
        var obj = {
            pu_id: id,
            fan_selected_by: loggedInUser?.emp_id,
            unit_fan_id: unit_fan_id
        }
        setLoading(true);
        await FansDataService.setfanfromselectedfans(obj)
            .then(
                (resp) => {
                    if (resp.is_success) {
                        onPageLoad();
                        setLoading(false);
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "success",
                                message: resp?.message
                            }, visible: true
                        }));
                    }
                },
                (err) => {
                    setLoading(false);
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    const checkMotor = (obj) => {
        if (obj?.motor_id) {
            obj.event = "motordetail"
            setSelectedFan(obj);
        }
        else {
            obj.event = "selectmotor"
            setSelectedFan(obj);
        }
    }


    const changeMotor = () => {
        setIsOpen(false);
        setSelectedFan((prev) => ({
            ...prev, event: "selectmotor"
        }));
    }

    const [imageData, setImageData] = useState([]);


    const plotgraph = async (sf) => {
        setLoading(true);
        let obj = {
            "diameter": sf?.diameter,
            "airflow": sf?.air_flow,
            "pressure": sf?.pressure,
            "rpm": Math.round(sf?.fan_speed)
        }
        debugger;
        await FansDataService.generateorfetchfandatasheet(obj)
            .then(
                (resp) => {
                    debugger;
                    setLoading(false);
                    if(resp?.is_success){
                        setImageData(resp?.data);
                    }
                    else{
                        setAlert((prev) => ({
                            ...prev, message: resp?.message, heading: "Error"
                        }));
                        setPopupMode("alert");
                    }
                },
                (err) => {
                    setLoading(false);
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };


    const checkPlotgraph = async (sf) => {
        setLoading(true);
        let obj = {
            "diameter": sf?.diameter,
            "airflow": sf?.air_flow,
            "pressure": sf?.pressure,
            "rpm": Math.floor(sf?.fan_speed)
        }
       
        await FansDataService.plotgraph(obj)
            .then(
                (resp) => {
                    debugger;
                    setLoading(false);
                    if(resp?.is_success){
                        setImageData(resp?.data);
                    }
                    else{
                        setAlert((prev) => ({
                            ...prev, message: resp?.message, heading: "Error"
                        }));
                        setPopupMode("alert");
                    }
                },
                (err) => {
                    setLoading(false);
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    const generatefandatasheet = async (id) => {
        setLoading(true);
        await FansDataService.generatefandatasheet(id)
            .then(
                (resp) => {
                    if (resp.is_success) {
                        window.open(resp?.data, '_blank');
                    }
                    else {
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "danger",
                                message: resp?.message
                            }, visible: true
                        }));
                    }
                    setLoading(false);
                },
                (err) => {
                    setLoading(false);
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    useEffect(() => {

        if (imageData?.length > 0) {
            setPopupMode("graph");
        }
    }, [imageData]);

    return (
        <>
            <Header />
            <LeftSideBar />
            <Loader loader={loading} />
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
                          
                            {checkSelectedFanMotor &&
                                <div className="" style={{ width: "100%", display: "inline-block", textAlign: "center", paddingTop: "20px", paddingBottom: "20px" }}>
                                    <button className='btn btn-info mr-10' type='button' style={{ backgroundColor: "#5b65de", borderColor: "#5b65de" }}
                                        onClick={() => { generatefandatasheet(unit?.pu_id); }} ><FontAwesomeIcon icon={faFilePdf} /> Generate Fan Data Sheet</button> </div>}


                            {listDataSelectedFans.data.length > 0 && <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                                <h4>Selected Fans</h4>
                                <Table
                                    columns={_column}
                                    rowKey="unit_fan_id"
                                    dataSource={listDataSelectedFans.data}
                                    pagination={false}
                                    loading={listDataSelectedFans.loading}
                                    //scroll={{ x: "max-content" }}
                                    scroll={{ x: "750px", y: "600px" }}
                                    useFixedHeader={true}
                                />
                            </div>}


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
                                    {/* <label className="mr-40">
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
                                    </label> */}
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
                                    {/* <label className="mr-40">
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
                                    </label> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-3">
                                    <label >Airflow</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="airflow_conversion_withunits"
                                        disabled={true}
                                        {...register("airflow_conversion_withunits", {
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
                                        name="pressure_conversion_withunits"
                                        disabled={true}
                                        {...register("pressure_conversion_withunits", {
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
                        {notify?.visible && <Notify options={notify?.options} />}
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
                                {notify?.visible && <Notify options={notify?.options} />}
                                <Table
                                    columns={columns_}
                                    className='fans-data'
                                    rowKey="searched_unit_fan_id"
                                    dataSource={listData.data}
                                    pagination={false}
                                    loading={listData.loading}
                                    // scroll={{ x: "max-content" }}
                                    scroll={{ x: "750px", y: "600px" }}
                                    useFixedHeader={true}
                                />
                                {notify?.visible && <Notify options={notify?.options} />}
                            </div>
                        }
                    </div>
                </div>
            </main>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className={popupMode == "graph" || popupMode == "alert" ? "mygraphmodal" : "mymodal"}
                overlayClassName="myoverlay"
                shouldCloseOnOverlayClick={false}
            >
                {popupMode == "alert" && <Alert onClose={toggleModal} onOK={handleOK} heading={alert?.heading} message={alert?.message} />}
                {popupMode == "selectmotor" && <MotorsPopup onClose={toggleModal} selectedFan={selectedFan}></MotorsPopup>}
                {popupMode == "motor" && <MotorsPopup onClose={toggleModal} selectedFan={selectedFan}></MotorsPopup>}
                {popupMode == "motordetail" && <MotorsPopupDetail motor_id={selectedFan?.motor_id} onClose={toggleModal} changeMotor={changeMotor} />}
                {popupMode == "graph" && <GraphPopup onClose={toggleModal} selectedFan={selectedFan} imageData={imageData}></GraphPopup>}
            </Modal>
        </>
    )
};

export default UnitData;