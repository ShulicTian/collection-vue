<template>
    <el-container>
        <el-header>
            <el-button type="primary" @click="startTask" v-if="!flag">开始任务</el-button>
            <el-button type="danger" @click="closeTask" v-else>停止任务</el-button>
        </el-header>
        <el-main>
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
        </el-main>
    </el-container>
</template>
<script>
    import { mapGetters } from 'vuex';
    import {
        finalRequest,
        getScheduleDate,
        getScheduleDateTimes,
        goSubmitSchedule,
        setScheduler
    } from '../../api/index';
    import { DataEncryption } from '../../utils/utils';
    import { formateTime } from '../../utils/DateUtil';

    export default {
        name: 'TaskList',
        data: function() {
            return {
                taskList: [],
                typeList: ['时间任务', '日期任务', '医生任务'],
                task: [],
                flag: false
            };
        },
        computed: {
            ...mapGetters({
                getTaskList: 'task/taskList',
                getTask: 'task/getTask',
                getUser: 'system/getUser',
                getUserId: 'task/getUserId',
                getMemberId: 'task/getMemberId'
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
                this.$store.dispatch('task/requestTaskList', this.getUser.id);
            },
            startTask() {
                let mid = this.getMemberId;
                let list = this.getTaskList;
                let user = this.getUser;
                let _this = this;
                let typeTwo = function(obj) {
                    let params = [
                        'producerType=' + '1',
                        'producerId=' + obj.doctorId,
                        'depId=' + obj.depId,
                        'teamId=' + '',
                        'orgId=' + obj.comminityId
                    ];
                    var xykj = DataEncryption(params);
                    getScheduleDate({ xykj: xykj }).then(res => {
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
                let typeOne = function(obj) {
                    var xykj = DataEncryption([
                        'producerType=' + '1',
                        'producerId=' + obj.doctorId,
                        'depId=' + obj.depId,
                        'teamId=' + '',
                        'orgId=' + obj.comminityId,
                        'workDate=' + obj.workDate
                    ]);
                    getScheduleDateTimes({ xykj: xykj }).then(res => {
                        if (res.content && res.content[obj.comminityId].length > 0) {
                            let func = function() {
                                typeZero(obj);
                            };
                            let taskList = [];
                            for (let i = 0; i < res.content[obj.comminityId].length; i++) {
                                console.log(res.content[obj.comminityId][i].residueNum);
                                // if (res.content[obj.comminityId][i].residueNum > 0) {
                                obj.feeId = res.content[obj.comminityId][i].feeId;
                                obj.teamId = res.content[obj.comminityId][i].teamId;
                                obj.startTime = res.content[obj.comminityId][i].startTime;
                                obj.endTime = res.content[obj.comminityId][i].endTime;
                                obj.timeUnit = res.content[obj.comminityId][i].timeUnit;
                                let task0 = setInterval(func, 1000);
                                if (_this.task && _this.task.length > 0) {
                                    _this.task.push(task0);
                                } else {
                                    taskList.push(task0);
                                }
                                // }
                            }
                            if (taskList.length > 0) {
                                _this.task = taskList;
                            }
                            _this.$store.commit('task/setTask', _this.task);
                        } else {
                            typeOne(obj);
                        }
                    });
                };
                let typeZero = function(obj) {
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
                    var xykj = DataEncryption(params);
                    goSubmitSchedule({ xykj: xykj }).then(res => {
                        if (res.code == 1) {
                            obj.scheduleNo = res.content;
                            console.log('submit');
                            submit(obj);
                        }
                    });
                };

                // let submit = function(obj) {
                //     var xykj = DataEncryption([
                //         'scheduleDoctorId=' + '0',
                //         'serviceProvideDoctorId=' + obj.doctorId,
                //         'feeItemId=' + obj.feeId,
                //         'memberUserId=' + mid,
                //         'familyMemberId=' + mid,
                //         'scheduleDate=' + obj.workDate,
                //         'scheduleStartTime=' + obj.startTime,
                //         'scheduleEndTime=' + obj.endTime,
                //         'provideOrgId=' + obj.comminityId,
                //         'departmentId=' + obj.depId,
                //         'teamId=' + obj.teamId,
                //         'schedulingDesc=' + '',
                //         'msoContent=' + '',
                //         'mobile=' + user.mobile,
                //         'memberUserName=' + user.name,
                //         'msoMemberName=' + user.name,
                //         'filePathNames=' + '',
                //         'referredId=' + '0',
                //         'scheduleNo=' + obj.scheduleNo,
                //         'type=' + '1'
                //     ]);
                //     submitInfo({ xykj: xykj }).then(res => {
                //         console.log(res);
                //     });
                // };
                let submit = function(obj) {
                    var xykj = DataEncryption([
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
                    setScheduler({ xykj: xykj }).then(res => {
                        if (res.code == 1) {
                            finalDo(obj);
                        }
                    });
                };

                let finalDo = function(obj) {
                    var xykj = DataEncryption([
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
                        'mobile=' + user.mobile,
                        'memberUserName=' + user.name,
                        'msoMemberName=' + user.name,
                        'filePathNames=' + '',
                        'referredId=' + '0',
                        'scheduleNo=' + obj.scheduleNo,
                        'type=' + '1'
                    ]);
                    finalRequest({ xykj: xykj }).then(res => {
                        if (res.code == 1) {
                            _this.closeTask();
                            alert('预约成功');
                        }
                    });
                };

                if (!this.flag) {
                    for (let i = 0; i < list.length; i++) {
                        try {
                            let func;
                            if (list[i].taskType == 0) {
                                func = function() {
                                    typeZero(list[i]);
                                };
                                let taskList = [];
                                let task0 = setInterval(func, 1000);
                                taskList.push(task0);
                                this.task = taskList;
                                this.$store.commit('task/setTask', this.task);
                            } else if (list[i].taskType == 1) {
                                typeOne(list[i]);
                            } else if (list[i].taskType == 2) {
                                typeTwo(list[i]);
                            }
                        } catch (e) {
                            console.log(list[i].id);
                            console.log(e);
                        }
                    }
                }
                this.flag = true;
            },
            closeTask() {
                if (this.flag) {
                    this.flag = false;
                    this.$store.commit('task/setTask', null);
                    for (let i = 0; i < this.task.length; i++) {
                        clearInterval(this.task[i]);
                    }
                }
            }
        },
        created() {
            this.requestTaskList();
            this.task = this.getTask;
            if (this.task) {
                this.flag = true;
            }
        }
    };
</script>

<style scoped>

</style>
