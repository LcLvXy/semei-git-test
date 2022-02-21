<template>
    <div class="Register">
        <a-modal 
        v-model:visible="visible" 
        title="图形验证码" 
        cancelText="取消"
        okText="提交注册"
        @ok="register"
        cancel>
            <a-input autocomplete="off" type="text" v-model:value="userInfo.photoSmsCode" html-type="text"/>
            <a-image
                @click="changeImgSmsCode"
                :src="imgSmsCode"
                :preview="false"/>
            <span @click="changeImgSmsCode" style="cursor:pointer">看不清？换一张</span>
        </a-modal>

        <a-row>
            <a-col :span="8"></a-col>
            <a-col :span="8">  
                <h1>注册</h1>      
                <a-form action="" 
                class="register-from" 
                :model="userInfo"
                :rules="rules"
                >
                    <a-form-item
                    name="email"
                    has-feedback
                    label="邮箱地址:"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }">
                        <a-input type="text" v-on:change="regflag" v-model:value="userInfo.email"/>
                    </a-form-item>

                    <a-form-item
                    label="密码:" 
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }"
                    has-feedback
                    name="password">
                        <a-input-password v-on:change="regflag" v-model:value="userInfo.password"/>
                    </a-form-item>

                    <a-form-item
                    label="确认密码:" 
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }"
                    has-feedback
                    name="passwordCon"
                    >
                        <a-input-password v-on:change="confirmPassword" v-model:value="userInfo.passwordCon"/>
                    </a-form-item>

                    <a-form-item
                    label="邮箱验证码:"
                    name="emailSmsCode"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 12 }">
                        <div class="row-flex">
                            <a-input type="text" v-on:change="regflag" v-model:value="userInfo.emailSmsCode" has-feedback/>
                            <a-button :disabled="!emailFlag" 
                            @click="sendEmailSmsCode" 
                            type="primary" 
                            html-type="button"
                            :loading="iconLoading"
                            >{{emailText}}</a-button>
                        </div>
                    </a-form-item>
                    <a-row>
                        <a-col :span="6"></a-col>
                        <a-col :span="12"><a-button 
                        :disabled="!sendInfoFlag"
                        type="primary" 
                        html-type="button" 
                        @click="changeVisible"
                        block
                        >注册</a-button>
                        <router-link to="/login" replace>已有账号去登录</router-link>
                        </a-col>
                        <a-col :span="6"></a-col>
                    </a-row>
                </a-form>
            </a-col>
            <a-col :span="8"></a-col>
        </a-row>
        <p>{{visible}}</p>
    </div>
</template>

<script>
//axiosAPI
import { emailRegister,userRegister } from "@/axios/api.js"
//vue方法
import { reactive,ref } from "vue"
//表单验证模块
import { patternRule,rule } from '@/ant-design'
//ant-desgin消息提示
import { message } from 'ant-design-vue';
//vue-router实例
import { useRouter } from 'vue-router'

export default {
    name:'Register',
    setup() {
        //收集表单信息
        const userInfo = reactive({
            email:'',
            password:'',
            emailSmsCode:'',
            photoSmsCode:'',
            passwordCon:''
        })
        
        //验证码
        let imgSmsCode = ref('https://www.semei.net/BookApi/Sms/Sms.php?s=imgCodeShow')

        //切换验证码方法
        function changeImgSmsCode() {
            imgSmsCode.value = `https://www.semei.net/BookApi/Sms/Sms.php?s=imgCodeShow&timestamp=${+new Date()}`;
        }

        const iconLoading = ref(false);
        

        //发送邮箱验证码
        let emailFlag = ref(false);
        let emailText = ref('获取邮箱验证码');
        let timeOut = ref(30);
        let timer = ref(null);
        function sendEmailSmsCode() { 
            iconLoading.value = true;
            emailRegister({
                addAddress:userInfo.email,
            }).then(res => {
                if(res.ret == 200) {
                    timer.value = setInterval(() => {
                    timeOut.value --;
                    emailText.value = timeOut.value + '秒后重新发送'
                        if(timeOut.value == 0) {
                            emailText.value = '重新发送'
                            emailFlag.value = true;
                            timeOut.value = 30;
                            clearInterval(timer.value)
                        }
                    }, 1000);
                    emailFlag.value = false;
                    message.success(res.msg);
                    iconLoading.value = false;
                } else {
                    message.warning(res.msg);
                    iconLoading.value = false;
                }
                
            })
        }

        //emailFlag
        function changeEmailFlag() {
            if(rule.isEmail('',userInfo.email)) {
                emailFlag.value = true;
            } else {
                emailFlag.value = false;
            }
        }

        let sendInfoFlag = ref(false);
        //regflag
        function regflag() {
            confirmPassword()
            changeEmailFlag()
            if (rule.isEmail('',userInfo.email) && 
            rule.isPassword('',userInfo.password) &&
            rule.isEmailPatt('',userInfo.emailSmsCode)&&
            patternRule.passwordCon[0].flag
            ) {
                sendInfoFlag.value = true;
                changeImgSmsCode();
            } else {
                sendInfoFlag.value = false;
            }
        }

        //注册
        let visible = ref(false);
        function changeVisible() {
            changeImgSmsCode();
            userInfo.photoSmsCode = ''
            visible.value = true
        }

        let _router = useRouter();
        function register() {
            visible.value = false
            userRegister({
                account: userInfo.email,
                code:userInfo.photoSmsCode,
                emailCode:userInfo.emailSmsCode,
                password:userInfo.password
            }).then(res => {
                if(res.ret === 200) {
                    message.success('注册成功,即将跳转至登录界面');
                    setTimeout(() => {
                        _router.replace({
                            name:'login'
                        })
                    }, 1000);
                } else {
                    message.error(res.msg)
                }
            })
        }

        //对比密码
        function confirmPassword() {
            if(userInfo.passwordCon === userInfo.password) {
                patternRule.passwordCon[0].flag = true;
            } else {
                patternRule.passwordCon[0].flag = false;
                
            }
        }

        //表单规则
        const rules = patternRule

        return {
            userInfo,
            imgSmsCode,
            rules,
            visible,
            sendInfoFlag,
            emailFlag,
            emailText,
            changeImgSmsCode,
            sendEmailSmsCode,
            changeVisible,
            confirmPassword,
            register,
            regflag,
            changeEmailFlag,
            iconLoading
        }
    },
}
</script>

<style scoped>
.row-flex {
    display: flex;
}

h1 {
    position: relative;
    left: calc(50% - 60px);
    top: 20px;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    background-color:rgb(214, 214, 214);
    border-radius: 50%;
    font-size: 30px;
}

.register-from {
    padding-top: 15px;
}
</style>