import React, { useEffect, useState } from "react";
const ChangePasswordForm = (props) => {
   
    const { register, errors } = props;

    return (
        <>
              <div className="row">
                <div className="form-group col-md-6">
                  <label >New Password</label>
                  <input
                    className="form-control"
                    type="text"
                    name="new_password"
                    {...register("new_password", {
                        pattern:{
                          value: /^[0-9]+$/,
                        },
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.new_password &&
                    errors.new_password.type == "required" && (
                      <span className='error-text'>
                        Password is a required field
                      </span>
                    )}
                    {errors.new_password &&
                    errors.new_password.type === "pattern" && (
                      <span className='error-text'>
                        Invalid Password pattern
                      </span>
                    )}
                </div>

                <div className="form-group col-md-6">
                  <label>Confirm Password</label>
                  <input
                    className="form-control"
                    type="text"
                    name="confirm_password"
                    {...register("confirm_password", {
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.confirm_password &&
                    errors.confirm_password.type == "required" && (
                      <span className='error-text'>
                        confirm password is a required field
                      </span>
                    )}
                    
                </div>
              </div>
             

        </>
    )
}

export default ChangePasswordForm


