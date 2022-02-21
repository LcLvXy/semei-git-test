import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'default-passive-events'

import { Layout, Form, Input, Button, Row, Col, Space, Modal, Image, Menu,Table, PageHeader, Popconfirm } from 'ant-design-vue';

//引入axios
import axiosInstance from '@/axios'

//引入vueCookie
import VueCookies from 'vue-cookies'

const vm = createApp(App)
vm.config.globalProperties.$axios=axiosInstance;
vm.config.globalProperties.$cookies = VueCookies

//ant-design组件use
vm.use(Layout).use(Form).use(Input).use(Button).use(Row).use(Col).use(Space).use(Modal).use(Image).use(Menu).use(Table).use(PageHeader).use(Popconfirm)

vm.
use(store).
use(router).
mount('#app')
