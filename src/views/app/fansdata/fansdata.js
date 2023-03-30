import React, { useState, useEffect } from 'react';
import Header from '../../layout/header';
import LeftSideBar from '../../layout/leftsidebar';
import { Table } from "antd";
import FansDataService from '../../services/fansdataservice';
import Notify from '../../components/notify/notify';
const Fansdata = () => {
    const columns = [
        {
            title: 'mm',
            dataIndex: 'mm',
            key: 'mm',
        },
        {
            title: 'ang',
            dataIndex: 'ang',
            key: 'ang',
        },
        {
            title: 'g',
            dataIndex: 'g',
            key: 'g',
        },
        {
            title: 'p',
            dataIndex: 'p',
            key: 'p',
        },
        {
            title: 'n',
            dataIndex: 'n',
            key: 'n',
        },
        {
            title: 'N_FAN',
            dataIndex: 'N_FAN',
            key: 'N_FAN',
        },
        {
            title: 'EFF_TT',
            dataIndex: 'EFF_TT',
            key: 'EFF_TT',
        },
        {
            title: 'EFF_TS',
            dataIndex: 'EFF_TS',
            key: 'EFF_TS',
        },
        {
            title: 'PRTT',
            dataIndex: 'PRTT',
            key: 'PRTT',
        },
        {
            title: 'PRTS',
            dataIndex: 'PRTS',
            key: 'PRTS',
        },
        {
            title: 'LpA',
            dataIndex: 'LpA',
            key: 'LpA',
        },
        {
            title: 'Lp',
            dataIndex: 'Lp',
            key: 'Lp',
        },
        {
            title: 'LwAt',
            dataIndex: 'LwAt',
            key: 'LwAt',
        },
        {
            title: 'Lwt',
            dataIndex: 'Lwt',
            key: 'Lwt',
        },
        {
            title: 'LwAi',
            dataIndex: 'LwAi',
            key: 'LwAi',
        },
        {
            title: 'Lwi',
            dataIndex: 'Lwi',
            key: 'Lwi',
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
    const getrecordsbyairflowpressure = async (params = {}, id) => {
        setListData((prev) => ({ ...prev, loading: true }));
        await FansDataService.getrecordsbyairflowpressure({
            ...params,
        })
            .then(
                (resp) => {
                    setListData((prev) => ({
                        ...prev,
                        data: resp?.data,
                        loading: false,
                    }));
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
        getrecordsbyairflowpressure({
            airflow: 50000,
            pressure: 490
        })
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
                    <h1 className="page-title">Fansdata</h1>
                    <div className="page-content">
                        {/* <div className="row">
                            <div className="form-group col-md-4 ">
                                <label>Company</label>
                                <select
                                    className="form-control"
                                    defaultValue=""
                                    name="com_id"
                                    onChange={(e) => handleCompanyFilter(e)}
                                >
                                    <option value="">Select Company</option>
                                    {lookupCompanies?.map((elm) => (
                                        <option key={elm.com_id} value={elm.com_id}>
                                            {elm.com_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-4 ">
                                <label>Branch</label>
                                <select
                                    className="form-control"
                                    defaultValue=""
                                    name="cb_id"
                                    onChange={(e) => handleCompanyFilter(e)}
                                >
                                    <option value="" >Select Company</option>
                                    {lookupBranches?.map((elm) => (
                                        <option key={elm.cb_id} value={elm.cb_id}>
                                            {elm.com_branch_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div> */}

                        <Table
                            columns={columns}
                            rowKey={new Date().getTime()}
                            dataSource={listData.data}
                            pagination={null}
                            loading={listData.loading}
                        />
                    </div>

                </div>
            </main>
        </>
    )
};

export default Fansdata;