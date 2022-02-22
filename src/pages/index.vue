<template>
    <router-link to="/login">登录</router-link>|
    <router-link to="/register">注册</router-link>|
    <router-link to="/personal">个人中心</router-link>|
</template>

<script>
import { message } from "ant-design-vue";
import { getCurrentInstance } from "vue";
//引入store
import { useStore } from "vuex";
import { useRouter } from "vue-router";


export default {
  name:'index',
  setup() {
    let _vm = getCurrentInstance();
    let router_ = useRouter()
    let _cooikes = _vm.appContext.config.globalProperties.$cookies;
    const store_ = useStore();

    //mapActions
    const { asyncCategory: [asyncCategory] } = store_._actions;

    asyncCategory().then(res => {
      if(res === false) {
        _cooikes.remove('seMeiUserToken')
        router_.replace({
          name:'login'
        })
        message.warning('登录过期,请重新登录!')
      }
    })

  }

}
</script>

<style>

</style>