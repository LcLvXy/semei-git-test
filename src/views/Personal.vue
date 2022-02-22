<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo">
                色魅书签
            </div>
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">

        <template v-for="(pitem,pindex) in PersonalChild" :key="pindex">
            <a-sub-menu v-if="pitem.children">
                <template #title>
                    <span  @click="toPages(pitem.name)">
                        <span>{{pitem.meta.name}}</span>
                    </span>
                </template>

                <template v-for="(sitem) in pitem.children" :key="sitem.path" >
                    <a-menu-item  @click="toPages(sitem.name)">
                        {{sitem.meta.name}}
                    </a-menu-item>
                </template>
            </a-sub-menu>

            <a-menu-item v-else :key="pindex" @click="toPages(pitem.name)">
                <span>{{pitem.meta.name}}</span>
            </a-menu-item>
        </template>

        </a-menu>
    </a-layout-sider>
    <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
            <menu-unfold-outlined
                v-if="collapsed"
                class="trigger"
                @click="() => (collapsed = !collapsed)"/>
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <router-view></router-view>
            </a-layout-content>
    </a-layout>
    </a-layout>
</template>
<script>
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { defineComponent , ref } from 'vue';
import PersonalChild from '../router/personal.js'
//引入hook
import toPages from '../hooks/useToPages.js'
export default defineComponent({
components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
},

setup() {
    return {
        selectedKeys: ref(['2']),
        collapsed: ref(false),
        PersonalChild,
        toPages
    };
},

});
</script>
<style>
#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);  
    font-size: 20px;
    text-align: center;
    overflow: hidden;
    color: #fff;
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}

.ant-layout-sider-children {
    height: 100vh;
}

</style>