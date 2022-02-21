import BookmarkClassify from '@/views/BookClass/BookmarkClassify.vue'
    import CreateClassify from '@/views/BookClass/CreateClassify.vue'
    import BookmarkManage from '@/views/BookClass/BookmarkManage.vue'
import Journal from '@/views/Journal.vue'
export default [
    {
        name:'bookmarkclassfiy',
        path:'/bookmarkclassfiy',
        meta:{
            name:'书签分类'
        },
        redirect:()=> {
            return {
                name:'createclassify'
            }
        },
        component:BookmarkClassify,
        children:[
            {
                name:'createclassify',
                path:'/createclassify',
                component:CreateClassify,
                meta:{
                    name:'创建分类'
                }
            },{
                name:'bookmarkManage',
                path:'/bookmarkManage',
                component:BookmarkManage,
                meta:{
                    name:'书签管理'
                }
            }
        ]
    },
    {
        name:'journal',
        path:'/journal',
        meta:{
            name:'日志系统'
        },
        component:Journal
    }
]