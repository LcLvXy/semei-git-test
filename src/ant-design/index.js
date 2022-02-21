const validator = function (_rule, value){
    return value
}


const _rules = {
    isAccount:{
        pattern:/^((13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8})|([A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)$/,
        message:'手机号码或邮箱格式不正确',
        validator
    },
    isMobile:{
        pattern:/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
        message:'手机号码格式不正确',
        validator
    },
    isEmail:{
        pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        message:'邮箱格式不正确',
        validator
    },
    isPassword:{
        pattern:/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*? ]([^\s])).*$/,
        message:"最少6位，包括至少1个小写字母，1个数字，1个特殊字符",
        validator
    },
    isEmailPatt:{
        pattern:/^[A-Za-z0-9]{0,6}$/,
        message:"只能输入字母或数字,且长度不能大于6",
        validator
    }
}

export const rule =  {
    isMobile(_rule,value) {
        let pattern = _rules.isMobile.pattern
        return pattern.test(value)
    },
    isEmail(_rule,value) {
        let pattern = _rules.isEmail.pattern
        return pattern.test(value)
    },
    isPassword(_rule,value) {
        let pattern = _rules.isPassword.pattern
        return pattern.test(value)
    },
    isEmailPatt(_rule,value) {
        let pattern = _rules.isEmailPatt.pattern
        return pattern.test(value)
    },
    isAccount(_rule,value) {
        let pattern = _rules.isAccount.pattern
        return pattern.test(value)
    }
}

export const patternRule = {
    email:[{
        required:true,
        pattern:_rules.isEmail.pattern,
        message:_rules.isEmail.message,
        trigger:['change']
        }],
    password:[{
        required:true,
        pattern:_rules.isPassword.pattern,
        message:_rules.isPassword.message,
    }],
    emailSmsCode:[{
        required:true,
        pattern:_rules.isEmailPatt.pattern,
        message:_rules.isEmailPatt.message, 
    }],
    passwordCon:[{
        required:true,
        flag:false,
        validator: async function () {
            if(!patternRule.passwordCon[0].flag) {
                return Promise.reject('两次密码不一致')
            } else {
                return Promise.resolve();
            }
        },
        trigger:['change']
    }],
    account:[{
        required:true,
        pattern:_rules.isAccount.pattern,
        message:_rules.isAccount.message, 
    }]
}


// export let flag = function() {
//     if(_rules.isEmail.pattern == true && _rules.isPassword.pattern == true) {
//         return true
//     } else {
//         alert('请按要求填写正确内容')
//         return false
//     }
// }

// export default {
//     account:[{
//         required:true,
//         validator:async function(_rule,value) {
//             if(rule.isEmail(_rule,value)){
//                 return Promise.resolve()
//             } else {
//                 return Promise.reject('邮箱账号不合法')
//             }
//         }, 
//         trigger:['change']
//         }],
//     password:[{
//         required:true,
//         min:6,
//         max:18,
//         message:'密码不能为空,且长度不能小于${min}或大于${max}'
//     }]
// }