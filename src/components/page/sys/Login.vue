<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="userName">
                    <el-input v-model="param.userName" placeholder="请输入账号/手机号/身份证">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input
                            type="password"
                            placeholder="请输入密码"
                            v-model="param.passWord"
                            @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">没有账号？
                    <el-link href="#/register" type="primary">前往注册</el-link>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { login } from 'api/system';
    import request from 'utils/request';

    export default {
        data: function() {
            return {
                param: {
                    userName: '',
                    passWord: ''
                },
                rules: {
                    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }]
                }
            };
        },
        methods: {
            submitForm() {
                this.$refs.login.validate(async valid => {
                    if (valid) {
                        await login(this.param).then(data => {
                            if (data.code == 1) {
                                this.$message.success('登录成功');
                                this.$store.dispatch('system/saveUser', data.result);
                                this.$router.push('/index').catch(err => {
                                    console.log(err);
                                });
                            } else {
                                this.$message.error(data.msg);
                            }
                        }).catch(err => {
                            this.$message.error('登入异常');
                        });
                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created(){
        }
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
