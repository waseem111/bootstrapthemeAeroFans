import React, { useEffect, useState } from "react";
const UnitForm = (props) => {
   
    const { register, errors, mode='add' } = props;

    return (
        <>
              <div className="row">

                <div className="form-group col-md-4 ">
                  <label>Project</label>
                  <select
                    className="form-control"
                    defaultValue=""
                    name="proj_id"
                    {...register("proj_id", { required: true })}
                  >
                    <option value="" disabled>Select project</option>
                    <option value="1">project 1</option>
                    <option value="2">project 2</option>
                  </select>
                  {errors.proj_id &&
                    errors.proj_id.type == "required" && (
                      <span className='error-text'>
                        project is a required field
                      </span>
                    )}
                </div>

                <div className="form-group col-md-4">
                  <label >Unit Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="unit_name"
                    {...register("unit_name", {
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.unit_name &&
                    errors.unit_name.type == "required" && (
                      <span className='error-text'>
                        Unit name is a required field
                      </span>
                    )}

                </div>

                <div className="form-group col-md-4 ">
                  <label>Company</label>
                  <select
                    className="form-control"
                    defaultValue=""
                    name="com_id"
                    {...register("com_id", { required: true })}
                  >
                    <option value="" disabled>Select Company</option>
                    <option value="1">Company 1</option>
                    <option value="2">Company 2</option>
                  </select>
                  {errors.com_id &&
                    errors.com_id.type == "required" && (
                      <span className='error-text'>
                        Company is a required field
                      </span>
                    )}
                </div>

                <div className="form-group col-md-4 ">
                  <label>Branch</label>
                  <select
                    className="form-control"
                    defaultValue=""
                    name="cb_id"
                    {...register("cb_id", { required: true })}
                  >
                    <option value="" disabled>Select Branch</option>
                    <option value="1">Branch 1</option>
                    <option value="2">Branch 2</option>
                  </select>
                  {errors.cb_id &&
                    errors.cb_id.type == "required" && (
                      <span className='error-text'>
                        Branch is a required field
                      </span>
                    )}
                </div>

              </div>
             

        </>
    )
}

export default UnitForm


