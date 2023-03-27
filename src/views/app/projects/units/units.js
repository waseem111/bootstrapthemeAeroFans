import React, { useState, useEffect } from 'react';
import { Table } from "antd";

const Units = (props) => {
    const { columns =null,listData=null } = props;

    return (
        <>
                <Table
                    columns={columns}
                    rowKey={new Date().getTime()}
                    dataSource={listData?.data}
                    pagination={false} 
                    scroll={{y:400}}
                />
        </>
    )
};

export default Units;