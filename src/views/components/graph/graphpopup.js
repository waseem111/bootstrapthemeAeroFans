import React, { useContext, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Notify from '../notify/notify';

const GraphPopup = (props) => {
  const { selectedFan, onClose } = props;
  const cancel = () => {
    onClose();
  };


  return (
    <>
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" onClick={() => { cancel(); }} style={{fontSize:"24px"}}>&times;</button>
        <h4 className="modal-title">Graph</h4>
      </div>
      <form>
        <div className="modal-body">
        <img src={"../assets/images/arn500.PNG"}></img>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-light" onClick={() => { cancel(); }}>Cancel</button>
        </div>
      </form>
    </>
  )
};

export default GraphPopup;