<template>
    <div>
        <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="toPages('createclassify')">创建分类</a-button>   
    </div>
    <a-table rowKey="cid" :dataSource="dataSource" :columns="columns" >
    <template v-slot:operation="operation">
        <a-popconfirm
        title="Sure to deletew?"
        @confirm="deleteCatgory(operation)"
        >
        <a>Delete</a>
        </a-popconfirm>
    </template>
    </a-table>
</template>


<script>
import { computed } from 'vue';

//引入store
import { useStore } from "vuex";

import { useRouter } from 'vue-router';

import { removeClassify } from '../../axios/api';

import { message } from 'ant-design-vue';

export default {
    name:'BookmarkManage',
    setup() {
        const store_ = useStore();
        const router_ = useRouter();
        const { asyncCategory: [asyncCategory] } = store_._actions;

        const columns = [{
                title: '分类id',
                dataIndex: 'cid',
                width: '30%',
            }, {
                title: '类别名称',
                dataIndex: 'title',
            }, {
                title: '父级id',
                dataIndex: 'pid',
            }, {
                title: '操作',
                dataIndex: 'operation',
                slots:{
                    customRender:'operation'
                }
            }]

            asyncCategory()

        function toPages() {
            router_.replace({
                name:'createclassify'
            })
        }

        let dataSource = computed(() => {
            return store_.state.BookmarkManage.list
        })

        function deleteCatgory(operation) {
            removeClassify(operation.record.cid).then(res => {
                if(res.ret == 200) {
                    message.success('删除成功')
                    store_.dispatch('asyncCategory')
                } else {
                    message.warning('删除失败,' + res.message)
                }
            })

        }

        return {
            dataSource,
            columns,
            toPages,
            deleteCatgory
        }
    }
}

</script>

<style scoped>
.anticon  {
    left: -15px !important;
}
</style>