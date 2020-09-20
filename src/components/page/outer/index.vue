<template>
    <div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="handleTabsEdit">
            <el-tab-pane
                    :key="item.name"
                    v-for="(item, index) in editableTabs"
                    :label="item.title"
                    :name="item.name">
                <div v-if="item.name == 'hospital'">
                    <el-card class="box-card" v-for="obj in list">
                        <div @click="reuqestLowerCommunityList(obj)" class="cardArea">
                            <h3>{{obj.name}} </h3>
                            <div style="color: #666;margin: 5px 0;">{{obj.address}}</div>
                            <div style="margin-top: 10px;">
                                {{obj.phoneNum}}
                            </div>
                        </div>
                    </el-card>
                </div>
                <div v-else-if="item.name == 'community'">
                    <el-card class="box-card" v-for="obj in list2">
                        <div @click="requestDepList(obj)" class="cardArea">
                            <h3>{{obj.name}} </h3>
                            <div style="color: #666;margin: 5px 0;">{{obj.address}}</div>
                        </div>
                    </el-card>
                </div>
                <div v-else-if="item.name == 'dept'">
                    <el-card class="box-card" v-for="obj in depList">
                        <div class="cardArea" @click="requestDoctorList(obj)">
                            <span><a href="javascript:void(0)">{{obj.name}}</a> </span>
                        </div>
                    </el-card>
                </div>
                <div v-else-if="item.name == 'doctor'">
                    <el-card class="box-card" v-for="(obj,index) in doctorList">
                        <div>
                            <div class="cardArea" style="float: left"
                                 @click="requestScheduleDate(obj)">
                                <div style="margin-bottom: 10px;">姓名：
                                    <el-tag size="medium" style="">{{obj.name}}</el-tag>
                                </div>
                                <div>所属：
                                    <el-tag type="success" size="medium">{{obj.section}}</el-tag>
                                </div>
                            </div>
                            <div style="float: right;">
                                <el-button type="primary" size="mini" @click.stop="addTask(obj,'2')"
                                           v-if="isExistTask('2',obj.id)">添加医生级任务
                                </el-button>
                                <el-button type="primary" size="mini" v-else disabled>已添加</el-button>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </el-card>
                </div>
                <div v-else-if="item.name == 'date'">
                    <div>
                        <el-tag type="danger">{{finalParams.nowDoctorName}}</el-tag>
                    </div>
                    <el-collapse v-model="activeName" accordion style="padding-left: 15px;background-color: white;"
                                 @change="changeCollapse">
                        <el-collapse-item :title="'日期：'+obj.workDate" :name="index"
                                          v-for="(obj,index) in scheduleDate">
                            <div
                                    style="margin: 10px;padding:10px;border: 1px solid #d8d8d8;border-radius: 5px;">
                                <div style="float: left;">
                                    暂无时间
                                </div>
                                <div style="float: right;padding-right: 10px;">
                                    <el-button type="primary" size="mini" @click.stop="addTask(obj,'1')"
                                               v-if="isExistTask('1',obj.workDate)">添加日期任务
                                    </el-button>
                                    <el-button type="primary" size="mini" v-else disabled>已添加</el-button>
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                            <div v-for="obj2 in dataTimesList[finalParams.comminityId]"
                                 style="margin: 10px;padding:10px;border: 1px solid #d8d8d8;border-radius: 5px;">
                                <div style="float: left;">
                                    {{obj2.timeUnit}}（剩余{{obj2.residueNum}}）
                                </div>
                                <div style="float: right;padding-right: 10px;">
                                    <el-button type="primary" size="mini" @click.stop="addTask(obj2,'0')"
                                               v-if="isExistTask('0',obj2.timeUnit)">添加到抢号任务
                                    </el-button>
                                    <el-button type="primary" size="mini" v-else disabled>已添加</el-button>
                                </div>
                                <div style="clear: both;"></div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div v-else>暂无数据</div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { DataDecryption, DataEncryption } from 'utils/utils';
    import {
        getDepList,
        getDoctorList,
        getHospitalList,
        getLowerCommunityList,
        getScheduleDate,
        getScheduleDateTimes,
        goSubmitSchedule,
        submitInfo
    } from 'api/index';
    import { mapGetters } from 'vuex';

    export default {
        name: 'index',
        data() {
            return {
                editableTabsValue: 'hospital',
                editableTabs: [{
                    title: '医院列表',
                    name: 'hospital',
                    content: ''
                }],
                activeName: 0,
                list: '',
                list2: '',
                depList: '',
                doctorList: '',
                scheduleDate: '',
                dataTimesList: '',
                scheduleNo: '',
                submitReulst: '',
                baseParams: {
                    memberId: '1075887257770965250',
                    regionId: '441900000000',
                    name: '田舒利聪',
                    mobile: '18814470102',
                    hospitalClass: '',
                    hospitalGrade: '',
                    isCommunity: 1,
                    location_lat: '',
                    location_lon: '',
                    hospitalName: '',
                    isPage: 1,
                    pageSize: 1,
                    pageNumber: 10
                },
                sourceData: '',
                finalParams: {
                    hospitalName: '',
                    comminityName: '',
                    deptName: '',
                    nowDoctorName: '',
                    timeUnit: '',
                    hospitalId: '',
                    comminityId: '',
                    depId: '',
                    teamId: '',
                    doctorId: '',
                    feeId: '',
                    workDate: '',
                    haveTimes: '',
                    startTime: null,
                    endTime: null,
                    scheduleNo: '',
                    taskType: ''
                }
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
                var _this = this;
                if (targetName !== 'hospital') {
                    this.editableTabs.forEach(function(value, index) {
                        if (value.name == targetName) {
                            if (index - 1 >= 0) {
                                _this.editableTabsValue = _this.editableTabs[index - 1].name;
                            } else {
                                _this.editableTabsValue = 'hospital';
                            }
                            _this.editableTabs = _this.editableTabs.filter(tab => tab.name !== targetName);
                            return;
                        }
                    });
                }
            },
            filtersExist(name) {
                this.editableTabs = this.editableTabs.filter(tab => tab.name !== name);
            },
            requestHospitalList() {
                let xykj = DataEncryption([
                    'memberId=' + this.baseParams.memberId,
                    'regionId=' + this.baseParams.regionId,
                    'hospitalClass=' + this.baseParams.hospitalClass,
                    'hospitalGrade=' + this.baseParams.hospitalGrade,
                    'isCommunity=' + this.baseParams.isCommunity,
                    'location_lat=' + this.baseParams.location_lat,
                    'location_lon=' + this.baseParams.location_lon,
                    'hospitalName=' + this.baseParams.hospitalName,
                    'isPage' + this.baseParams.isPage,
                    'pageSize=' + this.baseParams.pageSize,
                    'pageNumber=' + this.baseParams.pageNumber
                ]);
                getHospitalList({ xykj: xykj }).then(data => {
                    this.list = data.content;
                    console.log(data);
                });
            },
            reuqestLowerCommunityList(obj) {
                let xykj = DataEncryption([
                    'OrgId=' + obj.geunId
                ]);
                this.finalParams.hospitalName = obj.name;
                this.finalParams.hospitalId = obj.geunId;
                getLowerCommunityList({ xykj: xykj }).then(data => {
                    this.list2 = data.content;
                    this.filtersExist('community');
                    let tab = { title: '社区列表', name: 'community' };
                    this.editableTabs.push(tab);
                    this.editableTabsValue = 'community';
                    console.log(data);
                });
            },
            requestDepList(obj) {
                let xykj = DataEncryption([
                    'OrgId=' + obj.geunId
                ]);
                this.finalParams.comminityName = obj.name;
                this.finalParams.comminityId = obj.geunId;
                getDepList({ xykj: xykj }).then(data => {
                    this.depList = data.content;
                    this.filtersExist('dept');
                    let tab = { title: '科室列表', name: 'dept' };
                    this.editableTabs.push(tab);
                    this.editableTabsValue = 'dept';
                    console.log(data);
                });
            },
            requestDoctorList(obj) {
                var xykj = DataEncryption([
                    'sectionId=' + obj.id,
                    'depId=' + obj.depId,
                    'orgId=' + this.finalParams.comminityId,
                    'isPage=' + 1,
                    'pageSize=' + this.baseParams.pageSize,
                    'pageNumber=' + this.baseParams.pageNumber
                ]);
                this.finalParams.deptName = obj.name;
                this.finalParams.depId = obj.depId;
                getDoctorList({ xykj: xykj }).then(data => {
                    this.doctorList = data.content.rows;
                    this.filtersExist('doctor');
                    let tab = { title: '医生列表', name: 'doctor' };
                    this.editableTabs.push(tab);
                    this.editableTabsValue = 'doctor';
                    console.log(data);
                });
            },
            requestScheduleDate(obj) {
                var xykj = DataEncryption([
                    'producerType=' + '1',
                    'producerId=' + obj.id,
                    'depId=' + this.finalParams.depId,
                    'teamId=' + '',
                    'orgId=' + this.finalParams.comminityId
                ]);
                this.finalParams.nowDoctorName = obj.name;
                this.finalParams.doctorId = obj.id;
                getScheduleDate({ xykj: xykj }).then(data => {
                    this.scheduleDate = data.content;
                    this.filtersExist('date');
                    let tab = { title: '日期列表', name: 'date' };
                    this.editableTabs.push(tab);
                    this.editableTabsValue = 'date';
                    console.log(data);
                    if (data.content && data.content.length > 0) {
                        this.requestScheduleDateTimes(data.content[0].workDate);
                    }
                });
            },
            notWork() {
                this.$alert('该医生暂未安排工作！', '提示', {
                    confirmButtonText: '确定'
                });
            },
            changeCollapse(activeNames) {
                if (activeNames) {
                    this.requestScheduleDateTimes(this.scheduleDate[activeNames].workDate);
                }
            },
            requestScheduleDateTimes(workDate) {
                var xykj = DataEncryption([
                    'producerType=' + '1',
                    'producerId=' + this.finalParams.doctorId,
                    'depId=' + this.finalParams.depId,
                    'teamId=' + '',
                    'orgId=' + this.finalParams.comminityId,
                    'workDate=' + workDate
                ]);
                this.finalParams.workDate = workDate;
                getScheduleDateTimes({ xykj: xykj }).then(data => {
                    this.dataTimesList = data.content;
                    console.log(data);
                });
            },
            addTask(obj, type) {
                if (type == '2') {
                    this.finalParams.nowDoctorName = obj.name;
                    this.finalParams.doctorId = obj.id;
                } else if (type == '1') {
                    this.finalParams.workDate = obj.workDate;
                } else if (type == '0') {
                    this.finalParams.feeId = obj.feeId;
                    this.finalParams.teamId = obj.teamId;
                    this.finalParams.startTime = obj.startTime + ':00';
                    this.finalParams.endTime = obj.endTime + ':00';
                    this.finalParams.timeUnit = obj.timeUnit;
                }
                this.finalParams.taskType = type;
                this.$store.dispatch('task/addTask', this.finalParams);
            },
            goSubmit(obj) {
                var xykj = DataEncryption([
                    'memberId=' + this.baseParams.memberId,
                    'producerType=' + '1',
                    'producerId=' + this.doctorId,
                    'depId=' + this.depId,
                    'teamId=' + '',
                    'orgId=' + this.comminityId,
                    'workDate=' + this.workDate,
                    'startTime=' + obj.startTime,
                    'endTime=' + obj.endTime,
                    'providerId=' + '0'
                ]);
                goSubmitSchedule({ xykj: xykj }).then(data => {
                    this.finalParams.haveTimes = data.code == 1 ? true : false;
                    if (this.finalParams.haveTimes) {
                        this.finalParams.scheduleNo = data.content;
                    }
                    console.log(data);
                });
            },
            submit() {
                var xykj = DataEncryption([
                    'scheduleDoctorId=' + '0',
                    'serviceProvideDoctorId=' + this.doctorId,
                    'feeItemId=' + this.feeId,
                    'memberUserId=' + this.baseParams.memberId,
                    'familyMemberId=' + this.baseParams.memberId,
                    'scheduleDate=' + this.workDate,
                    'scheduleStartTime=' + this.startTime,
                    'scheduleEndTime=' + this.endTime,
                    'provideOrgId=' + this.comminityId,
                    'departmentId=' + this.depId,
                    'teamId=' + this.teamId,
                    'schedulingDesc=' + '',
                    'msoContent=' + '',
                    'mobile=' + this.baseParams.mobile,
                    'memberUserName=' + this.baseParams.name,
                    'msoMemberName=' + this.baseParams.name,
                    'filePathNames=' + '',
                    'referredId=' + '0',
                    'scheduleNo=' + this.scheduleNo,
                    'type=' + '1'
                ]);
                submitInfo({ xykj: xykj }).then(data => {
                    this.submitReulst = data;
                    console.log(data);
                });
            },
            isExistTask(type, val) {
                let _this = this;
                let count = this.getTaskList.filter(task => {
                    let flag = _this.finalParams.hospitalId == task.hospitalId && _this.finalParams.comminityId == task.comminityId && _this.finalParams.depId == task.depId;
                    if (type == '0') {
                        return flag && _this.finalParams.workDate == task.workDate && val == task.timeUnit && _this.finalParams.doctorId == task.doctorId;
                    } else if (type == '1') {
                        return flag && val == task.workDate && _this.finalParams.doctorId == task.doctorId;
                    } else if (type == '2') {
                        return flag && val == task.doctorId;
                    }
                    return false;
                }).length;
                if (count > 0) {
                    return false;
                }
                return true;
            }
        },
        filters: {
            decryption(data) {
                if (data) {
                    return DataDecryption(data);
                }
                return '';
            }
        },
        created: function() {
            this.requestHospitalList();
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
