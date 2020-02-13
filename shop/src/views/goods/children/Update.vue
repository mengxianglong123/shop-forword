<template>
    <div class="edit-dialog">

        <el-dialog title="更新商品信息" :visible.sync="$store.state.goods.editDialog"
                   @close="clear" @open="getData">
            <el-form :model="goods" :rules="rlues" ref="editGoodsForm">
                <el-form-item label="商品名称" label-width="200px" prop="goodsName">
                    <el-input  autocomplete="off" v-model="goods.goodsName"></el-input>
                </el-form-item>

                <el-form-item label="价格" label-width="200px" prop="price">
                    <el-input  autocomplete="off" v-model="goods.price"></el-input>
                </el-form-item>

                <el-form-item label="描述信息" label-width="200px" prop="info">
                    <el-input  autocomplete="off" v-model="goods.info"></el-input>
                </el-form-item>

                <el-form-item label="所属商家" label-width="200px" prop="seller">
                    <el-autocomplete
                            class="inline-input"
                            v-model="goods.seller"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入商家名称获取提示"
                            :trigger-on-focus="false"
                            @select="handleSelect">
                        <template slot-scope="{ item }">
                            <div class="name">{{ '编号'+item.id+' '+item.sellerName  }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Update",
        data(){
            return {
                rlues:{
                    goodsName:[{required:true,message:"商品名不可为空"},{max:15,message:"最大15个字符"}],
                    price:[{required:true,message:"价格不可空"}],
                    info:[{required:true,message:"描述信息不可空",tigger:"blur"}],
                    seller:{required:true,message:"商家不可空",trigger:'blur'}
                },
                goods:{
                    id:"",
                    goodsName:"",
                    price:"",
                    info:"",
                    sellerId:"",
                    seller:""
                },
                seller:""
            }
        },
        methods: {
            /**
             * 初始化商品信息，实现回显
             */
            getData(){
                var id = this.$store.state.goods.editId;
                console.log(id);
                req({
                    method:"get",
                    url:"/goods/selById",
                    params: {
                        id:id
                    }
                }).then(rep => {
                    console.log(rep);
                    this.setGoods(rep.data.data)
                })
            },
            // 初始化数据
            setGoods(rep){
                this.goods = rep;
                this.goods.seller = rep.seller.sellerName;
            },
            close() {
                // 清空校验数据
                this.$refs.editGoodsForm.resetFields();
                this.$store.commit('changeEditGoodsDialog', false);
            },
            querySearch(queryString, cb) {
                // 获取数据
                req({
                    method: "get",
                    url: "/seller/selByName",
                    params: {
                        name: queryString
                    }
                }).then(res => {
                    var sellers = res.data.data;
                    // 调用 callback 返回建议列表的数据
                    cb(sellers);
                })
            },
            /**
             * 锁定商家
             * @param item
             */
            handleSelect(item) {
                // 锁定商家
                this.goods.sellerId = item.id;
                this.goods.seller = item.sellerName;
            },
            /**
             *
             * @param formName
             */
            update(formName) {
                this.$refs['editGoodsForm'].validate((valid) => {
                    // 通过校验
                    if (valid) {
                        // 为防止后台转换出现错误
                        this.goods.seller = null;
                        // 发送请求
                        req({
                            url: "/goods/updateGoods",
                            method: "post",
                            data: this.goods
                        }).then(rep => {
                            console.log(rep);
                            if (rep.data.status == 200) {
                                this.$message({
                                    message: '更新成功',
                                    type: 'success'
                                });
                                this.close();
                            }
                        })
                    }
                    // 未通过校验
                    else {
                        this.$message({
                            message: '信息不合法',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            clear() {
                this.$refs.editGoodsForm.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>