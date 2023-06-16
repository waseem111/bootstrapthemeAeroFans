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


        FansDataService.plotgraph = (query) =>
            // fetch({
            //     url: "http://3.109.124.68/plotgraph",
            //     method: "get",
            //     params: query,
            // })
            //     .then((data) => {
            //         return data;
            //     })
            //     .catch((err) => {
            //         return err;
            //     });
        
                fetch({
                    url: "http://3.109.124.68/plotgraph",
                    method: "get",
                    params: query,
                })
                .then((response) => response.blob())
                .then((blob) => {
                    debugger;
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    //setImageData(reader.result);
                    debugger;
                    return reader.result;
                  };
                  reader.readAsDataURL(blob);
                });



export default FansDataService;