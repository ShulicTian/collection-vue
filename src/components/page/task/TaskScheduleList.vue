<template>
  <div>
    <el-header>
      <el-button type="primary" @click="dialogFormVisible = true">创建分配</el-button>
      <el-button type="primary" @click="dialogFormVisible = true" v-if="!startAllFlag">开启所有任务</el-button>
      <el-button type="danger" @click="dialogFormVisible = true" v-else>关闭所有任务</el-button>
    </el-header>
    <el-table
        :data="scheduleList"
        height="250"
        border
        style="width: 100%">
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="idCard"
          label="身份证"
          width="180">
      </el-table-column>
      <el-table-column
          prop="memberId"
          label="MemberId">
      </el-table-column>
      <el-table-column
          prop="token"
          label="Token">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1" :style="{color: 'green'}">已抢到</span>
          <span v-else :style="{color: 'red'}">未抢到</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="overTime"
          label="时间">
      </el-table-column>
      <el-table-column
          fixed="right"
          width="250"
          label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="startTask(scope.row)"
                     v-if="getScheduleSwitchList.indexOf(scope.row.idCard) != -1">开始任务
          </el-button>
          <el-button size="mini" type="danger" @click="closeTask(scope.row)" v-else>停止任务</el-button>
          <el-button
              size="mini"
              type="success"
              @click="scheduleDesc(scope.$index)">详情
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="removeSchedule(scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="分配编辑" :visible.sync="dialogFormVisible">
      <el-form :model="scheduleInfo">
        <el-form-item label="姓名" :label-width="labelWidth">
          <el-input v-model="scheduleInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" :label-width="labelWidth">
          <el-input v-model="scheduleInfo.idCard" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="labelWidth">
          <el-input v-model="scheduleInfo.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="labelWidth">
          <el-input v-model="scheduleInfo.code" placeholder="自动获取" readonly>
            <el-button type="primary" slot="append" @click="getCode()" :disabled="codeFlag">{{ text }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="MemberId" :label-width="labelWidth">
          <el-input v-model="scheduleInfo.memberId" placeholder="自动获取" readonly></el-input>
        </el-form-item>
        <el-form-item label="外部Token" :label-width="labelWidth">
          <el-input v-model="scheduleInfo.token" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="createSchedule">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {
  finalRequest,
  getScheduleDate,
  getScheduleDateTimes, getVerCode, getVerificationImageCode,
  goSubmitSchedule, login,
  setScheduler
} from 'api/index';
import {DataEncryption} from 'utils/utils';
import {formateTime} from 'utils/DateUtil';

export default {
  name: 'TaskScheduleList',
  data: function () {
    return {
      scheduleList: [],
      taskList: [],
      timeTaskList: [],
      dialogFormVisible: false,
      scheduleInfo: {
        name: '田舒利聪',
        idCard: '362329199701020359',
        mobile: '18814470102',
        code: '',
        memberId: '',
        token: ''
      },
      labelWidth: '80px',
      countTime: 10,
      text: '获取验证码',
      codeFlag: false,
      startAllFlag: false
    };
  },
  computed: {
    ...mapGetters({
      getScheduleList: 'task/getScheduleList',
      getScheduleSwitchList: 'task/getScheduleSwitchList',
      getTimeTaskList: 'task/getTimeTaskList',
      getUser: 'system/getUser'
    })
  },
  methods: {
    login() {
      let sex = this.scheduleInfo.idCard.substring(16, 17);
      if (sex % 2 == 0) {
        sex = '302003';
      } else {
        sex = '302001';
      }
      let xykj = DataEncryption([
        'mobile=' + this.scheduleInfo.mobile,
        'name=' + this.scheduleInfo.name,
        'sex=' + sex,
        'credentialsType=5418001',
        'cardno=' + this.scheduleInfo.idCard,
        'imageCode=' + this.scheduleInfo.imgCode,
        'vercode=' + this.scheduleInfo.code,
        'loginType=3',
        'deviceType=3',
        'source=',
        'openId=',
        'clientType=1',
        'versionNo=99.99.9'
      ]);
      login({xykj: xykj}).then(res => {
        if (res && res.code == 1) {
          this.scheduleInfo.memberId = res.contentMap.memberId;
          this.scheduleInfo.userId = res.userId;
          console.log(this.scheduleInfo)
          /*          this.$store.commit('task/setLoginInfo', {
                      memberId: res.contentMap.memberId,
                      userId: res.userId
                    });*/
        }
      });
    },
    count() {
      let _this = this;
      let func = function () {
        if (_this.countTime > 0) {
          _this.text = '重新获取(' + _this.countTime + ')'
          _this.countTime--;
          _this.codeFlag = true;
          func();
        } else {
          _this.countTime = 10;
          _this.text = '获取验证码';
          _this.codeFlag = false;
        }
      };
      setTimeout(func, 1000);
    },
    async getCode() {
      if (this.scheduleInfo.mobile) {
        let xykj = DataEncryption([]);
        this.count();
        // this.$store.commit('task/setToken', '');
        await getVerificationImageCode({xykj: xykj}).then(res => {
          if (res && res.code == 1) {
            let imgCode = eval(res.content);
            this.scheduleInfo.imgCode = imgCode;
            let xykj2 = DataEncryption([
              'mobile=' + this.scheduleInfo.mobile,
              'smsType=1',
              'imageCode=' + imgCode
            ]);
            getVerCode({xykj: xykj2}).then(res => {
              if (res && res.code == 1) {
                this.scheduleInfo.code = res.content;
                this.login();
              }
            });
          }
        });
      } else {
        this.$message({
          message: '请先输入手机号',
          type: 'warning'
        });
      }
    },
    onCancel() {
      this.dialogFormVisible = false;
      this.scheduleInfo = {};
      this.scheduleInfo.tasks = [];
    },
    createSchedule() {
      this.dialogFormVisible = false;
      this.$store.dispatch('task/saveSchedule', this.scheduleInfo);
      this.scheduleInfo = {};
      this.scheduleInfo.tasks = [];
    },
    scheduleDesc(index) {

    },
    removeSchedule(index) {
      this.$store.dispatch('task/removeTask', this.taskList[index]);
    },
    async requestTaskList() {
      this.taskList = await this.$store.dispatch('task/requestTaskList', this.getUser.id);
    },
    startTask(userInfo) {
      _this.$store.commit('task/pushScheduleSwitchList', userInfo.idCard);
      let token = userInfo.token;
      let mobile = userInfo.mobile;
      let name = userInfo.name;
      let mid = userInfo.memberId;
      let list = this.taskList;
      let _this = this;
      let typeTwo = function (obj) {
        let params = [
          'producerType=' + '1',
          'producerId=' + obj.doctorId,
          'depId=' + obj.depId,
          'teamId=' + '',
          'orgId=' + obj.comminityId
        ];
        let xykj = DataEncryption(params);
        getScheduleDate({xykj: xykj, token: token}).then(res => {
          if (res.content && res.content.length > 0) {
            for (let i = 0; i < res.content.length; i++) {
              obj.workDate = res.content[i].workDate;
              typeOne(obj);
            }
          } else {
            typeTwo(obj);
          }
        });
      };
      let typeOne = function (obj) {
        let xykj = DataEncryption([
          'producerType=' + '1',
          'producerId=' + obj.doctorId,
          'depId=' + obj.depId,
          'teamId=' + '',
          'orgId=' + obj.comminityId,
          'workDate=' + obj.workDate
        ]);
        getScheduleDateTimes({xykj: xykj, token: token}).then(res => {
          if (res.content && res.content[obj.comminityId].length > 0) {
            let func = function () {
              typeZero(obj);
            };
            let taskList = [];
            for (let i = 0; i < res.content[obj.comminityId].length; i++) {
              obj.feeId = res.content[obj.comminityId][i].feeId;
              obj.teamId = res.content[obj.comminityId][i].teamId;
              obj.startTime = res.content[obj.comminityId][i].startTime;
              obj.endTime = res.content[obj.comminityId][i].endTime;
              obj.timeUnit = res.content[obj.comminityId][i].timeUnit;
              let task0 = setInterval(func, 1000);
              if (_this.timeTaskList && _this.timeTaskList.length > 0) {
                _this.timeTaskList.push(task0);
              } else {
                taskList.push(task0);
              }
            }
            if (taskList.length > 0) {
              _this.timeTaskList = taskList;
            }
            _this.$store.commit('task/setTimeTaskList', _this.timeTaskList);
          } else {
            typeOne(obj);
          }
        });
      };
      let typeZero = function (obj) {
        let params = [
          'memberId=' + mid,
          'producerType=' + '1',
          'producerId=' + obj.doctorId,
          'depId=' + obj.depId,
          'teamId=' + '',
          'orgId=' + obj.comminityId,
          'workDate=' + obj.workDate,
          'startTime=' + formateTime(obj.workDate + ' ' + obj.startTime),
          'endTime=' + formateTime(obj.workDate + ' ' + obj.endTime),
          'providerId=' + '0'
        ];
        let xykj = DataEncryption(params);
        goSubmitSchedule({xykj: xykj, token: token}).then(res => {
          if (res.code == 1) {
            obj.scheduleNo = res.content;
            submit(obj);
          }
        });
      };
      let submit = function (obj) {
        let xykj = DataEncryption([
          'producerType=' + '1',
          'producerId=' + obj.doctorId,
          'depId=' + obj.depId,
          'teamId=' + '',
          'orgId=' + obj.comminityId,
          'workDate=' + obj.workDate,
          'startTime=' + formateTime(obj.workDate + ' ' + obj.startTime),
          'endTime=' + formateTime(obj.workDate + ' ' + obj.endTime),
          'providerId=' + '0',
          'memberId=' + mid,
          'subscribeNo=' + obj.scheduleNo,
          'diagnosisNum='
        ]);
        setScheduler({xykj: xykj, token: token}).then(res => {
          if (res.code == 1) {
            finalDo(obj);
          }
        });
      };
      let finalDo = function (obj) {
        let xykj = DataEncryption([
          'scheduleDoctorId=' + '0',
          'serviceProvideDoctorId=' + obj.doctorId,
          'feeItemId=' + obj.feeId,
          'memberUserId=' + mid,
          'familyMemberId=' + mid,
          'scheduleDate=' + obj.workDate,
          'scheduleStartTime=' + formateTime(obj.workDate + ' ' + obj.startTime),
          'scheduleEndTime=' + formateTime(obj.workDate + ' ' + obj.endTime),
          'provideOrgId=' + obj.comminityId,
          'departmentId=' + obj.depId,
          'teamId=' + obj.teamId,
          'schedulingDesc=' + '',
          'msoContent=' + '',
          'mobile=' + mobile,
          'memberUserName=' + name,
          'msoMemberName=' + name,
          'filePathNames=' + '',
          'referredId=' + '0',
          'scheduleNo=' + obj.scheduleNo,
          'type=' + '1'
        ]);
        finalRequest({xykj: xykj, token: token}).then(res => {
          if (res.code == 1) {
            _this.closeTask(userInfo);
            alert('预约成功');
          }
        });
      };

      if (!this.flag) {
        for (let i = 0; i < list.length; i++) {
          try {
            let func;
            if (list[i].taskType == 0) {
              func = function () {
                typeZero(list[i]);
              };
              let taskList = [];
              let task0 = setInterval(func, 1000);
              taskList.push(task0);
              this.timeTaskList = taskList;
              this.$store.commit('task/setTimeTaskList', this.timeTaskList);
            } else if (list[i].taskType == 1) {
              typeOne(list[i]);
            } else if (list[i].taskType == 2) {
              typeTwo(list[i]);
            }
          } catch (e) {
            this.$message({
              message: userInfo.name + '任务开启失败(' + list[i].id + ')',
              type: 'warning'
            });
            console.log(list[i].id);
            console.log(e);
          }
        }
      }
      this.flag = true;
    },
    closeTask(userInfo) {
      let list = this.getScheduleSwitchList;
      list = list.filter(sche => sche != userInfo.idCard);
      this.$store.commit('task/setScheduleSwitchList', list);
      if (this.flag) {
        this.flag = false;
        this.$store.commit('task/setTimeTaskList', null);
        for (let i = 0; i < this.timeTaskList.length; i++) {
          clearInterval(this.timeTaskList[i]);
        }
      }
    }
  },
  created() {
    this.requestTaskList();
    this.timeTaskList = this.getTimeTaskList;
    this.scheduleList = this.getScheduleList;
  }
};
</script>

<style scoped>

</style>
