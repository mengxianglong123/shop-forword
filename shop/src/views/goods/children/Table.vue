<template>
    <el-table
            :data="$store.state.goods.tableData"
            style="width: 100%" class="goods-table">
        <!--id列-->
        <el-table-column
                label="id"
                width="180"
                prop="id">
        </el-table-column>

        <!--商品名称-->
        <el-table-column
                label="商品名称"
                width="180"
                prop="goodsName">
        </el-table-column>

        <!--价格-->
        <el-table-column label="价格" prop="price">

        </el-table-column>

        <!--描述信息-->
        <el-table-column label="描述信息" prop="info">

        </el-table-column>

        <!--商家-->
        <el-table-column label="商家" prop="seller.sellerName">

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
                url:"goods/selByPage",
                params: {
                    pageNum: 1
                }
            }).then(rep => {
                // 更新数据
                this.$store.commit('updateGoods',rep.data.data);
            })
        },
        methods:{
            // 编辑
            handleEdit(index, row) {
                // 1.传送要更新的商品的id
                this.$store.commit("changeEditGoodsId",row.id);
                // 2.打开对话框
                this.$store.commit("changeEditGoodsDialog",true);
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
                        url:"/goods/delGoods",
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
    .goods-table{
        margin-bottom: 10px;
    }
</style>