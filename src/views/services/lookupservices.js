import { endpoints } from "../constants/endpoints";
import fetch from "../../fetchinterceptor";


const LookupService = {};

LookupService.getfans = () =>
    fetch({
        url: `${endpoints.getfans}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

        LookupService.getunitconversions = () =>
    fetch({
        url: `${endpoints.getunitconversions}`,
        method: "get",
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return err;
        });

       


export default LookupService;