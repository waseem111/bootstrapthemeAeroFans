import React, { useState, useEffect } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { Table } from "antd";
import LookupService from '../../../services/lookupservices';

const Fans = () => {
    
    const columns = [
        {
            title: 'S No.',
            dataIndex: 'fan_id',
            key: 'fan_id',
        },
        {
            title: 'Fan Diameter',
            dataIndex: 'fan_diameter',
            key: 'fan_diameter',
            sorter: true
        },
        {
            title: 'SD Diameter',
            dataIndex: 'sd_diameter',
            key: 'sd_diameter',
            sorter: true
        },
        {
            title: 'LD Diameter',
            dataIndex: 'ld_diameter',
            key: 'ld_diameter',
            sorter: true
        },
        {
            title: 'Area',
            dataIndex: 'fan_area',
            key: 'fan_area',
            sorter: true
        },
        {
            title: 'SD Area',
            dataIndex: 'sd_area',
            key: 'sd_area',
            sorter: true
        }
        ,
        {
            title: 'LD Area',
            dataIndex: 'ld_area',
            key: 'ld_area',
            sorter: true
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


    const fetch = async () => {
        setListData((prev) => ({ ...prev, loading: true }));
        await LookupService.getfans()
            .then(
                (resp) => {
                    if (resp.is_success) {
                        setListData((prev) => ({
                            ...prev,
                            data: resp?.data,
                            loading: false,
                        }));
                    }
                    else {
                        setListData((prev) => ({ ...prev, data: [], loading: false }));
                    }
                },
                (err) => {
                    setListData((prev) => ({ ...prev, data: [], loading: false }));
                }
            );
    };

    useEffect(() => {
        fetch();
    }, []);


    return (
        <>
            <Header />
            <LeftSideBar />
            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Fans</h1>
                    <div className="page-content">
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

export default Fans;