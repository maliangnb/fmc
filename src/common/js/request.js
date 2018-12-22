import axios from 'axios'
import vue from 'vue'
import router from '@/router'
import store from '@/store'
import { querystring } from 'vux'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // 请求超时时间
    params: {
        // area: store.state.user.user_name
    },
})
service.interceptors.request.use(
    request => {
        // 在发送请求之前做些什么
        if (!store.getters.user.id) {
            request.params = querystring.parse()
        }
        return request
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error)
    })

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status != undefined && res.status != 1) {
            if (res.msg != '' && res.status == 0 && !res.data) {
                vue.$vux.toast.show({
                    text: res.msg,
                    type: 'text',
                    width: '80%'
                })
                // return Promise.reject(response.data)
            }
            if (res.status == 404 || res.status == 304) { //被挤掉线
                if (res.data.indexOf('http') == -1) {
                    vue.$vux.toast.show({
                        text: res.data,
                        type: 'warn',
                        width: '80%'
                    })
                    return Promise.reject(response.data)
                }
                location.href = res.data
            }
            if (res.status == 500) { //服务器维护
                vue.$vux.toast.show({
                    text: res.msg,
                    type: 'warn',
                    width: '80%'
                })
                router.push({path: '/login'})
            }
        }
        return response.data
    },
    error => {
        console.log('err' + error)// for debug
        return Promise.reject(error)
    }
)

export default service
