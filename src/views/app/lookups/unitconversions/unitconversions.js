import React, { useState, useEffect } from 'react';
import Header from '../../../layout/header';
import LeftSideBar from '../../../layout/leftsidebar';
import { Table } from "antd";
import LookupService from '../../../services/lookupservices';

const Unitconversions = () => {
    
    const columns = [
        {
            title: 'S No.',
            dataIndex: 'luc_id',
            key: 'luc_id',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            sorter: true
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            sorter: true
        },
        {
            title: 'Conversion',
           // dataIndex: 'conversion',
            key: 'conversion',
            render: (record) => (
                <div>
                    <p>1 {record?.unit} =  {record?.conversion}</p>
                </div>
            ),
            // render: (record) => (
            //     <div>
            //       {(() => {
            //         let _obj = JSON.parse(record?.conversion);
            //         let _conversions = Object.keys(_obj);

            //         _conversions.forEach((c) =>{
            //             console.log(c);
            //             return (
            //                 <div key={new Date().getTime()}>
            //                  { _obj['"'+c+'"']}
            //                 </div>
            //               );
            //         } );
                   
            //       })()}
            //     </div>
            //   ),
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
        await LookupService.getunitconversions()
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
                    <h1 className="page-title">Unit Conversions</h1>
                    <div className="page-content">
                        <Table
                            columns={columns}
                            rowKey={'luc_id'}
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

export default Unitconversions;