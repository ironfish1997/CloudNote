var SUCCESS = 0;
var ERROR = 1;
/**
 * 页面初始化后，绑定函数。
 */
$(function () {
    //登录
    $("#login").click(login);

    $("#count").blur(checkName);

    $("#password").blur(checkPassword);

    //注册
    $("#regist_button").click(register);

    $("#regist_username").blur(checkRegisterName);

    $("#regist_password").blur(checkRegisterPassword);

    $("#final_password").blur(checkPasswordConfirm);

    //登出
    $("#logout").click(logout);

    //修改密码
    $("#changePassword").click(changepwd);

});

//检验用户名是否符合要求
function checkName() {
    var name = $('#count').val();
    var rule = /^\w{4,10}$/;//从头到尾最多10个，最少4个字符
    if (!rule.test(name)) {
        $("#count").next().html('4到10个字符');
        return false;
    }
    $("#count").next().empty();
    return true;
}

//检验密码是否符合要求
function checkPassword() {
    var password = $('#password').val();
    var rule = /^\w{6,10}$/;//从头到尾最多10个，最少6个字符
    if (!rule.test(password)) {
        $("#password").next().html('6到10个字符');
        return false;
    }
    $("#password").next().empty();
    return true;
}

//检验注册名是否符合要求
function checkRegisterName() {
    var name = $('#regist_username').val().trim();
    var rule = /^\w{4,10}$/;//从头到尾最多10个，最少四个字符
    if (!rule.test(name)) {
        $("#regist_username").next().show();
        return false;
    }
    $("#regist_username").next().hide();
    return true;
}

//检验注册密码是否符合要求
function checkRegisterPassword() {
    var passwo = $('#regist_password').val().trim();
    var rule = /^\w{6,10}$/;//从头到尾最多10个，最少6个字符
    $('#warning_2').hide();
    if (!rule.test(passwo)) {
        $('#warning_2').show().find('span').html("允许6~10字符");
        return false;
    }
    $('#warning_2').hide();
    return true;
}

//检验两次密码输入是否一致
function checkPasswordConfirm() {
    var password = $('#regist_password').val();
    var confirm = $('#final_password').val();
    if (confirm && password == confirm) {
        $('#final_password').next().hide();
        return true;
    } else {
        $('#final_password').next().show();
        return false;
    }
}

//注册
function register() {
    console.log('registerAction');
    var n = checkRegisterName() * checkRegisterPassword() * checkPasswordConfirm();
    if (n != 1) {
        return;
    }
    var name = $('#regist_username').val().trim();
    var password = $('#regist_password').val().trim();
    var nickname = $('#nickname').val().trim();
    var confirm = $('#final_password').val().trim();
    var data = {
        "name": name,
        "password": password,
        "nickname": nickname,
        "confirm": confirm
    };
    $.ajax({
        url: 'user/register.do',
        data: data,
        type: 'post',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var msg = result.message;
            if (result.state == 0) {
                //注册成功
                var user = result.data;
                $('#regist_username').next().html('注册成功');
                //注册成功退回登录页面
                $('#back').click();
                var name = user.name;
                //填上注册的用户名
                $('#count').val(name);
                //focus到密码输入框，让用户输入密码
                $('#password').focus();
                //清除注册表单的数据
                $('#regist_username').val('');
                $('#regist_password').val('');
                $('#nickname').val('');
                $('#final_password').val('');
            } else {
                //密码错误
                if (result.state == 2) {
                    $('#regist_password').next().show().find('span').html(msg);
                }
                //其他错误
                else {
                    $('#regist_username').next().show().find('span').html(msg);
                }
                return;
            }
        },
        error: function () {
            console.log('通信失败，服务器没有响应');
        }
    });
}

//登录
function login() {
    var name = $('#count').val();
    var password = $('#password').val();
    var success = checkName() * checkPassword();
    if (!success) {
        return;
    }
    //data对象中的属性名要与服务器控制器的参数名一致
    var data = {
        "name": name,
        "password": password
    };
    $.ajax({
        url: 'user/login.do',
        data: data,
        type: 'post',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            if (result.state == 0) {
                //登录成功
                var user = result.data;
                $('#count').next().html('登录成功');
                console.log(user);
                //保存登录的userId到cookie
                addCookie("userId", user.id);
                addCookie("userName", user.name);
                //成功后跳转到edit.html
                location.href = 'edit.html';
            } else {
                var msg = result.message;
                //密码错误
                if (result.state == 2) {
                    $('#password').next().html(msg);
                } else {
                    $('#count').next().html(msg);
                }
            }
        },
        error: function (e) {
            alert('通信失败，服务器没有响应');
        }
    });
}

/**
 * 退出登录
 */
function logout() {
    console.log("退出");
    location.href = "login.html";
}

/**
 * 修改密码
 */
function changepwd() {
    var original_password = $('#last_password').val();
    var new_password = $('#new_password').val();
    var final_password = $('#final_password').val();
    var user = getCookie('userName');
    //检查新密码的格式和两次密码是否一致
    var n = checkUpdatePassword() * checkUpdatePasswordConfirm();
    if (n != 1) {
        return;
    }
    $.ajax({
        url: 'user/login.do',
        data: {"name": user, "password": original_password},
        type: 'post',
        dataType: 'json',
        success: function (result) {
            //返回成功证明原始密码正确
            if (result.state == SUCCESS) {
                //json定义user对象
                $.post(
                    'user/update.do',
                    {
                        name: getCookie('userName'),
                        origin: original_password,
                        password: new_password,
                        confirm: final_password
                    },
                    function (result) {
                        if (result.state == SUCCESS) {
                            alert("密码修改成功,请用新密码登录");
                            window.location.href = "/login.html";
                        } else {
                            alert("密码修改失败,请稍后重试");
                            window.location.href = "/login.html";
                        }
                    }
                )
            } else {
                //如果登录不成功则代表原始密码有误
                $('#last_password').next().show();
            }
        },
        error: function (e) {
            alert('服务器没有响应，请稍后重试');
        }
    });
}

//检验修改密码是否符合要求
function checkUpdatePassword() {
    var passwo = $('#new_password').val();
    var rule = /^\w{6,10}$/;//从头到尾最多10个，最少6个字符
    $('#warning_2').hide();
    if (!rule.test(passwo)) {
        $('#warning_2').show().find('span').html("允许6~10字符");
        return false;
    }
    $('#warning_2').hide();
    return true;
}

//检验两次密码输入是否一致
function checkUpdatePasswordConfirm() {
    var password = $('#new_password').val();
    var confirm = $('#final_password').val();
    if (confirm && password == confirm) {
        $('#final_password').next().hide();
        return true;
    } else {
        $('#final_password').next().show();
        return false;
    }
}

