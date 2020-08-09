<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="方式一" name="first">
            <el-form :model="values" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="token">
                    <el-input v-model="values.token" placeholder="输入token">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <div>
                    <el-button type="primary" @click="submitForm()" v-if="flag">保存</el-button>
                    <el-button type="primary" disabled v-else>已保存</el-button>
                </div>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="方式二" name="second">
            <el-form :model="values" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="name">
                    <el-input v-model="values.name" placeholder="输入姓名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="idcard">
                    <el-input v-model="values.idcard" placeholder="输入身份证">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="mobile">
                    <el-input v-model="values.mobile" placeholder="输入手机号">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="values.code" placeholder="输入验证码">
                        <el-button type="primary" slot="append" @click="getCode()">{{text}}</el-button>
                    </el-input>
                </el-form-item>
                <div>
                    <el-button type="primary">登录</el-button>
                </div>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { DataEncryption } from '../../utils/utils';
    import { getVerCode, getVerificationImageCode, login } from '../../api/index';

    export default {
        data: function() {
            return {
                countTime: 60,
                text: '获取验证码',
                activeName: 'first',
                values: {
                    token: '',
                    name: '',
                    idcard: '',
                    mobile: '',
                    code: ''
                },
                flag: true
            };
        },
        computed: {
            ...mapGetters({
                getToken: 'task/token'
            })
        },
        methods: {
            submitForm() {
                this.$store.commit('task/setToekn', this.values.token);
            },
            count() {
                let _this = this;
                let func = function() {
                    if (_this.countTime > 0) {
                        _this.countTime--;
                        func();
                    } else {
                        _this.countTime = 60;
                        _this.text = '重新获取验证码';
                    }
                };
                setTimeout(func, 1000);
            },
            async getCode() {
                let xykj = DataEncryption([]);
                this.count();
                this.$store.commit('task/setToken', '');
                await getVerificationImageCode({ xykj: xykj }).then(res => {
                    if (res && res.code == 1) {
                        let imgCode = eval(res.content);
                        this.values.imgCode = imgCode;
                        let xykj2 = DataEncryption([
                            'mobile=' + this.values.mobile,
                            'smsType=1',
                            'imageCode=' + imgCode
                        ]);
                        let formdata = new
                        getVerCode({ xykj: xykj2 }).then(res => {
                            if (res && res.code == 1) {
                                this.values.code == res.content;
                            }
                        });
                    }
                });
            },
            login() {
                let sex = this.values.idcard.substring(16, 17);
                if (sex % 2 == 0) {
                    sex = '302003';
                } else {
                    sex = '302001';
                }
                var xykj = DataEncryption([
                    'mobile=' + this.values.mobile,
                    'name=' + this.values.name,
                    'sex=' + sex,
                    'credentialsType=5418001',
                    'cardno=' + this.values.idcard,
                    'imageCode=' + this.values.imgCode,
                    'vercode=' + this.values.code,
                    'loginType=3',
                    'deviceType=3',
                    'source=',
                    'openId=',
                    'clientType=1',
                    'versionNo=99.99.9'
                ]);
                login({ xykj: xykj }).then(res => {
                    if (res && res.code == 1) {
                        console.log(res)
                        // this.$store.commit('task/setToken', res.sessionId);
                    }
                });
            }
        },
        created() {
            if (this.getToken) {
                this.flag = false;
            }
        }
    };
</script>

<style scoped>

</style>
