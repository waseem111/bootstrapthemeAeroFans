import { global } from "./global"

export const endpoints = {
    getemployees: global.api_url + "employees",
    getemployeebyid: global.api_url + "employee/:id",
    addemployee:  global.api_url + "employee/create",
    editemployee:  global.api_url + "employee/edit/:id",
    deleteemployee:  global.api_url + "employee/delete/:id",
}