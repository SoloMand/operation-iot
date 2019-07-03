import axios from '../axios'

/* 
 * 租户模块
 */

// 注册
export const registration = data => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/tenant/registration',
        method: 'post',
        data
    })
}

export const query = (data) => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/tenant/query',
        method: 'post',
        data
    })
}

export const loadDataSource = (params) => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/tenant/load',
        method: 'get',
        params
    })
}

export const check = (data) => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/tenant/check',
        method: 'post',
        data
    })
}

