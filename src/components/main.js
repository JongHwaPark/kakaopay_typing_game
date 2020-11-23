import Router from '../js/router'
import {Component} from './component';
import store from '../js/store';
import "../style/common.css"
import "../style/main.css"

let clearTime = [];
const timer = {
  timer:'',
  start: function(time){
    store.time = time;
    renderDOM({time:true});
    this.clear();
    this.timer = setInterval(()=>{
      store.time--;
      renderDOM({time:true});
      if(store.time <= 0) {
        this.clear();
        store.grade--;
        store.index++;
        renderDOM({grade:true});
        startGame(store.index);
      }
    },1000);
  },
  clear:function(){
    clearInterval(this.timer);
  }
};

const renderDOM = ({time, grade, title}) => {
  if(time) document.querySelector('.main .time').innerHTML = store.time;
  if(grade) document.querySelector('.main .grade').innerHTML = store.grade;
  if(title) document.querySelector('.main .title').innerHTML = store.title;
};

const startGame = (index) => {
  if(index >= store.words.length){
    store.average = clearTime.length > 0 ? clearTime.reduce((acc, val)=> acc+val) / clearTime.length : 0;
    Router.navigateTo('/result');
  } else {
    store.title = store.words[index].text;
    renderDOM({title: true});
    timer.start(store.words[index].second);
  }
};

const onClickReBtnStart = (e) => {
  store.reset();
  Router.navigateTo('/');
};

const onKeyDownEnter = (e) => {
  if(e.key !== 'Enter') return;
  if (e.target.value === store.title) {
    clearTime.push(store.words[store.index].second - store.time);
    store.index++;
    startGame(store.index);
  }

  e.target.value = null;
};

class mainComponent extends Component{
  getTemplate(){
    const template = document.createElement('div');
    template.innerHTML = `
    <div class="main">
      <ul class="header">
        <li>남은시간 : <span class="time">${store.time}</span>초</li>
        <li>점수 <span class="grade">${store.grade}</span>점</li>
      </ul>
      <h1 class="title">${store.title}</h1>
      <div>
        <input class="input inputText" type="text" placeholder="입력">
      </div>
      <div>
        <button class="input reStartBtn">초기화</button>
      </div>
    </div>
    `;
    return template;
  }

  mounted(){
    document.querySelector('.reStartBtn').addEventListener('click',onClickReBtnStart);
    document.querySelector('.inputText').addEventListener('keydown',onKeyDownEnter);
    document.querySelector('.inputText').focus();
    startGame(store.index);
  }

  destroy(){
    timer.clear();
  }
}

export default  mainComponent;
