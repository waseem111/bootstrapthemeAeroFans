import React from 'react';
import './login.css';

const Login = () => {
  return (
<>
<section className="ftco-section">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-wrap py-5" style={{textAlign: "center"}}>
                        <img src="https://aeronautfans.com/wp-content/uploads/2022/10/aerologo.png" alt='Logo' style={{width: "70%",borderRadius: "28px 0px",marginTop: "-61px",border: "2px solid #a1c125"}} />
                      
                        <p className="text-center" style={{marginTop: "15px"}}>Sign in to enter Aeronaut Fans portal</p>
                        <form action="POST" className="login-form">
                            <div className="form-group">
                                <div className="icon d-flex align-items-center justify-content-center"><span className="fa fa-user"></span></div>
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <div className="icon d-flex align-items-center justify-content-center"><span className="fa fa-lock"></span></div>
                                <input type="password" className="form-control" placeholder="Password" />
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