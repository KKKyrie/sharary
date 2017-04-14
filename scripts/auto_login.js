(function() {
    var _username = localStorage.getItem('_username');
    var _token = localStorage.getItem('_token');

    if (_username && _token) {
        var autoLogin = {
            username: _username,
            token: _token
        };

        $.ajax({
            url: './php/handle_auto_login.php',
            type: 'POST',
            data: autoLogin,
            async: true,
            timeout: 3000,
            success: function(_response) {
                var response = JSON.parse(_response);
                switch (response.ret) {
                    case '1':
                        console.log('自动登录成功');
                        break;
                    case '0':
                        console.warn('localStorage 伪造用户名!');
                        break;
                    case '-1':
                        console.warn('查询 token 失败!');
                        break;
                    case '-2':
                        console.warn('localStorage 伪造 token 失败!');
                        break;
                    default:
                        alert('出了点意外，请联系劉凯里 :)');

                }
            },
            error: function() {
                console.error('kyrieliu: Auto login ajax failed.');
                alert('自动登录出了一点意外，请联系劉凯里 :)');
            }
        });
    }
})();