//导入路由
import router from "@/router/index.js"
// 创建axios对象
var req = axios.create({
    baseURL: 'http://localhost:80',
    timeout: 3000
});
// 添加请求拦截器
req.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = sessionStorage.getItem("Authorization");
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// http响应拦截器
req.interceptors.response.use(res => {
    // 登录失效或未登录
    if (res.data.status == 401)
    {
        // 返回登录页面
        router.replace({path:"/toLogin"})
    }
        return res
    },
    error => {
        alert('请求失败，请稍后重试！')
        return Promise.reject(error)
    }
)
export default req