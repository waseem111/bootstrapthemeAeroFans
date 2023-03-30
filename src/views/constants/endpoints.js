import { global } from "./global"

export const endpoints = {
    //employees
    login: global.api_url + "employee/login",
    getemployees: global.api_url + "employees",
    getemployeebyid: global.api_url + "employee/",
    addemployee:  global.api_url + "employee/create",
    editemployee:  global.api_url + "employee/edit",
    deleteemployee:  global.api_url + "employee/delete/",
    //projects
    getprojects: global.api_url + "projects",
    getprojectbyid: global.api_url + "project/",
    addproject:  global.api_url + "project/create",
    editproject:  global.api_url + "project/edit",
    deleteproject:  global.api_url + "project/delete/",
    getunitsbyprojectid:  global.api_url + "project/units/",

    //company
    getcompanies: global.api_url + "companies",
    getcompanybyid: global.api_url + "company/",
    addcompany:  global.api_url + "company/create",
    editcompany:  global.api_url + "company/edit",
    deletecompany:  global.api_url + "company/delete/",

      //company
      getbranches: global.api_url + "branches",
      getbranchbyid: global.api_url + "branch/",
      addbranch:  global.api_url + "branch/create",
      editbranch:  global.api_url + "branch/edit",
      deletebranch:  global.api_url + "branch/delete/",

    //company unit
    getunits: global.api_url + "units",
    getunitbyid: global.api_url + "unit/",
    addunit:  global.api_url + "unit/create",
    bulkaddunit:  global.api_url + "unit/create/bulk",
    editunit:  global.api_url + "unit/edit",
    deleteunit:  global.api_url + "unit/delete/",

  //lookups
    getfans: global.api_url + "lookup/fans",
    getunitconversions: global.api_url + "lookup/unitconversions",

    //fans data
    getrecordsbyairflowpressure: global.fandata_api_url + "getrecordsbyairflowpressure",

}