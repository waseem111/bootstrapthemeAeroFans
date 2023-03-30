import React, { useEffect, useState } from "react";
const UnitForm = (props) => {

  const { register, errors, lookupUnitConversion, mode = 'add' } = props;

  return (
    <>
      <div className="row">
        <div className="form-group col-md-12">
          <label >Unit Name</label>
          <input
            className="form-control"
            type="text"
            name="unit_name"
            disabled={mode == 'edit' ? true : false}
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
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label>Airflow</label>
          <input
            className="form-control"
            type="text"
            name="airflow"
            {...register("airflow", {
              pattern: {
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
        <div className="form-group col-md-6 ">
          <label>Airflow Unit</label>
          <select
            className="form-control"
            defaultValue=""
            id="airflow_luc_id"
            name="airflow_luc_id"
            {...register("airflow_luc_id", {
              required: {
                value: true,
              },
            })}
          >
            <option value="" >Select Unit</option>
            {lookupUnitConversion?.filter(x => x?.type == "airflow")?.map((elm) => (
              <option key={elm.luc_id} value={elm.luc_id}>
                {elm.unit}
              </option>
            ))}
          </select>
          {errors.airflow_luc_id &&
            errors.airflow_luc_id.type == "required" && (
              <span className='error-text'>
                Unit is a required field
              </span>
            )}
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <label >Pressure</label>
          <input
            className="form-control"
            type="number"
            name="pressure"
            {...register("pressure", {
              pattern: {
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
        <div className="form-group col-md-6">
          <label>Pressure Unit</label>
          <select
            className="form-control"
            defaultValue=""
            id="pressure_luc_id"
            name="pressure_luc_id"
            {...register("pressure_luc_id", {
              required: {
                value: true,
              },
            })}
          >
            <option value="" >Select Unit</option>
            {lookupUnitConversion?.filter(x => x?.type == "pressure")?.map((elm) => (
              <option key={elm.luc_id} value={elm.luc_id}>
                {elm.unit}
              </option>
            ))}
          </select>
          {errors.pressure_luc_id &&
            errors.pressure_luc_id.type == "required" && (
              <span className='error-text'>
                Unit is a required field
              </span>
            )}
        </div>

      </div>


    </>
  )
}

export default UnitForm


