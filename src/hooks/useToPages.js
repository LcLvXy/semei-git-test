import { useRouter } from "vue-router"

export default function toPages(router) {
    let _this = this;
    if(_this != undefined) {
        if(typeof router === 'string') {
            this.$router.replace({
                name: router
            })
        } else if (typeof router === 'object') {
            this.$router.replace()
        }
    } else {
        const router_ = useRouter();
        if(typeof router === 'string') {
            router_.replace({
                name: router
            })
        } else if (typeof router === 'object') {
            router_.replace()
        }
    }
}