<template>
    <router-link to="/login">登录</router-link>|
    <router-link to="/register">注册</router-link>|
    <router-link to="/personal">个人中心</router-link>|
</template>

<script>
import { message } from "ant-design-vue";
import { getCurrentInstance,onMounted } from "vue";
import toPages from "../hooks/useToPages";
//引入store
import { useStore } from "vuex";


export default {
  name:'index',
  setup() {
    let _vm = getCurrentInstance();
    let _cooikes = _vm.appContext.config.globalProperties.$cookies;
    const store_ = useStore();

    //mapActions
    const { asyncCategory: [asyncCategory] } = store_._actions;

    asyncCategory()
    //挂载钩子
    onMounted(() => {
    if( !_cooikes.get('seMeiUserToken')) {
          toPages('login')
          message.warning('登录过期,请重新登录!')
        }
    })
  }

}
</script>

<style>

</style>