import React, { useContext, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Notify from '../notify/notify';

const Confirmation = (props) => {
  const { id =null,name=null, notification=null, onClose, onDelete } = props;
  const [notify, setNotify] = useState(notification);
  const cancel = () => {
    onClose();
  };

  const handleDelete = () => {
    onDelete();
  };

  useEffect(() => {
    if (notify.visible) {
      setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false })); }, 3000);
    }
  }, [notify]);

  return (
    <>
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" onClick={() => { cancel(); }} style={{fontSize:"24px"}}>&times;</button>
        <h4 className="modal-title">Delete Confirmation</h4>
      </div>
      <form>
        <div className="modal-body">
          {notify?.visible && <Notify options={notify?.options} />}
         <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger mr-10" onClick={() => { handleDelete(); }}>Delete</button>
          <button type="button" className="btn btn-light" onClick={() => { cancel(); }}>Cancel</button>
        </div>
      </form>
    </>
  )
};

export default Confirmation;