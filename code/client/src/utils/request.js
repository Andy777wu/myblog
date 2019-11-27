import qs from 'qs'
import axios from 'axios'

export const axiosPost = function(url,params){
    // console.log(url);
    // console.log(params);
    const options = {
        method: 'POST',
        responseType: 'json',
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
        data: qs.stringify(params),
        url,
    };
    return axios(options)
}
export const axiosGet = function(url){
    // console.log(url);
    const options = {
        method: 'GET',
        responseType: 'json',
        url,
    };
    return axios(options)
}
