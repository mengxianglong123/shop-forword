<template>
    <div class="add-dialog">

        <el-dialog title="新增商家" :visible.sync="$store.state.seller.addDialog"
                   @close="clear">
            <el-form :model="seller" :rules="rlues" ref="addSellerForm">
                <el-form-item label="商家名称" label-width="200px" prop="sellerName">
                    <el-input  autocomplete="off" v-model="seller.sellerName"></el-input>
                </el-form-item>

                <el-form-item label="评分" label-width="200px" prop="mark">
                    <el-input  autocomplete="off" v-model="seller.mark"></el-input>
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
                  sellerName:[{required:true,message:"商家名称不可为空"},{max:15,message:"最大15个字符"}],
                  mark:[{required:true,message:"评分不可空"}]
              },
              seller:{
                  sellerName:"",
                  mark:""
              }
          }
        },
        methods:{
            open(){
                this.$store.commit('changeAddSellerDialog',true);
            },
            close(){
                // 清空校验数据
                this.$refs.addSellerForm.resetFields();
                this.$store.commit('changeAddSellerDialog',false);
            },
            add(){
                this.$refs['addSellerForm'].validate((valid) => {
                    // 通过校验
                    if (valid) {
                        // 发送请求
                        req({
                            url:"/seller/addSeller",
                            method: "post",
                            data:this.seller
                        }).then(rep => {
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
                this.$refs.addSellerForm.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>