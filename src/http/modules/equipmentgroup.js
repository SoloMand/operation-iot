import axios from '../axios'

/* 
 * 系统登录模块
 */

// 登录
export const save = data => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/equipmentGroup/save',
        method: 'post',
        data
    })
}

export const get = (params) => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/equipmentGroup/get',
        method: 'get',
        params
    })
}

export const loadTreeByNode = (params) => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/equipmentGroup/loadTree',
        method: 'get',
        params
    })
}

export const loadTree = () => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/equipmentGroup/loadAllTree',
        method: 'get',
    })
}

export const batchDelete = (data) => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/equipmentGroup/delete',
        method: 'post',
		data
    })
}

