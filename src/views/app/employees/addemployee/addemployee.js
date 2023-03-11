import React, { useState, useEffect } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import './addemployee.css';
import EmployeeForm from '../../../components/forms/employeeform';
const AddEmployee = () => {
  const [notify, setNotify] = useState({ options: [], visible: false });
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const submit = (data) => {
    setNotify((prev) => ({
      ...prev, options: {
        type: "success",
        message: " This is a success alert with"
      }, visible: true
    }));
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
              <form>
                <EmployeeForm register={register} errors={errors} />
                <div className="" style={{ width: "100%", display: "inline-block", textAlign: "center" }}>
                  <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Submit</button>
                  <button type="button" className="btn btn-danger">Cancel</button>
                </div>
              </form>
          </div>
        </div>

      </main>
    </>
  )
};

export default AddEmployee;