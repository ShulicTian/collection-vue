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
    import { getScheduleDate, getScheduleDateTimes, goSubmitSchedule, submitInfo } from '../../api/index';
    import { DataEncryption } from '../../utils/utils';

    export default {
        name: 'TaskList',
        data: function() {
            return {
                taskList: [],
                typeList: ['时间任务', '日期任务', '医生任务'],
                task: '',
                flag: false
            };
        },
        computed: {
            ...mapGetters({
                getTaskList: 'task/taskList',
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
                this.$store.dispatch('task/requestTaskList', this.getUser.id);
            },
            startTask() {
                let list = this.getTaskList;
                let user = this.getUser;
                let typeTwo = function(obj) {
                    var xykj = DataEncryption([
                        'producerType=' + '1',
                        'producerId=' + obj.doctorId,
                        'depId=' + obj.deptId,
                        'teamId=' + '',
                        'orgId=' + obj.comminityId
                    ]);
                    getScheduleDate({ xykj: xykj }).then(res => {
                        if (res.content && res.content.length > 0) {
                            for (let i = 0; i < res.content.length; i++) {
                                obj.workDate = res.content[i].workDate;
                            }
                            typeOne(obj);
                        }
                    });
                };
                let typeOne = function(obj) {
                    var xykj = DataEncryption([
                        'producerType=' + '1',
                        'producerId=' + obj.doctorId,
                        'depId=' + obj.deptId,
                        'teamId=' + '',
                        'orgId=' + obj.comminityId,
                        'workDate=' + obj.workDate
                    ]);
                    getScheduleDateTimes({ xykj: xykj }).then(res => {
                        if (res.content && res.content[obj.comminityId].length > 0) {
                            for (let i = 0; i < res.content[obj.comminityId].length; i++) {
                                if (res.content[obj.comminityId][i].residueNum > 0) {
                                    obj.feeId = res.content[obj.comminityId][i].feeId;
                                    obj.teamId = res.content[obj.comminityId][i].teamId;
                                    obj.startTime = res.content[obj.comminityId][i].startTime;
                                    obj.endTime = res.content[obj.comminityId][i].endTime;
                                    obj.timeUnit = res.content[obj.comminityId][i].timeUnit;
                                    typeZero(obj);
                                }
                            }
                        }
                    });
                };
                let typeZero = function(obj) {
                    var xykj = DataEncryption([
                        'memberId=' + user.memberId,
                        'producerType=' + '1',
                        'producerId=' + obj.doctorId,
                        'depId=' + obj.deptId,
                        'teamId=' + '',
                        'orgId=' + obj.comminityId,
                        'workDate=' + obj.workDate,
                        'startTime=' + obj.startTime,
                        'endTime=' + obj.endTime,
                        'providerId=' + '0'
                    ]);
                    goSubmitSchedule({ xykj: xykj }).then(res => {
                        if (res.code == 1) {
                            obj.scheduleNo == res.content;
                            submit(obj);
                        }
                    });
                };

                let submit = function(obj) {
                    var xykj = DataEncryption([
                        'scheduleDoctorId=' + '0',
                        'serviceProvideDoctorId=' + obj.doctorId,
                        'feeItemId=' + obj.feeId,
                        'memberUserId=' + user.memberId,
                        'familyMemberId=' + user.memberId,
                        'scheduleDate=' + obj.workDate,
                        'scheduleStartTime=' + obj.startTime,
                        'scheduleEndTime=' + obj.endTime,
                        'provideOrgId=' + obj.comminityId,
                        'departmentId=' + obj.deptId,
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
                    submitInfo({ xykj: xykj }).then(res => {
                        console.log(res);
                    });
                };
                let func = function() {
                    console.log('sync')
                    for (let i = 0; i < list.length; i++) {
                        try {
                            if (list[i].taskType == 0) {
                                typeZero(list[i]);
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
                };
                if (!this.flag) {
                    this.task = setInterval(func, 1000);
                }
                this.flag = true;
            },
            closeTask() {
                if (this.flag) {
                    this.flag = false;
                    clearInterval(this.task);
                }
            }
        },
        created() {
            this.requestTaskList();
        }
    };
</script>

<style scoped>

</style>
