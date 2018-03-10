import * as firebase from "firebase";
import ui from './ui';
import levelsApp from './levelsVue';
import accountApp from './accountVue';

var uid = null;
var currLevel = null;

const userFuncs = {
	Init: function(){
		// Initialize Firebase
		  var config = {
		    apiKey: "AIzaSyD-xKgXVbm6ZzBgF86BUJNf67d3XK2vcLo",
		    authDomain: "mailman-dbe67.firebaseapp.com",
		    databaseURL: "https://mailman-dbe67.firebaseio.com",
		    projectId: "mailman-dbe67",
		    storageBucket: "mailman-dbe67.appspot.com",
		    messagingSenderId: "200990047699"
		  };
		  firebase.initializeApp(config);

		var database = firebase.database();

		  firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    var isAnonymous = user.isAnonymous;
		    uid = user.uid;
		    if(user.email){
		    	document.getElementById('userEmail').innerHTML = user.email;
		    };

			showLoginButton(true);
			showLoginModal(false);
		    userFuncs.getUserData(uid);

		    // ...
		  } else {
		  	console.log('logged out');
		  	showLoginButton(false);
		  	showLoginModal(true);
		    // User is signed out.
		    // ...
		  }
		  // ...
		});
	},
	SignInAnon: function(){
		firebase.auth().signInAnonymously().catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});
	},
	getUserData: function (uid){
		console.log('id- ' + uid);
  	return firebase.database().ref('users/' + uid).once('value').then(function(snapshot) {
  		// console.log(snapshot);
  		var userData = snapshot.val();
  		console.log(userData);
	    if(!userData){
	    	console.log('setting data');
			firebase.database().ref('users/' + uid).set({
				validated: false,
				level : 1,
				code: `\/\/ Add some code...`
			});
			currLevel = 1;
		    toggleLinkAcc(false);
	    }
	    else if(userData){
	    	if(userData.code){
				// document.getElementById('code').innerHTML = userData.code;
				ui.editor.setOption("value", userData.code);
		    }
		    if(userData.level){
			    currLevel = userData.level;
		    }
		    toggleLinkAcc(userData.validated);
	    }
	    accountApp.SetLoggedIn();
		setUserLevel();
  	});
  },
  SignOut: function(){
  	firebase.auth().signOut().then(function() {
  	  // Sign-out successful.
  	  console.log('signed out');
  	}, function(error) {
  	  // An error happened.
  	});
  },
  LinkAccount: function(form){
	var credential = firebase.auth.EmailAuthProvider.credential(form.email, form.password);

	firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
		accountApp.SuccessForm();
		toggleLinkAcc(true);
		console.log("Anonymous account successfully upgraded", user);
		userFuncs.UserValidated();
	}, function(error) {
		accountApp.ShowErrors(error.message);
	  console.log("Error upgrading anonymous account", error);
	});
  },
  Login: function(){
  	let email = "test@testy.com";
  	let password = '123456';
  	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  	  // Handle Errors here.
  	  var errorCode = error.code;
  	  var errorMessage = error.message;
  	  console.log(errorMessage);
  	  // ...
  	});
  },
  UpLevel: function(){
	console.log('triggered');
	currLevel++;
	var updates = {level: currLevel};
	firebase.database().ref('users/' + uid).update(updates);
	setUserLevel();
  },
  UserValidated: function(){
	var updates = {validated: true};
	firebase.database().ref('users/' + uid).update(updates);
  },
  SaveCodeEntry: function(){
  	let currentCode = ui.editor.getValue();
    var updates = {code: currentCode};
    firebase.database().ref('users/' + uid).update(updates);
  }
};

function toggleLinkAcc(toggle){
	console.log('valid acc - ' + toggle);
	document.querySelector('#linkacc').style.display = toggle ? 'none' : 'inline-block';
}

function showLoginButton(loggedin){
	var btns = document.querySelectorAll('.header button.account-btn')
	btns.forEach(x => x.style.display = 'none');
	var showBtn = loggedin ? 'signOut' : 'signIn';
	document.getElementById(showBtn).style.display = 'block';
}

function showLoginModal(show){
	accountApp.SetShowModal(show);
}

function setUserLevel(){
	document.getElementById('currentLevel').innerHTML = currLevel;
	ui.currentLevel = currLevel;
	levelsApp.UpdateLevel(currLevel);
}

export default userFuncs;