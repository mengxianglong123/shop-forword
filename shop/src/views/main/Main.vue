<template>
    <div style="height: 100%">
        <el-container>
            <!--**********头部**********-->
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <!--**********侧边栏**********-->
                <el-aside width="200px">
                    <Aside></Aside>
                </el-aside>
                <!--**********主体**********-->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from './children/Header.vue'
    import Aside from './children/Aside'
    export default {
        name: "Main",
        components: {Header,Aside},
    }
</script>

<style scoped>
    .el-container{
        height: 100%;
    }
    .el-header{
        padding: 0 !important;
        height: 70px !important;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>