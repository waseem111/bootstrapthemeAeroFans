import React, { useEffect, useState } from "react";
const ProjectForm = (props) => {

  const { register, errors, lookupCompanies, lookupBranches, mode = 'add' } = props;
  
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
            id="com_id"
            name="com_id"
            {...register("com_id", {
              required: {
                value: true,
              },
            })}
          >
            <option value="" >Select Company</option>
            {lookupCompanies?.map((elm) => (
              <option key={elm.com_id} value={elm.com_id}>
                {elm.com_name}
              </option>
            ))}
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
            {...register("cb_id", {
              required: {
                value: true,
              },
            })}
          >
            <option value="" >Select Company</option>
            {lookupBranches?.map((elm) => (
              <option key={elm.cb_id} value={elm.cb_id}>
                {elm.com_branch_name}
              </option>
            ))}
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


