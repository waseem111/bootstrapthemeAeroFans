import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import MotorForm from '../../../components/forms/motorform';
import MotorService from '../../../services/motorservices';
import authContext from '../../../../auth-context';
import Confirmation from '../../../components/confirmation/confirmation';
import Modal from "react-modal";
// import ChangePassword from '../changepassword/changepassword';
Modal.setAppElement("#root");

const EditMotor = () => {
  const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [motor, setMotor] = useState(null);
  const [notify, setNotify] = useState({ options: [], visible: false });
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const getmotorbyid = async () => {
    await MotorService.getmotorbyid(id)
      .then(
        (resp) => {
          if (resp.is_success) {
            setMotor(
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
    getmotorbyid();
  }, []);

  useEffect(() => {
    if (motor) {
      reset(motor);
    }
  }, [motor]);


  const submit = async (obj) => {
    obj.updated_by = loggedInUser?.emp_id;
    await MotorService.editmotor(obj)
      .then((resp) => {
        if (resp.is_success) {
          getmotorbyid();
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
        console.log("editmotor error ------------> ", err);
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
            <li className="breadcrumb-item"><NavLink to="/motors" >Motor</NavLink></li>
            <li className="breadcrumb-item active" aria-current="page">{motor?.id}</li>
          </ol>
        </nav>
        <div className="content-wrapper content-wrapper--with-bg">
          <h1 className="page-title">Edit Motor</h1>
          {notify?.visible && <Notify options={notify?.options} />}
          <div className="page-content">
            {motor &&
              <form>
                <MotorForm register={register} errors={errors} />
                <div className="form-button-group">
                  <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Update</button>
                  <button type="button" className="btn btn-danger mr-10" onClick={() => navigate('/motors')}>Cancel</button>
                </div>
              </form>
            }
          </div>
        </div>

      </main>
    </>
  )
};

export default EditMotor;