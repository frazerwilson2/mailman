import Vue from 'vue/dist/vue';
import {levels, docs} from './levels';

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
    }
  }
});

export default app;