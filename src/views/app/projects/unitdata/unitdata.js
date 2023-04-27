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

// Modal.setAppElement("#root")

const UnitData = () => {
    const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [unit, setUnit] = useState(null);
    const [notify, setNotify] = useState({ options: [], visible: false });
    const [lookupProjects, setLookupProjects] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [companyId, setCompanyId] = useState([]);
    const [diffuser, setDiffuser] = useState("no");
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
        },
        {
            title: 'Angle(°)',
            dataIndex: 'ang',
            key: 'ang',
            align: 'center',
        },
        {
            title: 'Airflow(CFM)',
            dataIndex: 'g',
            key: 'g',
            align: 'center',
        },
        {
            title: 'Pressure(Pa)',
            dataIndex: 'p',
            key: 'p',
            align: 'center',
        },
        // {
        //     title: 'SD Diameter',
        //     render: (record) => (`${record?.sd_diameter ? record?.sd_diameter : ''}`),
        //     diffuser:'sd'
        // },
        // {
        //     title: 'LD Diameter',
        //     render: (record) => (`${record?.ld_diameter ? record?.ld_diameter : ''}`),
        //     diffuser:'ld'
        // },
        // {
        //     title: 'Fan Area',
        //     render: (record) => (`${record?.fan_area ? record?.fan_area : ''}`),
        //     diffuser:'no'
        // },
        // {
        //     title: 'SD Area',
        //     render: (record) => (`${record?.sd_area ? record?.sd_area : ''}`),
        //     diffuser:'sd'
        // },
        // {
        //     title: 'LD Area',
        //     render: (record) => (`${record?.ld_area ? record?.ld_area : ''}`),
        //     diffuser:'ld'
        // },
        // {
        //     title : 'Air flow m3/s',
        //     render: (record) => (record?.g / 2118.88).toFixed(2),
        // },
        {
            title: 'Fan Velocity(m/s)',
            align: 'center',
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return ((record?.g / 2118.88) / record?.fan_area).toFixed(2)
                    case 'sd':
                        return ((record?.g / 2118.88) / record?.sd_area).toFixed(2)
                    case 'ld':
                        return ((record?.g / 2118.88) / record?.ld_area).toFixed(2)
                    default:
                        return ((record?.g / 2118.88) / record?.fan_area).toFixed(2)
                }
            },
        },
        {
            title: 'Velocity Pressure(Pa)',
            align: 'center',
            render: (record) => {
                switch (diffuser) {
                    case 'no':
                        return (0.6 * ((record?.g / 2118.88) / record?.fan_area) * ((record?.g / 2118.88) / record?.fan_area)).toFixed(2)
                    case 'sd':
                        return (0.6 * ((record?.g / 2118.88) / record?.sd_area) * ((record?.g / 2118.88) / record?.sd_area)).toFixed(2)
                    case 'ld':
                        return (0.6 * ((record?.g / 2118.88) / record?.ld_area) * ((record?.g / 2118.88) / record?.ld_area)).toFixed(2)
                    default:
                        return (0.6 * ((record?.g / 2118.88) / record?.fan_area) * ((record?.g / 2118.88) / record?.fan_area)).toFixed(2)
                }
            },
        },
        {
            title: 'Fan Speed(rpm)',
            align: 'center',
            dataIndex: 'n',
            key: 'n',
            render: (record) => (record).toFixed(2),
        },
        {
            title: 'Power(kW)',
            align: 'center',
            dataIndex: 'N_FAN',
            key: 'N_FAN',
        },
        {
            title: 'Total Efficiency',
            align: 'center',
            dataIndex: 'EFF_TT',
            key: 'EFF_TT',
            className: 'hidden'
        },
        {
            title: 'Total Static Efficiency',
            align: 'center',
            dataIndex: 'EFF_TS',
            key: 'EFF_TS',
            className: 'hidden'
        },
        {
            title: 'Total Pressure(Pa)',
            align: 'center',
            dataIndex: 'PRTT',
            key: 'PRTT',
            className: 'hidden'
        },
        {
            title: 'Static Pressure(Pa)',
            align: 'center',
            dataIndex: 'PRTS',
            key: 'PRTS',
            className: 'hidden'
        },
        {
            title: 'LpA',
            align: 'center',
            dataIndex: 'LpA',
            key: 'LpA',
            className: 'hidden'
        },
        {
            title: 'Lp',
            align: 'center',
            dataIndex: 'Lp',
            key: 'Lp',
            className: 'hidden'
        },
        {
            title: 'LwAt',
            align: 'center',
            dataIndex: 'LwAt',
            key: 'LwAt',
            className: 'hidden'
        },
        {
            title: 'Lwt',
            align: 'center',
            dataIndex: 'Lwt',
            key: 'Lwt',
            className: 'hidden'
        },
        {
            title: 'LwAi',
            align: 'center',
            dataIndex: 'LwAi',
            key: 'LwAi',
            className: 'hidden'
        },
        {
            title: 'Lwi',
            align: 'center',
            dataIndex: 'Lwi',
            key: 'Lwi',
            className: 'hidden'
        },
        {
            title: 'Max Torque Required(Nm)',
            align: 'center',
            render: (record) => (((record?.N_FAN * 1000) * 60) / (2 * 3.14 * record?.n)).toFixed(2),
        },
        {
            title: 'Total Efficiency(%)',
            align: 'center',
            render: (record) => (record?.EFF_TT * 100).toFixed(2),
        },
        {
            title: 'Static Efficiency(%)',
            align: 'center',
            render: (record) => (((((record?.g / 2118.88) * record?.p)) / 1000) / record?.N_FAN).toFixed(2),
        },
        {
            title: 'Inlet Sound Power Level(dbA)',
            align: 'center',
            dataIndex: 'LwAi',
            key: 'LwAi',
        },
        {
            title: 'Outlet Sound Power Level(dbA)',
            align: 'center',
            dataIndex: 'LwAi',
            key: 'LwAi',
        },
        {
            title: 'Sound Pressure Level(dbA)',
            align: 'center',
            dataIndex: 'LpA',
            key: 'LpA',
        },
        {
            title: 'Breakout Sound Power Level',
            align: 'center',
            className: 'hidden'
        },
        {
            title: 'Breakout Sound Pressure Level',
            align: 'center',
            className: 'hidden'
        },
        {
            title: 'Specific Fan Power(kw/m³s)',
            align: 'center',
            render: (record) => (record?.N_FAN /(record?.g/2118.88)).toFixed(2),
        }
    ].filter(item => item.diffuser == undefined || item.diffuser == diffuser);


    const [listData, setListData] = useState({
        data: [],
        pagination: null,
        sortField: null,
        sortOrder: null,
        filter: null,
        loading: true,
        tableChange: false,
    });

    const getrecordsbyairflowpressure = async (params = {}, id) => {
        setListData((prev) => ({ ...prev, loading: true }));
        await FansDataService.getrecordsbyairflowpressure({
            ...params,
        })
            .then(
                (resp) => {
                    setListData((prev) => ({
                        ...prev,
                        data: resp?.data,
                        loading: false,
                    }));
                },
                (err) => {
                    setListData((prev) => ({ ...prev, data: [], loading: false }));
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
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

    useEffect(() => {
        if (diffuser) {

        }
    }, [diffuser]);

    useEffect(() => {
        if (unit) {
            reset(unit);
            getrecordsbyairflowpressure({
                airflow: 50000,
                pressure: 490
            })
        }
    }, [unit]);

    const onPageLoad = () => {
        if (id) {
            getunitdatabyid();
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

    const submit = async (obj) => { };

    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <nav aria-label="breadcrumb" className="container-fluid" style={{ marginTop: "20px" }}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item "><NavLink to="/dashboard" >Dashboard</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/projects" >Projects</NavLink></li>
                        <li className="breadcrumb-item active" aria-current="page">{unit?.pu_no}</li>
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
                        </form>
                        <div>
                            <label className="mr-10">
                                <input
                                    type='radio'
                                    className='mr-10'
                                    name="diffuser"
                                    defaultValue={"no"}
                                    onChange={onChangeValue}
                                    checked={diffuser === "no"}
                                /> No diffuser
                            </label>
                            <label className="mr-10">
                                <input
                                    type='radio'
                                    className='mr-10'
                                    name="diffuser"
                                    value={"sd"}
                                    onChange={onChangeValue}
                                    checked={diffuser === "sd"}
                                /> Short diffuser
                            </label>
                            <label className="mr-10">
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
                            className='fans-data'
                            rowKey={new Date().getTime()}
                            dataSource={listData.data}
                            pagination={false}
                            loading={listData.loading}
                            scroll={{ x: "max-content" }}
                        />
                    </div>
                </div>
            </main>
        </>
    )
};

export default UnitData;