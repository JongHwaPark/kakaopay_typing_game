import {default as homeComponent} from '../src/components/home'

beforeEach(()=>{
    fetch.resetMocks();
});

describe("Home 컴포넌트", () => {
    const home = new homeComponent();
    it("home 화면의 template을 가져온다", async () => {
        document.body.appendChild(home.getTemplate());
        expect(document.getElementsByClassName('home').length).toEqual(1);
    });
    
    it("시작 버튼 클릭시 api 요청한다", async () => {
        window.alert = jest.fn();
        home.mounted();
        const btnDom = document.getElementsByClassName('startBtn');
        btnDom[0].click();
        window.alert.mockClear();

        expect(fetch).toHaveBeenCalledWith('/kakaopay-fe/resources/words');
        expect(fetch).toHaveBeenCalledTimes(1);

    });
});

