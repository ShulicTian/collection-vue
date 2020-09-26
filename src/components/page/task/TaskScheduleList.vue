<template>
  <div v-loading="loading"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-header>
      <el-button type="primary" @click="dialogFormVisible = true">创建分配</el-button>
      <el-button type="primary" @click="startAll" v-if="!startAllFlag">开启所有任务</el-button>
      <el-button type="danger" @click="closeAll" v-else>关闭所有任务</el-button>
    </el-header>
    <el-table
        :data="getScheduleList"
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
                     v-if="getScheduleSwitchList.indexOf(scope.row.idCard) == -1">开始任务
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
        <el-button type="primary" v-if="!codeFlag" @click="createSchedule">保 存</el-button>
        <el-button type="primary" v-else @click="editSchedule">修 改</el-button>
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
      startAllFlag: false,
      loading: false
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
      this.loading = true;
      this.dialogFormVisible = false;
      this.$store.dispatch('task/saveSchedule', this.scheduleInfo).then(res => {
        this.loading = false;
        this.$message({
          message: '创建成功',
          type: 'success'
        });
        this.scheduleInfo = {};
        this.scheduleInfo.tasks = [];
        this.requestScheduleList();
      });
    },
    editSchedule() {
      this.loading = true;
      this.dialogFormVisible = false;
      this.$store.dispatch('task/saveSchedule', this.scheduleInfo).then(res => {
        this.loading = false;
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.codeFlag = false;
        this.scheduleInfo = {};
        this.scheduleInfo.tasks = [];
        this.requestScheduleList();
      });
    },
    scheduleDesc(index) {
      this.scheduleInfo = this.getScheduleList[index]
      this.codeFlag = true;
      this.dialogFormVisible = true;
    },
    removeSchedule(index) {
      this.loading = true;
      this.$store.dispatch('task/removeSchedule', {id: this.getScheduleList[index].id}).then(res => {
        this.loading = false;
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      });
    },
    async requestScheduleList() {
      this.loading = true;
      this.taskList = await this.$store.dispatch('task/requestTaskList', this.getUser.id);
      await this.$store.dispatch('task/getScheduleList', {}).then(res => {
        console.log(this.getScheduleList)
        this.loading = false;
      });
    },
    startTask(userInfo) {
      this.$store.commit('task/pushScheduleSwitchList', userInfo.idCard);
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
          if (res && res.content && res.content.length > 0) {
            for (let i = 0; i < res.content.length; i++) {
              obj.workDate = res.content[i].workDate;
              typeOne(obj);
            }
          } else {
            typeTwo(obj);
          }
        }).catch(err => {
          typeTwo(obj);
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
          if (res && res.content && res.content[obj.comminityId].length > 0) {
            let func = function () {
              typeZero(obj);
            };
            let taskList = [];
            if (_this.getTimeTaskList && _this.getTimeTaskList.length > 0) {
              taskList = _this.getTimeTaskList
            }
            for (let i = 0; i < res.content[obj.comminityId].length; i++) {
              obj.feeId = res.content[obj.comminityId][i].feeId;
              obj.teamId = res.content[obj.comminityId][i].teamId;
              obj.startTime = res.content[obj.comminityId][i].startTime;
              obj.endTime = res.content[obj.comminityId][i].endTime;
              obj.timeUnit = res.content[obj.comminityId][i].timeUnit;
              let task0 = setInterval(func, 1000);
              let taskObj = {}
              taskObj.key = userInfo.id;
              taskObj.val = task0;
              taskList.push(taskObj);
            }
            if (taskList.length > 0) {
              _this.$store.commit('task/setTimeTaskList', taskList);
            }

          } else {
            typeOne(obj);
          }
        }).catch(err => {
          typeOne(obj);
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
          if (res && res.code == 1) {
            obj.scheduleNo = res.content;
            submit(obj);
          }
        }).catch(err=>{
          typeZero(obj);
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
        }).catch(err=>{
          submit(obj);
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
            _this.$message({
              message: '预约成功',
              type: 'success'
            });
            userInfo.status = 1;
            _this.$store.dispatch('task/saveSchedule', userInfo).then(res => {
              _this.requestScheduleList();
            })
          }
        }).catch( err => {
          finalDo(obj);
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
              let taskObj = {};
              taskObj.key = userInfo.id;
              taskObj.val = task0;
              taskList.push(taskObj);
              this.$store.commit('task/setTimeTaskList', taskList);
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
      if (this.getScheduleSwitchList && this.getScheduleSwitchList.length > 0) {
        let list = this.getScheduleSwitchList;
        list = list.filter(sche => sche != userInfo.idCard);
        this.$store.commit('task/setScheduleSwitchList', list);
        if (list && list.length == 0) {
          this.startAllFlag = false;
        }
      }
      if (this.getTimeTaskList && this.getTimeTaskList.length > 0) {
        let timeTask = this.getTimeTaskList.filter(timeTask => timeTask.key == userInfo.id)[0];
        clearInterval(timeTask.val);
        this.$store.commit('task/setTimeTaskList', this.getTimeTaskList.filter(timeTask => timeTask.key != userInfo.id));
      }
    },
    startAll() {
      this.loading = true;
      if (this.getScheduleList && this.getScheduleList.length > 0) {
        this.getScheduleList.forEach(sche => {
          if (this.getScheduleSwitchList.indexOf(sche.idCard) == -1 && sche.status != 1) {
            this.startTask(sche);
          }
        })
      }
      this.startAllFlag = true;
      this.loading = false;
    },
    closeAll() {
      this.loading = true;
      if (this.getTimeTaskList && this.getTimeTaskList.length > 0) {
        this.getTimeTaskList.forEach(timeTask => {
          clearInterval(timeTask.val);
        });
      }
      this.startAllFlag = false;
      this.$store.commit('task/setScheduleSwitchList', []);
      this.$store.commit('task/setTimeTaskList', []);
      this.loading = false;
    }
  },
  created() {
    this.requestScheduleList();
  }
};
</script>

<style scoped>

</style>
