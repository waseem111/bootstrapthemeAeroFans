import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";

const MotorService = {};

    MotorService.getmotors = (query) =>
        fetch({
            url: `${endpoints.getmotors}`,
            method: "get",
            params: query,
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

    MotorService.getmotorbyid = (id) =>

        fetch({
            url: `${endpoints.getmotorbyid}${id}`,
            method: "get",
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


    MotorService.addmotor = (obj) =>

        fetch
        .post(`${endpoints.addmotor}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


    MotorService.editmotor = (obj) =>
    fetch
        .put(`${endpoints.editmotor}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

    MotorService.deletemotor = (id) =>
        fetch
            .get(`${endpoints.deletemotor}${id}`)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                return err;
            });

export default MotorService;