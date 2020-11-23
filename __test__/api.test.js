import {getList} from '../src/js/api.js'

beforeEach(()=>{
    fetch.resetMocks();
});

describe("API module", () => {
    it("Response Test", async () => {
        fetch.mockResponse(JSON.stringify({
            data:[{second:10, content:'test'}],
            status:200
        }));
        const res = await getList('/kakaopay-fe/resources/words');
        expect(res.data[0].second).toEqual(10);
        expect(res.data[0].content).toEqual('test');
        expect(fetch).toHaveBeenCalledWith('/kakaopay-fe/resources/words');
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});