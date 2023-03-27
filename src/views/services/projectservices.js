import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";

const ProjectService = {};

ProjectService.getprojects = (query) =>
    fetch({
        url: `${endpoints.getprojects}`,
        method: "get",
        params: query,
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
        .put(`${endpoints.editproject}`, obj)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

ProjectService.getunitsbyprojectid = (id) =>
    fetch({
        url: `${endpoints.getunitsbyprojectid}${id}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

        ProjectService.deleteproject = (id) =>
        fetch
            .get(`${endpoints.deleteproject}${id}`)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                return err;
            });

export default ProjectService;