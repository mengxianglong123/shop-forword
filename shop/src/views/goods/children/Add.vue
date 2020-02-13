<template>
    <div class="add-dialog">

        <el-dialog title="新增商品" :visible.sync="$store.state.goods.addDialog"
                   @close="clear">
            <el-form :model="goods" :rules="rlues" ref="addGoodsForm">
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
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "Add",
        data(){
          return {
              rlues:{
                  goodsName:[{required:true,message:"商品名不可为空"},{max:15,message:"最大15个字符"}],
                  price:[{required:true,message:"价格不可空"}],
                  info:[{required:true,message:"描述信息不可空",tigger:"blur"}],
                  seller:{required:true,message:"商家不可空",trigger:'blur'}
              },
              goods:{
                  goodsName:"",
                  price:"",
                  info:"",
                  sellerId:"",
                  seller:""
              },
              seller:""
          }
        },
        methods:{
            open(){

                this.$store.commit('changeAddDialog',true);
            },
            close(){
                // 清空校验数据
                this.$refs.addGoodsForm.resetFields();
                this.$store.commit('changeAddDialog',false);
            },
            querySearch(queryString, cb) {
                // 获取数据
                req({
                    method:"get",
                    url:"/seller/selByName",
                    params:{
                        name:queryString
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
            add(formName){
                this.$refs['addGoodsForm'].validate((valid) => {
                    // 通过校验
                    if (valid) {
                        // 为防止后台转换出现错误
                        this.goods.seller = null;
                        // 发送请求\
                        req({
                            url:"/goods/addGoods",
                            method: "post",
                            data:this.goods
                        }).then(rep => {
                            console.log(rep);
                            if (rep.data.status == 200){
                                this.$message({
                                    message: '添加成功',
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
            clear(){
                this.$refs.addGoodsForm.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>