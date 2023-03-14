import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";


const CompanyService = {};

CompanyService.getcompany = (id) =>
    fetch({
        url: `${endpoints.getcompany}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });



CompanyService.getcompanybyid = (id) =>
    fetch({
        url: `${endpoints.getcompanybyid}${id}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


CompanyService.addcompany = (obj) =>
    fetch
        .post(`${endpoints.addcompany}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


CompanyService.editcompany = (obj) =>
    fetch
        .post(`${endpoints.editcompany}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });



export default CompanyService;