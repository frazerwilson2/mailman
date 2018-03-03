import * as firebase from "firebase";
import ui from './ui';

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
		    console.log('user - ' + uid);

			showLoginButton(true);
		    userFuncs.getUserData(uid);

		    // ...
		  } else {
		  	console.log('logged out');
		  	showLoginButton(false);
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
  	return firebase.database().ref('users/' + uid).once('value').then(function(snapshot) {
  		var userData = snapshot.val();
  		console.log(userData);
  		    if(!userData){
  		    	console.log('setting data');
  				firebase.database().ref('users/' + uid).set({
  					username: 'none',
  					email: 'none',
  					level : 1,
  					code: `\/\/ Add some code...`
  				});
  				currLevel = 1;
  		    }
  		document.getElementById('code').innerHTML = userData.code;
  		ui.editor.setOption("value", userData.code);
	    currLevel = userData.level;
	    setUserLevel();
  	  // ...
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
  UpLevel: function(){
	console.log('triggered');
	currLevel++;
	var updates = {level: currLevel};
	firebase.database().ref('users/' + uid).update(updates);
	setUserLevel();
  },
  SaveCodeEntry: function(){
  	let currentCode = ui.editor.getValue();
    var updates = {code: currentCode};
    firebase.database().ref('users/' + uid).update(updates);
  }
};

function showLoginButton(loggedin){
	var btns = document.querySelectorAll('.header button')
	btns.forEach(x => x.style.display = 'none');
	var showBtn = loggedin ? 'signOut' : 'signIn';
	document.getElementById(showBtn).style.display = 'block';
}

function setUserLevel(){
	document.getElementById('currentLevel').innerHTML = currLevel;
	ui.currentLevel = currLevel;
}

export default userFuncs;