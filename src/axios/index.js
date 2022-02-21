import axios from 'axios';
import Qs from 'qs';
import {localDataHttp} from './instance.js';

const axiosInstance =  axios.create({
    baseURL: 'https://www.semei.net/BookApi/',
    method: 'get', // 默认值
    timeout: 8000, //超过八千毫秒则超时
    responseType: 'json', // 默认值
    // headers: {'Content-Type': 'application/x-www-from-urlencoded'},
    transformRequest: [function (data) {
        // 对发送的 data 进行任意转换处理
        if (data instanceof FormData || data instanceof URLSearchParams) return data;
        else if (data instanceof Object) return Qs.stringify(data);
        else return data;
    }],
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.url = localDataHttp(config);
    return config;
    }, function (error) {
        throw new Error('请求发生错误啦' + error)
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(function (response) {
        const {res} = response
        if(!res) {
            return response.data;
        } else {
            Promise.reject({
                response,
                msg:'请求发生错误啦'
            })
        }
    }, function (error) {
        return Promise.reject(error);
});

export default axiosInstance