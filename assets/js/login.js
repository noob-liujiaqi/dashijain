//login.js
$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码密须是6到12位，且不能出现空格']
    })

    form.verify({
        //自定义了一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码密须是6到12位，且不能出现空格'],
        repwd: function (value) {
            //通过形参value拿到确认框中的内容
            //还需要拿 到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password').val()
            if (pwd != value) {
                return '两次密码不一致!'
            }
        }
    })

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //1. 阻止默认行为
        e.preventDefault();
        //2. 发起ajax的post请求
        $.post('http://ajax.frontend.itheima.net/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
            if (res.status != 0) {
                console.log(res);
                return layer.msg('res.message');
            }
            layer.msg('注册成功,请登录')
            //模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登录表单提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/login',
            data:$(this).serialize(),//快速收集表单数据
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                //将登录成功得到的token字符串 保存到localStorage中
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})