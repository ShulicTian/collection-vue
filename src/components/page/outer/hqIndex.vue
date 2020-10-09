<template>
  <div>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="handleTabsEdit">
      <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name">
        <div v-if="item.name == 'dept'">
          <el-card class="box-card" v-for="obj in list">
            <div @click="filtersExist('门诊列表','sndDpt',obj)" class="cardArea">
              <h3>{{ obj.dptName }} </h3>
              <div style="color: #666;margin: 5px 0;">科室ID：{{ obj.dptId }}</div>
            </div>
          </el-card>
        </div>
        <div v-else-if="item.name == 'sndDpt'">
          <el-card class="box-card" v-for="obj in sndDptList">
            <div @click="filtersExist('医生列表','docList',obj)" class="cardArea">
              <h3>{{ obj.sndDptName }} </h3>
              <div style="color: #666;margin: 5px 0;">门诊ID：{{ obj.sndDptId }}</div>
            </div>
          </el-card>
        </div>
        <div v-else-if="item.name == 'docList'">
          <el-card class="box-card" v-for="obj in docList">
            <div @click="filtersExist('日期列表','dateList',obj)" class="cardArea">
              <h3>{{ obj.YISHENGXM }} </h3>
              <div style="color: #666;margin: 5px 0;">医生ID：{{ obj.doctorId }} 医生编号：{{obj.YISHENGBH}}</div>
            </div>
          </el-card>
        </div>
        <div v-else-if="item.name == 'dateList'">
          <el-card class="box-card" v-for="obj in docList">
            <div @click="filtersExist('日期列表','dateList',obj)" class="cardArea">
              <h3>{{ obj.YISHENGXM }} </h3>
              <div style="color: #666;margin: 5px 0;">医生ID：{{ obj.doctorId }} 医生编号：{{obj.YISHENGBH}}</div>
            </div>
          </el-card>
        </div>
        <div v-else>暂无数据</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  hqIndex,
  getDocList,
  docSchedul,
  docDetail
} from 'api/index';
import {mapGetters} from 'vuex';

export default {
  name: 'index',
  data() {
    return {
      editableTabsValue: 'dept',
      editableTabs: [{
        title: '科室列表',
        name: 'dept',
        content: ''
      }],
      list: [],
      sndDptList: [],
      docList: [],
      dateList: [],
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
    ...mapGetters({
      getTaskList: 'task/getTaskList'
    })
  },
  methods: {
    handleTabsEdit(targetName) {
      let _this = this;
      if (targetName !== 'dept') {
        this.editableTabs.forEach(function (value, index) {
          if (value.name == targetName) {
            if (index - 1 >= 0) {
              _this.editableTabsValue = _this.editableTabs[index - 1].name;
            } else {
              _this.editableTabsValue = 'dept';
            }
            _this.editableTabs = _this.editableTabs.filter(tab => tab.name !== targetName);
            return;
          }
        });
      }
    },
    filtersExist(tit, name, obj) {
      this.editableTabs = this.editableTabs.filter(tab => tab.name !== name);
      let tab = {title: tit, name: name};
      this.editableTabs.push(tab);
      this.editableTabsValue = name;
      if (name == 'sndDpt') {
        this.sndDptList = obj.sndDptList
      } else if (name == 'docList') {
        this.baseParams.departmentId = obj.sndDptId
        this.getDocList()
      } else if (name == 'dateList') {
        this.baseParams.doctorId = obj.doctorId
        this.baseParams.employeeId = obj.YISHENGBH
        // this.getDocDetail()
        this.getDocSchedul()
      }

    },
    getDeptList: function () {
      hqIndex(this.baseParams).then(res => {
        if (res.code == 0) {
          this.list = res.data
        }
      })
    },
    getDocList: function () {
      getDocList(this.baseParams).then(res => {
        if (res.code == 0) {
          this.docList = res.data
        }
      })
    },
    getDocDetail: function () {
      docDetail(this.baseParams).then(res => {
        if (res.code == 0) {
          this.dateList = res.data
        }
      })
    },
    getDocSchedul: function () {
      docSchedul(this.baseParams).then(res => {
        if (res.code == 0) {
          this.dateList = res.data
        }
      })
    }
  },
  filters: {},
  created: function () {
    this.getDeptList()
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
