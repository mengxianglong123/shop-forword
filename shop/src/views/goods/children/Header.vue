<template>
    <div class="goods-header">
        <el-card class="box-card">
            <!--搜索-->
            <el-input placeholder="请输入商品名称" v-model="searchContent" class="goods-search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-button type="primary" class="goods-add"
                       icon="el-icon-circle-plus-outline"
                       @click="$store.commit('changeAddDialog',true)">新增商品</el-button>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                searchContent:""
            }
        },
        methods:{
            search(){
                // 内容不为空
                if (this.searchContent !== ""){
                    // 发送请求
                    req({
                        method:"get",
                        url:"goods/selByName",
                        params:{
                            name:this.searchContent
                        }
                    }).then(rep => {
                        this.$store.commit('updateGoods',rep.data.data)
                    })

                }

            }
        }
    }
</script>

<style scoped>
    .goods-header{
        margin-bottom: 20px;
    }
    .goods-search{
        width: 350px;
    }
    .goods-add{
        margin-left: 20px;
    }
</style>