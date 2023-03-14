import React, { Fragment, useEffect, useState } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import './addprojects.css';
import ProjectForm from '../../../components/forms/projectform';
import ProjectService from '../../../services/projectservices';

const Addproject = () => {

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
    await ProjectService.addproject(obj)
    .then((data) => {
      if(data.is_success){
        setNotify((prev) => ({
          ...prev, options: {
            type: "success",
            message: data?.message
          }, visible: true
        }));
        reset();
      }
      else{
        setNotify((prev) => ({
          ...prev, options: {
            type: "danger",
            message: data?.message 
          }, visible: true
        }));
      }
        
    })
    .catch((err) => {
      console.log("addproject error ------------> ", err);
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
                <h1 className="page-title">Add project</h1>
                {notify?.visible && <Notify options={notify?.options} />}
                <div className="page-content">
                    <form>
                      <ProjectForm register={register} errors={errors} />
                      <div className="" style={{ width: "100%", display: "inline-block", textAlign: "center" }}>
                        <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Submit</button>
                        <button type="button" className="btn btn-danger" onClick={()=>{cancel();}}>Cancel</button>
                      </div>
                    </form>
                </div>
              </div>
            </main>
        </>
    )
};

export default Addproject;