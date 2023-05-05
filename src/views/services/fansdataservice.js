import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";


const FansDataService = {};

FansDataService.searchfansdata = (obj) =>
    fetch
        .post(`${endpoints.searchfansdata}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


export default FansDataService;