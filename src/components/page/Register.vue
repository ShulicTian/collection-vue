<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="userName">
                    <el-input v-model="param.userName" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input
                            type="password"
                            placeholder="密码"
                            v-model="param.passWord">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input
                            type="password"
                            placeholder="再次输入密码"
                            v-model="param.repassword">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="nikeName">
                    <el-input v-model="param.nikeName" placeholder="昵称">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="param.name" placeholder="姓名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="mobile">
                    <el-input v-model="param.mobile" placeholder="手机号">
                        <el-button slot="prepend" icon="el-icon-mobile"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="idCard">
                    <el-input v-model="param.idCard" placeholder="身份证号">
                        <el-button slot="prepend" icon="el-icon-bank-card"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="param.email" placeholder="邮箱">
                        <el-button slot="prepend" icon="el-icon-message"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
                <p class="login-tips">已有账号？
                    <el-link href="#/login" type="primary">前往登入</el-link>
                </p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { register } from '../../api/system';

    export default {
        data: function() {
            return {
                param: {
                    userName: '',
                    repassword: '',
                    passWord: '',
                    nikeName: '',
                    name: '',
                    mobile: '',
                    idCard: '',
                    email: ''
                },
                rules: {
                    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
                    idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
                    repassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
                }
            };
        },
        computed: {},
        methods: {
            submitForm() {
                this.$refs.login.validate(async valid => {
                    if (!this.confirmPassWord()) {
                        this.$message.error('两次密码输入不一致');
                        return false;
                    }
                    if (valid) {
                        await register(this.param).then(data => {
                            if (data.code == 1) {
                                this.$message.success('注册成功');
                                this.$store.dispatch('system/saveUser', data.result);
                                this.$router.push('/login');
                            } else {
                                this.$message.error('注册失败');
                            }
                        }).catch(err => {
                            console.log(err);
                            this.$message.error('接口异常');
                        });
                    } else {
                        this.$message.error('请输入必填信息');
                        return false;
                    }
                });
            },
            confirmPassWord() {
                if (this.param.repassword == this.param.passWord) {
                    return true;
                }
                return false;
            }
        }
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
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
