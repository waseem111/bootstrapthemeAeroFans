import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";

const ProjectService = {};

ProjectService.getproject = () =>

    fetch({
            url: `${endpoints.getprojects}`,
            method: "get",
        })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                return err;
            });

ProjectService.getprojectbyid = (id) => 
    
    fetch({
        url: `${endpoints.getprojectbyid}${id}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

    
ProjectService.addproject = (obj) =>

    fetch
        .post(`${endpoints.addproject}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


ProjectService.editproject = (obj) =>
    
    fetch
        .post(`${endpoints.editproject}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });


export default ProjectService;