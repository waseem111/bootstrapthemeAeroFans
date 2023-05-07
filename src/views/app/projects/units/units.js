import React, { useState, useEffect } from 'react';
import { Table } from "antd";

const Units = (props) => {
    const { columns =null,listData=null } = props;

    return (
        <>
                <Table
                    columns={columns}
                    rowKey={"pu_id"}
                    dataSource={listData?.data}
                    loading={listData.loading}
                    pagination={false} 
                    scroll={{y:400}}
                />
        </>
    )
};

export default Units;