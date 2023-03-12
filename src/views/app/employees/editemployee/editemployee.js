import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import EmployeeForm from '../../../components/forms/employeeform';
import EmployeeService from '../../../services/employeeservices';

const EditEmployee = () => {
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

  const getemployeebyid_ = async () => {
    await EmployeeService.getemployeebyid(id)
    .then(
      (data) => {
        debugger;
      },
      (err) => {
        
      }
    );
  };

  // const getemployeebyid_ = async () => {
  //   await EmployeeService.getemployeebyid(id)
  //   .then((resp) => {
  //     debugger;
  //     if(resp.data.is_success){
  //       setEmployee(
  //         resp?.data?.data
  //       )
  //     }
  //     else{
  //       setNotify((prev) => ({
  //         ...prev, options: {
  //           type: "danger",
  //           message: resp?.data?.message 
  //         }, visible: true
  //       }));
  //     }
        
  //   })
  //   .catch((err) => {
  //     console.log("getemployeebyid error ------------> ", err);
  //     setNotify((prev) => ({
  //       ...prev, options: {
  //         type: "danger",
  //         message: err?.message
  //       }, visible: true
  //     }));
  //   });
  // };

  //api call
  useEffect(() => {
    debugger;
    getemployeebyid_();}, []);

  // useEffect(() => {
    
  //   if(employee){
  //     debugger;
  //     reset(employee);
  //   }
    
  // }, [employee]);

  const submit = (data) => {
    setNotify((prev) => ({
      ...prev, options: {
        type: "success",
        message: " This is a success alert with"
      }, visible: true
    }));
    reset();
  };



  // useEffect(() => {
  //   if (notify.visible) {
  //     setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false })); }, 3000);
  //   }
  // }, [notify]);

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