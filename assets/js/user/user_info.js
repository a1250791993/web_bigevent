$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                layer.msg('昵称长度在1~6个字符之间!')
            }
        }
    })

    // 调用初始化用户信息的方法
    initUserInfo()

    //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }

                // console.log(res);
                // 调用form.val()为表单快速赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 给重置按钮绑定事件
    $('#btnReset').on('click', function (e) {
        //阻止表单的默认重置行为
        e.preventDefault()

        // 重新调用初始化用户信息方法
        initUserInfo()
    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败!')
                }

                layer.msg('更新用户信息成功!')
                //调用父页面的方法重新渲染头像和信息
                //fm相当于一个子页面,index相当于父页面
                //window.parent(window相当于fm,parent相当于index)
                window.parent.getUserInfo()
            }
        })
    })
})