import React, { useEffect, useState } from "react";
const ChangePasswordForm = (props) => {
   
    const { register, errors, watch } = props;

    return (
        <>
              <div className="row">
                <div className="form-group col-md-6">
                  <label >New Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="new_password"
                    {...register("new_password", {
                        pattern:{
                          value: /^(?=.*?[A-Z])(?=.*?[#?!@$%^&*-]).{8,}$/,
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
                    type="password"
                    name="confirm_password"
                    {...register("confirm_password", {
                      required: {
                        value: true,
                      },
                      validate: (value) => {
                        if (watch('new_password') != value) {
                          debugger;
                          return {
                            value: false,
                            message: "Your passwords do no match"
                          }
                        }
                          
                      }
                      
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


