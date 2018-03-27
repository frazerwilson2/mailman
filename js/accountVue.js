import Vue from 'vue/dist/vue';
import userFuncs from './users';

const account = new Vue({
	el: '#accModal',
	data: {
		showModal: true,
		loggedOut: true,
		SignUpForm: false,
		LogInForm: false,
		form: {
			email: '',
			password: ''
		},
		err: null
	},
	methods: {
		SetShowModal: function(show){
			this.showModal = show;
		},
		EvalModal: function(){
			if(!this.loggedOut){
				this.SetShowModal(false);
			}
		},
		SetLoggedIn: function(){
			this.loggedOut = false;
		},
		SignInAnon: function(){
			userFuncs.SignInAnon();
		},
		ShowLinkAcc: function(){
			this.SetShowModal(true);
			this.SignUpForm = true;
		},
		SignUpLinkAcc: function(){
			this.err = null;
			userFuncs.LinkAccount(this.form);
		},
		ShowErrors: function(err){
			this.err = err;
		},
		SuccessForm: function(){
			this.form = {
				email: '',
				password: ''
			};
			this.SetShowModal(false);
		},
		ShowStart: function(){
			this.loggedOut = true;
			this.SignUpForm = false;
			this.LogInForm = false;
		},
		ShowLoginForm: function(){
			this.LogInForm = true;
			this.loggedOut = false;
		},
		LoginAcc: function(){
			this.err = null;
			userFuncs.Login(this.form);
		}
	}
});

export default account;