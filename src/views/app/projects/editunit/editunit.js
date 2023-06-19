import React, { useContext, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Notify from '../../../components/notify/notify';
import UnitForm from '../../../components/forms/unitform';
import UnitService from '../../../services/unitservices';
const EditUnit = (props) => {
  const { project =null,loggedInUser=null,unit =null,lookupUnitConversion=null, onClose, onSubmit } = props;

  const [notify, setNotify] = useState({ options: [], visible: false });
  const {
    register,
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const submit = async (obj) => {
    obj.updated_by = loggedInUser?.emp_id;
    await UnitService.editunit(obj)
      .then((data) => {
        if (data.is_success) {
          setNotify((prev) => ({
            ...prev, options: {
              type: "success",
              message: data?.message
            }, visible: true
          }));
          reset();
          onSubmit();
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

  useEffect(() => {
    if (unit) {
        reset(unit);
    }
}, []);

  return (
    <>
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" onClick={() => { cancel(); }} style={{fontSize:"24px"}}>&times;</button>
        <h4 className="modal-title">Edit Unit</h4>
      </div>
      <form>
        <div className="modal-body">
          {notify?.visible && <Notify options={notify?.options} />}
          <UnitForm register={register} errors={errors} lookupUnitConversion={lookupUnitConversion}  mode="edit" />
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary mr-10" onClick={handleSubmit(submit)}>Submit</button>
          <button type="button" className="btn btn-danger" onClick={() => { cancel(); }}>Cancel</button>
        </div>
      </form>
    </>
  )
};

export default EditUnit;