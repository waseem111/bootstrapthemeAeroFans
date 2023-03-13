import React, { useEffect, useState } from "react";
const ProjectForm = (props) => {
   
    const { register, errors } = props;

    return (
        <>
              <div className="row">
                <div className="form-group col-md-4">
                  <label >Project Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="proj_name"
                    {...register("proj_name", {
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.proj_name &&
                    errors.proj_name.type == "required" && (
                      <span className='error-text'>
                        Project name is a required field
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

export default ProjectForm


