import React, { useContext, useState, useEffect } from 'react';

const Alert = (props) => {
  const {heading=null, message=null, onClose, onOK } = props;
 
  const cancel = () => {
    onClose();
  };

  const handleOK = () => {
    onOK();
  };



  return (
    <>
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" onClick={() => { cancel(); }} style={{fontSize:"24px"}}>&times;</button>
        <h4 className="modal-title">{heading}</h4>
      </div>
      <form>
        <div className="modal-body">
         <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() => { handleOK(); }}>OK</button>
        </div>
      </form>
    </>
  )
};

export default Alert;