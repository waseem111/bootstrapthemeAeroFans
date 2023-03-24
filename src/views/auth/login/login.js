import React, { useState, useEffect, useContext } from 'react';
import authContext from '../../../auth-context';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EmployeeService from '../../services/employeeservices';
import Notify from '../../components/notify/notify';
import './login.css';

const Login = () => {
    const {
        register,
        watch,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({ mode: "all" });
    const [notify, setNotify] = useState({ options: [], visible: false });
    const navigate = useNavigate();
    const { token, userLogin, logout, isLoggedIn } = useContext(authContext);
    const submit = async (obj) => {
    
        await EmployeeService.login(obj)
        .then((res) => {
          if(res.is_success){
            userLogin(res?.data);
            setNotify((prev) => ({
              ...prev, options: {
                type: "success",
                message: res?.message
              }, visible: true
            }));
            reset();
          }
          else{
            setNotify((prev) => ({
              ...prev, options: {
                type: "danger",
                message: res?.message 
              }, visible: true
            }));
          }
            
        })
        .catch((err) => {
          console.log("addemployee error ------------> ", err);
          setNotify((prev) => ({
            ...prev, options: {
              type: "danger",
              message: err?.message
            }, visible: true
          }));
        });
      };
    
      useEffect(() => {
        if (notify.visible) {
          setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false }));
          navigate('/dashboard')
        }, 3000);
        }
      }, [notify]);

    return (
        <>

            <section className="ftco-section login-page">
           
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="login-wrap py-5" style={{ textAlign: "center" }}>
                                <img src="https://aeronautfans.com/wp-content/uploads/2022/10/aerologo.png" alt='Logo' style={{ width: "70%", borderRadius: "28px 0px", marginTop: "-61px", border: "2px solid #a1c125" }} />

                                <p className="text-center" style={{ marginTop: "15px" }}>Sign in to enter Aeronaut Fans portal</p>
                                {notify?.visible && <Notify options={notify?.options} />}
                                <form action="" className="login-form" onSubmit={handleSubmit(submit)}>
                                    <div className="form-group">
                                        <div className="icon d-flex align-items-center justify-content-center"><span className="fa fa-user"></span></div>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Email"
                                            name="email"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                },
                                                pattern: {
                                                    value:
                                                        /[\w!#$%&'+/=?`{|}~^-]+(?:\.[\w!#$%&'+/=?`{|}~^-]+)*@(?:[a-z0-9-]+\.)+[a-z]{2,6}$/
                                                },
                                            })}
                                        />
                                        {errors.email &&
                                            errors.email.type == "required" && (
                                                <span className='error-text'>
                                                    Email is a required field
                                                </span>
                                            )}
                                        {errors.email &&
                                            errors.email.type === "pattern" && (
                                                <span className='error-text'>
                                                    Invalid email
                                                </span>
                                            )}
                                    </div>
                                    <div className="form-group">
                                        <div className="icon d-flex align-items-center justify-content-center"><span className="fa fa-lock"></span></div>
                                        <input
                                            className="form-control"
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            {...register("password", {
                                                required: {
                                                    value: true,
                                                },
                                            })}
                                        />
                                        {errors.password &&
                                            errors.password.type == "required" && (
                                                <span className='error-text'>
                                                    Password is a required field
                                                </span>
                                            )}
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-100 text-md-right">
                                            <a href="login">Forgot Password</a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn form-control btn-primary rounded submit px-3">Login</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login