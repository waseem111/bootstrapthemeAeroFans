import React, { useEffect, useState } from "react";
const UnitDataForm = (props) => {

  const { register, errors, unit} = props;
  return (
    <>
      
        <div className="row">
        <div className="form-group col-md-4 ">
          <label>Airflow</label>
          <input
            className="form-control"
            type="text"
            name="airflow"
            disabled={true}
            {...register("airflow", {
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
        </div>

        <div className="form-group col-md-4 ">
          <label>Pressure</label>
          <input
            className="form-control"
            type="text"
            name="pressure"
            disabled={true}
            {...register("pressure", {
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
        </div>

        <div className="form-group col-md-4 ">
          <label>Pressure type</label>
          <input
            className="form-control"
            type="text"
            name="pressure_type"
            disabled={true}
            {...register("pressure_type", {
              required: {
                value: true,
              },
            })}
          />
          {errors.pressure_type &&
            errors.pressure_type.type == "required" && (
              <span className='error-text'>
                Pressure type is a required field
              </span>
            )}
        </div>

      </div>
    </>
  )
}

export default UnitDataForm


