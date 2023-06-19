import React, { useState, useEffect } from 'react';
import { Table } from "antd";
import MotorService from '../../../services/motorservices';
import Notify from '../../../components/notify/notify';
import { Navigate, useNavigate } from "react-router-dom";
import UnitService from '../../../services/unitservices';
import Loader from '../../../components/loader/loader';
import FansDataService from '../../../services/fansdataservice';


const MotorsPopup = (props) => {
    const { selectedFan, notification = null, onClose } = props;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [selectedMotorId, setSelectedMotorId] = useState(null);
    const columns = [
        {
            title: 'Motor',
            dataIndex: 'motor_make',
            key: 'motor_make',
        },
        {
            title: 'Classification',
            dataIndex: 'classification',
            key: 'classification',
        },
        {
            title: 'Ambient Temperature',
            dataIndex: 'ambient_temperature',
            key: 'ambient_temperature',
        },
        {
            title: 'IP Rating',
            dataIndex: 'ip_rating',
            key: 'ip_rating',
        },
        {
            title: 'Motor Poles',
            dataIndex: 'motor_poles',
            key: 'motor_poles',
        },
        {
            title: 'Frame Size',
            dataIndex: 'frame_size',
            key: 'frame_size',
        },
        {
            title: 'Insulation Class',
            dataIndex: 'insulation_class',
            key: 'insulation_class',
        },
        {
            title: 'Temperature Rise',
            dataIndex: 'temperature_rise',
            key: 'temperature_rise',
        },
        {
            title: 'Efficiency Class',
            dataIndex: 'efficiency_class',
            key: 'efficiency_class',
        },
        {
            title: 'Rated Power',
            dataIndex: 'rated_power',
            key: 'rated_power',
        },
        {
            title: 'Rated Voltage',
            dataIndex: 'rated_voltage',
            key: 'rated_voltage',
        },
        {
            title: 'Rated Motor Frequency',
            dataIndex: 'rated_motor_frequency',
            key: 'rated_motor_frequency',
        },
        {
            title: 'Motor Model',
            dataIndex: 'motor_model',
            key: 'motor_model',
        },
        {
            title: 'Rated Speed',
            dataIndex: 'rated_speed',
            key: 'rated_speed',
        },
        {
            title: 'Efficiency 100',
            dataIndex: 'efficiency_100',
            key: 'efficiency_100',
        },
        {
            title: 'Efficiency 75',
            dataIndex: 'efficiency_75',
            key: 'efficiency_75',
        },
        {
            title: 'Efficiency 50',
            dataIndex: 'efficiency_50',
            key: 'efficiency_50',
        },
        {
            title: 'Power Factor',
            dataIndex: 'power_factor',
            key: 'power_factor',
        },
        {
            title: 'Rated Current InA',
            dataIndex: 'rated_current_ina',
            key: 'rated_current_ina',
        },
        {
            title: 'Rate current ISIn',
            dataIndex: 'rated_current_isin',
            key: 'rated_current_isin',
        },
        {
            title: 'Torque Nm',
            dataIndex: 'torque_nm',
            key: 'torque_nm',
        },
        {
            title: 'Torque tstn',
            dataIndex: 'torque_tstn',
            key: 'torque_tstn',
        },
        {
            title: 'Torque tbtn',
            dataIndex: 'torque_tbtn',
            key: 'torque_tbtn',
        },
        {
            title: 'Moment of Inertia',
            dataIndex: 'moment_of_inertia',
            key: 'moment_of_inertia',
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        },
    ];
    const [listData, setListData] = useState({
        data: [],
        pagination: null,
        sortField: null,
        sortOrder: null,
        filter: null,
        loading: true,
        tableChange: false,
    });

    const [notify, setNotify] = useState({ options: [], visible: false });

    const fetch = async (params = {}) => {
        setListData((prev) => ({ ...prev, loading: true }));
        await MotorService.getmotors({
            ...params,
        })
            .then(
                (resp) => {
                    if (resp.is_success) {
                        const pagination = { ...listData.pagination };
                        pagination.total = resp?.count;
                        pagination.current = resp?.current_page;
                        let newArray = resp?.data.filter(function (el)
                        {
                          return el.rated_power > selectedFan?.power_vfd &&
                                 el.torque_nm > selectedFan?.max_torque_required 
                        }
                        );
                        setListData((prev) => ({
                            ...prev,
                            data: newArray,
                            loading: false,
                            pagination: pagination,
                        }));
                    }
                    else {
                        setListData((prev) => ({ ...prev, data: [], loading: false }));
                    }
                },
                (err) => {
                    setListData((prev) => ({ ...prev, data: [], loading: false }));
                    setNotify((prev) => ({
                        ...prev, options: {
                            type: "danger",
                            message: err?.message
                        }, visible: true
                    }));
                }
            );
    };


    useEffect(() => {
        fetch({});
    }, []);

    useEffect(() => {
        if (notify.visible) {
            setTimeout(() => {
                setNotify((prev) => ({ ...prev, visible: false }));
            }, 3000);
        }
    }, [notify]);

    const cancel = () => {
        onClose();
    };

    const SaveFanMotor = async () => {
        setLoading(true);
        selectedFan.motor_id = selectedMotorId;
        await UnitService.saveselectedfandata(selectedFan)
            .then(
                (resp) => {
                    setLoading(false);
                    if (resp.is_success) {
                        onClose();
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "success",
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

    const SaveMotor = async () => {
        setLoading(true);
        var obj = {
            unit_fan_id: selectedFan?.unit_fan_id,
            motor_id: selectedMotorId,
            updated_by: selectedFan?.created_by,
        }
        await FansDataService.updatemotorforfan(obj)
            .then(
                (resp) => {
                    setLoading(false);
                    if (resp.is_success) {
                        onClose();
                        setNotify((prev) => ({
                            ...prev, options: {
                                type: "success",
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

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            selectedFan.motor_id = selectedRows[0]?.motor_id;
            setSelectedMotorId(selectedRows[0]?.motor_id);
        }
    };


    return (
        <>
            <Loader loader={loading} />
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" onClick={() => { cancel(); }} style={{ fontSize: "24px" }}>&times;</button>
                <h4 className="modal-title">Select Motor</h4>
            </div>
            <form>
                <div className="modal-body motor-modal">
                    {notify?.visible && <Notify options={notify?.options} />}
                    <Table
                        columns={columns}
                        rowKey="motor_id"
                        rowSelection={{
                            type: 'radio',
                            ...rowSelection
                        }}
                        dataSource={listData.data}
                        pagination={false}
                        loading={listData.loading}
                        scroll={{ x: true }}
                    />
                </div>
                <div className="modal-footer">
                    {selectedFan?.event == "motor" && <button type="button" className="btn btn-primary mr-10" onClick={() => { SaveFanMotor(); }}>Save Selected Fan & Motor</button>}
                    {selectedFan?.event == "selectmotor" && <button type="button" className="btn btn-primary mr-10" onClick={() => { SaveMotor(); }}>Save Motor</button>}
                    <button type="button" className="btn btn-light" onClick={() => { cancel(); }}>Cancel</button>
                </div>
            </form>
        </>
    )
};

export default MotorsPopup;