(function() {
    var _username = localStorage.getItem('_username');
    var _token = localStorage.getItem('_token');

    function switchToLogin(){
        localStorage.removeItem('_username');
        localStorage.removeItem('_token');
        location.href = './login.html';
    }

    if (_username && _token) {
        var checkLogin = {
            username: _username,
            token: _token
        };

        $.ajax({
            url: './php/handle_auto_login.php',
            type: 'POST',
            data: checkLogin,
            async: false,
            timeout: 3000,
            success: function(_response) {
                var response = JSON.parse(_response);
                switch (response.ret) {
                    case '1':
                        console.log('用户身份检测通过');
                        break;
                    case '0':
                        console.warn('localStorage 伪造用户名!');
                        switchToLogin();
                        break;
                    case '-1':
                        console.warn('查询 token 失败!');
                        switchToLogin();
                        break;
                    case '-2':
                        console.warn('localStorage 伪造 token 失败!');
                        switchToLogin();
                        break;
                    default:
                        alert('出了点意外，请联系劉凯里 :)');
                        switchToLogin();

                }
            },
            error: function() {
                console.error('kyrieliu: checking login ajax failed.');
                alert('检测身份出现了一点意外，请联系劉凯里 :)');
                switchToLogin();
            }
        });
    } else {
        switchToLogin();
    }
})();