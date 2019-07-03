import axios from '../axios'


export const save = data => {
    return axios({
        url: '/equipmentGroup/save',
        method: 'post',
        data
    })
}

export const get = (params) => {
    return axios({
        url: '/equipmentGroup/get',
        method: 'get',
        params
    })
}

export const loadTreeByNode = (params) => {
    return axios({
        url: '/equipmentGroup/loadTree',
        method: 'get',
        params
    })
}

export const loadTree = () => {
    return axios({
        url: '/equipmentGroup/loadAllTree',
        method: 'get',
    })
}

export const batchDelete = (data) => {
    return axios({
        url: '/equipmentGroup/delete',
        method: 'post',
		data
    })
}

