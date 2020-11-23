# Before Start
   
### `yarn intall` : 시작전 프로젝트 root에서 실행해 주세요!

# Command
### `npm run start` : web server 실행
### `npm run test`  : jest 단위 테스트 실행
### `npm run build`  : build 명령



# Typing Game 해결 전략
   
   1. webpack 환경설정
   
   2. 구현
   
   3. 단위테스트

## 1. webpack 환경 설정 

+ ###webpack-dev-server 환경 구성
    + proxy 설정 : 
        + CORS 이슈로 브라우저가 바로 api 서버에 바로 단어 리스트를 요청하지 않고 webpack dev server를 통해 요청하도록 proxy 설정  
    + plugin 설정 : 
        + CleanWebpackPlugin : 빌드전 빌드 폴더를 정리하기위한 plugin 적용
        + HtmlWebpackPlugin : 빌드 파일의 index.html 자동생성을 위한 plugin 적용
        + MiniCssExtractPlugin : css 파일을 추출하기위한 plugin 적용


+ ###hot-loading 적용
    + webpack-dev-server 의 hot module replacement를 활성화 하여 live reloading이 가능함

     
+ ###build script로 /public 폴더에 html, js ,css export
    + index.html : /src/template 에있는 index.html을 template으로 사용
        ```
        new HtmlWebpackPlugin({
          title: 'kakaopay typeing game', 
          template: './src/template/index.html',
          filename: './index.html'
        }),
        ``` 
    + index.bundle.js : webpack output 설정으로 index.bundle.js 추출
        ```
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'public'),
        },
        ```
    + index.css : webpack plugin MiniCssExtractPlugin 을 사용하여 index.css 추출 
        ```
        plugins: [
            new MiniCssExtractPlugin()
        ]
        ```
---

## 2. 구현 ( Vailla js ) 

+ ### Router 구현
    + History API: 
        + history api 의 pushState 와 popstate 이벤트를 활용하여 Router 구현 
          
    + `setRouter` : Router service의 setRouter를 사용하여 path, content 형식의 object array 설정 
        + path : URI 정보, 
        + conntent : page component로 html tamplate, mounted fn, destroy fn이 포함된 module 
        + 초기 페이지의 기본 path 값은 '/' 로 설정되어있다.  
        ``` 
        Router.setRouter([
          {
            path:'/',
            content:new Home(),
            default:true
          },
          {
            path:'/main',
            content:new Main()
          },
          {
            path:'/result',
            content:new Result()
          }
        ]);
        ```
        
    + `navigateTo` : 
        + setRouter 로 설정된 routes의 path에 맞는 content를 화면에 표시
        ```
        // 'main' path로 이동 및 Home component의 template을 load
        Router.navigateTo('/main');
        ```   
        
+ ### Component 구현
    + 화면 구성을 위한 html, javascript를 포함한 module: 
    + 페이지 component들은 아래 Component 구조를 상속받아 구현됨: 
        ``` 
        export class Component {
          //
          getTemplate(){
            const template = document.createElement('div');
            template.innerHTML = '<div class="default"></div>';
            return template;
          }
        
          mounted(){
            console.log('render component');
          }
        
          destroy(){
            console.log('destroy component');
          }
        }
        ```
        
    + `getTemplate` : 
        + Router 의 페이지 이동 함수 내에서 path에 맞는 component의 html을 getTemplate 함수를 통해 받아 화면에 그림

    + `mounted` : 
        + `getTemplate`의 html을 화면에 그린후 실행되는 함수이며 이벤트 등록 및 초기값 설정 로직을 넣는다
          
    + `destroy` : 
        + Router 페이지 이동 전 실행되는 함수
          

+ ### Home Component
    + 초기 화면 component, 시작버튼과 안내문구가 있다
    + 시작버튼 클릭시 '/kakaopay-fe/resources/words' 로 data 요청
        + CORS 문제로 webpack dev server의 proxy를 사용하여 data 요청 
            ``` 
            proxy:{
              "/kakaopay-fe":{
                target:"https://my-json-server.typicode.com",
                secure:false,
                changeOrigin:true
              }
            }
            ```
    + data 요청에 성공하면 Store module에 값 할당 후 게임 진행을 위한 Main으로 이동
    + data 요청의 response staus가 200, 202가 아니라면 다시 진행하도록 alert창 표시    

+ ### Main Component
    + 게임 플레이 화면 component
    + 화면 render 후 component의 mounted에 html dom event 할당, 첫번째 단어부터 게임 시작  
    + setInterval 함수를 사용하여 남은 시간 표시, 페이지 이동 및 다음 단어 시작시 이전 setInterval clear 
    + 마지막 단어 입력 및 실패시 점수 및 평균시간 계산후 store module에 저장 
    + 초기화 버튼 클릭시 Store 값을 초기화 하고, 게임 재시작을 위해 home으로 이동  
    

+ ### Result Component
    + 게임 결과 화면 component
    + Store에 저장된 점수, 평균시간을 표시 
    + 점수가 0점이면 Mission Failed, 0점 이상이면 Mission Complete 표시 
    + 다시 시작 클릭시 게임 재시작을 위해 home 화면으로 route 함수를 사용하여 이동  
    
+ ### Error Component
    + Router의 `navigateTo` 함수로 설정되지 않은 path로 이동시 표시되는 페이지
    
---

## 3. 단위 테스트 ( jest ) 

+ ### 환경 설정
    + babel 설정 : 
        + es6 문법을 사용함에 따라 babel 을 사용하여 jest가 알아들을수 있도록 설정
          
    + Mocking css modules : 
        + css module을 사용할때 className 조회를 위해 proxy 설정 // 안하면 css import 에러남
        
    + jest-fetch-mock : 
        + fetch 사용 test시 fetch 함수를 mocking 하기위해 fetch mocking module 설정    

+ ### 테스트
    + API request : 
        + API 요청 함수 내부의 fetch 함수를 jest.mock을 사용하여 mocking후 테스트
          
    + User interaction test: 
        + 테스트 대상 component의 `getTemplate` 함수로 html을 불러와 body에 append후 자바 스크립트 이벤트 트리거를 사용해 동작 테스트
        + Store 데이터에 맞게 화면에 그려졌는지 Store data값과 화면에 그려진 값 을 비교 테스트
        
