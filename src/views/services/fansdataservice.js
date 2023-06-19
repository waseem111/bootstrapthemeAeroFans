import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";
import { global } from "../constants/global";


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


FansDataService.plotgraph = (query) =>
    fetch({
        url: `${global.fandata_api_url}plotgraph`,//"http://3.109.124.68/plotgraph",
        method: "get",
        params: query,
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

FansDataService.generatefandatasheet = (id) =>
    fetch
        .get(`${endpoints.generatefandatasheet}${id}`)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


export default FansDataService;