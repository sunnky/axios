/*
 * api接口
 *
 */
import axios from 'axios';
import qs from 'qs';
import baseUrl from '../../config.js';
// 配置API接口地址
const env = process.env.NODE_ENV;

//判断元素类型
function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
    for (let key in o) {
        if(o.hasOwnProperty(key)){
            if (o[key] === null) {
                delete o[key];
            }
            if (toType(o[key]) === 'string') {
                o[key] = o[key].trim()
            } else if (toType(o[key]) === 'object') {
                o[key] = filterNull(o[key])
            } else if (toType(o[key]) === 'array') {
                o[key] = filterNull(o[key])
            }
        }

    }
    return o
}

/*
*接口处理函数
*这个函数每个项目都是不一样的
*/
function apiAxios (method, url, params) {
    if (params) {
        params = filterNull(params)
    }
    return new Promise((resolve,reject)=>{
        axios({
            method: method,
            url: url,
            data: method === 'POST' ? qs.stringify(params) : null,
            params: method === 'GET' ? params : null,
            baseURL: baseUrl[env],
            headers:method === 'POST' ? {'Content-Type': 'application/x-www-form-urlencoded'}:{}
        }).then((res) =>{
            resolve(res);
        }).catch((err)=>{
            reject(err);
        })
    })
}

// 返回在vue模板中的调用接口
export default {
    get: function (url, params) {
        return apiAxios('GET', url, params)
    },
    post: function (url, params) {
        return apiAxios('POST', url, params)
    }
}
