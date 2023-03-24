import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/fontawesome-free-solid'
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import EmployeeService from '../../../services/employeeservices';
import Notify from '../../../components/notify/notify';
import { Table } from "antd";
const Employees = () => {
    const navigate = useNavigate();
    const [notify, setNotify] = useState({ options: [], visible: false });

    const columns = [
        {
            title: 'Emp #',
            dataIndex: 'emp_no',
            key: 'emp_no',
            sorter: true
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role_name',
            key: 'role_name',
            sorter: true
        },
        {
            title: 'Action',
            dataIndex: 'emp_id',
            key: 'emp_id',
            render: (record) => <>
                <button className='btn btn-primary mr-10' onClick={() => navigate('/editemployee/' + record)}><FontAwesomeIcon icon={faEdit} /></button>
                <button className='btn btn-danger'><FontAwesomeIcon icon={faTrash} /></button>
            </>,
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


    const fetch = async (params = {}) => {
        await EmployeeService.getemployees({
            ...params,
        })
            .then(
                (resp) => {
                    debugger;
                    if (resp.is_success) {
                        const pagination = { ...listData.pagination };
                        pagination.total = resp?.count;
                        pagination.current = resp?.current_page;
                        setListData((prev) => ({
                            ...prev,
                            data: resp?.data,
                            pagination: pagination,
                        }));
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
            setTimeout(() => { setNotify((prev) => ({ ...prev, visible: false })); }, 3000);
        }
    }, [notify]);



    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Employees</h1>
                    <div className="page-content">
                        <Table
                            columns={columns}
                            rowKey={new Date().getTime()}
                            dataSource={listData.data}
                            pagination={listData.pagination}
                            onChange={handleTableChange}
                        />
                    </div>
                </div>
            </main>
        </>
    )
};

export default Employees;