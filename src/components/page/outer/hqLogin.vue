<template>
  <div>
  </div>
</template>

<script>
import {
  hqLogin
} from 'api/index';

export default {
  name: 'index',
  data() {
    return {
      list: '',
      baseParams: {
        channelAlias: '',
        channelSource: '',
        channelPlatform: '106',
        institutionId: '930500000032203339',
        _t: Date.now(),
        departmentId: '',
        doctorId: '',
        employeeId: ''
      },
      sourceData: '',
      finalParams: {}
    };
  },
  components: {},
  computed: {
  },
  methods: {
  },
  filters: {},
  created: function () {
    hqLogin({
      "client": "resident_wap",
      "device": "web",
      "from": "login",
      "account": "18814470102",
      "password": "PcGzNIpRxpKk8PpLREOeXw==",
      "code": "",
      "countryCode": "+86",
      "processId": null,
      "accessCode": null,
      "mode": "password",
      "extraParams": {}
    }).then(res => {
      console.log(res)
      this.$router.push({path:'/hqIndex'})
    })
  }
};
</script>
<style scoped>
.cardArea:hover {
  opacity: 0.7;
}

.el-tag {
  font-size: 15px;
}
</style>
