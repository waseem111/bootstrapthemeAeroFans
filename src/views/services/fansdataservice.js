import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";


const FansDataService = {};

        FansDataService.getrecordsbyairflowpressure = (query) =>
    fetch({
        url: `${endpoints.getrecordsbyairflowpressure}`,
        method: "get",
        params: query,
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


export default FansDataService;