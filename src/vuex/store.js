import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state={
    activeTab:'tab1'
}

const mutations={
    change(state,value){
        state.activeTab = value;
    },
    
}

export default new Vuex.Store({
	state,mutations
 
})