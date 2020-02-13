<template>
    <div class="login">
        <div class="shop-login">
            <h3 style="color: #666666">管理员登录</h3>
            <el-form :rules="rules" ref="loginForm" :model="userdata">
                <el-form-item prop="username">
                    <!--用户名-->
                    <el-input
                            placeholder="用户名"
                            prefix-icon="el-icon-user-solid"
                            v-model="userdata.username"
                            class="shop-input">
                    </el-input>
                </el-form-item>


                <el-form-item prop="password">
                    <!--密码-->
                    <el-input
                            placeholder="密码"
                            prefix-icon="el-icon-lock"
                            v-model="userdata.password"
                            class="shop-input" show-password>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="login('loginForm')" class="submit">登录</el-button>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Login",
        data(){
            return{
                userdata:{
                    username:"",
                    password:"",
                },
                rules:{
                    username:{required:true,message:"请输入用户名"},
                    password:[
                        {required:true,message:"密码不可为空"},
                        {min:6,max:8,message:"密码长度为6-8位"}
                    ]
                }
            }
        },
        methods:{
            /**
             * 登录
             */
            login(formName){
                /**
                 * 校验
                 */
                this.$refs[formName].validate((valid) => {
                    // 通过校验
                    if (valid) {
                        // 发送请求
                        req({
                            url:"/login",
                            method:"post",
                            params:{
                                username: this.userdata.username,
                                password: this.userdata.password
                            }
                        }).then(
                            // 解决this的指向问题需要使用箭头函数
                            (rep) => {
                                //登录成功
                                if (rep.data.status == 200){
                                    console.log("登录成功");
                                    // 存储用户sessionId
                                    var id = rep.data.data;
                                    sessionStorage.setItem("Authorization",id);
                                    //跳转到主页面
                                    this.$router.push("/main");
                                    this.$message({
                                        message: '登录成功',
                                        type: 'success'
                                    });
                                }
                                // 登录失败
                                else {
                                    this.$alert('<div style="color: #F56C6C;">用户名或密码错误</div>', '登录失败', {
                                        confirmButtonText: '确定',
                                        center: true,
                                        dangerouslyUseHTMLString: true
                                    });
                                }

                            });
                    }
                    // 未通过校验
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .login{
        background: url("~@/assets/back.jpg");
        background-size: cover;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .shop-login{
        width: 300px;
        background: #f4f4f4;
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .submit{
        width: 60%;
        margin-top: 10px;
    }
</style>