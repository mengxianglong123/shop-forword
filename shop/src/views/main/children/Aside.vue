<template>
    <el-menu
            :default-active="currentIndex"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409EFF"
            router>
        <el-menu-item index="/welcome">
            <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
            </template>
        </el-menu-item>
        <!--商品管理-->
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品管理</span>
            </template>
            <el-menu-item index="/goods">
                <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <span>商品管理</span>
                </template>
            </el-menu-item>
        </el-submenu>


        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商家管理</span>
            </template>
            <el-menu-item index="/seller">
                <template slot="title">
                    <i class="iconfont iconshangjia"></i>
                    <span>商家管理</span>
                </template>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "Aside",
        data(){
            return {
                currentIndex:"/welcome"
            }
        },
        created() {
            this.currentIndex = sessionStorage.getItem("currentIndex");
        }
    }
</script>

<style scoped>
    /*清除默认样式*/
    .el-menu{
        height: 100%;
        border-right: none !important; /*解决侧边栏边框问题*/
    }
</style>