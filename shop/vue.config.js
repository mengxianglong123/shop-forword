module.exports = {
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vue-router':'VueRouter',// 配置使用CDN
            'vuex':'Vuex',
            'echarts':'echarts'
        }
    }
}