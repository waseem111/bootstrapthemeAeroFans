import React, { useEffect, useState } from "react";
const MotorForm = (props) => {
   
    const { register, errors } = props;

    return (
        <>
            <div className="row">
                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Motor</label>
                <input
                    className="form-control"
                    type="text"
                    name="motor_make"
                    disabled={false}
                    {...register("motor_make", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.motor_make &&
                errors.motor_make.type == "required" && (
                    <span className='error-text'>
                    Motor is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Classification</label>
                <input
                    className="form-control"
                    type="text"
                    name="classification"
                    disabled={false}
                    {...register("classification", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.classification &&
                errors.classification.type == "required" && (
                    <span className='error-text'>
                    Classification is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Ambient Temperature</label>
                <input
                    className="form-control"
                    type="text"
                    name="ambient_temperature"
                    disabled={false}
                    {...register("ambient_temperature", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.ambient_temperature &&
                errors.ambient_temperature.type == "required" && (
                    <span className='error-text'>
                    Ambient Temperature is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >IP Rating</label>
                <input
                    className="form-control"
                    type="text"
                    name="ip_rating"
                    disabled={false}
                    {...register("ip_rating", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.ip_rating &&
                errors.ip_rating.type == "required" && (
                    <span className='error-text'>
                    IP Rating is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Motor Poles</label>
                <input
                    className="form-control"
                    type="text"
                    name="motor_poles"
                    disabled={false}
                    {...register("motor_poles", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.motor_poles &&
                errors.motor_poles.type == "required" && (
                    <span className='error-text'>
                    Motor poles is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Frame Size</label>
                <input
                    className="form-control"
                    type="text"
                    name="frame_size"
                    disabled={false}
                    {...register("frame_size", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.frame_size &&
                errors.frame_size.type == "required" && (
                    <span className='error-text'>
                    Frame Size is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Insulation Class</label>
                <input
                    className="form-control"
                    type="text"
                    name="insulation_class"
                    disabled={false}
                    {...register("insulation_class", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.insulation_class &&
                errors.insulation_class.type == "required" && (
                    <span className='error-text'>
                    Insulation Class is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Temperature Rise</label>
                <input
                    className="form-control"
                    type="text"
                    name="temperature_rise"
                    disabled={false}
                    {...register("temperature_rise", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.temperature_rise &&
                errors.temperature_rise.type == "required" && (
                    <span className='error-text'>
                    Temperature Rise is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Efficiency Class</label>
                <input
                    className="form-control"
                    type="text"
                    name="efficiency_class"
                    disabled={false}
                    {...register("efficiency_class", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.efficiency_class &&
                errors.efficiency_class.type == "required" && (
                    <span className='error-text'>
                    Efficiency Class is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Rated power</label>
                <input
                    className="form-control"
                    type="text"
                    name="rated_power"
                    disabled={false}
                    {...register("rated_power", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.rated_power &&
                errors.rated_power.type == "required" && (
                    <span className='error-text'>
                    Rated power is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Rated Voltage</label>
                <input
                    className="form-control"
                    type="text"
                    name="rated_voltage"
                    disabled={false}
                    {...register("rated_voltage", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.rated_voltage &&
                errors.rated_voltage.type == "required" && (
                    <span className='error-text'>
                    Rated Voltage is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Rated Motor Frequency</label>
                <input
                    className="form-control"
                    type="text"
                    name="rated_motor_frequency"
                    disabled={false}
                    {...register("rated_motor_frequency", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.rated_motor_frequency &&
                errors.rated_motor_frequency.type == "required" && (
                    <span className='error-text'>
                    Rated Motor Frequency is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Motor Model</label>
                <input
                    className="form-control"
                    type="text"
                    name="motor_model"
                    disabled={false}
                    {...register("motor_model", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.motor_model &&
                errors.motor_model.type == "required" && (
                    <span className='error-text'>
                    Motor Model is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Rated Speed</label>
                <input
                    className="form-control"
                    type="text"
                    name="rated_speed"
                    disabled={false}
                    {...register("rated_speed", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.rated_speed &&
                errors.rated_speed.type == "required" && (
                    <span className='error-text'>
                    Rated Speed is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Efficiency 100</label>
                <input
                    className="form-control"
                    type="text"
                    name="efficiency_100"
                    disabled={false}
                    {...register("efficiency_100", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.efficiency_100 &&
                errors.efficiency_100.type == "required" && (
                    <span className='error-text'>
                    Efficiency 100 is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Efficiency 75</label>
                <input
                    className="form-control"
                    type="text"
                    name="efficiency_75"
                    disabled={false}
                    {...register("efficiency_75", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.efficiency_75 &&
                errors.efficiency_75.type == "required" && (
                    <span className='error-text'>
                    Efficiency 75 is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Efficiency 50</label>
                <input
                    className="form-control"
                    type="text"
                    name="efficiency_50"
                    disabled={false}
                    {...register("efficiency_50", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.efficiency_50 &&
                errors.efficiency_50.type == "required" && (
                    <span className='error-text'>
                    Efficiency 50 is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Power Factor</label>
                <input
                    className="form-control"
                    type="text"
                    name="power_factor"
                    disabled={false}
                    {...register("power_factor", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.power_factor &&
                errors.power_factor.type == "required" && (
                    <span className='error-text'>
                    Power Factor is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Rate Current InA</label>
                <input
                    className="form-control"
                    type="text"
                    name="rated_current_ina"
                    disabled={false}
                    {...register("rated_current_ina", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.rated_current_ina &&
                errors.rated_current_ina.type == "required" && (
                    <span className='error-text'>
                    Rate Current InA is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Rated Current ISIn</label>
                <input
                    className="form-control"
                    type="text"
                    name="rated_current_isin"
                    disabled={false}
                    {...register("rated_current_isin", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.rated_current_isin &&
                errors.rated_current_isin.type == "required" && (
                    <span className='error-text'>
                    Rated Current ISIn is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Torque Nm</label>
                <input
                    className="form-control"
                    type="text"
                    name="torque_nm"
                    disabled={false}
                    {...register("torque_nm", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.torque_nm &&
                errors.torque_nm.type == "required" && (
                    <span className='error-text'>
                    Torque Nm is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Torque TsTn</label>
                <input
                    className="form-control"
                    type="text"
                    name="torque_tstn"
                    disabled={false}
                    {...register("torque_tstn", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.torque_tstn &&
                errors.torque_tstn.type == "required" && (
                    <span className='error-text'>
                    Torque TsTn is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Torque TbTn</label>
                <input
                    className="form-control"
                    type="text"
                    name="torque_tbtn"
                    disabled={false}
                    {...register("torque_tbtn", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.torque_tbtn &&
                errors.torque_tbtn.type == "required" && (
                    <span className='error-text'>
                    Torque TbTn is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Moment of Inertia</label>
                <input
                    className="form-control"
                    type="text"
                    name="moment_of_inertia"
                    disabled={false}
                    {...register("moment_of_inertia", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.moment_of_inertia &&
                errors.moment_of_inertia.type == "required" && (
                    <span className='error-text'>
                    Moment of Inertia is a required field
                    </span>
                )}
                </div>

                <div className="form-group col-lg-3 col-md-3 col-sm-6 col-12">
                <label >Weight</label>
                <input
                    className="form-control"
                    type="text"
                    name="weight"
                    disabled={false}
                    {...register("weight", {
                    required: {
                        value: true,
                        },
                    })}
                />
                {errors.weight &&
                errors.weight.type == "required" && (
                    <span className='error-text'>
                    Weight is a required field
                    </span>
                )}
                </div>
            </div>
        </>
    )
}

export default MotorForm


