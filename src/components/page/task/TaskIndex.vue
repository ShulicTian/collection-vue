<template>
  <el-tabs v-model="editableTabsValue">
    <el-tab-pane
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name">
      <task-schedule-list v-if="item.name == 'taskSch'"/>
      <task-list v-else-if="item.name == 'taskPool'"/>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import TaskList from "components/page/task/TaskList";
import TaskScheduleList from "components/page/task/TaskScheduleList";

export default {
  name: 'TaskIndex',
  components: {TaskScheduleList, TaskList},
  data: function () {
    return {
      taskList: [],
      typeList: ['时间任务', '日期任务', '医生任务'],
      task: [],
      flag: false,
      editableTabsValue: 'taskSch',
      editableTabs: [{
        title: '任务分配',
        name: 'taskSch',
        content: ''
      }, {
        title: '任务池',
        name: 'taskPool',
        content: ''
      }]
    };
  },
  comments: {
    'TaskList': TaskList,
    'TaskScheduleList': TaskScheduleList
  },
  computed: {},
  methods: {},
  created() {
  }
};
</script>

<style scoped>

</style>
