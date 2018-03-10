import Vue from 'vue/dist/vue';
import userFuncs from './users';

const account = new Vue({
	el: '#accModal',
	data: {
		showModal: true,
		loggedOut: true,
		SignUpForm: false,
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
		}
	}
});

export default account;