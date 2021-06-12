import {tokenProvider} from 'axios-token-interceptor'
import axios from "axios";
import {gettoken, userkey} from "../../apiService/sharedService";




export const options = {

    headers: {'x-access-token': gettoken()}
};
