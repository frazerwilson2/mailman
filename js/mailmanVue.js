import Vue from 'vue/dist/vue';
import {levels} from './levels';
import userFuncs from './users';

const app = new Vue({
  el: '#app',
  data: {
    map: [
      's','r','h','s','s','h','s','s',
      's','r','r','r','r','r','r','r',
      'h','r','s','s','s','s','r','h',
      's','r','s','s','s','s','r','s',
      's','r','s','s','s','s','r','s',
      'h','r','s','s','s','s','r','h',
      'r','r','r','r','r','r','r','s',
      's','s','h','s','s','h','r','s'
    ],
    mailmain: {
      left: 1,
      top: 1,
      direction: 0,
      moving: false,
      delivering: false
    },
    Homes: {
      1: { delivered: false },
      2: { delivered: false },
      3: { delivered: false },
      4: { delivered: false },
      5: { delivered: false },
      6: { delivered: false },
      7: { delivered: false },
      8: { delivered: false }
    },
    HouseSquares: ["21","51","26","12","15","56","62","65"],
    RoadSquares: ["10","11","21","31","41","51","61","71","12","62","13","63","14","64","15","65","06","16","26","36","46","66","67","56"],
    Errors: false,
    RunCommand: [],
    level: 0,
    success: false,
    fail: false
  },
  methods: {
    move: function(){
      this.mailmain.moving = true;
      const pos = this.GetPos();
      let proposedPos = "";
      switch(this.mailmain.direction){
        case 0:
          proposedPos = (this.mailmain.left + 1).toString() + this.mailmain.top.toString();
          if(!this.IsRoadSquare(proposedPos)){return;}
          this.mailmain.left++;
          break;
        case 1:
          proposedPos = this.mailmain.left.toString() + (this.mailmain.top + 1).toString();
          if(!this.IsRoadSquare(proposedPos)){return;}
          this.mailmain.top++;
          break;
        case 2:
          proposedPos = (this.mailmain.left - 1).toString() + this.mailmain.top.toString();
          if(!this.IsRoadSquare(proposedPos)){return;}
          this.mailmain.left--;
          break;
        case 3:
          proposedPos = this.mailmain.left.toString() + (this.mailmain.top - 1).toString();
          if(!this.IsRoadSquare(proposedPos)){return;}
          this.mailmain.top--;
          break;
      }
      setTimeout(function(){
        app.mailmain.moving = false;
      }, 500);
    },
    turn: function(cw){
      cw ? this.mailmain.direction++ : this.mailmain.direction--;
      if(this.mailmain.direction > 3){this.mailmain.direction = 0;}
      if(this.mailmain.direction < 0){this.mailmain.direction = 3;}
    },
    GetPos: function(){
      return this.mailmain.left.toString() + this.mailmain.top.toString();
    },
    NexttoHouse: function(){
      const pos = this.GetPos();
      for(var i=0; i<this.HouseSquares.length;i++){
        if(pos === this.HouseSquares[i]){
          return true;
        }
      }
      return false;
    },
    WhichHouse: function(){
      const pos = this.GetPos();
      switch(pos){
        case '21':
          return 1;
          break;
        case '51':
          return 2;
          break;
        case '62':
          return 3;
          break;
        case '65':
          return 4;
          break;
        case '56':
          return 5;
          break;
        case '26':
          return 6;
          break;
        case '15':
          return 7;
          break;
        case '12':
          return 8;
          break;
        default:
          return null;
      }
    },
    IsRoadSquare: function(pos){
      for(var i=0; i<this.RoadSquares.length;i++){
        if(pos === this.RoadSquares[i]){
          return true;
        }
      }
      return false;
    },
    DeliverLetter: function(){
      if(this.NexttoHouse()){
        let house = this.WhichHouse();
        this.mailmain.delivering = true;
        console.log('delivered to house ' + house);
        this.Homes[house].delivered = true;
        setTimeout(function(){
          app.mailmain.delivering = false;
        }, 500);
      }
      else {
        this.ShowError('Not next to house');
      }
    },
    ShowError: function(msg){
      this.Errors = msg;
    },
    ResetCommand: function(){
      this.RunCommand = [];
    },
    ResetLevel: function(){
      this.success = false;
      this.fail = false;
      this.mailmain = {
        left: 1,
        top: 1,
        direction: 0,
        moving: false,
        delivering: false
      }
    },
    PushCommand: function(cmd){
      this.RunCommand.push(cmd)
    },
    InitCommands: function(level){
      this.level = level;
      let arr = this.RunCommand;
      // console.log(arr);
      // eval(arr.join(""));
      var loop = arr.length;
      var ran = 0;
      var test = setInterval(function(){
       eval(arr[ran]);
       ran++;
       console.log(arr[ran]);
       if(ran === loop || !arr[ran]){
         clearInterval(test);
         app.EvalLevel();
       }
      }, 1000);
    },
    EvalLevel: function(){
      let currLevel = levels[this.level];
      console.log(currLevel);
      // check if letters delivered
      let success = true;
      currLevel.delivered.forEach(function(x){
          console.log('checking expected - ' + x);
          console.log(app.Homes[x]);
          if(!app.Homes[x].delivered){
           success = false; 
          }
      });
      console.log('mission - ' + success);
      if(success){
        this.ShowSuccess();
      }
      else {
        this.ShowFail();
      }
    },
    ShowSuccess: function(){
      this.success = true;
    },
    ShowFail: function(){
      console.log('fail');
      this.fail = true;
    },
    NextLevel: function(){
      console.log('do next level');
      userFuncs.UpLevel();
      this.ResetLevel();
    }
  }
});

export default app;