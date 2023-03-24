import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";


const EmployeeService = {};

EmployeeService.login = (obj) =>
    fetch
        .post(`${endpoints.login}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });



EmployeeService.getemployees = (query) =>
    fetch({
        url: `${endpoints.getemployees}`,
        method: "get",
        params: query,
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });



EmployeeService.getemployeebyid = (id) =>
    fetch({
        url: `${endpoints.getemployeebyid}${id}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


EmployeeService.addemployee = (obj) =>
    fetch
        .post(`${endpoints.addemployee}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


EmployeeService.editemployee = (obj) =>
    fetch
        .put(`${endpoints.editemployee}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });



export default EmployeeService;