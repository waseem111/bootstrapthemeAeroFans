import React, { useEffect, useState } from "react";
const BranchForm = (props) => {

  const { register, errors, lookupCompanies, mode = 'add' } = props;

  return (
    <>
      <div className="row">
        <div className="form-group col-md-4 ">
          <label>Company</label>
          <select
            className="form-control"
            defaultValue=""
            name="com_id"
            //onChange={(e) => handleCompanyFilter(e)}
            {...register("com_id", {
              required: {
                value: true,
              },
            })}
          >
            <option value="" disabled>Select Company</option>
            {lookupCompanies?.map((elm) => (
              <option key={elm.com_id} value={elm.com_id}>
                {elm.com_name}
              </option>
            ))}
          </select>
        </div>
      </div>


      {mode == "edit" &&
        <div className="row">
          <div className="form-group col-md-4">
            <label >Branch No</label>
            <input
              className="form-control"
              type="text"
              name="cb_no"
              disabled={true}
              {...register("cb_no", {
              })}
            />
          </div>
        </div>
      }

      <div className="row">
        <div className="form-group col-md-8">
          <label >Branch Name</label>
          <input
            className="form-control"
            type="text"
            name="com_branch_name"
            {...register("com_branch_name", {
              required: {
                value: true,
              },
            })}
          />
          {errors.com_branch_name &&
            errors.com_branch_name.type == "required" && (
              <span className='error-text'>
                Branch name is a required field
              </span>
            )}

        </div>
        <div className="form-group col-md-4">
          <label >Phone No</label>
          <input
            className="form-control"
            type="text"
            name="phone_no"
            {...register("phone_no", {

            })}
          />
        </div>
        <div className="form-group col-md-8">
          <label >Address</label>
          <textarea
            className="form-control"
            type="text"
            name="cb_address"
            {...register("cb_address", {
              required: {
                value: true,
              },
            })}
          />
          {errors.cb_address &&
            errors.cb_address.type == "required" && (
              <span className='error-text'>
                Address is a required field
              </span>
            )}

        </div>


      </div>
      <div className="row">
        <div className="form-group col-md-4">
          <label >Contact Person Name</label>
          <input
            className="form-control"
            type="text"
            name="primary_contact_name"
            {...register("primary_contact_name", {
              required: {
                value: true,
              },
            })}
          />
          {errors.primary_contact_name &&
            errors.primary_contact_name.type == "required" && (
              <span className='error-text'>
                Contact Person name is a required field
              </span>
            )}

        </div>
        <div className="form-group col-md-4">
          <label >Contact Phone No</label>
          <input
            className="form-control"
            type="text"
            name="primary_contact_phone_no"
            {...register("primary_contact_phone_no", {
              required: {
                value: true,
              },
            })}
          />
          {errors.primary_contact_phone_no &&
            errors.primary_contact_phone_no.type == "required" && (
              <span className='error-text'>
                Contact Phone no. is a required field
              </span>
            )}
        </div>

        <div className="form-group col-md-4">
          <label>Contact Email</label>
          <input
            className="form-control"
            type="text"
            name="primary_contact_email"
            autoComplete="new-email"
            {...register("primary_contact_email", {
              pattern: {
                value:
                  /[\w!#$%&'+/=?`{|}~^-]+(?:\.[\w!#$%&'+/=?`{|}~^-]+)*@(?:[a-z0-9-]+\.)+[a-z]{2,6}$/
              },
            })}
          />
          {errors.primary_contact_email &&
            errors.primary_contact_email.type === "pattern" && (
              <span className='error-text'>
                Invalid email
              </span>
            )}

        </div>
      </div>

    </>
  )
}

export default BranchForm


