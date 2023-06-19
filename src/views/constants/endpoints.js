import { global } from "./global"

export const endpoints = {
    //employees
    login: global.api_url + "employee/login",
    getemployees: global.api_url + "employees",
    getemployeebyid: global.api_url + "employee/",
    addemployee:  global.api_url + "employee/create",
    editemployee:  global.api_url + "employee/edit",
    deleteemployee:  global.api_url + "employee/delete/",
    changeemployeepassword:  global.api_url + "employee/change_password/",
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
    getunitdatabyid: global.api_url + "unitdata/",
    saveselectedfandata: global.api_url + "selected_fan_data/create",
    getselectedfans: global.api_url +"unit/selectedfans/",

    //motors
    getmotors: global.api_url + "motors",
    getmotorbyid: global.api_url + "motor/",
    addmotor:  global.api_url + "motor/create",
    editmotor:  global.api_url + "motor/edit",
    deletemotor:  global.api_url + "motor/delete/",

  //lookups
    getfans: global.api_url + "lookup/fans",
    getunitconversions: global.api_url + "lookup/unitconversions",

    //fans data
    //getrecordsbyairflowpressure: global.fandata_api_url + "getrecordsbyairflowpressure",
    searchfansdata: global.api_url + "fansdata/searchfansdata",
    setfanfromselectedfans:  global.api_url + "setfanfromselectedfans",
    updatemotorforfan:  global.api_url + "unitfan/updatemotorforfan",
    plotgraph: global.fandata_api_url + "/plotgraph",
    generatefandatasheet:  global.api_url + "generatefandatasheet/"
}