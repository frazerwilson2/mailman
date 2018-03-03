import '../scss/styles.scss';

import userFuncs from './users';
import app from './vueApp';
import ui from './ui';

  userFuncs.Init();

  document.getElementById('signIn').addEventListener('click', function(){
    userFuncs.SignInAnon();
  });

  document.getElementById('signOut').addEventListener('click', function(){
    userFuncs.SignOut();
  });

  document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector('#runCode').addEventListener('click', function(){
    app.ResetCommand();
    userFuncs.SaveCodeEntry();
    eval(ui.editor.getValue());
    app.InitCommands(ui.currentLevel);
    });
  });

  function move(num){
    ui.move(num);
  }

  function turn(cw){
    ui.turn(cw);
  }

  function deliverLetter(){
    ui.deliverLetter();
  }

// document.getElementById('incrementlevel').addEventListener('click', function(){
//   console.log('do func');
//   // setLevelUp();
//   // app.ResetLevel();
// });

// document.getElementById('resetLevel').addEventListener('click', function(){
//   app.ResetLevel();
//   app.ResetCommand();
// });

// function setLevelUp(){
//   console.log('triggered');
// 	currLevel++;
// 	var updates = {level: currLevel};
//   firebase.database().ref('users/' + uid).update(updates);
//   console.log(firebase.database().ref('users/' + uid));
// }