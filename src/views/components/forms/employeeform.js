import React, { useEffect, useState } from "react";
const EmployeeForm = (props) => {
   
    const { register, errors, mode='add' } = props;

    return (
        <>
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
                {mode == "add" &&
                <>
                  <div className="form-group col-md-4">
                    <label >Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      {...register("password", {
                        required: {
                          value: true,
                        },
                      })}
                    />
                    {errors.password &&
                      errors.password.type == "required" && (
                        <span className='error-text'>
                          Password is a required field
                        </span>
                      )}

                  </div>
                </>
                }

                
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
              </div>
             

        </>
    )
}

export default EmployeeForm


