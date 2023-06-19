import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, NavLink } from "react-router-dom";
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import EmployeeForm from '../../../components/forms/employeeform';
import EmployeeService from '../../../services/employeeservices';
import authContext from '../../../../auth-context';
import Confirmation from '../../../components/confirmation/confirmation';
import Modal from "react-modal";
import ChangePassword from '../changepassword/changepassword';
Modal.setAppElement("#root");

const EditEmployee = () => {
  const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [notify, setNotify] = useState({ options: [], visible: false });
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const getemployeebyid = async () => {
    await EmployeeService.getemployeebyid(id)
      .then(
        (resp) => {
          if (resp.is_success) {
            setEmployee(
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
    getemployeebyid();
  }, []);

  useEffect(() => {
    if (employee) {
      reset(employee);
    }
  }, [employee]);

  const [selectedId, setSelectedId] = useState(null);
    useEffect(() => {
        if(selectedId)
            setIsOpen(true);
    }, [selectedId]);
    
    const [isOpen, setIsOpen] = useState(false);
    function toggleModal() {
        setIsOpen(!isOpen);
    }

  const handleChangepassword = (e) => {
    toggleModal()
  }

  const submit = async (obj) => {
    obj.updated_by = loggedInUser?.emp_id;
    await EmployeeService.editemployee(obj)
      .then((resp) => {
        if (resp.is_success) {
          getemployeebyid();
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

  const handleChangePasswordSubmit = () => {
    setIsOpen(false);
    getemployeebyid();
}

  return (
    <>
      <Header />
      <LeftSideBar />
      <main className="l-main">
        <nav aria-label="breadcrumb" className="container-fluid" style={{ marginTop: "20px" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item "><NavLink to="/dashboard" >Dashboard</NavLink></li>
            <li className="breadcrumb-item"><NavLink to="/employees" >Employees</NavLink></li>
            <li className="breadcrumb-item active" aria-current="page">{employee?.emp_no}</li>
          </ol>
        </nav>
        <div className="content-wrapper content-wrapper--with-bg">
          <h1 className="page-title">Edit Employee</h1>
          {notify?.visible && <Notify options={notify?.options} />}
          <div className="page-content">
            {employee &&
              <form>
                <EmployeeForm register={register} errors={errors} mode={"edit"} />
                <div className="form-button-group">
                  <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Update</button>
                  <button type="button" className="btn btn-danger mr-10" onClick={() => navigate('/employees')}>Cancel</button>
                  {loggedInUser?.role_id == 0 && <button type="button" className="btn btn-warning" onClick={handleChangepassword}>Change Password</button>}
                </div>
              </form>
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
        <ChangePassword employee={employee} loggedInUser={loggedInUser} onClose={toggleModal} onSubmit={handleChangePasswordSubmit} />
      </Modal>
    </>
  )
};

export default EditEmployee;