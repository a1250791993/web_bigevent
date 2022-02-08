$(function () {
    //    调用获取用户信息的方法
    getUserInfo();

    var layer = layui.layer

    //给退出按钮绑定事件
    $('#btnLogout').on('click', function () {
        //提示用户是否退出
        layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/login.html'

            // 关闭confirm 询问框 
            layer.close(index);
        });
    })
})

//获取用户的基本信息方法
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // Headers就是请求头的配置对象
        // 挂载到baseAPI上了
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('用户信息获取失败')
            }

            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        //不论成功还是失败，最终都会调用complete函数
        // 挂载到baseAPI上了
        /* complete: function (res) {
            // console.log(res);
            //在complete函数中，可以调用res.responseJSON拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.强制清空token
                localStorage.removeItem('token')
                // 2.强制跳转到登录页面
                location.href = '/login.html'
            }
        } */
    })
}

//渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的昵称
    var name = user.nickname || user.username
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar')
            .hide()
    } else {
        // 3.2渲染文本图像
        $('.layui-nav-img')
            .hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}