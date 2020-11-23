import {default as ResultComponent} from '../src/components/result'
import Store from '../src/js/store'
import Router from "../src/js/router";

jest.mock('../src/js/router');

describe("Result 컴포넌트", () => {
    beforeEach(()=>{
        Store.grade = 3;
        Store.average = 1.1;
        const result = new ResultComponent();
        document.body.appendChild(result.getTemplate());
        result.mounted();
    });

    it("Result 화면의 template을 가져온다", () => {
        const titleDom = document.getElementsByClassName('title')[0];
        const gradeDom = document.getElementsByClassName('grade')[0];
        const averageDom = document.getElementsByClassName('average')[0];
        expect(document.getElementsByClassName('result').length).toEqual(1);
        expect(titleDom.textContent).toEqual('Mission Complete!');
        expect(Number(gradeDom.textContent)).toEqual(Store.grade);
        expect(Number(averageDom.textContent)).toEqual(Store.average);
    });

    it("점수가 0점이면 Failed 메세지를 보여준다", () => {
        Store.reset();
        const result = new ResultComponent();
        document.body.innerHTML = '';
        document.body.appendChild(result.getTemplate());
        const titleDom = document.getElementsByClassName('title')[0];
        expect(titleDom.textContent).toEqual('Mission Failed!');

    });

    it("다시시작 버튼 클릭시 home 화면 으로 되돌아간다", () => {
        const spyFn = jest.spyOn(Router, 'navigateTo');
        document.getElementsByClassName('reStartBtn')[0].click();
        expect(spyFn).toBeCalled();
        expect(spyFn).toHaveBeenCalledWith('/');
    });

});

