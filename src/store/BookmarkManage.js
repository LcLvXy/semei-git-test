//引入api
import { getAllBookmark } from '@/axios/api.js'
// 引入hook
import TreeData from '../hooks/useTreeData.js'

import { message } from "ant-design-vue"

export default {
    state:() => ({
        list:[],
    }),
    mutations: {
        getTreeData(state,list) {
            state.list = list
        }
    },
    // {commit},
    actions: {
        asyncCategory({commit},params = {}) {
            return getAllBookmark(params).then(res => {
                if(res.ret == 200) {
                    TreeData(res.data.list).then(res => {
                        commit('getTreeData',res)
                    })
                } else {
                    message.warning(res.msg)
                    return new Promise((reslove) => {
                        reslove(false)
                    })
                }
            })
        }
    },
}