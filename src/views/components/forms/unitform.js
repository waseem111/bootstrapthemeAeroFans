import React, { useEffect, useState } from "react";
const UnitForm = (props) => {
   
    const { register, errors, mode='add' } = props;

    return (
        <>
              <div className="row">
                <div className="form-group col-md-6">
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

                <div className="form-group col-md-6">
                  <label>Airflow</label>
                  <input
                    className="form-control"
                    type="text"
                    name="airflow"
                    {...register("airflow", {
                      pattern:{
                        value: /^[0-9]+$/,
                      },
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.airflow &&
                    errors.airflow.type == "required" && (
                      <span className='error-text'>
                        Airflow is a required field
                      </span>
                    )}
                    {errors.airflow &&
                    errors.airflow.type === "pattern" && (
                      <span className='error-text'>
                        Invalid Airflow
                      </span>
                    )}
                </div>

                <div className="form-group col-md-6">
                  <label >Pressure</label>
                  <input
                    className="form-control"
                    type="number"
                    name="pressure"
                    {...register("pressure", {
                      pattern:{
                        value: /^[0-9]+$/,
                      },
                      required: {
                        value: true,
                      },
                    })}
                  />
                  {errors.pressure &&
                    errors.pressure.type == "required" && (
                      <span className='error-text'>
                        Pressure is a required field
                      </span>
                    )}
                    {errors.pressure &&
                    errors.pressure.type === "pattern" && (
                      <span className='error-text'>
                        Invalid Pressure
                      </span>
                    )}
                </div>

              </div>
             

        </>
    )
}

export default UnitForm


