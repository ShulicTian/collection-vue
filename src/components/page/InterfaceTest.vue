<template>
    <div>
        <div>
            <el-tag>URL</el-tag>
            <el-input type="text"
                      :rows="10" placeholder="请输入URL"
                      v-model="sourceData" :style="{width:'50%',marginRight:'5px'}">
            </el-input>
            <el-button type="primary" @click="requestUrl">请求</el-button>
        </div>
        <br/>
        <div>
            <el-tag>响应数据</el-tag>
            <vue-json-pretty
                    :path="'res'"
                    :data="resultData"
                    :highlightMouseoverNode="true"
                    :deep="2"
                    :style="{backgroundColor:'white',padding:'10px'}">
            </vue-json-pretty>
        </div>
    </div>
</template>

<script>
    import request from '../../utils/request';
    import VueJsonPretty from 'vue-json-pretty';

    export default {
        name: 'interfaceTest',
        data() {
            return {
                sourceData: '/doctor/oldschedule.html?unit_id=262&dep_id=200085391&doctor_id=200438643&cid=23',
                resultData: {}
            };
        },
        components: { VueJsonPretty },
        computed: {},
        methods: {
            requestUrl() {
                this.resultData = {};
                request({
                    url: '/jk160' + this.sourceData,
                    method: 'get'
                }).then(res => {
                    this.resultData = res;
                    console.log(this.resultData);
                });
            }
        },
        filters: {},
        created: function() {
        }
    };
</script>


<style scoped>

</style>
