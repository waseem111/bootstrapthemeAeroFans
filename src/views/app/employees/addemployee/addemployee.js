import React, { useState, useEffect, useContext } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import EmployeeForm from '../../../components/forms/employeeform';
import EmployeeService from '../../../services/employeeservices';
import authContext from '../../../../auth-context';
const AddEmployee = () => {
  const { token, userLogin, logout, isLoggedIn, loggedInUser } = useContext(authContext);
  const [notify, setNotify] = useState({ options: [], visible: false });
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const submit = async (obj) => {
    obj.created_by = loggedInUser?.emp_id;
    await EmployeeService.addemployee(obj)
      .then((data) => {
        if (data.is_success) {
          setNotify((prev) => ({
            ...prev, options: {
              type: "success",
              message: data?.message
            }, visible: true
          }));
          reset();
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
        setNotify((prev) => ({
          ...prev, options: {
            type: "danger",
            message: err?.message
          }, visible: true
        }));
      });
  };


  const cancel = () => {
    reset();
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
        <div className="content-wrapper content-wrapper--with-bg">
          <h1 className="page-title">Add Employee</h1>
          {notify?.visible && <Notify options={notify?.options} />}
          <div className="page-content">
            <form autoComplete='off'>
              <EmployeeForm register={register} errors={errors} />
              <div className="form-button-group">
                <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Submit</button>
                <button type="button" className="btn btn-danger" onClick={() => { cancel(); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>

      </main>
    </>
  )
};

export default AddEmployee;