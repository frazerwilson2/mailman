import app from './vueApp';

const ui = function(){

const funcs = {
  currentLevel: 0,
  move: function (num){
    if(!num){num = 1}
    for (var i = 0; i < num; i++) {
      app.PushCommand('app.move()');
    };
  },
  turn: function (cw){
    if(!cw){return;}
    var turn = cw === "R";
    app.PushCommand('app.turn(' + turn +')');
  },
  deliverLetter: function (){
    app.PushCommand('app.DeliverLetter()');
    // app.Knock();
  },
  editor: CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    styleActiveLine: true,
    matchBrackets: true,
    theme: "hopscotch"
  })
}

// function repeat(fn, times) {
//   var loop = function (times) {
//     if (times) {
//       	fn();
//   		loop(--times);
//     }
//   }
//   loop(times);
// }


  // var input = document.getElementById("select");
  // function selectTheme() {
  //   var theme = input.options[input.selectedIndex].textContent;
  //   console.log(theme);
  //   editor.setOption("theme", theme);
  //   location.hash = "#" + theme;
  // }
  // var choice = (location.hash && location.hash.slice(1)) ||
  //              (document.location.search &&
  //               decodeURIComponent(document.location.search.slice(1)));
  // if (choice) {
  //   input.value = choice;
  //   editor.setOption("theme", choice);
  // }
  // CodeMirror.on(window, "hashchange", function() {
  //   var theme = location.hash.slice(1);
  //   if (theme) { input.value = theme; selectTheme(); }
  // });


//     document.querySelector('#runPreCode').addEventListener('click', function(){
//     	console.log(editor2.getValue());
// eval(editor2.getValue());
// // var inaFunc = false;
// // editor.eachLine(function(x){
// // 	if(x.text.includes(';'))
// // });
//     });

  return funcs;

}

export default ui();