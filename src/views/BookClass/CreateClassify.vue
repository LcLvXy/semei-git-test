<template>
    <a-page-header
    style="border-bottom: 1px solid rgb(235, 237, 240);margin-bottom:16px;"
    title="返回书签管理"
    @back="() => backBookManage()"/>
    <a-row>
        <a-col :span="8" :labelCol="{span:4}">
            <a-form>
                <a-form-item label="父类名称">
                    <a-input v-model:value="route_.query.title" disabled/>
                </a-form-item>
                <a-form-item label="分类ID">
                        <a-input v-model:value="route_.query.cid" disabled/>
                </a-form-item>
                <a-form-item :label="classifyTitle">
                    <a-input :placeholder="placeHolder" v-model:value="classifyInfo.title"/>
                </a-form-item>
            </a-form>
            <a-button style="margin-left:5px;" @click="createClassify">创建</a-button>
        </a-col>
        <a-col :span="8"></a-col>
        <a-col :span="8"></a-col>
    </a-row>
</template>

<script>
import { onBeforeMount, reactive ,ref } from 'vue'
import { sendClassify } from '../../axios/api'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { useRouter,useRoute } from 'vue-router'
export default {
    name:'CreateClassify',
    setup() {
        const store_ = useStore();
        const router_ = useRouter();
        const route_ = useRoute();
        const classifyTitle = ref('')
        const classifyInfo = reactive({
            pid:0,
            title:''
        })
        let placeHolder = ref('');

        onBeforeMount(() => {
            if(!+route_.query.cid) {
                classifyTitle.value = '一级分类'
                classifyInfo.pid = route_.query.pid;
                placeHolder.value = '当前是顶级分类'
            } else {
                classifyTitle.value = '多级分类'
                classifyInfo.pid = route_.query.cid;
                classifyInfo.title = '';
                placeHolder.value = '分类名'
            }
        })

        const { asyncCategory: [asyncCategory] } = store_._actions;
        function createClassify() {
            sendClassify({pid:classifyInfo.pid,title:classifyInfo.title}).then(res => {
                if(res.ret == 200) {
                    asyncCategory()
                    classifyInfo.title = ''
                    message.success('创建成功')
                } else {
                    message.warning('创建失败,' + res.msg)
                }
            })
        }

        function backBookManage() {
            router_.replace({
                name:'bookmarkManage'
            })
        }

        return {
            classifyInfo,
            classifyTitle,
            route_,
            placeHolder,
            createClassify,
            backBookManage
        }
    }
}
</script>

<style>

</style>