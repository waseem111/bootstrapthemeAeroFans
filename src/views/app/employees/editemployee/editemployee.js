import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import EmployeeForm from '../../../components/forms/employeeform';
const EditEmployee = () => {
  const { empid } = useParams();
  const [employee, setEmployee] = useState({ first_name: 'Test', role_id: 1 });
  const [notify, setNotify] = useState({ options: [], visible: false });
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });


  useEffect(() => {
    //api call
    setTimeout(() => setEmployee({ first_name: 'Test', role_id: 1 }), 1000);
  }, []);

  useEffect(() => {
    reset(employee);
  }, [employee]);

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
          <h1 className="page-title">Edit Employee</h1>
          {notify?.visible && <Notify options={notify?.options} />}
          <div className="page-content">
            {employee &&
              <form>
                <EmployeeForm register={register} errors={errors} />
                <div className="" style={{ width: "100%", display: "inline-block", textAlign: "center" }}>
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit(submit)}>Edit</button>
                  <button type="button" className="btn btn-danger">Cancel</button>
                </div>
              </form>
            }
          </div>
        </div>

      </main>
    </>
  )
};

export default EditEmployee;