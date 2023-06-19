import React, { useContext, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import ChangePasswordForm from '../../../components/forms/changepasswordform';
import EmployeeService from '../../../services/employeeservices';
import { useParams } from 'react-router-dom';
const ChangePassword = (props) => {
  const { employee=null, loggedInUser=null, onClose, onSubmit } = props;
  const { id } = useParams();
  const [notify, setNotify] = useState({ options: [], visible: false });
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });

  const submit = async (obj) => {
    obj.emp_id = id;
    obj.updated_by = loggedInUser?.emp_id;
    await EmployeeService.changeemployeepassword(obj)
      .then((data) => {
        reset();
        if (data.is_success) {
          setNotify((prev) => ({
            ...prev, options: {
              type: "success",
              message: data?.message
            }, visible: true
          }));
        }
        else {
          setNotify((prev) => ({
            ...prev, options: {
              type: "danger",
              message: data?.message
            }, visible: true
          }));
        }

      })
      .catch((err) => {
        setNotify((prev) => ({
          ...prev, options: {
            type: "danger",
            message: err?.message
          }, visible: true
        }));
      });
  };

  const cancel = () => {
    onClose();
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
        <h4 className="modal-title">Change Password</h4>
      </div>
      <form autoComplete='off'>
        <div className="modal-body">
          {notify?.visible && <Notify options={notify?.options} />}
          <ChangePasswordForm register={register} errors={errors} getValues={getValues} />
          <p>Password should contain both upper and lower case alphabets,<br/> atleast one special character and should be minimum of 8 characters.</p>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Submit</button>
          <button type="button" className="btn btn-danger" onClick={() => { cancel(); }}>Cancel</button>
        </div>
      </form>
    </>
  )
};

export default ChangePassword;