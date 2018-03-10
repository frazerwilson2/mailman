import Vue from 'vue/dist/vue';
import {levels, docs} from './levels';

import userFuncs from './users';
import mmApp from './mailmanVue';
import ui from './ui';

function getDefaultData() {
    return {
        level: null,
        title: '',
        description: '',
        docs: []
    }
}

const app = new Vue({
  el: '#levelsText',
  data: getDefaultData(),
  methods: {
  	UpdateLevel: function(level){
  		this.level = level;
  		let currLevel = levels[level];
  		this.title = currLevel.title;
  		this.description = currLevel.description;
  		this.docs = currLevel.docs;
  		console.log('now lev ' + level);
  	},
  	GetDocsData: function(name){
  		return docs[name];
  	},
    ResetLevels: function(){
      // this.$data = getDefaultData();
      Object.assign(this.$data, getDefaultData());
    },
    RunCode: function(){
      mmApp.ResetCommand();
      userFuncs.SaveCodeEntry();
      ui.resetCodeError();
      try{
        eval(ui.editor.getValue());
      }
      catch(error){
        ui.setCodeError(error);
        // console.log(error);
      }
      mmApp.InitCommands(ui.currentLevel);
    }
  }
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

export default app;