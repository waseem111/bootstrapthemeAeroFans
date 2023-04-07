import React, { useEffect, useState } from "react";
const EmployeeForm = (props) => {
   
    const { register, errors, mode='add' } = props;

    return (
        <>

{mode == "edit" &&
                <div className="row">
                  <div className="form-group col-md-4">
                    <label >Employee No</label>
                    <input
                      className="form-control"
                      type="text"
                      name="emp_no"
                      disabled={true}
                      {...register("emp_no", {
                      })}
                    />
                  </div>
                </div>
                }

              <div className="row">
                <div className="form-group col-md-4">
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
                <div className="form-group col-md-4">
                  <label >Middle Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="middle_name"
                    {...register("middle_name", {
              
                    })}
                  />

                </div>
                <div className="form-group col-md-4">
                  <label >Last Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="last_name"
                    {...register("last_name", {
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.last_name &&
                    errors.last_name.type == "required" && (
                      <span className='error-text'>
                        Last name is a required field
                      </span>
                    )}

                </div>
                <div className="form-group col-md-4">
                  <label >Email</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    autoComplete="new-email"
                    disabled={mode=="edit" ? true: false}
                    {...register("email", {
                      required: {
                        value: true,
                      },
                      pattern: {
                        value:
                          /[\w!#$%&'+/=?`{|}~^-]+(?:\.[\w!#$%&'+/=?`{|}~^-]+)*@(?:[a-z0-9-]+\.)+[a-z]{2,6}$/
                      },
                    })}
                  />
                  {errors.email &&
                    errors.email.type == "required" && (
                      <span className='error-text'>
                        Email is a required field
                      </span>
                    )}
                    {errors.email &&
                    errors.email.type === "pattern" && (
                      <span className='error-text'>
                        Invalid email
                      </span>
                    )}

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
                    <option value="1">Sales</option>
                  </select>
                  {errors.role_id &&
                    errors.role_id.type == "required" && (
                      <span className='error-text'>
                        Role is a required field
                      </span>
                    )}
                </div>
              

              </div>
              {mode == "add" &&
              <>
                <div className="row">
                <div className="form-group col-md-4">
                    <label >Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      {...register("password", {
                        required: {
                          value: true,
                        },
                        pattern:{
                          value: /^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,}$/,
                        },
                      })}
                    />
                    {errors.password &&
                      errors.password.type == "required" && (
                        <span className='error-text'>
                          Password is a required field
                        </span>
                      )}
                      {errors.password &&
                    errors.password.type === "pattern" && (
                      <span className='error-text'>
                        Invalid Password pattern
                      </span>
                    )}
                  </div>
                 
                </div>
                <p>Password should contain both upper and lower case alphabets,<br/> atleast one special character and should be minimum of 8 characters.</p>
                </>
                }

        </>
    )
}

export default EmployeeForm


