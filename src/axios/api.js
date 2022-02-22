

//如果需要使用get请从外部导入
import { post,get } from './request.js';

export function emailRegister(data = {}) {
    return post('/Email/Email.php?s=emailRegister',data,{headers:{
        smskey:'855228c94ac52c829b26b7a7317b8d91e04cb1de'
    }})
}

export function userRegister(data = {}) {
    return post('/User/User.php?s=emailRegister',data)
}

export function userLogin(data = {}) {
    return post('/User/User.php?s=login',data)
}

export function getAllBookmark(data={}) {
    return get('/Category/Category.php?s=getAll',{
        data
    })
}

export function sendClassify(data = {}) {
    return post('/Category/Category.php?s=addCategory',data)
}

export function removeClassify(id) {
    return get('/Category/Category.php?s=deleteCategory',{
        data:{
            classId:id      
        }
    })
}

export function modifyClassification(data = {}) {
    return post('/Category/Category.php?s=amendCategory',data)
}