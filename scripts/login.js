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

		this.$username.on('blur', function() {
			var _username = that.$username.val().trim();

			that.usernameExist = that._checkNotEmpty(_username);
			that.usernameLegal = that._checkLegal(_username);

			// that._checkBtn();
		});

		this.$password.on('blur', function() {
			var _password = that.$password.val().trim();

			that.passwordExist = that._checkNotEmpty(_password);
			that.passwordLegal = that._checkLegal(_password);

			// that._checkBtn();
		});

		this.$checkbox.on('click', function(){
			that.isChecked = that.$checkbox.is(':checked');

			that._checkBtn();
		});
	},


	// 检查用户输入字符的安全性，防止 XSS
	_checkLegal: function(input) {

		var patern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;

		var _result = patern.test(input);

		// return !_result;

		if (_result){
			console.log("danger!");
			return false;
		}else{
			return true;
		}
	},

	// 非空校验
	_checkNotEmpty: function(input) {
		
		if (input === '') {
			
			console.log('empty!');
			
			return false;

		} else {
			
			return true;
		
		}
	},

	// 按钮可用？
	_checkBtn: function(){

		var that = this;

		if (that.usernameExist && that.usernameLegal && that.passwordExist && that.passwordLegal && that.isChecked){
			that.$btn.attr('disabled', false);
		}else{
			that.$btn.attr('disabled', true);
		}
	}

};