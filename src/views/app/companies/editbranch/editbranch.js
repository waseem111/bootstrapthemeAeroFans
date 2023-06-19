import React, { useState, useEffect, useContext } from 'react';
import { useParams,useNavigate, NavLink } from "react-router-dom";
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import CompanyService from '../../../services/companyservices';
import authContext from '../../../../auth-context';
import BranchForm from '../../../components/forms/branchform';

const EditBranch = () => {
  const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [branch, setBranch] = useState(null);
  const [notify, setNotify] = useState({ options: [], visible: false });
  const [lookupCompanies, setLookupCompanies] = useState([]);
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

  const getbranchbyid = async () => {
    await CompanyService.getbranchbyid(id)
      .then(
        (resp) => {
          if (resp.is_success) {
            setBranch(
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


  useEffect(() => {
    if (branch) {
      reset(branch);
    }
  }, [branch]);

  const submit = async (obj) => {
    obj.updated_by = loggedInUser?.emp_id;
    await CompanyService.editbranch(obj)
    .then((resp) => {
      if(resp.is_success){
        getbranchbyid();
        setNotify((prev) => ({
          ...prev, options: {
            type: "success",
            message: resp?.message
          }, visible: true
        }));
        reset();
      }
      else{
        setNotify((prev) => ({
          ...prev, options: {
            type: "danger",
            message: resp?.message 
          }, visible: true
        }));
      }
        
    })
    .catch((err) => {
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
    ]).then(() => {
      getbranchbyid();
    });
  };

  useEffect(() => onPageLoad(), []);

  return (
    <>
      <Header />
      <LeftSideBar />
      <main className="l-main">
      <nav aria-label="breadcrumb" className="container-fluid" style={{ marginTop: "20px" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item "><NavLink to="/dashboard" >Dashboard</NavLink></li>
            <li className="breadcrumb-item"><NavLink to="/branches" >Branches</NavLink></li>
            <li className="breadcrumb-item active" aria-current="page">{branch?.cb_no}</li>
          </ol>
        </nav>
        <div className="content-wrapper content-wrapper--with-bg">
          <h1 className="page-title">Edit Branch</h1>
          {notify?.visible && <Notify options={notify?.options} />}
          <div className="page-content">
            {branch &&
              <form>
                <BranchForm register={register} errors={errors} lookupCompanies={lookupCompanies} mode={"edit"} />
                <div className="form-button-group">
                  <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Update</button>
                  <button type="button" className="btn btn-danger" onClick={() => navigate('/branches/'+ id)}>Cancel</button>
                </div>
              </form>
            }
          </div>
        </div>

      </main>
    </>
  )
};

export default EditBranch;