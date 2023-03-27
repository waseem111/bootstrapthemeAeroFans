import React, { useEffect, useState } from "react";
const UploadExcelForm = (props) => {
   
    const { register, errors} = props;

    return (
        <>
            <div className="row">
                <div className="form-group col-md-4">
                  <label>Upload File</label>
                  <input
                    className="form-control"
                    type="file"
                    name="upload"
                    id="upload"
                    {...register("upload", {
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.upload &&
                    errors.upload.type == "required" && (
                      <span className='error-text'>
                        Excel File is a required field
                      </span>
                    )}

                </div>
              </div>
        </>
    )
}

export default UploadExcelForm


