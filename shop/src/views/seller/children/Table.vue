<template>
    <el-table
            :data="$store.state.seller.tableData"
            style="width: 100%" class="seller-table">
        <!--id列-->
        <el-table-column
                label="id"
                width="180"
                prop="id">
        </el-table-column>

        <!--商家名称-->
        <el-table-column
                label="商家名称"
                width="180"
                prop="sellerName">
        </el-table-column>

        <!--评分-->
        <el-table-column label="评分" prop="mark">

        </el-table-column>



        <el-table-column label="操作" fixed="right" width="160">
            <template slot-scope="scope">

                <!--编辑操作-->
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                    <el-button
                            size="mini" type="primary" icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"></el-button>
                </el-tooltip>


                <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)"></el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "Table",
        data(){
            return {

            }
        },
        //初始化
        created: function(){
            req({
                method:"get",
                url:"seller/selByPage",
                params: {
                    pageNum: 1
                }
            }).then(rep => {
                // 更新数据
                this.$store.commit('updateSeller',rep.data.data);
            })
        },
        methods:{
            // 编辑
            handleEdit(index, row) {
                // 1.传送要更新的商品的id
                this.$store.commit("changeEditSellerId",row.id);
                // 2.打开对话框
                this.$store.commit("changeEditSellerDialog",true);
            },
            // 删除
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    req({
                        method: "get",
                        url:"/seller/delSeller",
                        params: {
                            id:row.id
                        }
                    }).then( rep => {
                        if (rep.data.status == 200)
                        {
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        }
    }
</script>

<style scoped>
    .seller-table{
        margin-bottom: 10px;
    }
</style>