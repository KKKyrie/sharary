/*
	1. 检查 username 的合法性
	2. 检查 password 的合法性
	新增《使用声明》确认用户已读，用来完善 input 只有在 blur 时才可以检查用户的输入
		每次 input 的验证失败，都取消 checkbox 的勾选，保证用户在一次登陆流程中最后点击 checkbox，从而触发两个 input 的 blur 事件
		!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		!!! 在 input 每次 focus 式，将 checkbox 取消勾选 !!!!!
		!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	3. 两者都不能为空
	4. 符合要求之后，开放 enter 按钮
	5. enter 按钮的监听事件为 “登录 / 注册”

*/



$(function() {
	var loginObj = new Login();
	loginObj.init();
});

var Login = function() {
	this.$username = $('#username');
	this.$password = $('#password');
	this.$checkbox = $('#checkbox');
	this.$warning = $('.warning');
	this.$btn = $('#btn');

	this.usernameExist = false;
	this.passwordExist = false;
	this.usernameLimit = false;
	this.passwordLimit = false;

	this.usernameLegal = false;
	this.passwordLegal = false;

	this.isChecked = false;
};

Login.prototype = {

	init: function() {

		var that = this;

		// username checking
		this.$username.on('blur', function() {
			var _username = that.$username.val().trim();

			that.usernameExist = that._checkNotEmpty(_username);
			that.usernameLegal = that._checkLegal(_username);
			that.usernameLimit = that._checkLength(_username);

		}).on('focus', function(){
			that._cancelChecked();
		});

		// password checking
		this.$password.on('blur', function() {
			var _password = that.$password.val().trim();

			that.passwordExist = that._checkNotEmpty(_password);
			that.passwordLegal = that._checkLegal(_password);
			that.passwordLimit = that._checkLength(_password);

		}).on('focus', function(){
			that._cancelChecked();
		});

		// login btn availability checking
		this.$checkbox.on('click', function(){
			that.isChecked = that.$checkbox.is(':checked');

			that._checkBtn();
		});


		this.$btn.on('click', function(){
			that._login();
		});

	},


	// prevent xss
	_checkLegal: function(input) {

		var that = this;

		var patern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;

		var _result = patern.test(input);

		// return !_result;

		if (_result){
			that._checkFail('你的输入含有非法字符！', that);
			return false;
		}else{
			return true;
		}
	},

	// not-empty checking
	_checkNotEmpty: function(input) {

		var that = this;
		
		if (input === '') {
			that._checkFail('你的输入为空！', that);
			return false;

		} else {
			
			return true;
		
		}
	},

	_checkLength: function(input){
		var that = this;

		var length = input.length;

		if (length > 20){
			that._checkFail('长度超过限制，最多输入20位！', that);
			return false;
		}else{
			return true;
		}
	},

	_checkFail: function(errorInfo, _that){
		_that.$warning.text(errorInfo).show('fast').delay(2500).hide('fast');
	},

	
	_cancelChecked: function(){

		var that = this;

		that.isChecked = false;
		that.$checkbox.prop('checked', false);
		that._hideBtn();
	},

	// is btn available?
	_checkBtn: function(){

		var that = this;

		if (that.usernameExist && that.usernameLegal && that.passwordExist && that.passwordLegal && that.usernameLimit && that.passwordLimit && that.isChecked){
			that._showBtn();
		}else{
			that._hideBtn();
		}
	},

	_showBtn: function(){
		this.$btn.css('visibility', 'visible');
	},

	_hideBtn: function(){
		this.$btn.css('visibility', 'hidden');
	},


	// login
	_login: function(){

		var that = this;

		// loading effect
		that.$btn.button('loading');


		var loginData = {
			username: that.$username.val().trim(),
			password: that.$password.val().trim()
		};

		$.ajax({
			url: '../php/handle_login.php',
			type: 'POST',
			data: loginData,
			async: true,
			timeout: 3000,
			success: function(response){
				
				switch(response){
					case '-3':
						that._loginFail('注册失败，再试试？',that);
						break;
					case '-2':
						that._loginFail('密码验证失败，再试试？', that);
						break;
					case '-1':
						that._loginFail('服务器开小差了，再试试？', that);
						break;
					case '0':
						that._loginFail('用户名或密码不正确，请重新输入！', that);
						break;
					case '1':
						that._loginSuccess(that);
						break;
					case '2':
						that._loginSuccess(that);
						break;
					default:
						that._loginFail('出现了一点意外，请联系劉凯里 :)', that);
				}

			},
			error: function(){
				console.log('error');
			}
		});
	},

	// 登录失败
	_loginFail: function(errorInfo, _that){
		/*
			1. 提示失败信息 
		*/
		_that.$btn.button('reset');
		_that.$warning.text(errorInfo).show('fast').delay(2500).hide('fast');
	},

	// 登录成功
	_loginSuccess: function(_that){
		/*
			1. 存 localstorage
			2. 跳转
		*/

		_that.$btn.button('reset');

		var _username = _that.$username.val().trim();
		localStorage.setItem('_username', _username);
		location.href = './';
	}

};