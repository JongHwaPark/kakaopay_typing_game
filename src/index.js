import Router from './js/router'
import {Home, Main, Result} from './components'

Router.setRouter([
  {
    path:'/',
    content:new Home()
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
