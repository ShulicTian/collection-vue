//微信定位要用的字段
export const gzhappId = '';// 必填，公众号的唯一标识
export const gzhtimestamp = '';// 必填，生成签名的时间戳
export const gzhnonceStr = '';// 必填，生成签名的随机串
export const gzhsignature = '';//必填，签名
export const host = 'http://dghealth.medstarcorp.com';

//图片地址
export const baseUrl = 'http://183.240.87.230:6301/hoffice/';
//登录
export const loginurl = '/hoffice/smsmember/memberLogin.do?method=newMemberLogin';
//获取验证码
export const getVerificationCode = '/hoffice/smsmember/memberLogin.do?method=getVerificationCode';
//注册
export const registerurl = '/hoffice/smsmember/memberLogin.do?method=newMemberRegister';
//医院实名信息
export const verificationIsRealNameurl = '/hoffice/smsmember/memberLogin.do?method=verificationIsRealName';
//实名认证
export const newUpdateMemberCAurl = '/hoffice/smsmember/member.do?method=newUpdateMemberCA';
//找回密码
export const forgetpassurl = '/hoffice/smsmember/memberLogin.do?method=modifyPassword';
//banner图
export const bannerurl = '/hoffice/smsmember/banner.do?method=showMemberBanner';
//我的医生圈
export const mydoctorterurl = '/hoffice/smsmember/doctorTeam.do?method=showMyDoctorTeam';
//查找医生
export const queryDoctorurl = '/hoffice/smsmember/doctorTeam.do?method=queryDoctor';
//推荐医生
export const recommenddoctorurl = '/hoffice/smsmember/doctorTeam.do?method=recommendDoctor';
//添加医生到医友圈
export const adddoctor = '/hoffice/smsmember/doctorTeam.do?method=addMyDoctorTeam';
//移出医友圈
export const deldoctor = '/hoffice/smsmember/doctorTeam.do?method=delMyDoctorTeam';
//医生详情
export const doctorterdetailurl = '/hoffice/smsmember/doctorTeam.do?method=showDoctorDescCache';
//预约日期
export const getScheduleDateurl = '/hoffice/smsmember/schedule.do?method=getScheduleDateCache';
//预约时间段
export const getScheduleDateTimes = '/hoffice/smsmember/schedule.do?method=getScheduleDateTimes';
//预约时间段跨机构使用
export const getScheduleDateTimesNew = '/hoffice/smsmember/schedule.do?method=getScheduleDateTimesNew';
//预约号
export const getScheduleNO = '/hoffice/smsmember/schedule.do?method=getScheduleNO';
//亲友列表
export const getFamilyMembers = '/hoffice/smsmember/family.do?method=queryMemberFamily';
//获取亲友信息
export const getFMmemberinfo = '/hoffice/smsmember/member.do?method=getMemberInfoById';
// 查找添加亲友
export const searchMemberFamily = '/hoffice/smsmember/family.do?method=searchMemberFamily';
//添加家庭成员
// export const addMemberFamily = '/hoffice/smsmember/family.do?method=addMemberFamily';
//查看接受列表
export const acceptMemberFamily = '/hoffice/smsmember/family.do?method=acceptMemberFamily';
//更新成员
export const updateMemberFamily = '/hoffice/smsmember/family.do?method=updateMemberFamily';
//更新亲友证件信息
export const updateMemberCardno = '/hoffice/smsmember/member.do?method=updateMemberCardno';
//添加家庭成员
export const addMemberFamily = '/hoffice/smsmember/family.do?method=addMemberFamily';
//设置预约人信息
export const setSchedulerInfo = '/hoffice/smsmember/schedule.do?method=setSchedulerInfo';
//预约订单
export const createBusinessInfo_selft = '/hoffice/smsmember/scheduling.do?method=createBusinessInfo_selft';
//契约服务
export const computeDiscounturl = '/hoffice/smsmember/discount.do?method=computeDiscount';
//现场支付
export const submitPayment = '/hoffice/smsmember/appPayment.do?method=submitPayment';
//修改订单状态
export const noticePoolItemurl = '/hoffice/smsmember/schedule.do?method=noticePoolItem';
//获取预约单
export const getMemberSchedulingurl = '/hoffice/smsmember/scheduling.do?method=getMemberScheduling';
//预约记录详情
export const getMemberSchedulingByDoctor = '/hoffice/smsmember/scheduling.do?method=getMemberSchedulingByDoctor';
//取消预约前置
export const showCancelOrder = '/hoffice/smsmember/scheduling.do?method=showCancelOrder';
//取消预约
export const cancelMemberScheduling = '/hoffice/smsmember/scheduling.do?method=cancelMemberScheduling';
//个人信息
export const getMemberInfo = '/hoffice/smsmember/member.do?method=getMemberInfo';
//更改个人信息
export const updateMemberInfo = '/hoffice/smsmember/member.do?method=newUpdateMemberCA';
//更改亲友个人信息
export const updateMemberInfo1 = '/hoffice/smsmember/member.do?method=updateMemberInfo';
//提交实名资料
export const updateMemberCA = '/hoffice/smsmember/member.do?method=updateMemberCA';
//上传实名图片
export const upload = '/hoffice/upload';
//查询医院列表
export const getHospitalInfoByCondition = '/hoffice/smsmember/doctorTeam.do?method=getHospitalInfoByConditionCache';
//医院下属机构
export const getlowerHospitalInfoByOrgId = '/hoffice/smsmember/doctorTeam.do?method=getlowerHospitalInfoByOrgIdCache';
//医院下属机构科室
export const getDepByOrgId = '/hoffice/smsmember/doctorTeam.do?method=getDepByOrgIdCache';
//医院下属机构科室医生
export const getDoctorListByDepId = '/hoffice/smsmember/doctorTeam.do?method=getDoctorListByDepIdCache';
//根据机构ID查询下级社区中心门诊和服务站信息
export const getlowerCommunityInfoByOrgId = '/hoffice/smsmember/doctorTeam.do?method=getlowerCommunityInfoByOrgIdCache';
// 根据所在地查询其附近机构列表
export const getGeogUnitByLocation = '/hoffice/smsmember/doctorTeam.do?method=getGeogUnitByLocation';
//机构下的医生列表
export const getDoctorByGeogUnit = '/hoffice/smsmember/doctorTeam.do?method=getDoctorByGeogUnit';
//签约服务
export const addMemberContract = '/hoffice/smsmember/contract.do?method=addMemberContract';
//查询可签约家庭成员
export const queryFamilyMemberSignUp = '/hoffice/smsmember/contract.do?method=queryFamilyMemberSignUp';
//帮家庭成员签约(包含自己)
export const addFamilyMemberContract = '/hoffice/smsmember/contract.do?method=addFamilyMemberContract';
//查询签约状态
export const queryMemberContract = '/hoffice/smsmember/contract.do?method=queryMemberContract';
//不支付生成业务信息同时修改业务状态及锁定号源下发推送
export const createBusinessInfoNotPayment = '/hoffice/smsmember/scheduling.do?method=createBusinessInfoNotPayment';
//我的诊疗卡
export const getAllMedicalCardList = '/hoffice/smsmember/member.do?method=getAllMedicalCardList';
//我的诊疗卡医院列表
export const getAllOrgIdListByGeogId = '/hoffice/smsmember/member.do?method=getAllOrgIdListByGeogId';
//添加我的诊疗卡
export const addPeopleIdentifier = '/hoffice/smsmember/member.do?method=addPeopleIdentifier';
//删除我的诊疗卡
export const deleteMedicalCard = '/hoffice/smsmember/member.do?method=deleteMedicalCard';
//获取服务评价列表
export const getMemberShedulingForEvaluate = '/hoffice/smsmember/evaluate.do?method=getMemberShedulingForEvaluate';
//评价
export const addSmsMemberEvaluates = '/hoffice/smsmember/evaluate.do?method=addSmsMemberEvaluates';
//获取化验单列表
export const getTestReportsList = '/hoffice/smsmember/testReports.do?method=getTestReportsList';
//获取化验单详情
export const getTestReportsDetail = '/hoffice/smsmember/testReports.do?method=getTestReportsDetail';
//获取健康记录信息
export const getSoapServiceByOrgId = '/hoffice/smsmember/outpatientInfo.do?method=getSoapServiceByOrgId';
//获取健康记录信息详细
export const getSoapServiceContentByOrgId = '/hoffice/smsmember/outpatientInfo.do?method=getSoapServiceContentByOrgId';
//获取健康记录信息分类详细
export const getSoapServiceContentByBusType = '/hoffice/smsmember/outpatientInfo.do?method=getSoapServiceContentByBusType';
//获取服务记录列表按服务
export const getSoapServiceByRegistrationNum = '/hoffice/smsmember/outpatientInfo.do?method=getSoapServiceByRegistrationNum';
//获取服务记录详细按服务
export const getSoapContentByRegistrationNum = '/hoffice/smsmember/outpatientInfo.do?method=getSoapContentByRegistrationNum';
//检查该机构是否需要支付
export const orgIsPay = '/hoffice/smsmember/appPayment.do?method=orgIsPay';
//查询转诊单待付款列表
export const NewPaymentReferredALLList = '/hoffice/smsmember/referredInfo.do?method=NewPaymentReferredALLList';
//查询已付款转诊单列表
export const NewPaymentReferredListPaid = '/hoffice/smsmember/referredInfo.do?method=NewPaymentReferredListPaid';
//---------- 我的订单  门诊待缴费订单 -->预缴费
export const PrePayment = '/hoffice/smsmember/referredInfo.do?method=PrePayment';
//自费
export const submitOutPayment = '/hoffice/smsmember/appPayment.do?method=submitOutPayment';
//-------东莞-社保支付
export const socialPay = '/hoffice/smsmember/socialPay.do?method=submitPayment';
//------------处方单支付后同步
export const paymentOutNotify = '/hoffice/smsmember/appPayment.do?method=paymentOutNotify';
//获取可签到列表
export const enterurl = '/hoffice/smsmember/closedloop.do?method=enter';
//签到
export const signIn = '/hoffice/smsmember/closedloop.do?method=signIn';
//获取就诊排队队列
export const TriageDiagnosis = '/hoffice/smsmember/closedloop.do?method=TriageDiagnosis';
//注册实名
export const registerVerifiedUrl = '/hoffice/smsmember/memberLogin.do?method=registerToRealNameToLogin';
//实名认证
export const NMSMurl = '/hoffice/smsmember/member.do?method=updateMemberCA';
//注册实名
export const dgRegisterToRealNameToLogin = '/hoffice/smsmember/memberLogin.do?method=dgRegisterToRealNameToLogin';
//注册实名发送验证短信
export const newGetVerificationCode = '/hoffice/smsmember/member.do?method=newGetVerificationCode';
//图片验证码
export const getVerificationimageCode = '/hoffice/smsmember/memberLogin.do?method=getVerificationimageCode';
//微信绑定机构
export const wechatBingDingMemberSendMessage = '/hoffice/smsmember/memberLogin.do?method=wechatBingDingMemberSendMessage';
// 根据医院机构ID查询是否存在下级医院
export const checkIslowerHospitalInfo = '/hoffice/smsmember/doctorTeam.do?method=checkIslowerHospitalInfoCache';
// 校验码
export const isUseVerificationimageCode = '/hoffice/smsmember/memberLogin.do?method=isUseVerificationimageCode';
//查看历史预约记录
export const getMemberSchedulingHistoryOrder = '/hoffice/smsmember/scheduling.do?method=getMemberSchedulingHistoryOrder';
//获取住院押金
export const getHospitalDeposit = '/hoffice/smsmember/ClinicalDataService.do?method=getHospitalDeposit';
//获取住院医嘱(出院带药)
export const getHospitalizationAdvice = '/hoffice/smsmember/ClinicalDataService.do?method=getHospitalizationAdvice';
//获取住院费用
export const getHospitalizationExpenses = '/hoffice/smsmember/ClinicalDataService.do?method=getHospitalizationExpenses';

//查询社区家庭医生
export const findSigningDoctor = '/hoffice/smsmember/signingDoctor.do?method=findSigningDoctor';

//检查是否上传过身份证信息
export const checkUploadCardInfo = '/hoffice/smsmember/scanningCard.do?method=checkUploadCardInfo';

//查询参保人信息
export const findSocialSecurityInfo = '/hoffice/smsmember/signingDoctor.do?method=findSocialSecurityInfo';

//查询签约详情
export const getSigningDetails = '/hoffice/smsmember/signingDoctor.do?method=getSigningDetails';

//查询签约服务包免检次数
export const getFreeChargeCount = '/hoffice/smsmember/signingDoctor.do?method=getFreeChargeCount';
//查询签约服务包
export const getServerPackageIntroduce = '/hoffice/smsmember/signingDoctor.do?method=getServerPackageIntroduce';
//查看服务计划
export const getSigningServicePlan = '/hoffice/smsmember/signingDoctor.do?method=getSigningServicePlan';
//查看个人履约情况
export const getServerPerformance = '/hoffice/smsmember/signingDoctor.do?method=getServerPerformance';

//查询服务包详情
export const getSigningPackageDetails = '/hoffice/smsmember/signingDoctor.do?method=getSigningPackageDetails';
//健康东莞-说医不二-获取视频列表（根据主题模糊查询）
export const getVideoList = '/hoffice/smsmember/resourceLib.do?method=getVideoList';
//电子健康码-获取二维码接口
export const getEhCode = '/hoffice/smsmember/ehCode.do?method=getEhCode';
//电子健康码-绑定电子健康码接口
export const bindCardInfo = '/hoffice/smsmember/ehCode.do?method=bindCardInfo';
//电子健康码-申领前获取认证字符串接口
export const getWebKey = '/hoffice/smsmember/ehCode.do?method=getWebKey';
//* 检查用户信息
//* 1.检查是否有预约信息
//* 2.检查是否有门诊登记信息
export const checkUserMemberInfo = '/hoffice/smsmember/memberLogin.do?method=checkUserMemberInfo';
//诊疗卡认证
export const authenticationCard = '/hoffice/smsmember/member.do?method=authenticationCard';
//提交邀请码
export const submitShareCode = '/hoffice/smsmember/inviteMember.do?method=submitShareCode';
//------------预约支付后同步
export const paymentNotify = '/hoffice/smsmember/appPayment.do?method=paymentNotify';
//获取体检报告（高埗）
export const healthCheckReport = '/hoffice/intellhosp/hosp.do?method=healthCheckReport';
//契约服务
export const computeDiscount = '/hoffice/smsmember/discount.do?method=computeDiscount';
//诊金计算* 6周岁(含) 诊金*1.3
export const sethospitalfee = '/hoffice/smsmember/schedule.do?method=sethospitalfee';
//电子健康码-查询电子健康码在第三方是否绑定
export const isBindCardInfo = '/hoffice/smsmember/ehCode.do?method=isBindCardInfo';

//处方医保支付
export const submitOutMedicarePayment = '/hoffice/membertrade/medicarePay.do?method=submitPaymentMedicare';
//处方医保支付同步
export const submitOutMedicarePaymentNotify = '/hoffice/membertrade/medicarePay.do?method=paymentNotifyMedicare';
