import { global } from "./global"

export const endpoints = {
    //employees
    getemployees: global.api_url + "employees",
    getemployeebyid: global.api_url + "employee/",
    addemployee:  global.api_url + "employee/create",
    editemployee:  global.api_url + "employee/edit/:id",
    deleteemployee:  global.api_url + "employee/delete/:id",
    //projects
    getprojects: global.api_url + "projects",
    getprojectbyid: global.api_url + "project/",
    addproject:  global.api_url + "project/create",
    editproject:  global.api_url + "project/edit/:id",
    deleteproject:  global.api_url + "project/delete/:id",

}