import React, { useState,useEffect } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import './addemployee.css';
const Addemployees = () => {
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
    setNotify((prev) => ({ ...prev, options: {
      type: "success",
      message:" This is a success alert with"
    }, visible: true }));
    reset();
  };

  useEffect(() => {
    if (notify.visible) {
      setTimeout(() => {setNotify((prev) => ({ ...prev, visible: false }));}, 3000);
    }
  }, [notify]);

  return (
    <>
      <Header />
      <LeftSideBar />
      <main className="l-main">
        <div className="content-wrapper content-wrapper--with-bg">
          <h1 className="page-title">Add Employee</h1>
          {notify?.visible && <Notify options={notify?.options}/>}
          <div className="page-content">
            <form>
              <div className="row">
                <div className="form-group col-md-6">
                  <label >First Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="first_name"
                    {...register("first_name", {
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.first_name &&
                    errors.first_name.type == "required" && (
                      <span className='error-text'>
                        First name is a required field
                      </span>
                    )}

                </div>
                <div className="form-group col-md-6">
                  <label>Last Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6 ">
                  <label>Email</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="form-group col-md-6 ">
                  <label>Mobile</label>
                  <input type="Mobile" className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12 ">
                  <label >Address</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group col-md-12 ">
                  <label>Address 2</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6 ">
                  <label>City</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group col-md-4 ">
                  <label>Role</label>
                  <select
                    className="form-control"
                    defaultValue=""
                    name="role_id"
                    {...register("role_id", { required: true })}
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="1">Admin</option>
                    <option value="2">Sales</option>
                  </select>
                  {errors.role_id &&
                    errors.role_id.type == "required" && (
                      <span className='error-text'>
                        Role is a required field
                      </span>
                    )}
                </div>
                <div className="form-group col-md-2 ">
                  <label for="inputZip">Zip</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-4">
                  <div className="form-check ">
                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                    <label className="form-check-label" for="gridCheck" style={{ marginLeft: "10px" }}>
                      Check me out
                    </label>
                  </div>
                </div>
              </div>
              <div className="" style={{ width: "100%", display: "inline-block", textAlign:"center" }}>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit(submit)}>Submit</button>
                <button type="button" className="btn btn-danger">Cancel</button>
              </div>

            </form>

          </div>
        </div>

      </main>
    </>
  )
};

export default Addemployees;