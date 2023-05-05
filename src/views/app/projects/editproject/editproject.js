import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import CompanyService from '../../../services/companyservices';
import authContext from '../../../../auth-context';
import ProjectService from '../../../services/projectservices';
import ProjectForm from '../../../components/forms/projectform';
import Units from '../units/units';
import Modal from "react-modal";
import Addunits from '../addunits/addunits';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faEdit, faTrash, faLink } from '@fortawesome/fontawesome-free-solid'
import * as xlsx from "xlsx";
import UnitService from '../../../services/unitservices';
import EditUnit from '../editunit/editunit';
import Confirmation from '../../../components/confirmation/confirmation';
import LookupService from '../../../services/lookupservices';

Modal.setAppElement("#root")

const EditProject = () => {
    const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [notify, setNotify] = useState({ options: [], visible: false });
    const [lookupCompanies, setLookupCompanies] = useState([]);
    const [lookupUnitConversion, setLookupUnitConversion] = useState([]);
    const [unit, setUnit] = useState([]);
    const [lookupBranches, setLookupBranches] = useState([]);
    const {
        register,
        watch,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({ mode: "all" });

    const getcompanies = async () => {
        await CompanyService.getcompanies({
            size: 9999,
            page: 1,
        })
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setLookupCompanies(resp?.data);
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

    const getbranches = async () => {
        await CompanyService.getbranches({
            size: 9999,
            page: 1,
        })
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setLookupBranches(resp?.data);
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

    const getprojectbyid = async () => {
        await ProjectService.getprojectbyid(id)
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setProject(
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

    const columns = [
        {
            title: 'Unit Name',
            dataIndex: 'unit_name',
            key: 'unit_name',
        },
        {
            title: 'Air Flow',
            //dataIndex: 'airflow',
            key: 'airflow',
            render: (record) => (`${record?.airflow} ${record?.airflow_unit ? record?.airflow_unit : ''}`),
        },
        {
            title: 'Pressure',
            //dataIndex: 'pressure',
            key: 'pressure',
            render: (record) => (`${record?.pressure} ${record?.pressure_unit ? record?.pressure_unit : ''} (${record?.pressure_type})`),
        },
        {
            title: 'Action',
            key: 'pu_id',
            render: (record) => <>
                <button className='btn btn-primary mr-10' onClick={() => editToggleModal("edit", record)} ><FontAwesomeIcon icon={faEdit} /></button>
                <button className='btn btn-danger mr-10' onClick={() =>{setSelectedId(record);toggleModal("delete")}} ><FontAwesomeIcon icon={faTrash} /></button>
                <button className='btn btn-info mr-10' onClick={() =>{setUnit(JSON.parse(JSON.stringify(record)));toggleModal('single');}} ><FontAwesomeIcon icon={faClone} /></button>
                
                <button className='btn btn-success' onClick={() => navigate('/unitdata/'+record.pu_id)} ><FontAwesomeIcon icon={faLink} /></button>
                
            </>,
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

    const getunitsbyprojectid = async () => {
        setListData((prev) => ({ ...prev, loading: true }));
        await ProjectService.getunitsbyprojectid(id)
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setListData((prev) => ({
                            ...prev,
                            loading: false,
                            data: resp?.data,
                        }));
                    }
                    else{
                        setListData((prev) => ({ ...prev, data: [], loading: false }));
                    }
                },
                (err) => {
                    setListData((prev) => ({ ...prev, loading: false }));
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    const getunitconversions = async () => {
        await LookupService.getunitconversions()
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setLookupUnitConversion(resp?.data);
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

    useEffect(() => {
        if (project) {
            reset(project);
        }
    }, [project]);

    const submit = async (obj) => {
        obj.updated_by = loggedInUser?.emp_id;
        await ProjectService.editproject(obj)
            .then((resp) => {
                if (resp.is_success) {
                    getprojectbyid();
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "success",
                            message: resp?.message
                        }, visible: true
                    }));
                    reset();
                }
                else {
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: resp?.message
                        }, visible: true
                    }));
                }

            })
            .catch((err) => {
                console.log("editcompany error ------------> ", err);
                setNotify((prev) => ({
                    ...prev, options: {
                        type: "danger",
                        message: err?.message
                    }, visible: true
                }));
            });
    };


    useEffect(() => {
        if (notify.visible) {
            setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false })); }, 3000);
        }
    }, [notify]);

    const onPageLoad = () => {
        Promise.all([
            getcompanies(),
            getbranches(),
            getunitconversions(),
        ]).then(() => {
            getprojectbyid();
            getunitsbyprojectid();
        });
    };

    useEffect(() => onPageLoad(), []);

    const handleUnitSubmit = () => {
        setIsOpen(false);
        onPageLoad();
    }


    const [isOpen, setIsOpen] = useState(false);
    const [popupDisplay, setPopupDisplay] = useState(null);

    function editToggleModal(s, u) {
        setUnit(u);
        setPopupDisplay(s);
        setIsOpen(!isOpen);
    }

    function toggleModal(s) {
        setPopupDisplay(s);
        setIsOpen(!isOpen);
    }

    const [bulkUnits, setBulkUnits] = useState([]);
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            if (e.target.files[0]?.name.includes(".xlsx")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = xlsx.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = xlsx.utils.sheet_to_json(worksheet);
                    if ((json.every(obj => obj.hasOwnProperty('unit_name')))
                        && (json.every(obj => obj.hasOwnProperty('airflow')))
                        && (json.every(obj => obj.hasOwnProperty('pressure')))
                    ) {
                        var isTrue = json.every(obj => typeof obj?.airflow == "number") && json.every(obj => typeof obj?.pressure == "number");
                        if (isTrue) {
                            json.map(a => { a.created_by = loggedInUser?.emp_id; a.proj_id = id; a.com_id = project?.com_id; a.cb_id = project?.cb_id });
                            setBulkUnits(json);
                        }
                        else {
                            setBulkUnits([]);
                            setNotify((prev) => ({
                                ...prev, options: {
                                    type: "danger",
                                    message: "Incorrect excel file, Please upload format file"
                                }, visible: true
                            }));
                        }
                    }
                    else {
                        setBulkUnits([]);
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "danger",
                                message: "Incorrect excel file, Please upload format file"
                            }, visible: true
                        }));
                    }

                };
                reader.readAsArrayBuffer(e.target.files[0]);
            }
            else {
                e.target.value = null;
            }

        }
    }

    const bulkaddunit = async () => {
        await UnitService.bulkaddunit(bulkUnits)
            .then((data) => {
                if (data.is_success) {
                    document.getElementById("upload").value = null;
                    onPageLoad();
                    setBulkUnits([]);
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "success",
                            message: data?.message
                        }, visible: true
                    }));
                }
                else {
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: data?.message
                        }, visible: true
                    }));
                }

            })
            .catch((err) => {
                console.log("addunit error ------------> ", err);
                setNotify((prev) => ({
                    ...prev, options: {
                        type: "danger",
                        message: err?.message
                    }, visible: true
                }));
            });
    };


    const [selectedId, setSelectedId] = useState(null);
  

    const handleDelete = async () => {
        await UnitService.deleteunit(selectedId.pu_id)
          .then((resp) => {
            if (resp.is_success) {
                setSelectedId(null);
                setIsOpen(false);
                onPageLoad();
              setNotify((prev) => ({
                ...prev, options: {
                  type: "success",
                  message: resp?.message
                }, visible: true
              }));
            }
            else {
                setSelectedId(null);
              setNotify((prev) => ({
                ...prev, options: {
                  type: "danger",
                  message: resp?.message
                }, visible: true
              }));
            }
    
          })
          .catch((err) => {
            setSelectedId(null);
            setNotify((prev) => ({
              ...prev, options: {
                type: "danger",
                message: err?.message
              }, visible: true
            }));
          });
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
                        <li className="breadcrumb-item active" aria-current="page">{project?.proj_no}</li>
                    </ol>
                </nav>
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Edit Project</h1>
                    {notify?.visible && <Notify options={notify?.options} />}
                    <div className="page-content">
                        {project &&
                            <form>
                                <ProjectForm register={register} errors={errors} lookupCompanies={lookupCompanies} lookupBranches={lookupBranches} mode="edit" />
                                <div className="form-button-group">
                                    <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Update</button>
                                    <button type="button" className="btn btn-danger" onClick={() => navigate('/projects')}>Cancel</button>
                                </div>
                            </form>
                        }

                    </div>
                    <div className="page-content" style={{ marginTop: "20px" }}>
                        <div style={{ display: "inline" }}>
                            <span className="page-title">Units</span>
                            <button type="button" className="btn btn-primary mr-10 pull-right" onClick={() =>{setUnit(null);toggleModal('single');} } >Add Unit</button>
                            <button type="button" className="btn btn-primary mr-10 pull-right" onClick={() => toggleModal('bulk')}
                                style={{ backgroundColor: "#9ec023", borderColor: "#9ec023" }}>Upload Units</button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <Units columns={columns} listData={listData} />
                        </div>
                        {/* <div className="form-button-group" style={{ marginTop: "20px" }}>
                                    <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Update</button>
                                </div> */}
                    </div>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={toggleModal}
                        contentLabel="My dialog"
                        className="mymodal"
                        overlayClassName="myoverlay"
                    >
                        {popupDisplay == "delete" && <Confirmation onClose={toggleModal} onDelete={handleDelete} notification={notify} id={selectedId}/>}
                        {popupDisplay == "edit" && <div><EditUnit project={project} unit={unit} loggedInUser={loggedInUser} lookupUnitConversion={lookupUnitConversion} onClose={toggleModal} onSubmit={handleUnitSubmit} /></div>}
                        {popupDisplay == "single" && <div><Addunits project={project} loggedInUser={loggedInUser} unit={unit} lookupUnitConversion={lookupUnitConversion} onClose={toggleModal} onSubmit={handleUnitSubmit} /></div>}
                        {popupDisplay == "bulk" && <div>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" onClick={() => { toggleModal(); }} style={{ fontSize: "24px" }}>&times;</button>
                                <h4 className="modal-title">Bulk Units</h4>
                            </div>
                            <form>
                                <div className="modal-body">
                                    {notify?.visible && <Notify options={notify?.options} />}
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label>Upload File</label>
                                            <input
                                                className="form-control"
                                                type="file"
                                                name="upload"
                                                id="upload"
                                                onChange={readUploadFile}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary mr-10" disabled={bulkUnits.length == 0} onClick={() => { bulkaddunit(); }}>Submit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => { toggleModal(); }}>Cancel</button>
                                </div>
                            </form>
                        </div>}
                    </Modal>
                </div>
            </main>
        </>
    )
};

export default EditProject;