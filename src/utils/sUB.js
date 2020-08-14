var doctor = "";
var doctorid = GetQueryString("comefrom") == 'App' ?
    GetQueryString("doctorId") : sessionStorage.getItem('doctorId');
sessionStorage.setItem('doctorId', doctorid);
var pathway = '8'
var mymemberId = GetQueryString("comefrom") == 'App' ?
    GetQueryString("memberId") : sessionStorage.getItem('memberId')
var feeItemId = GetQueryString("comefrom") == 'App' ?
    GetQueryString("feeItemId") : sessionStorage.getItem('feeItemId')
var name = GetQueryString("comefrom") == 'App' ?
    GetQueryString("name") : sessionStorage.getItem('name')
var mobile = GetQueryString("comefrom") == 'App' ?
    GetQueryString("mobile") : sessionStorage.getItem('mobile')
var price = GetQueryString("comefrom") == 'App' ?
    GetQueryString("price") : sessionStorage.getItem('price')
var picture = GetQueryString("comefrom") == 'App' ?
    GetQueryString("picture") : sessionStorage.getItem('picture')
var cardNo = GetQueryString("comefrom") == 'App' ?
    GetQueryString("cardNo") : sessionStorage.getItem('cardNo')
var userId = GetQueryString("comefrom") == 'App' ?
    GetQueryString("userId") : sessionStorage.getItem('userId')
var isNeedPay = true
var sex = GetQueryString("comefrom") == 'App' ?
    GetQueryString("sex") : sessionStorage.getItem('sex')
var credentialsType = GetQueryString("comefrom") == 'App' ?
    GetQueryString("credentialsType") : sessionStorage.getItem('credentialsType')
var workDate = GetQueryString("comefrom") == 'App' ?
    GetQueryString("workDate") : sessionStorage.getItem('workDate')
var workTime = GetQueryString("comefrom") == 'App' ?
    GetQueryString("workTime") : sessionStorage.getItem('workTime')

var departmentId = GetQueryString("comefrom") == 'App' ?
    GetQueryString("departmentId") : sessionStorage.getItem('departmentId')
var provideOrgId = GetQueryString("comefrom") == 'App' ?
    GetQueryString("provideOrgId") : sessionStorage.getItem('provideOrgId')
var scheduleNo = GetQueryString("comefrom") == 'App' ?
    GetQueryString("scheduleNo") : sessionStorage.getItem('scheduleNo')
var teamId = GetQueryString("comefrom") == 'App' ?
    GetQueryString("teamId") : sessionStorage.getItem('teamId')
var token = GetQueryString("comeType") == 'App' ?
    GetQueryString("token") : sessionStorage.getItem('token')
sessionStorage.setItem('token', token)
var memberChoosed;
var memberId;
var orgId = provideOrgId
var isUser = true
var diagnosisNum = ''
var startTime = ''
var endTime = ''
var mycardtype = ''
var checkCardNo = cardNo
var action = '';
var accessTime = getNowFormatDateTime();
var msoName = '';
var out_trade_no = ''

function backtopass() {
    if(sessionStorage.getItem('comeType') == 'App' || GetQueryString("comefrom") == 'App') {
        if($('.choosememberdiv').is(':hidden')) {
            $('.choosememberdiv').show()
            $('.paydiv').hide()
        } else {
            updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
            window.location.href = "protocol://android?code=back&data=1";
        }
    } else {
        if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
            updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
        }
        if($('.choosememberdiv').is(':hidden')) {
            $('.choosememberdiv').show()
            $('.paydiv').hide()
        } else {
            window.history.back(-1);
        }
    }
}

function addfam() {
    window.location.href = "NewMyFamily.html";
}
var app = angular.module('myApp', []);
var businessNo = '';

app.controller('myCtrl', function($scope, $http) {
    if(sessionStorage.getItem('comefrom') == '' ||
        sessionStorage.getItem('comefrom') == undefined ||
        sessionStorage.getItem('comefrom') == null ||
        sessionStorage.getItem('comefrom') == 'undefined' ||
        sessionStorage.getItem('comefrom') == 'null') {
        if(GetQueryString("comefrom") == 'App') {
            sessionStorage.setItem('comefrom', GetQueryString("comefrom"))
        } else {
            sessionStorage.setItem('comefrom', 'H5')
        }
    }
    sessionStorage.setItem('workTime', workTime)
    sessionStorage.setItem('workDate', workDate)
    sessionStorage.setItem('memberId', mymemberId)
    sessionStorage.setItem('provideOrgId', provideOrgId)
    sessionStorage.setItem('departmentId', departmentId)
    sessionStorage.setItem('teamId', teamId)
    sessionStorage.setItem('mobile', mobile)
    sessionStorage.setItem('mobile', mobile)
    sessionStorage.setItem('name', name)
    sessionStorage.setItem('scheduleNo', scheduleNo)
    sessionStorage.setItem('userId', userId)
    sessionStorage.setItem('price', price)
    $scope.mengbanvisiable = false

    $('#zje').text('￥' + price)

    //获取医生详情
    action += '#showDoctorDesc'
    var xykj = DataEncryption([
        'doctorId=' + doctorid
    ])
    // $http({
    // 	url: doctorterdetailurl,
    // 	method: 'POST',
    // 	params: {
    // 		'xykj': xykj

    // 	}
    // }).success(function(data, status) {
    // 	if(status == 200) {
    // 		data = DataDecryption(data)
    // 		if(data.code == 1) {
    // 			var obj1 = eval(data.content)
    // 			if(sessionStorage.getItem('comeType') == 'App' || GetQueryString("comefrom") == 'App') {
    // 				updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约医生', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
    // 			}
    // 			sessionStorage.setItem('doctor', JSON.stringify(obj1))
    // 			doctor = JSON.parse(sessionStorage.getItem('doctor'))
    // 			DorctorCard(obj1, 'searchlist');
    // 		} else {
    // 			new Toast({
    // 				context: $('body'),
    // 				message: data.message
    // 			}).show();
    // 		}
    // 	}
    // })

    ajaxhttp(doctorterdetailurl, xykj, sessionStorage.getItem('token'), function(data, status) {
        if(status == 'success') {
            data = DataDecryption(data)
            if(data.code == 1) {
                var obj1 = eval(data.content)
                if(sessionStorage.getItem('comeType') == 'App' || GetQueryString("comefrom") == 'App') {
                    updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约医生', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
                }
                sessionStorage.setItem('doctor', JSON.stringify(obj1))
                doctor = JSON.parse(sessionStorage.getItem('doctor'))
                DorctorCard(obj1, 'searchlist');
            } else {
                new Toast({
                    context: $('body'),
                    message: data.message
                }).show();
            }

        }
    })

    //  DorctorCard(doctor, 'doctordetail');
    setuserinfo(isUser);

    $('#appoint-time').text(workDate + ' ' + workTime)
    memberId = mymemberId;
    //获取亲情列表
    action += '#queryMemberFamily'
    var xykj = DataEncryption([
        'memberId=' + mymemberId,
        'pageSize=' + '100',
        'pageNum=' + '1'
    ])
    // $http({
    // 	url: getFamilyMembers,
    // 	method: 'POST',
    // 	params: {
    // 		'xykj': xykj

    // 	}
    // }).success(function(data, status) {
    // 	if(status == 200) {
    // 		data = DataDecryption(data)
    // 		if(data.code == 1) {
    // 			if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
    // 				updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
    // 			}
    // 			var obj1 = eval(data.content.rows)
    // 			setMemberList(obj1);
    // 		} else {
    // 			new Toast({
    // 				context: $('body'),
    // 				message: data.message
    // 			}).show();
    // 		}
    // 	}
    // })

    ajaxhttp(getFamilyMembers, xykj, sessionStorage.getItem('token'), function(data, status) {
        if(status == 'success') {
            data = DataDecryption(data)
            if(data.code == 1) {
                if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
                    updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
                }
                var obj1 = eval(data.content.rows)
                setMemberList(obj1);
            } else {
                new Toast({
                    context: $('body'),
                    message: data.message
                }).show();
            }

        }
    })

    var client = '2'
    if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
        client = '1'
    }
    var xykj = DataEncryption([
        'orgId=' + provideOrgId,
        'client=' + client
    ])
    // $http({
    // 	url: orgIsPay,
    // 	method: 'POST',
    // 	params: {
    // 		'xykj': xykj
    // 	}
    // }).success(function(data, status) {
    // 	if(status == 200) {
    // 		data = DataDecryption(data)
    // 		if(data.code == 1) {
    // 			var obj = eval(data)
    // 			if(obj.content == 2) {
    // 				$('.price').show()
    // 				$('#appoint-price').text(price + '元')
    // 			}
    // 		}
    // 	}
    // })

    ajaxhttp(orgIsPay, xykj, sessionStorage.getItem('token'), function(data, status) {
        if(status == 'success') {
            data = DataDecryption(data)
            if(data.code == 1) {
                var obj = eval(data)
                if(obj.content == 2 || obj.content == 1) {
                    $('.price').show()
                    $('#zjview').show()
                    $('#appoint-price').text(price + '元')
                }
            }
        }
    })

    function getMedicalCard() {

        //获取诊疗卡列表
        action += '#getAllMedicalCardList'
        var xykj = DataEncryption([
            'cardNo=' + checkCardNo
        ])
        // $http({
        // 	url: getAllMedicalCardList,
        // 	method: 'POST',
        // 	params: {
        // 		'xykj': xykj
        // 	}
        // }).success(function(data, status) {
        // 	if(status == 200) {
        // 		data = DataDecryption(data)
        // 		if(data.code == 1) {
        // 			if(sessionStorage.getItem('comeType') == 'App' || GetQueryString("comefrom") == 'App') {
        // 				updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
        // 			}
        // 			var obj = eval(data.content)
        // 			setCardHtml(obj)
        // 		} else {
        // 			new Toast({
        // 				context: $('body'),
        // 				message: data.message
        // 			}).show();
        // 		}
        // 	}
        // })

        ajaxhttp(getAllMedicalCardList, xykj, sessionStorage.getItem('token'), function(data, status) {
            if(status == 'success') {
                data = DataDecryption(data)
                if(data.code == 1) {
                    if(sessionStorage.getItem('comeType') == 'App' || GetQueryString("comefrom") == 'App') {
                        updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
                    }
                    var obj = eval(data.content)
                    setCardHtml(obj)
                } else {
                    new Toast({
                        context: $('body'),
                        message: data.message
                    }).show();
                }

            }
        })

    }

    function setCardHtml(obj) {
        var myCardSelect = document.getElementById('medical_cardinput');
        myCardSelect.innerHTML = ''
        var html = ''
        var count = 0
        for(var i = 0; i < obj.length; i++) {
            if(obj[i].orgId == orgId) {
                count++
                html = html +
                    '<option>' + obj[i].identifyNum + '</option>'
            }
        }
        if(count > 0) {
            $('#medical_cardinput').show()
            $('#medical_card').hide()
            myCardSelect.insertAdjacentHTML('beforeend', html);
        } else {
            $('#medical_cardinput').hide()
            $('#medical_card').show()
        }
    }

    function setCardText(text) {
        $('#medical_cardinput').hide()
        $('#medical_card').show()
    }

    function setuserinfo(isUser) {
        if(isUser) {
            $('#zjtitle').show()
            $('#aboutmetitlecard').hide()
            $("#phone").val(mobile);
            checkCardNo = cardNo;
            mycardtype = credentialsType
            memberId = mymemberId

            getMedicalCard()
            $('#myname').text(name)
            msoName = name;
            if(picture != '') {
                if(picture.indexOf('group') > -1) {
                    $('#myheadpic').attr("src", picture)
                } else {
                    $('#myheadpic').attr("src", baseUrl + picture)
                }

            } else {
                $('#myheadpic').attr("src", "img/huanzhe.png")
            }
            $('#nameconten').text(name)
            $('#sexconten').text(getStringSex(sex))
            $('#zjcontent').val(cardNo)
            $('#zjtitle').text(getCardTypeString(credentialsType))
            $("#zjcontent").attr("readOnly", true); //不可编辑，可以传值
            sessionStorage.setItem('familyMemberId', mymemberId)
            sessionStorage.setItem('msoMemberName', name)
        } else {

            if(memberChoosed.cardno != '0') {
                checkCardNo = memberChoosed.cardno;
                getMedicalCard()
            }

            // setCardText('暂无诊疗卡')
            $('#zjtitle').hide()
            $('#aboutmetitlecard').show()
            $("#aboutmetitlecard").attr("disabled", false);
            $("#phone").val(memberChoosed.mobile);

            memberId = memberChoosed.fmMemberId
            mycardtype = memberChoosed.credentialsType
            if(mycardtype == '5418001') {
                $('#aboutmetitlecard').find('option[value="zj1"]').prop("selected", true);
            } else if(mycardtype == '5418004') {
                $('#aboutmetitlecard').find('option[value="zj2"]').prop("selected", true);
            } else if(mycardtype == '5418005') {
                $('#aboutmetitlecard').find('option[value="zj3"]').prop("selected", true);
            } else if(mycardtype == '5418007') {
                $('#aboutmetitlecard').find('option[value="zj4"]').prop("selected", true);
            } else if(mycardtype == '5418008') {
                $('#aboutmetitlecard').find('option[value="zj5"]').prop("selected", true);
            } else if(mycardtype == '5418002') {
                $('#aboutmetitlecard').find('option[value="zj6"]').prop("selected", true);
            } else if(mycardtype == '5418009') {
                $('#aboutmetitlecard').find('option[value="zj8"]').prop("selected", true);
            } else if(mycardtype == '5418011') {
                $('#aboutmetitlecard').find('option[value="zj7"]').prop("selected", true);
            } else {
                $('#aboutmetitlecard').find('option[value="zj1"]').prop("selected", true);
            }
            $('#nameconten').text(memberChoosed.fmName)
            $('#sexconten').text(getStringSex(memberChoosed.sex))
            sessionStorage.setItem('familyMemberId', memberChoosed.fmMemberId)
            sessionStorage.setItem('msoMemberName', memberChoosed.fmName)
            msoName = memberChoosed.fmName;
            if(memberChoosed.cardno != '0') {
                $("#zjcontent").attr("readOnly", false); //不可编辑，可以传值
                $('#zjcontent').val(memberChoosed.cardno)
            } else {
                $("#zjcontent").attr("readOnly", false); //不可编辑，可以传值
                $('#zjcontent').val('')
            }
        }

    }

    function setMemberList(obj) {
        var familymembers = document.getElementById('familymembers');
        var html = '';
        if(obj.length != 0) {
            for(var i = 0; i < obj.length; i++) {
                if(obj[i].memberPic != '') {
                    if(picture.indexOf('group') > -1) {
                        var memberpic = obj[i].memberPic;
                    } else {
                        var memberpic = baseUrl + obj[i].memberPic;
                    }
                } else {
                    var memberpic = "img/huanzhe.png";
                }
                //				var memberpic = "img/huanzhe.png";
                html = html +
                    '<div id="">' +
                    '<div class="radio radiofm">' +
                    '<input type="radio" class="radioclass" name="radio10" id="radio' + (i + 1) + '" value="' + (i + 1) + '">' +
                    '<label for="radio' + (i + 1) + '">' +
                    '<img src="' + memberpic + '"/>' +
                    '<p id="membername">' + obj[i].fmName + '</p>' +
                    '</label>' +
                    '</div>' +
                    '</div>'
            }
            html = html +
                '<div class="radiofm" style="text-align: center;margin-top: 0.3rem;margin-left: 0.8rem;" onclick="addfam()">' +
                '<img src="img/tianjiaqy.png"  style="width: 1.466rem;"/>' +
                '<p id="myname" style="margin-top: 0.133rem;">添加</p>' +
                '</div>'
            familymembers.insertAdjacentHTML('beforeend', html);
            //			var width = (obj.length + 1) * 1.6
            //			$('.swiper-slide').width(width + 'rem')

            //单选按钮监听
            $(function() {
                $(".radioclass").click(function() {
                    //					workTime = $(this).val()
                    if($(this).val() == '0') {
                        isUser = true
                        setuserinfo(isUser)
                    } else {
                        isUser = false
                        memberChoosed = obj[$(this).val() - 1]
                        setuserinfo(isUser)
                    }
                    //					alert("您是..." + $(this).val());
                });
            });
        } else {
            html = html +
                '<div class="radiofm" style="text-align: center;margin-top: 0.3rem;margin-left: 0.8rem;" onclick="addfam()">' +
                '<img src="img/tianjiaqy.png"  style="width: 1.466rem;"/>' +
                '<p id="myname" style="margin-top: 0.133rem;">添加</p>' +
                '</div>'
            familymembers.insertAdjacentHTML('beforeend', html);
        }
    }

    $scope.submitinfo = function() {
        $("#mengban").css("display", "block")
        $scope.mengbanvisiable = true

        if($("#zjcontent").val() == '') {
            $scope.mengbanvisiable = false
            new Toast({
                context: $('body'),
                message: '请前往预约人信息页面完善预约人证件信息'
            }).show();
            return
        }

        var re = /^1[123456789]\d{9}$/
        if(!re.test($("#phone").val())) {
            $scope.mengbanvisiable = false
            new Toast({
                context: $('body'),
                message: '请输入有效的手机号码'
            }).show();
            return
        }

        startTime = workTime.substring(0, 5)
        endTime = workTime.substring(6, 11)
        if(isUser) {
            diagnosisNum = $("#medical_cardinput").find("option:selected").text()
            setScheduler()
        } else {
            diagnosisNum = ''
            if(memberChoosed.credentialsType != getCardTypeCode($('#aboutmetitlecard').find("option:selected").text()) ||
                $('#zjcontent').val() != memberChoosed.cardno) {
                updateMemberCard()
            } else {
                setScheduler()
            }
        }
    }

    function updateMemberCard() {
        var cardType = getCardTypeCode($('#aboutmetitlecard').find("option:selected").text())
        var cardno = $('#zjcontent').val()
        if(cardType == '5418001') {
            if(!IdCardValidate(cardno)) {
                new Toast({
                    context: $('body'),
                    message: '请输入正确的身份证号码'
                }).show();
                return
            }
        }

        //设置预约人信息
        action += '#updateMemberCardno'
        var xykj = DataEncryption([
            'familyId=' + memberId,
            'socialno=' + '',
            'name=' + memberChoosed.fmName,
            'credentialsType=' + cardType,
            'cardno=' + cardno
        ])
        // $http({
        // 	url: updateMemberCardno,
        // 	method: 'POST',
        // 	params: {
        // 		'xykj': xykj
        // 	}
        // }).success(function(data, status) {
        // 	if(status == 200) {
        // 		data = DataDecryption(data)
        // 		if(data.code == 1) {
        // 			if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
        // 				updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
        // 			}
        // 			setScheduler()
        // 		} else {
        // 			$scope.mengbanvisiable = false
        // 			new Toast({
        // 				context: $('body'),
        // 				message: data.message
        // 			}).show();
        // 		}
        // 	}
        // })

        ajaxhttp(updateMemberCardno, xykj, sessionStorage.getItem('token'), function(data, status) {
            if(status == 'success') {
                data = DataDecryption(data)
                if(data.code == 1) {
                    if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
                        updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
                    }
                    setScheduler()
                } else {
                    $scope.mengbanvisiable = false
                    new Toast({
                        context: $('body'),
                        message: data.message
                    }).show();
                }

            }
        })

    }

    function setScheduler() {
        //设置预约人信息
        action += '#setSchedulerInfo'
        var xykj = DataEncryption([
            'producerType=' + '1',
            'producerId=' + doctor.doctorId,
            'depId=' + doctor.depId,
            'teamId=' + '',
            'orgId=' + orgId,
            'workDate=' + workDate,
            'startTime=' + startTime,
            'endTime=' + endTime,
            'providerId=' + '0',
            'memberId=' + memberId,
            'subscribeNo=' + scheduleNo,
            'diagnosisNum=' + diagnosisNum
        ])
        // $http({
        // 	url: setSchedulerInfo,
        // 	method: 'POST',
        // 	params: {
        // 		'xykj': xykj
        // 	}
        // }).success(function(data, status) {
        // 	if(status == 200) {
        // 		data = DataDecryption(data)
        // 		if(data.code == 1) {
        // 			var client = '2'
        // 			if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
        // 				updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
        // 				client = '1'
        // 			}
        // 			var obj1 = eval(data.content.rows)
        // 			sessionStorage.setItem('msoContent', $('#askconten').val())
        // 			//添加支付页面流程
        // 			action += '#orgIsPay'
        // 			var xykj = DataEncryption([
        // 				'orgId=' + provideOrgId,
        // 				'client=' + client
        // 			])
        // 			$http({
        // 				url: orgIsPay,
        // 				method: 'POST',
        // 				params: {
        // 					'xykj': xykj
        // 				}
        // 			}).success(function(data, status) {
        // 				if(status == 200) {
        // 					data = DataDecryption(data)
        // 					if(data.code == 1) {
        // 						updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
        // 						var obj = eval(data)
        // 						if(obj.content == 1) {
        // 							//生成支付订单 需要支付

        // 							$scope.mengbanvisiable = false
        // 							action += '#sethospitalfee'
        // 							var xykj = DataEncryption([
        // 								'memberId=' + memberId,
        // 								'feeId=' + feeItemId,
        // 								'orgId=' + provideOrgId
        // 							])
        // 							$http({
        // 								url: sethospitalfee,
        // 								method: 'POST',
        // 								params: {
        // 									'xykj': xykj
        // 								}
        // 							}).success(function(data, status) {
        // 								if(status == 200) {
        // 									data = DataDecryption(data)
        // 									if(data.code == 1) {
        // 										$('.choosememberdiv').hide()
        // 										$('.paydiv').show()
        // 										$('#zfbpay').hide()
        // 										$('.pricecontent').text(price + '元')
        // 										$('#timeyear').text(workDate)
        // 										$('#timehour').text(workTime)
        // 										if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App') {
        // 											$('#zfbpay').show()
        // 											$('#radiopaywx').check;
        // 										} else {
        // 											$('#zfbpay').hide()
        // 											$('#radiopaywx').check;
        // 										}
        // 										var ojj = data.content
        // 										var ss = ojj.split('#')
        // 										if(ss[0] == '0' || ss[0] == 0) {
        // 											$('#pricetype').text('成人诊金')
        // 										} else {
        // 											$('#pricetype').text('儿童诊金')
        // 										}
        // 										price = ss[1]
        // 										$('.pricecontent').text(price + '元')
        // 									} else {
        // 										$scope.mengbanvisiable = false
        // 										new Toast({
        // 											context: $('body'),
        // 											message: data.message
        // 										}).show();
        // 									}
        // 								}
        // 							})

        // 						} else {
        // 							//获取预约号 不需要支付
        // 							gocreateBusinessInfoNotPayment()
        // 						}
        // 					} else {
        // 						$scope.mengbanvisiable = false
        // 						new Toast({
        // 							context: $('body'),
        // 							message: data.message
        // 						}).show();
        // 					}
        // 				}
        // 			})
        // 		} else if(data.code == 4202) {
        // 			new Toast({
        // 				context: $('body'),
        // 				message: data.message
        // 			}).show();
        // 			//需判断是否是公众号
        // 			if(sessionStorage.getItem('comefrom') == 'App' || sessionStorage.getItem('comeType') == 'App' || GetQueryString("comefrom") == 'App') {
        // 				$scope.mengbansssvisiable = false
        // 				$('#appoint-success-modal').modal('show')
        // 			} else {
        // 				$scope.mengbanvisiable = false
        // 				$('#dialogdiv').show()
        // 				$('#content').text('已为您预约了该医生,请准时到医院就诊,想要了解更多内容,请下载健康东莞App')
        // 			}
        // 		} else {
        // 			$scope.mengbanvisiable = false
        // 			new Toast({
        // 				context: $('body'),
        // 				message: data.message
        // 			}).show();
        // 		}
        // 	}
        // })

        ajaxhttp(setSchedulerInfo, xykj, sessionStorage.getItem('token'), function(data, status) {
            if(data.code == 1) {
                var client = '2'
                if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
                    updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
                    client = '1'
                }
                var obj1 = eval(data.content.rows)
                sessionStorage.setItem('msoContent', $('#askconten').val())
                //添加支付页面流程
                action += '#orgIsPay'
                var xykj = DataEncryption([
                    'orgId=' + provideOrgId,
                    'client=' + client
                ])

                ajaxhttp(orgIsPay, xykj, sessionStorage.getItem('token'), function(data, status) {
                    if(status == 'success') {
                        data = DataDecryption(data)
                        if(data.code == 1) {
                            updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
                            var obj = eval(data)
                            if(obj.content == 1) {
                                //生成支付订单 需要支付

                                $scope.mengbanvisiable = false
                                action += '#sethospitalfee'
                                var xykj = DataEncryption([
                                    'memberId=' + memberId,
                                    'feeId=' + feeItemId,
                                    'orgId=' + provideOrgId
                                ])
                                ajaxhttp(sethospitalfee, xykj, sessionStorage.getItem('token'), function(data, status) {
                                    if(status == 'success') {
                                        data = DataDecryption(data)
                                        if(data.code == 1) {
                                            $('.choosememberdiv').hide()
                                            $('.paydiv').show()
                                            $('#zfbpay').hide()

                                            $('#fgx').hide()
                                            $('.pricecontent').text(price + '元')
                                            $('#timeyear').text(workDate)
                                            $('#timehour').text(workTime)
                                            if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App') {
                                                $('#zfbpay').show()
                                                $('#radiopaywx').check;
                                            } else {
                                                $('#zfbpay').hide()
                                                $('#radiopaywx').check;
                                            }
                                            var ojj = data.content
                                            var ss = ojj.split('#')
                                            if(ss[0] == '0' || ss[0] == 0) {
                                                $('#pricetype').text('成人诊金')
                                            } else {
                                                $('#pricetype').text('儿童诊金')
                                            }
                                            price = ss[1]
                                            $('.pricecontent').text(price + '元')
                                        } else {
                                            $scope.mengbanvisiable = false
                                            new Toast({
                                                context: $('body'),
                                                message: data.message
                                            }).show();
                                        }

                                    }
                                })

                            } else {
                                //获取预约号 不需要支付
                                gocreateBusinessInfoNotPayment()
                            }
                        } else {
                            $scope.mengbanvisiable = false
                            new Toast({
                                context: $('body'),
                                message: data.message
                            }).show();
                        }

                    }
                })

            } else if(data.code == 4202) {
                new Toast({
                    context: $('body'),
                    message: data.message
                }).show();
                //需判断是否是公众号
                if(sessionStorage.getItem('comefrom') == 'App' || sessionStorage.getItem('comeType') == 'App' || GetQueryString("comefrom") == 'App') {
                    $scope.mengbansssvisiable = false
                    $('#appoint-success-modal').modal('show')
                } else {
                    $scope.mengbanvisiable = false
                    $('#dialogdiv').show()
                    $('#content').text('已为您预约了该医生,请准时到医院就诊,想要了解更多内容,请下载健康东莞App')
                }
            } else {
                $scope.mengbanvisiable = false
                new Toast({
                    context: $('body'),
                    message: data.message
                }).show();
            }
            if(status == 'success') {
                data = DataDecryption(data)

            }
        })

    }
    $scope.submitinfo1 = function() {
        $scope.mengbanvisiable = true
        var startTime = workTime.substring(0, 5)
        var endTime = workTime.substring(6, 11)
        var schedulingDesc = sessionStorage.getItem('schedulingDesc')
        var msoContent = sessionStorage.getItem('msoContent')
        var familyMemberId = sessionStorage.getItem('familyMemberId')
        var msoMemberName = sessionStorage.getItem('msoMemberName')
        //获取预约号
        action += '#createBusinessInfo_selft'
        var xykj = DataEncryption([
            'scheduleDoctorId=' + '0',
            'serviceProvideDoctorId=' + doctor.doctorId,
            'feeItemId=' + feeItemId,
            'memberUserId=' + mymemberId,
            'familyMemberId=' + familyMemberId,
            'scheduleDate=' + workDate,
            'scheduleStartTime=' + startTime,
            'scheduleEndTime=' + endTime,
            'provideOrgId=' + provideOrgId,
            'departmentId=' + departmentId,
            'teamId=' + teamId,
            'schedulingDesc=' + schedulingDesc,
            'msoContent=' + msoContent,
            'mobile=' + mobile,
            'memberUserName=' + name,
            'msoMemberName=' + msoMemberName,
            'filePathNames=' + '',
            'referredId=' + '0',
            'scheduleNo=' + scheduleNo,
            'type=' + '1'
        ])
        // $http({
        // 	url: createBusinessInfo_selft,
        // 	method: 'POST',
        // 	params: {
        // 		'xykj': xykj
        // 	}
        // }).success(function(data, status) {
        // 	if(status == 200) {
        // 		data = DataDecryption(data)
        // 		if(data.code == 1) {
        // 			if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App') {
        // 				updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
        // 				var state1 = $('input:radio[name="radio1"]:checked').val()
        // 				if(state1 == 'option1') {
        // 					pathway = '8'
        // 				} else if(state1 == 'option2') {
        // 					pathway = '2'
        // 				}
        // 			} else {
        // 				pathway = '7'
        // 			}
        // 			var obj1 = eval(data)
        // 			businessId = obj1.content
        // 			var xykj = DataEncryption([
        // 				'orgId=' + provideOrgId,
        // 				'busType=' + '1000010001',
        // 				'price=' + price
        // 			])
        // 			$http({
        // 				url: computeDiscount,
        // 				method: 'POST',
        // 				params: {
        // 					'xykj': xykj
        // 				}
        // 			}).success(function(data, status) {
        // 				$scope.mengbanvisiable = false;
        // 				if(status == 200) {
        // 					data = DataDecryption(data)
        // 					if(data.code == 1) {
        // 						var obj3 = eval(data.content)
        // 						if(obj3.id == '0') {
        // 							action += '#submitPayment'
        // 							var xykj = DataEncryption([
        // 								'userId=' + userId,
        // 								'busType=' + '1000010001',
        // 								'providerId=' + doctor.doctorId,
        // 								'comsumerId=' + mymemberId,
        // 								'pathway=' + pathway,
        // 								'serviceAmount=' + price,
        // 								'serviceName=' + '诊金预收',
        // 								'businessId=' + businessId,
        // 								'orgId=' + provideOrgId,
        // 								'discountId=' + '0',
        // 								'familyMembers=' + '',
        // 								'isSocial=' + '',
        // 								'protocolType=' + ''
        // 							])
        // 							$http({
        // 								url: submitPayment,
        // 								method: 'POST',
        // 								params: {
        // 									'xykj': xykj
        // 								}
        // 							}).success(function(data, status) {
        // 								if(status == 200) {
        // 									data = DataDecryption(data)
        // 									if(data.code == 1) {
        // 										if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App') {
        // 											updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
        // 											if(pathway != '2') {
        // 												var obj2 = eval('(' + data.content + ')');
        // 												out_trade_no = obj2.out_trade_no
        // 											}
        // 											window.location.href = "protocol://android?code=apppay&orgid=" + provideOrgId + "&pathway=" + pathway + "&out_trade_no=" + out_trade_no + "&data=" + data.content
        // 										} else {
        // 											var obj2 = eval('(' + data.content + ')');
        // 											out_trade_no = obj2.out_trade_no
        // 											WeixinJSBridge.invoke(
        // 												'getBrandWCPayRequest', {
        // 													"appId": obj2.appId, //公众号名称，由商户传入
        // 													"timeStamp": obj2.timeStamp, //时间戳，自1970年以来的秒数,不能为整形，需要转换为String
        // 													"nonceStr": obj2.nonceStr, //随机串
        // 													"package": obj2.package, // prepay_id=wx201410272009395522657a690389285100
        // 													"signType": "MD5", //微信签名方式
        // 													"paySign": obj2.sign //微信签名
        // 												},
        // 												function(res) {
        // 													if(res.err_msg == "get_brand_wcpay_request:ok") {
        // 														//								Util.alert("支付成功！！", 5000);
        // 														setPaymentSyncNotify(obj2)
        // 													} else if(res.err_msg == "get_brand_wcpay_request:cancel") { //支付过程中用户取消
        // 														//								Util.alert("您取消了支付！！", 5000);
        // 														new Toast({
        // 															context: $('body'),
        // 															message: '您取消了支付！！'
        // 														}).show();
        // 														location = 'NewOrdonnance.html?currentDate=' + getNowFormatDateTimeS()
        // 														$('.mengban').hide()
        // 														$('.rightBtn').css('background', '#23B6BC')
        // 														$("#rightBtn").attr('disabled', false);
        // 													} else if(res.err_msg == "get_brand_wcpay_request:fail") { //支付失败
        // 														//								Util.alert("支付失败！！", -1);
        // 														new Toast({
        // 															context: $('body'),
        // 															message: '支付失败！！'
        // 														}).show();
        // 														location = 'NewOrdonnance.html?currentDate=' + getNowFormatDateTimeS()
        // 														$('.mengban').hide()
        // 														$('.rightBtn').css('background', '#23B6BC')
        // 														$("#rightBtn").attr('disabled', false);
        // 													} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠.
        // 												}
        // 											);
        // 										}

        // 									}
        // 								}
        // 							})
        // 						} else {
        // 							//走免费接口
        // 							gocreateBusinessInfoNotPayment()
        // 						}
        // 					} else {
        // 						new Toast({
        // 							context: $('body'),
        // 							message: data.message
        // 						}).show();
        // 					}
        // 				}
        // 			})

        // 		} else {
        // 			new Toast({
        // 				context: $('body'),
        // 				message: data.message
        // 			}).show();
        // 		}
        // 	}
        // })

        ajaxhttp(createBusinessInfo_selft, xykj, sessionStorage.getItem('token'), function(data, status) {
            if(status == 'success') {
                data = DataDecryption(data)
                if(data.code == 1) {
                    if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App') {
                        updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
                        var state1 = $('input:radio[name="radio1"]:checked').val()
                        if(state1 == 'option1') {
                            pathway = '8'
                        } else if(state1 == 'option2') {
                            pathway = '2'
                        }
                    } else {
                        pathway = '7'
                    }
                    var obj1 = eval(data)
                    businessId = obj1.content
                    var xykj = DataEncryption([
                        'orgId=' + provideOrgId,
                        'busType=' + '1000010001',
                        'price=' + price
                    ])

                    ajaxhttp(computeDiscount, xykj, sessionStorage.getItem('token'), function(data, status) {
                        if(status == 'success') {
                            data = DataDecryption(data)
                            if(data.code == 1) {
                                var obj3 = eval(data.content)
                                if(obj3.id == '0') {
                                    action += '#submitPayment'
                                    var xykj = DataEncryption([
                                        'userId=' + userId,
                                        'busType=' + '1000010001',
                                        'providerId=' + doctor.doctorId,
                                        'comsumerId=' + mymemberId,
                                        'pathway=' + pathway,
                                        'serviceAmount=' + price,
                                        'serviceName=' + '诊金预收',
                                        'businessId=' + businessId,
                                        'orgId=' + provideOrgId,
                                        'discountId=' + '0',
                                        'familyMembers=' + '',
                                        'isSocial=' + '',
                                        'protocolType=' + ''
                                    ])

                                    ajaxhttp(submitPayment, xykj, sessionStorage.getItem('token'), function(data, status) {
                                        if(status == 'success') {
                                            data = DataDecryption(data)
                                            if(data.code == 1) {
                                                if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App') {
                                                    updateMonitor(sessionStorage.getItem('model'), sessionStorage.getItem('versionName'), sessionStorage.getItem('memberId'), '预约详细资料', action, accessTime, sessionStorage.getItem('network'), sessionStorage.getItem('os'))
                                                    if(pathway != '2') {
                                                        var obj2 = eval('(' + data.content + ')');
                                                        out_trade_no = obj2.out_trade_no
                                                    }
                                                    window.location.href = "protocol://android?code=apppay&orgid=" + provideOrgId + "&pathway=" + pathway + "&out_trade_no=" + out_trade_no + "&data=" + data.content
                                                } else {
                                                    var obj2 = eval('(' + data.content + ')');
                                                    out_trade_no = obj2.out_trade_no
                                                    WeixinJSBridge.invoke(
                                                        'getBrandWCPayRequest', {
                                                            "appId": obj2.appId, //公众号名称，由商户传入
                                                            "timeStamp": obj2.timeStamp, //时间戳，自1970年以来的秒数,不能为整形，需要转换为String
                                                            "nonceStr": obj2.nonceStr, //随机串
                                                            "package": obj2.package, // prepay_id=wx201410272009395522657a690389285100
                                                            "signType": "MD5", //微信签名方式
                                                            "paySign": obj2.sign //微信签名
                                                        },
                                                        function(res) {
                                                            if(res.err_msg == "get_brand_wcpay_request:ok") {
                                                                //								Util.alert("支付成功！！", 5000);
                                                                setPaymentSyncNotify(obj2)
                                                            } else if(res.err_msg == "get_brand_wcpay_request:cancel") { //支付过程中用户取消
                                                                //								Util.alert("您取消了支付！！", 5000);
                                                                new Toast({
                                                                    context: $('body'),
                                                                    message: '您取消了支付！！'
                                                                }).show();
                                                                location = 'NewOrdonnance.html?currentDate=' + getNowFormatDateTimeS()
                                                                $('.mengban').hide()
                                                                $('.rightBtn').css('background', '#23B6BC')
                                                                $("#rightBtn").attr('disabled', false);
                                                            } else if(res.err_msg == "get_brand_wcpay_request:fail") { //支付失败
                                                                //								Util.alert("支付失败！！", -1);
                                                                new Toast({
                                                                    context: $('body'),
                                                                    message: '支付失败！！'
                                                                }).show();
                                                                location = 'NewOrdonnance.html?currentDate=' + getNowFormatDateTimeS()
                                                                $('.mengban').hide()
                                                                $('.rightBtn').css('background', '#23B6BC')
                                                                $("#rightBtn").attr('disabled', false);
                                                            } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠.
                                                        }
                                                    );
                                                }

                                            }

                                        }
                                    })

                                } else {
                                    //走免费接口
                                    gocreateBusinessInfoNotPayment()
                                }
                            } else {
                                new Toast({
                                    context: $('body'),
                                    message: data.message
                                }).show();
                            }

                        }
                    })

                } else {
                    new Toast({
                        context: $('body'),
                        message: data.message
                    }).show();
                }

            }
        })

    }
    //同步接口
    function setPaymentSyncNotify(obj2) {
        var b = parseInt(recipeListstr);
        var xykj = DataEncryption([
            'orgId=' + provideOrgId,
            'outtradeno=' + out_trade_no,
            'pathway=7'
        ])
        // $.ajax({
        // 	type: "post",
        // 	url: paymentNotify,
        // 	data: {
        // 		'xykj': xykj
        // 	},
        // 	success: function(data) {
        // 		data = DataDecryption(data)
        // 		if(data.code == 1) {
        // 			location = 'appointmentRecord.html?currentDate=' + getNowFormatDateTimeS()
        // 		} else {
        // 			new Toast({
        // 				context: $('body'),
        // 				message: data.message
        // 			}).show();
        // 		}
        // 	}
        // });

        ajaxhttp(paymentNotify, xykj, sessionStorage.getItem('token'), function(data, status) {
            if(status == 'success') {
                data = DataDecryption(data)
                if(data.code == 1) {
                    location = 'appointmentRecord.html?currentDate=' + getNowFormatDateTimeS()
                } else {
                    new Toast({
                        context: $('body'),
                        message: data.message
                    }).show();
                }

            }
        })

    }
    //获取预约号 不需要支付
    function gocreateBusinessInfoNotPayment() {
        var schedulingDesc = sessionStorage.getItem('schedulingDesc')
        var msoContent = sessionStorage.getItem('msoContent')
        var familyMemberId = sessionStorage.getItem('familyMemberId')
        var msoMemberName = sessionStorage.getItem('msoMemberName')
        action += '#createBusinessInfoNotPayment'
        var xykj = DataEncryption([
            'scheduleDoctorId=' + '0',
            'serviceProvideDoctorId=' + doctor.doctorId,
            'feeItemId=' + feeItemId,
            'memberUserId=' + mymemberId,
            'familyMemberId=' + memberId,
            'scheduleDate=' + workDate,
            'scheduleStartTime=' + startTime,
            'scheduleEndTime=' + endTime,
            'provideOrgId=' + provideOrgId,
            'departmentId=' + departmentId,
            'teamId=' + teamId,
            'schedulingDesc=' + schedulingDesc,
            'msoContent=' + msoContent,
            'mobile=' + $("#phone").val(),
            'memberUserName=' + name,
            'msoMemberName=' + msoName,
            'filePathNames=' + '',
            'referredId=' + '0',
            'scheduleNo=' + scheduleNo,
            'type=' + '1'
        ])
        // $http({
        // 	url: createBusinessInfoNotPayment,
        // 	method: 'POST',
        // 	params: {
        // 		'xykj': xykj
        // 	},
        // 	timeout: 8000
        // }).success(function(data, status) {
        // 	if(status == 200) {
        // 		data = DataDecryption(data)
        // 		if(data.code == 1) {
        // 			//需判断是否是公众号
        // 			if(sessionStorage.getItem('comefrom') == 'App' || sessionStorage.getItem('comeType') == 'App' || GetQueryString("comefrom") == 'App') {
        // 				$scope.mengbansssvisiable = false
        // 				businessNo = data.content
        // 				$('#appoint-success-modal').modal('show')
        // 			} else {
        // 				$scope.mengbanvisiable = false
        // 				$('#dialogdiv').show()
        // 				$('#content').text('已为您预约了该医生,请准时到医院就诊,想要了解更多内容,请下载健康东莞App')
        // 			}
        // 		} else {
        // 			$scope.mengbanvisiable = false
        // 			dispatchError(data);
        // 		}
        // 	}
        // }).error(function(data, header, config, status) {
        // 	//错误处理
        // 	$scope.mengbanvisiable = false
        // })

        ajaxhttp(createBusinessInfoNotPayment, xykj, sessionStorage.getItem('token'), function(data, status) {
            if(status == 'success') {
                data = DataDecryption(data)
                if(data.code == 1) {
                    //需判断是否是公众号
                    if(sessionStorage.getItem('comefrom') == 'App' || sessionStorage.getItem('comeType') == 'App' || GetQueryString("comefrom") == 'App') {
                        $scope.mengbansssvisiable = false
                        businessNo = data.content
                        $('#appoint-success-modal').modal('show')
                    } else {
                        $scope.mengbanvisiable = false
                        $('#dialogdiv').show()
                        $('#content').text('已为您预约了该医生,请准时到医院就诊,想要了解更多内容,请下载健康东莞App')
                    }
                } else {
                    $scope.mengbanvisiable = false
                    dispatchError(data);
                }

            }
        })

    }
    $scope.gotosp = function() {
        // 展示提示弹窗
        $('#tips-modal').modal('show')
    }
    $scope.dismisstipsmodal = function() {
        $('#tips-modal').modal('hide')
    }
    $scope.dismissDialog = function() {
        $('#dialogdiv').hide()

        window.location.href = 'appointmentRecord.html?currentDate=' + getNowFormatDateTimeS()
    }
    $scope.gotoLoading = function() {
        $('#dialogdiv').hide()

        window.location.href = 'qr_code_domwload.html?currentDate=' + getNowFormatDateTimeS()
    }

    function dispatchError(data) {
        var code = data.code;
        if(code == 4101 || code == 4102 || code == 4103 || code == 4104 || code == 5101) {
            $('#error_modal_content_first').text('号源已用完')
            $('#error_modal_content_second').text('请重新选择时段')
            $('#error_modal').modal('show')

        } else if(code == 4201) {
            $('#error_modal_content_first').text('已超出可预约上限')
            $('#error_modal_content_second').text('今日不可在预约')
            $('#error_modal').modal('show')

        } else if(code == 5202) {
            $('#error_modal_content_first').text('您有待支付订单')
            $('#error_modal_content_second').text('请先支付或取消订单')
            $('#error_modal').modal('show')

        } else if(code == 5108) {
            $('#error_modal_content_first').text('身份证无效')
            $('#error_modal_content_second').text('请检查身份信息')
            $('#error_modal').modal('show')

        } else if(code == 4202 || code == 4203 || code == -10) {
            $('#appointed-modal').modal('show')
        } else if(code == 3102) {
            new Toast({
                context: $('body'),
                message: '科室不对外开放'
            }).show();
        } else {
            new Toast({
                context: $('body'),
                message: data.message
            }).show();
        }
    }

    function DorctorCard(obj, id) {
        var listgroup = document.getElementById(id);
        if(obj.length != 0) {
            var html = '';
            var istermhtml = '';
            var iscontract = ''
            var assLevelhtml = '';
            switch(obj.assLevel) {
                case 0:
                    assLevelhtml =
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>'
                    break;
                case 1:

                    assLevelhtml =
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>'

                    break;
                case 2:
                    assLevelhtml =
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>'

                    break;
                case 3:
                    assLevelhtml =
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>'

                    break;
                case 4:
                    assLevelhtml =
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_empty.png' + '></td>'
                    break;
                case 5:
                    assLevelhtml =
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>'
                    break;
                default:
                    assLevelhtml =
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>' +
                        '<td><img src=' + 'img/star_ratingbar_da_full.png' + '></td>'
                    break;
            }
            if(obj.doctorHeadPic != '') {
                var headpic = baseUrl + obj.doctorHeadPic
            } else {
                if(obj.sex == '302001') {
                    var headpic = "img/nan1.png"
                } else {
                    var headpic = "img/nv1.png"
                }

            }
            if(obj.isTeam == 1) {
                istermhtml = 'yitianjia.png'
            } else {
                istermhtml = 'tianjia.png'
            }
            if(obj.isContract != 0) {
                iscontract = '<img id="signimg" src="img/biaoqian1@2x.png"/>'
            } else {
                iscontract = ''
            }
            //			var headpic = "img/doctor_headpic.png"
            html = html +
                '<div class="row docrow">' +
                '<div class="col-xs-3">' +
                '<img id="doctorheadpic" src="' + headpic + '" />' +
                '</div>' +
                '<div class="col-xs-9 text-left">' +
                '<ul class="list-group">' +
                '<li class="list-group-item">' +
                '<div id="doctorname">' + obj.name +
                '<table id="manYiDu">' +
                '<tr>' +
                assLevelhtml +
                '</tr>' +
                '</table>' +
                '</div>' +
                '</li>' +
                '<li class="list-group-item mydcontent">' +
                '<p id="mydcontent">满意度<span id="mydnum">' +
                +obj.assCount + '条' +
                '</span>评论</p>' +
                '</li>' +
                '<li class="list-group-item" id="doctorinfodiv">' +
                obj.section + " " + getJobTitle(obj.jobTitle) +
                '</li>' +
                '<li class="list-group-item" id="doctoraddrdiv">' +
                '<div id="doctoraddr">' +
                '<p id="addrconten">' + obj.hosName + '</p>' +
                '</div>' +
                '</li>' +
                '<li class="list-group-item" id="doctorbt">' +
                '<div class="row">' +
                '<div class="col-xs-6">' +
                '<img src="img/' + istermhtml + '" />' +
                '</div>' +
                '</div>' +
                '</li>' +
                '</ul>' +
                '</div>' +
                '</div>'

            listgroup.insertAdjacentHTML('beforeend', html);
        }
    }

    $scope.dismissAppointSuccessModal = function() {
        $('#appoint-success-modal').modal('hide')
        if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
            window.location.href = "protocol://android?goToAppointmentList";
        } else {
            window.location.href = 'appointmentRecord.html?currentDate=' + getNowFormatDateTimeS()
        }
    }

    $scope.goToUploadAttach = function() {
        $('#appoint-success-modal').modal('hide')
        window.location.href = "protocol://android?goToMainPage";
    }

    $scope.changePhone = function() {
        // $('#phone').removeAttr('disabled');
        $("input").prop('disabled', false);
    };

    $scope.dismissErrorModel = function() {
        $('#error_modal').modal('hide')
    }

    $scope.dismissAppointedModal = function() {
        $('#appointed-modal').modal('hide')
    }

    $scope.goToAppointmentList = function() {
        $('#appointed-modal').modal('hide')

        if(sessionStorage.getItem('comeType') == 'App' || sessionStorage.getItem('comefrom') == 'App' || GetQueryString("comefrom") == 'App') {
            window.location.href = "protocol://android?goToAppointmentList";
        } else {
            window.location.href = 'appointmentRecord.html?currentDate=' + getNowFormatDateTimeS()
        }

    }
})