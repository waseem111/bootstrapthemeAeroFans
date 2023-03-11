import { endpoints } from "../constants/endpoints";
import axios from "axios";
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
    axios
        .get(
            `${endpoints.getemployeebyid}${id}`,
            config
        )
        .then((response) => {
            return response;
        })
        .catch((error) => { return error });


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