<template>
  <el-table
      :data="getTaskList"
      height="250"
      border
      style="width: 100%">
    <el-table-column
        prop="hospitalName"
        label="医院"
        width="180">
    </el-table-column>
    <el-table-column
        prop="comminityName"
        label="社区"
        width="180">
    </el-table-column>
    <el-table-column
        prop="deptName"
        label="科室">
    </el-table-column>
    <el-table-column
        prop="taskType"
        label="类型"
        :formatter="handleType">
    </el-table-column>
    <el-table-column
        prop="nowDoctorName"
        label="医生">
    </el-table-column>
    <el-table-column
        prop="workDate"
        label="日期">
    </el-table-column>
    <el-table-column
        prop="timeUnit"
        label="时间">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="100">
      <template slot-scope="scope">
        <el-button
            size="mini"
            type="danger"
            @click="removeTask(scope.$index)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {mapGetters} from 'vuex';
import {
  finalRequest,
  getScheduleDate,
  getScheduleDateTimes,
  goSubmitSchedule,
  setScheduler
} from 'api/index';
import {DataEncryption} from 'utils/utils';
import {formateTime} from 'utils/DateUtil';

export default {
  name: 'TaskList',
  data: function () {
    return {
      taskList: [],
      typeList: ['时间任务', '日期任务', '医生任务'],
      task: [],
      flag: false
    };
  },
  computed: {
    ...mapGetters({
      getTaskList: 'task/getTaskList',
      getUser: 'system/getUser'
    })
  },
  methods: {
    handleType(row, column, cellValue, index) {
      return this.typeList[cellValue];
    },
    removeTask(index) {
      this.$store.dispatch('task/removeTask', this.getTaskList[index]);
    },
    requestTaskList() {
      this.taskList = this.$store.dispatch('task/requestTaskList', this.getUser.id);
    }
  },
  created() {
    this.requestTaskList();
  }
};
</script>

<style scoped>

</style>
