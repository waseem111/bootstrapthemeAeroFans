import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";


const EmployeeService = {};

EmployeeService.getemployees = (id) =>
    fetch({
        url: `${endpoints.getemployees}`,
        method: "get",
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
        .post(`${endpoints.editemployee}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });



export default EmployeeService;