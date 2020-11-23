import Router from '../js/router'
import { getList } from '../js/api.js'
import {Component} from './component';
import store from '../js/store';
import "../style/common.css"
import "../style/home.css"

const onClickBtnStart = async (e) => {
  try {
    document.querySelector('.home .startBtn').disabled = true;
    const data = await getList('/kakaopay-fe/resources/words');
    store.index = 0;
    store.words = data;
    store.grade = data.length;
    Router.navigateTo('/main');
  } catch(e){
    window.alert('try again');
    document.querySelector('.home .startBtn').disabled = false;
  }
};

class homeComponent extends Component{
  getTemplate(){
    const template = document.createElement('div');
    template.innerHTML = `
    <div class="home" >
      <h1 class="title">시작 버튼을 눌러주세요</h1>
      <div>
        <button class="input startBtn">시작</button>
      </div>
    </div>
    `;
    return template;
  }

  mounted(){
    document.querySelector('.startBtn').addEventListener('click',onClickBtnStart);
  }
}

export default homeComponent;
