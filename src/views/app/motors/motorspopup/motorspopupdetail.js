import React, { useState, useEffect } from 'react';
import MotorService from '../../../services/motorservices';
import Notify from '../../../components/notify/notify';
import Loader from '../../../components/loader/loader';
import { useForm } from "react-hook-form";
import MotorForm from '../../../components/forms/motorform';


const MotorsPopupDetail = (props) => {
    const { motor_id, onClose } = props;
    const [loading, setLoading] = useState(false);
    const [motor, setMotor] = useState(null);
    const [notify, setNotify] = useState({ options: [], visible: false });
    const {
        register,
        watch,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({ mode: "all" });

    const getmotorbyid = async () => {
        setLoading(true);
        await MotorService.getmotorbyid(motor_id)
            .then(
                (resp) => {
                    setLoading(false);
                    if (resp.is_success) {
                        setMotor(resp?.data);
                    }
                    else {
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "danger",
                                message: resp?.message
                            }, visible: true
                        }));
                    }
                },
                (err) => {
                    setLoading(false);
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };

    const cancel = () => {
        onClose();
    };

    //api call
    useEffect(() => {
        getmotorbyid();
    }, []);

    useEffect(() => {
        if (motor) {
            reset(motor);
        }
    }, [motor]);

    useEffect(() => {
        if (notify.visible) {
            setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false })); }, 3000);
        }
    }, [notify]);

    return (
        <>
            <Loader loader={loading} />
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" onClick={() => { cancel(); }} style={{ fontSize: "24px" }}>&times;</button>
                <h4 className="modal-title">Motor Detail</h4>
            </div>
            <form>
                <div className="modal-body">
                    {notify?.visible && <Notify options={notify?.options} />}
                    <MotorForm register={register} errors={errors} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={() => { cancel(); }}>Cancel</button>
                </div>
            </form>
        </>
    )
};

export default MotorsPopupDetail;