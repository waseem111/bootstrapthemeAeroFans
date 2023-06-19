import React, { useState, useEffect } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { Table } from "antd";
import MotorService from '../../../services/motorservices';
import Notify from '../../../components/notify/notify';
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid';
import Modal from "react-modal";
import Confirmation from '../../../components/confirmation/confirmation';

const Motors = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);
    const columns = [
        {
            title: 'Motor Id',
            dataIndex: 'motor_id',
            key: 'motor_id',
        },
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
        {
            title: 'Action',
            render: (record) => <>
                <button className='btn btn-primary mr-10' onClick={() => navigate('/editmotor/' + record?.motor_id)}><FontAwesomeIcon icon={faEdit} /></button>
                <button className='btn btn-danger' onClick={() =>{setSelectedId(record?.motor_id);}} ><FontAwesomeIcon icon={faTrash} /></button>
            </>,
        }
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
                        setListData((prev) => ({
                            ...prev,
                            data: resp?.data,
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

    const handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...listData.pagination };
        pager.current = pagination.current;
        pager.pageSize = pagination.pageSize;
        setListData((prev) => ({
            ...prev,
            tableChange: true,
            pagination: pager,
            sortField: sorter.field,
            sortOrder: sorter.order,
        }));
    };

    useEffect(() => {
        if (listData.tableChange) {
            fetch({
                size: listData.pagination.pageSize,
                page: listData.pagination.current,
                search: listData.search,
                sortField: listData.sortField,
                sortOrder: listData.sortOrder,
                ...listData.filter,
            });
            setListData((prev) => ({ ...prev, tableChange: false }));
        }
    }, [listData]);

    useEffect(() => {
        fetch({
            size: 10,
            page: 1,
            search: listData.search,
            sortField: listData.sortField,
            sortOrder: listData.sortOrder,
            ...listData.filter,
        });
    }, []);

    useEffect(() => {
        if (notify.visible) {
            setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false }));  
        }, 3000);
           
        }
    }, [notify]);

    useEffect(() => {
        if(selectedId)
            setIsOpen(true);
    }, [selectedId]);
    
    const [isOpen, setIsOpen] = useState(false);
    function toggleModal() {
        setIsOpen(!isOpen);
        setSelectedId(null);
    }

    const handleDelete = async () => {
        await MotorService.deletemotor(selectedId)
          .then((resp) => {
            if (resp.is_success) {
                setSelectedId(null);
                setIsOpen(false);
                fetch({
                    size: 10,
                    page: 1,
                    search: listData.search,
                    sortField: listData.sortField,
                    sortOrder: listData.sortOrder,
                    ...listData.filter,
                });
              setNotify((prev) => ({
                ...prev, options: {
                  type: "success",
                  message: resp?.message
                }, visible: true
              }));
            }
            else {
                setSelectedId(null);
              setNotify((prev) => ({
                ...prev, options: {
                  type: "danger",
                  message: resp?.message
                }, visible: true
              }));
            }
    
          })
          .catch((err) => {
            setSelectedId(null);
            setNotify((prev) => ({
              ...prev, options: {
                type: "danger",
                message: err?.message
              }, visible: true
            }));
          });
      };

    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Motors</h1>
                    <div className="page-content">
                        <Table
                            columns={columns}
                            rowKey="motor_id"
                            dataSource={listData.data}
                            onChange={handleTableChange}
                            pagination={null}
                            loading={listData.loading}
                            scroll={{ x: "max-content" }}
                        />
                    </div>

                </div>
            </main>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className="mydeletemodal"
                overlayClassName="myoverlay"
                shouldCloseOnOverlayClick={false}
            >
                <Confirmation onClose={toggleModal} onDelete={handleDelete} notification={notify} id={selectedId}/>
            </Modal>
        </>
    )
};

export default Motors;