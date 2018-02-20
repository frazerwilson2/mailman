import Vue from 'vue/dist/vue';
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
      moving: false
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
    RunCommand: []
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
        console.log('delivering!!');
        this.Homes[1].delivered = true;
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
    PushCommand: function(cmd){
      this.RunCommand.push(cmd)
    },
    InitCommands: function(){
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
      if(this.Homes[1].delivered === true){
        this.ShowSuccess();
      }
      else {
        this.ShowFail();
      }
    },
    ShowSuccess: function(){
      console.log('success');
      this.success = true;
    },
    ShowFail: function(){
      console.log('fail');
      this.fail = true;
    }
  }
});

export default app;