<template>
    <div>
        <div>
            <el-tag>加密数据</el-tag>
            <el-input type="textarea"
                      :rows="10" placeholder="请输入加密数据"
                      v-model="sourceData">
            </el-input>
        </div>
        <br/>
        <div>
            <el-tag>解码数据</el-tag>
            <el-input type="textarea"
                      :rows="10"
                      :value="decryption(sourceData)">
            </el-input>
        </div>
    </div>
</template>

<script>
    import { DataDecryption } from 'utils/utils';

    export default {
        name: 'index',
        data() {
            return {
                sourceData: ''
            };
        },
        components: {},
        computed: {},
        methods: {
            decryption(data) {
                if (data) {
                    return JSON.stringify(DataDecryption(data));
                }
                return '';
            }
        },
        filters: {},
        created: function() {
        }
    };
</script>


<style scoped>

</style>
