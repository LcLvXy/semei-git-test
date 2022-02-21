<template>
    <div>创建分类</div>
    <a-page-header
    style="border-bottom: 1px solid rgb(235, 237, 240);margin-bottom:16px;"
    title="返回书签管理"
    @back="() => backBookManage()"/>
    <a-row>
        <a-col :span="8" style="display:flex">
            <a-form>
                <a-form-item label="一级分类">
                    <a-input v-model:value="classifyInfo.title" />
                </a-form-item>
            </a-form>
            <a-button style="margin-left:5px;" @click="createClassify">创建</a-button>
        </a-col>
        <a-col :span="8"></a-col>
        <a-col :span="8"></a-col>
    </a-row>
</template>

<script>
import { reactive } from 'vue'
import { sendClassify } from '../../axios/api'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
export default {
    name:'CreateClassify',
    setup() {
        const store_ = useStore();
        const router_ = useRouter();
        const classifyInfo = reactive({
            pid:0,
            title:''
        })

        //mapActions
        const { asyncCategory: [asyncCategory] } = store_._actions;
        function createClassify() {
            sendClassify({pid:classifyInfo.pid,title:classifyInfo.title}).then(res => {
                if(res.ret == 200) {
                    asyncCategory()
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
            createClassify,
            backBookManage
        }
    }
}
</script>

<style>

</style>