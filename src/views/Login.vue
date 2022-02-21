<template>
    <div>
        <a-row>
            <a-col :span="8"></a-col>
            <a-col :span="8">  
                <h1>登录</h1>      
                <a-form 
                @submit.prevent="sendLogin"
                :model="loginInfo"
                :rules="rules"
                >
                    <a-form-item
                    name="account"
                    has-feedback
                    label="手机号码/邮箱:"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }">
                        <a-input type="text" v-model:value="loginInfo.account" @change="changeLoginFlag"/>
                    </a-form-item>

                    <a-form-item
                    label="密码:" 
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }"
                    has-feedback
                    name="password">
                        <a-input-password v-model:value="loginInfo.password" @change="changeLoginFlag"/>
                    </a-form-item>

                    <a-row>
                        <a-col :span="6"></a-col>
                        <a-col :span="12"><a-button 
                        type="primary" 
                        html-type="submit" 
                        :disabled="loginFlag"
                        block
                        >登录</a-button>
                        <router-link to="/register" replace>没有账号?去注册</router-link>
                        </a-col>
                        <a-col :span="6"></a-col>
                    </a-row>
                </a-form>
            </a-col>
            <a-col :span="8"></a-col>
        </a-row>
    </div>
</template>

<script>
//引入vue方法
import { reactive,getCurrentInstance,ref } from "vue"
//引入api
import { userLogin } from '@/axios/api.js'
//引入全局弹窗
import { message } from 'ant-design-vue';
//引入正则管理
import { patternRule,rule } from '@/ant-design'
//引入store
import { useStore } from "vuex";
//引入router
import { useRouter } from 'vue-router'
export default {
    name:'Login',
    setup() {
        //引入前置配置
        let _vm = getCurrentInstance();
        let _cooikes = _vm.appContext.config.globalProperties.$cookies;
        let _router = useRouter();
        const store_ = useStore();

        const loginInfo = reactive({
            account:'',
            password:''
        })

        //发送登录
        function sendLogin() {
            userLogin({account:loginInfo.account,password:loginInfo.password}).then(res => {
                if(res.ret == 200) {
                    message.success('登录成功,即将跳转至首页')
                    store_.dispatch('sendUserInfo',res.data.user);
                    _cooikes.set('seMeiUserToken',res.data.token,86400);
                    setTimeout(() => {
                        _router.replace({
                            name:'index'
                        })
                    }, 1000);
                } else {
                    message.error(res.msg)
                }
            })
        }

        //禁用按钮
        let loginFlag = ref(true);
        function changeLoginFlag() {
            if (rule.isEmail('',loginInfo.account) && rule.isPassword('',loginInfo.password)) {
                loginFlag.value = false;
            } else {
                loginFlag.value = true;
            }
        }

        //表单规则
        const rules = patternRule

        return {
            loginInfo,
            rules,
            store_,
            loginFlag,
            sendLogin,
            changeLoginFlag
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 30px;
    margin-top: 30px;
    text-align: center;
}
</style>