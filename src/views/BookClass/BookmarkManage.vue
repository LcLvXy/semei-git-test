<template>
    <div>
        <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="addClassify({record:{cid:0,title:'最高级'}})">创建分类</a-button>   
    </div>
    <a-table rowKey="cid" :dataSource="dataSource" :columns="columns" class="tab">
        <template v-slot:inputTitle="{text,record}">
            <div v-if="dataIndex === text"> 
                <a-input v-model:value="datachangeTitle" style="width: 30%;" @blur="sendChangeClassify(record)"></a-input> 
            </div>
            <div v-else style="width: 60%;" @dblclick="redact(text)" >{{`分类名称:${text}`}}</div>
        </template>

        <template v-slot:operation="operation">
            <a-button  type="primary" ghost @click="addClassify(operation)">添加 </a-button>
            <a-button type="primary" @click="blurOrChange(operation)" ghost>更改</a-button>
            <a-popconfirm
            title="Sure to deletew?"
            @confirm="deleteCatgory(operation)"
            >
            <a-button danger ghost>删除</a-button>
            </a-popconfirm>
        </template>
    </a-table>
</template>


<script>
import { computed,ref } from 'vue';

import { useStore } from "vuex";

import { useRouter } from 'vue-router';

import { removeClassify,modifyClassification } from '../../axios/api';

import { message } from 'ant-design-vue';

export default {
    name:'BookmarkManage',
    setup() {
        const store_ = useStore();
        const router_ = useRouter();
        const { asyncCategory: [asyncCategory] } = store_._actions;
        let dataIndex = ref(-1)
        let datachangeTitle = ref('')
        asyncCategory()

        const columns = [{
                title: '分类id',
                dataIndex: 'cid',
                width: '30%',
            }, {
                title: '类别名称',
                dataIndex: 'title',
                slots:{
                    customRender:'inputTitle'
                }
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

        let dataSource = computed(() => {
            return store_.state.BookmarkManage.list
        })

        function addClassify(operation) {
            if(+operation.record.cid) {
                router_.replace({
                    name:'createclassify',
                    query:{
                        cid:operation.record.cid,
                        pid:operation.record.pid,
                        title:operation.record.title
                    }
                })
            } else {
                router_.replace({
                    name:'createclassify',
                    query:{
                        cid:0,
                        title:operation.record.title
                    }
                })
            }
        }

        function deleteCatgory(operation) {
            removeClassify(operation.record.cid).then(res => {
                if(res.ret == 200) {
                    message.success('删除成功')
                    store_.dispatch('asyncCategory')
                } else {
                    message.warning('删除失败,' + res.msg)
                }
            })
        }

        function sendChangeClassify(record) {
            dataIndex.value = -1;
            modifyClassification({
                classId:record.cid,
                title:datachangeTitle.value,
                pid:record.pid
            }).then(res => {
                if(res.ret == 200) {
                    message.success('更改成功')
                    store_.dispatch('asyncCategory')
                } else {
                    message.warning('更改失败,' + res.msg)
                }
            })
        }

        function redact(text) {
            dataIndex.value = text;
            datachangeTitle.value = text;
        }

        function blurOrChange(operation) {
            if(dataIndex.value == -1) {
                redact(operation.record.title)
            } else {
                sendChangeClassify(operation.record)
            }
        }

        return {
            dataSource,
            dataIndex,
            columns,
            datachangeTitle,
            deleteCatgory,
            addClassify,
            redact,
            sendChangeClassify,
            blurOrChange
        }
    }
}

</script>

<style scoped>
.anticon  {
    left: -15px !important;
}

.tab button {
    margin: 0 5px;
}

.ant-table table {
    text-align: center;
}
</style>