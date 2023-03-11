import React, { Fragment } from 'react';
import Header from '../../../../layout/header';
import LeftSideBar from '../../../../layout/leftsidebar';
import '../../../../../App.css';
const Addproject = () => {
    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Add Projects</h1>
                    <div class="page-content">
      <form>
      <div class="form-row">
    <div class="form-group col-md-6 text-left">
      <label >Name</label>
      <input type="text" class="form-control"/>
    </div>
    <div class="form-group col-md-6 text-left">
      <label>Last Name</label>
      <input type="text" class="form-control"/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6 text-left">
      <label>Email</label>
      <input type="email" class="form-control"/>
    </div>
    <div class="form-group col-md-6 text-left">
      <label>Mobile</label>
      <input type="Mobile" class="form-control"/>
    </div>
  </div>
  <div class="form-row">
  <div class="form-group col-md-12 text-left">
    <label >Address</label>
    <input type="text" class="form-control"/>
  </div>
  <div class="form-group col-md-12 text-left">
    <label>Address 2</label>
    <input type="text" class="form-control"/>
  </div>
  </div>
  
  <div class="form-row">
    <div class="form-group col-md-6 text-left">
      <label>City</label>
      <input type="text" class="form-control"/>
    </div>
    <div class="form-group col-md-4 text-left">
      <label >State</label>
      <select  class="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    <div class="form-group col-md-2 text-left">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control"/>
    </div>
  </div>
  <div class="form-row">
  <div class="form-group col-md-4">
    <div class="form-check text-left">
      <input class="form-check-input" type="checkbox" id="gridCheck"/>
      <label class="form-check-label" for="gridCheck" style={{marginLeft:"10px"}}> 
        Check me out
      </label>
    </div>
  </div>
  </div>
  <div class="" style={{ width: "100%", display: "inline-block"}}>
  <button type="submit" class="btn btn-primary">Submit</button>
    {/* <button type="button" class="btn btn-danger">Cancel</button> */}
  </div>
  
</form>
        
                    </div>

                    
                </div>
            </main>
        </>
    )
};

export default Addproject;