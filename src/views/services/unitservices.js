import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";


const UnitService = {};

UnitService.getunits = (id) =>
    fetch({
        url: `${endpoints.getunits}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });



UnitService.getunitbyid = (id) =>
    fetch({
        url: `${endpoints.getunitbyid}${id}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


UnitService.addunit = (obj) =>
    fetch
        .post(`${endpoints.addunit}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


UnitService.editunit = (obj) =>
    fetch
        .post(`${endpoints.editunit}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });



export default UnitService;