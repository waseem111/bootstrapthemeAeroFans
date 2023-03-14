import React, { useEffect, useState } from "react";
const CompanyForm = (props) => {
   
    const { register, errors, mode='add' } = props;

    return (
        <>
            <div className="row">
                <div className="form-group col-md-4">
                  <label >Company Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="com_name"
                    {...register("com_name", {
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.com_name &&
                    errors.com_name.type == "required" && (
                      <span className='error-text'>
                        Company name is a required field
                      </span>
                    )}

                </div>

                
              </div>
        </>
    )
}

export default CompanyForm


