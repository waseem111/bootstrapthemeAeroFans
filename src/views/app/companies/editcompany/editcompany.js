import React, { useState, useEffect, useContext } from 'react';
import { useParams,useNavigate, NavLink } from "react-router-dom";
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import CompanyForm from '../../../components/forms/companyform';
import CompanyService from '../../../services/companyservices';
import authContext from '../../../../auth-context';
const EditCompany = () => {
  const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [notify, setNotify] = useState({ options: [], visible: false });
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const getcompanybyid = async () => {
    await CompanyService.getcompanybyid(id)
      .then(
        (resp) => {
          if (resp.is_success) {
            setCompany(
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

  //api call
  useEffect(() => {
    getcompanybyid();
  }, []);

  useEffect(() => {
    if (company) {
      reset(company);
    }
  }, [company]);

  const submit = async (obj) => {
    obj.updated_by = loggedInUser?.emp_id;
    await CompanyService.editcompany(obj)
    .then((resp) => {
      if(resp.is_success){
        getcompanybyid();
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

  return (
    <>
      <Header />
      <LeftSideBar />
      <main className="l-main">
      <nav aria-label="breadcrumb" className="container-fluid" style={{ marginTop: "20px" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item "><NavLink to="/dashboard" >Dashboard</NavLink></li>
            <li className="breadcrumb-item"><NavLink to="/employees" >Employees</NavLink></li>
            <li className="breadcrumb-item active" aria-current="page">{company?.com_no}</li>
          </ol>
        </nav>
        <div className="content-wrapper content-wrapper--with-bg">
          <h1 className="page-title">Edit Company</h1>
          {notify?.visible && <Notify options={notify?.options} />}
          <div className="page-content">
            {company &&
              <form>
                <CompanyForm register={register} errors={errors} mode={"edit"} />
                <div className="form-button-group">
                  <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Update</button>
                  <button type="button" className="btn btn-danger" onClick={() => navigate('/companies')}>Cancel</button>
                </div>
              </form>
            }
          </div>
        </div>

      </main>
    </>
  )
};

export default EditCompany;