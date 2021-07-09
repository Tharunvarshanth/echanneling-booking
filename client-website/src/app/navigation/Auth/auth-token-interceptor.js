import {gettoken} from "../../apiService/sharedService";




export const options = {

    headers: {'x-access-token': gettoken()}
};
