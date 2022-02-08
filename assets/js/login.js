$(function () {
    //点击去注册账号链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登陆链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 表单验证规则
    // 从layui中获取form对象
    var form = layui.form

    // 获取layer对象
    var layer = layui.layer

    form.verify({
        //自定义一个pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]

        // 校验两次密码是否不一致
        , repwd: function (value) {
            //通过形参拿到密码确认框的内容
            //还需要拿到密码框的内容
            //进行一次等于判断
            //如果判断失败，提示用户
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    //监听注册表单事件
    $('#form-reg').on('submit', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault()

        // 发起ajax的post请求
        var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }

        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }

            layer.msg('注册成功,请登录')

            // 注册成功自动跳转页面
            $('#link_login').click()
        })
    })

    //监听登录表单事件
    $('#form-login').on('submit', function (e) {
        //   阻止表单默认提交行为
        e.preventDefault()

        // 发起ajax的post请求
        //快速获取表单数据
        var data = $(this).serialize()
        $.post('/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败')
            }

            layer.msg('登陆成功!')
            // console.log(res.token);

            //将token字符串存储到localStorage中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
        })
    })
})