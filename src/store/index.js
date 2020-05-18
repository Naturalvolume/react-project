import { createStore, compose, applyMiddleware } from 'redux'
// redux 中间件，处理异步
import thunk from 'redux-thunk'
import reducer from './reducer'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 创建store，传入reducer 
const store = createStore (reducer, composeEnhancers (
  // 使用异步
  applyMiddleware (thunk)
));

export default store;