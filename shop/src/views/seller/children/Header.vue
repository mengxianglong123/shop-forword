<template>
    <div class="seller-header">
        <el-card class="box-card">
            <!--搜索-->
            <el-input placeholder="请商家名称" v-model="searchContent" class="seller-search">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
            <el-button type="primary" class="seller-add"
                       icon="el-icon-circle-plus-outline"
                       @click="$store.commit('changeAddSellerDialog',true)">新增商家</el-button>
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
                        url:"seller/selByName",
                        params:{
                            name:this.searchContent
                        }
                    }).then(rep => {
                        this.$store.commit('updateSeller',rep.data.data)
                    })

                }

            }
        }
    }
</script>

<style scoped>
    .seller-header{
        margin-bottom: 20px;
    }
    .seller-search{
        width: 350px;
    }
    .seller-add{
        margin-left: 20px;
    }
</style>