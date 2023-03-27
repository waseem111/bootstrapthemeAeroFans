import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";


const CompanyService = {};

CompanyService.getcompanies = (query) =>
    fetch({
        url: `${endpoints.getcompanies}`,
        method: "get",
        params: query,
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
        .put(`${endpoints.editcompany}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

CompanyService.deletecompany = (id) =>
    fetch
        .get(`${endpoints.deletecompany}${id}`)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


CompanyService.getbranches = (query) =>
    fetch({
        url: `${endpoints.getbranches}`,
        method: "get",
        params: query,
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });



CompanyService.getbranchbyid = (id) =>
    fetch({
        url: `${endpoints.getbranchbyid}${id}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


CompanyService.addbranch = (obj) =>
    fetch
        .post(`${endpoints.addbranch}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


CompanyService.editbranch = (obj) =>
    fetch
        .put(`${endpoints.editbranch}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


        CompanyService.deletebranch = (id) =>
    fetch
        .get(`${endpoints.deletebranch}${id}`)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

export default CompanyService;