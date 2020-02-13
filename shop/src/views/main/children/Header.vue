<template>
    <div class="header">
        <a href=""><h2 class="title">商城管理系统</h2></a>
        <div class="user">
            <div class="header-img">
                <img src="~@/assets/header.jpg" alt="">
            </div>
            <div class="user-info">
                <div class="user-name">落花雨时</div>
                <div class="logout"><a @click.stop.prevent="logout" style="cursor: pointer;">退出登录</a></div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        methods:{
            logout(){
                // 发送退出登录请求
                req({
                    method:"get",
                    url:"/logout",
                }).then(rep => {
                    if (rep.data.status == 200){
                        sessionStorage.removeItem("Authorization");
                        sessionStorage.removeItem("currentIndex");
                        this.$router.replace("/toLogin");
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .header{
        background: #545c64;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .title{
        color: white;
        display: inline-block;
        margin-left: 15px;
        letter-spacing: 1px;
        font-weight: bolder;
    }
    .user{
        display: inline-block;
        height: 70%;
        margin-right: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .header-img{
        height: 100%;
        display: inline-block;
        border-radius: 50%;
        border: 5px solid rgba(255,255,255,.5);
        margin-right: 10px;
    }
    .header-img img{
        height: 100%;
        border-radius: 50%;
        /*border: 5px solid rgba(255,255,255,.5);*/
        display: inline-block;
    }
    .user-info{
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .user-name{
        display: inline-block;
        color: white;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 1px;
    }
    .logout{
        display: inline-block;
    }
    .logout a{
        color: #E6A23C;
        font-size: 13px;
    }
</style>