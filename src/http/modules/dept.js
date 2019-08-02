import axios from '../axios'

/* 
 * 机构管理模块
 */

// 保存
export const save = (data) => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/dept/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/dept/delete',
        method: 'post',
        data
    })
}
// 查询机构树
export const findDeptTree = () => {
    return axios({
		prefixUrl:'baseUrl',
        url: '/dept/findTree',
        method: 'get'
    })
}