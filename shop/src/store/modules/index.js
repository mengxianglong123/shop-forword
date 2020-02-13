import Vuex from 'vuex'
import Vue from 'vue'
//挂载
Vue.use(Vuex);

// 导入模块
import goods from './goods/index'
import seller from './seller/index'


const store = new Vuex.Store(
    {
        modules:{
            goods:goods,
            seller:seller
        }
    }
)
export default store
