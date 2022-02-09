$(function () {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定事件
    $('#btnChooseImage').on('click', function (e) {
        e.preventDefault()

        $('#file').click()
    })

    // 为文件选择绑定change事件,e.target.files可以拿到
    //选择的文件对象 files是伪数组
    $('#file').on('change', function (e) {
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择照片!')
        }

        // 更换裁剪的图片
        // 1.拿到用户选择的文件
        var file = e.target.files[0]
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 3.先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    //为确定按钮绑定事件
    $('#btnUpLoad').on('click', function (e) {
        e.preventDefault()
        // 1.拿到用户裁剪后的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //调用接口，把图片上传到服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败!')
                }
                layer.msg('更换头像成功!')
                // 调用父页面方法重新渲染头像
                window.parent.getUserInfo()
            }
        })
    })
})
