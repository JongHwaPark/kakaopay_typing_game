import {Component} from './component';
import Router from '../js/router'
import store from '../js/store';
import "../style/common.css"
import "../style/result.css"

const onClickBtnReStart = () => {
  Router.navigateTo('/');
};

class ResultComponent extends Component{
  getTemplate(){
    const template = document.createElement('div');
    template.innerHTML = `
      <div class="result">
        <h3 class="title">Mission ${store.grade !== 0 ? 'Complete' : 'Failed'}!</h3>
        <h1>당신의 점수는 <span class="grade">${store.grade}</span>점 입니다.</h1>
        <div>
          단어당 평균 답변 시간은 <span class="average">${store.average}</span>초 입니다.
        </div>
        <div>
          <button class="input reStartBtn">다시 시작</button>
        </div>
      </div>
      `;
    return template;
  }

  mounted(){
    document.querySelector('.reStartBtn').addEventListener('click',onClickBtnReStart);
  }

  destroy() {
    store.reset();
  }
}

export default ResultComponent;
