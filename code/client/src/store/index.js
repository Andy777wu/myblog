import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        role: '',
        username: ''
    },
    getters: {

    },
    mutations:{
        setRole(state,role){
            state.role = role
        },
        setUsername(state,username){
            state.username = username
        }
    }
})

export default store
