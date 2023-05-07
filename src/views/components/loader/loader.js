import React from 'react';
import { Spin } from 'antd';

const Loader = (props) => {
  const { loader } = props;
  return (
    <>
      {loader &&
        <div className='loader-outer-main' >
          <div className='loader-inner-main'>
            <Spin />
          </div>
        </div>
      }
    </>
  )
};

export default Loader;