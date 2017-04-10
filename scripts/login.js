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
	this.$warning = $('.alert-warning');
	this.$danger = $('.alert-danger');
	this.$btn = $('#btn');

	this.usernameExist = false;
	this.passwordExist = false;

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

		}).on('focus', function(){
			that._cancelChecked();
		});

		// password checking
		this.$password.on('blur', function() {
			var _password = that.$password.val().trim();

			that.passwordExist = that._checkNotEmpty(_password);
			that.passwordLegal = that._checkLegal(_password);

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

		var patern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;

		var _result = patern.test(input);

		// return !_result;

		if (_result){
			this.$danger.show(500).delay(2500).hide(500);
			return false;
		}else{
			return true;
		}
	},

	// not-empty checking
	_checkNotEmpty: function(input) {
		
		if (input === '') {
			this.$warning.show(500).delay(2500).hide(500);	
			return false;

		} else {
			
			return true;
		
		}
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

		if (that.usernameExist && that.usernameLegal && that.passwordExist && that.passwordLegal && that.isChecked){
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
		console.log('login');
	}

};