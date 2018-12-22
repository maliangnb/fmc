import * as types from './mutation.types'

const mutations = {
    [types.SET_TITLE] (state, flag) {
        state.title = flag
    },
    [types.SET_SHOW_BACK] (state, flag) {
        state.showBack = flag
    },
    [types.SET_SHOW_MORE] (state, flag) {
        state.showMore = flag
    },
    [types.SET_SHOW_TITLE] (state, flag) {
        state.showTitle = flag
    },
    [types.SET_SHOW_BOTTOM] (state, flag) {
        state.showBottom = flag
    },
    [types.SET_USER] (state, user) {
        state.user = user
    },
    [types.SET_TYPES] (state, types) {
        state.types = types
    },
    [types.SET_IS_LOGIN] (state, flag) {
        state.isLogin = flag
    },
}

export default mutations
