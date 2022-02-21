import axiosInstance from './index.js';

export function axios(options = {method:'get'}){
    let{method = 'get',data} = options
    if(method === 'get') {
        options.params = data;
    }
    return axiosInstance(options);
}

export function post(url,data,options){
    return axiosInstance.post(url,data,{...options});
}

export function get(url,options){
    let {data} = options;
    options.params = data;
    return axiosInstance.get(url,{...options});
}
