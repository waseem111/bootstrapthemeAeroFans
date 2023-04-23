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
            title: 'Diameter',
            dataIndex: 'mm',
            key: 'mm',
        },
        {
            title: 'Angle',
            dataIndex: 'ang',
            key: 'ang',
        },
        {
            title: 'Airflow',
            dataIndex: 'g',
            key: 'g',
        },
        {
            title: 'Pressure',
            dataIndex: 'p',
            key: 'p',
        },
        {
            title: 'Fan Speed',
            dataIndex: 'n',
            key: 'n',
        },
        {
            title: 'SD Diameter',
            render: (record) => (`${record?.sd_diameter ? record?.sd_diameter : ''}`),
        },
        {
            title: 'LD Diameter',
            render: (record) => (`${record?.ld_diameter ? record?.ld_diameter : ''}`),
        },
        {
            title: 'Fan Area',
            render: (record) => (`${record?.fan_area ? record?.fan_area : ''}`),
        },
        {
            title: 'SD Area',
            render: (record) => (`${record?.sd_area ? record?.sd_area : ''}`),
        },
        {
            title: 'LD Area',
            render: (record) => (`${record?.ld_area ? record?.ld_area : ''}`),
        },
        {
            title : 'Air flow m3/s',
            render: (record) => ~~(`${record?.g / 2118.88}`),
        },
        {
            title : 'Fan Velocity',
            render: (record) => (`${record?.fan_area / (record?.g/2118.88)}`),
        },
        {
            title : 'Velocity Pressure ',
            key:''
        },
        {
            title: 'Power',
            dataIndex: 'N_FAN',
            key: 'N_FAN',
        },
        {
            title: 'Total Efficinecy',
            dataIndex: 'EFF_TT',
            key: 'EFF_TT',
        },
        {
            title: 'Total Efficiency',
            dataIndex: 'EFF_TS',
            key: 'EFF_TS',
        },
        {
            title: 'Total Pressure',
            dataIndex: 'PRTT',
            key: 'PRTT',
        },
        {
            title: 'Static Pressure',
            dataIndex: 'PRTS',
            key: 'PRTS',
        },
        {
            title: 'LpA',
            dataIndex: 'LpA',
            key: 'LpA',
        },
        {
            title: 'Lp',
            dataIndex: 'Lp',
            key: 'Lp',
        },
        {
            title: 'LwAt',
            dataIndex: 'LwAt',
            key: 'LwAt',
        },
        {
            title: 'Lwt',
            dataIndex: 'Lwt',
            key: 'Lwt',
        },
        {
            title: 'LwAi',
            dataIndex: 'LwAi',
            key: 'LwAi',
        },
        {
            title: 'Lwi',
            dataIndex: 'Lwi',
            key: 'Lwi',
        },
    ];


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
                    else{
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
                    else{
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
        if(id)
        {
            getunitdatabyid();
        }
        else
        {
            getprojects();
        }
            
    };

    useEffect(() => onPageLoad(), []);


    useEffect(() => {
        if (notify.visible) {
            setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false })); }, 3000);
        }
    }, [notify]);

    const submit = async (obj) => {};

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
                            { id && 
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
                            </div> }
                            {
                                !id && <div className="row">
                                <div className="form-group col-md-6">
                                <label >Project Name</label>
                                <select
                                    className="form-control"
                                    defaultValue=""
                                    name="proj_id"
                                    onChange={ (e) => getunitsbyprojectid(e) }
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
                                    onChange={ (e) => getunitbyunitid(e) }
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
                            { unit && 
                            <UnitDataForm register={register} errors={errors} unit={unit} />
                            }
                        </form>
                        <div className=''>
                            <label class="mr-10">
                                <input 
                                type='radio' 
                                className='mr-10' 
                                name="diffuser"
                                checked
                                /> No diffuser
                            </label>
                            <label class="mr-10">
                                <input 
                                type='radio' 
                                className='mr-10'  
                                name="diffuser"
                                /> Short diffuser
                            </label>
                            <label class="mr-10">
                                <input 
                                type='radio' 
                                className=''  
                                name="diffuser"
                                /> Long diffuser
                            </label>
                        </div>
                        <Table
                            columns={columns}
                            rowKey={new Date().getTime()}
                            dataSource={listData.data}
                            pagination={null}
                            // loading={listData.loading}
                        />
                    </div>
                </div>
            </main>
        </>
    )
};

export default UnitData;