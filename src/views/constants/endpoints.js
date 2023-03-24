import { global } from "./global"

export const endpoints = {
    //employees
    login: global.api_url + "employee/login",
    getemployees: global.api_url + "employees",
    getemployeebyid: global.api_url + "employee/",
    addemployee:  global.api_url + "employee/create",
    editemployee:  global.api_url + "employee/edit",
    deleteemployee:  global.api_url + "employee/delete/:id",
    //projects
    getprojects: global.api_url + "projects",
    getprojectbyid: global.api_url + "project/",
    addproject:  global.api_url + "project/create",
    editproject:  global.api_url + "project/edit/:id",
    deleteproject:  global.api_url + "project/delete/:id",

    //company
    getcompanies: global.api_url + "companies",
    getcompanybyid: global.api_url + "company/",
    addcompany:  global.api_url + "company/create",
    editcompany:  global.api_url + "company/edit",
    deletecompany:  global.api_url + "company/delete/:id",

      //company
      getbranches: global.api_url + "branches",
      getbranchbyid: global.api_url + "branch/",
      addbranch:  global.api_url + "branch/create",
      editbranch:  global.api_url + "branch/edit",
      deletebranch:  global.api_url + "branch/delete/:id",

    //company unit
    getunits: global.api_url + "units",
    getunitbyid: global.api_url + "unit/",
    addunit:  global.api_url + "unit/create",
    editunit:  global.api_url + "unit/edit/:id",
    deleteunit:  global.api_url + "unit/delete/:id",

}