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

const ProjectService = {};

ProjectService.getproject = () =>
    axios
        .get(
            `${endpoints.getprojects}`,
            config
        )
        .then((response) => {
            return response;
        })
        .catch((error) => { return error });

ProjectService.getprojectbyid = (id) => {
    
    axios
        .get(
            `${endpoints.getprojectbyid}${id}`,
            config
        )
        .then((response) => {
            return response;
        })
        .catch((error) => { return error });
}
    
ProjectService.addproject = (obj) =>
    axios
        .post(
            `${endpoints.addproject}`,
            obj,
            config
        )
        .then((response) => {
            return response;
        })
        .catch((error) => { return error });


ProjectService.editproject = (obj) =>
    axios
        .post(
            `${endpoints.editproject}`,
            obj,
            config
        )
        .then((response) => {
            return response;
        })
        .catch((error) => { return error });


export default ProjectService;