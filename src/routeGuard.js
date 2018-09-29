import router from './router'
import store from './store'

router.beforeEach((to,from,next) => {
    if (to.matched.length == 0) {
        next('/404')
    } else {
        // 判断是否登陆
        store.commit('SET_TITLE',to.meta.title)
        store.commit('SET_SHOW_TITLE',to.meta.showTitle)
        store.commit('SET_SHOW_MORE',to.meta.showMore)
        store.commit('SET_SHOW_BACK',to.meta.showBack)
        store.commit('SET_SHOW_BOTTOM',to.meta.showBottom)
        next()
    }
})
