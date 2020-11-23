import {default as mainComponent} from '../src/components/main'
import Router from '../src/js/router'
import Store from '../src/js/store'

jest.mock('../src/js/router');
jest.useFakeTimers();

describe("Main 컴포넌트", () => {
    beforeEach(()=>{
        fetch.resetMocks();
        Store.index = 0;
        Store.words = [
            {second:50, text:'text1'},
            {second:55, text:'text2'},
            {second:60, text:'text3'}
        ];
        Store.grade = 3;
        const main = new mainComponent();
        document.body.appendChild(main.getTemplate());
        main.mounted();
    });

    it("main 화면의 template을 가져온다", () => {
        expect(document.getElementsByClassName('main').length).toEqual(1);
    });

    it("맞는 단어 입력후 Enter 눌렀을때 결과값이 맞게 그려진다 ",() => {
        const titleDom = document.getElementsByClassName('title')[0];
        const inputDom = document.getElementsByClassName('inputText')[0];
        const gradeDom = document.getElementsByClassName('grade')[0];
        const timeDom = document.getElementsByClassName('time')[0];

        inputDom.value = Store.words[0].text;
        inputDom.dispatchEvent(new KeyboardEvent('keydown',  {'key':'Enter'}));
        expect(Number(gradeDom.textContent)).toEqual(3);
        expect(Number(timeDom.textContent)).toEqual(Store.words[1].second);
        expect(titleDom.textContent).toEqual(Store.words[1].text);
    });

    it("틀린 단어 입력후 Enter 눌렀을때 결과값이 맞게 그려진다 ",() => {
        const titleDom = document.getElementsByClassName('title')[0];
        const inputDom = document.getElementsByClassName('inputText')[0];
        const timeDom = document.getElementsByClassName('time')[0];

        inputDom.value = 'wrong text';
        inputDom.dispatchEvent(new KeyboardEvent('keydown',  {'key':'Enter'}));
        expect(inputDom.value).toEqual("");
        expect(Number(timeDom.textContent)).toEqual(Store.words[0].second);
        expect(titleDom.textContent).toEqual(Store.words[0].text);
    });

    it("시간 초과후 점수가 깎인다",() => {
        const grade = Store.grade;
        const gradeDom = document.getElementsByClassName('grade')[0];

        jest.advanceTimersByTime(Store.words[Store.index].second* 1000);

        expect(Store.grade).toEqual(grade-1);
        expect(Number(gradeDom.textContent)).toEqual(grade-1);

    });

    it("초기화 버튼 클릭시 home 화면 으로 되돌아간다", async () => {
        const spyFn = jest.spyOn(Router, 'navigateTo');
        document.getElementsByClassName('reStartBtn')[0].click();
        expect(spyFn).toBeCalled();
        expect(spyFn).toHaveBeenCalledWith('/');
    });

});

