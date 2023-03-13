import { endpoints } from "../constants/endpoints";
import axios from "axios";
import fetch from "../../fetchinterceptor";
let config = {
    headers: {
        APICODE: "token",
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS,HEAD",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json",
        },
    },
};

const EmployeeService = {};

EmployeeService.getemployees = () =>
    axios
        .get(
            `${endpoints.editemployee}`,
            config
        )
        .then((response) => {
            return response;
        })
        .catch((error) => { return error });


EmployeeService.getemployeebyid = (id) =>
  fetch({
    url: `${endpoints.getemployeebyid}${id}`,
    method: "get",
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
        debugger;
      return Promise.reject(err);
    });

    
EmployeeService.addemployee = (obj) =>
    axios
        .post(
            `${endpoints.addemployee}`,
            obj,
            config
        )
        .then((response) => {
            return response;
        })
        .catch((error) => { return error });


EmployeeService.editemployee = (obj) =>
    axios
        .post(
            `${endpoints.editemployee}`,
            obj,
            config
        )
        .then((response) => {
            return response;
        })
        .catch((error) => { return error });


export default EmployeeService;