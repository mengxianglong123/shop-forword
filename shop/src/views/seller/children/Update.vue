<template>
    <div class="edit-dialog">

        <el-dialog title="更新商家信息" :visible.sync="$store.state.seller.editDialog"
                   @close="clear" @open="getData">
            <el-form :model="seller" :rules="rlues" ref="editSellerForm">
                <el-form-item label="商家名称" label-width="200px" prop="sellerName">
                    <el-input  autocomplete="off" v-model="seller.sellerName"></el-input>
                </el-form-item>

                <el-form-item label="评分" label-width="200px" prop="mark">
                    <el-input  autocomplete="off" v-model="seller.mark"></el-input>
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
            /**
             * 初始化商品信息，实现回显
             */
            getData(){
                var id = this.$store.state.seller.editId;
                console.log(id);
                req({
                    method:"get",
                    url:"/seller/selById",
                    params: {
                        id:id
                    }
                }).then(rep => {
                    this.setSeller(rep.data.data)
                })
            },
            // 初始化数据
            setSeller(rep){
                this.seller = rep;
            },
            close() {
                // 清空校验数据
                this.$refs.editSellerForm.resetFields();
                this.$store.commit('changeEditSellerDialog', false);
            },
            /**
             *
             * @param formName
             */
            update(formName) {
                this.$refs['editSellerForm'].validate((valid) => {
                    // 通过校验
                    if (valid) {
                        // 发送请求
                        req({
                            url: "/seller/updateSeller",
                            method: "post",
                            data: this.seller
                        }).then(rep => {
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
                this.$refs.editSellerForm.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>