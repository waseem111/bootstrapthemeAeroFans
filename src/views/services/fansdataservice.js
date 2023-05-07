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

FansDataService.getselectedfans = (id) =>
    fetch
        .get(`${endpoints.getselectedfans}${id}`)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


FansDataService.setfanfromselectedfans = (obj) =>
    fetch
        .put(`${endpoints.setfanfromselectedfans}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

FansDataService.updatemotorforfan = (obj) =>
    fetch
        .put(`${endpoints.updatemotorforfan}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


export default FansDataService;