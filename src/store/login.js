export default {
    state:() => ({
        isLogin: false,
        userInfo: {}
    }),
    mutations: {
        commitUserInfo(state,value) {
            state.userInfo = value;
            state.isLogin = true;
        }
    },
    actions: {
        sendUserInfo(context,value) {
            context.commit('commitUserInfo',value)
        }
    },
}