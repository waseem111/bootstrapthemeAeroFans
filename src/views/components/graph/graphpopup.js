import React, { useContext, useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import Notify from '../notify/notify';
import FansDataService from '../../services/fansdataservice';
import Loader from '../loader/loader';
import { graph } from '../../constants/graph';

const GraphPopup = (props) => {
  const { selectedFan, onClose,imageData} = props;
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({ options: [], visible: false });
  const cancel = () => {
    onClose();
  };

  const plotgraph = async () => {
    setLoading(true);
    let obj = {
      "diameter": selectedFan?.diameter,
      "airflow": selectedFan?.air_flow,
      "pressure": selectedFan?.pressure,
    }
    await FansDataService.plotgraph(obj)
        .then(
            (resp) => {
                if (resp.is_success) {
                    setLoading(false);
                   
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

useEffect(() => {
 
}, []);

  return (
    <>
     <Loader loader={loading} />
     {notify?.visible && <Notify options={notify?.options} />}
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" onClick={() => { cancel(); }} style={{fontSize:"24px"}}>&times;</button>
        <h4 className="modal-title">Graph</h4>
      </div>
      <form>
        <div className="modal-body">
        {/* <img src={"../assets/images/arn500.PNG"}></img> */}
        <iframe src={"http://3.109.124.68/plotgraph?diameter=1000&airflow=40625&pressure=980"}></iframe>
       </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-light" onClick={() => { cancel(); }}>Cancel</button>
        </div>
      </form>
    </>
  )
};

export default GraphPopup;