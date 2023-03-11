import React, { useEffect, useState } from "react";
const EmployeeForm = (props) => {
   
    const { register, errors } = props;

    return (
        <>
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