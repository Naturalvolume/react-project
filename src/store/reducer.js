// 因为使用了immutable.js的数据结构，所以用 redux-immutable 中的方法合并不同模块的reducer
import { combineReducers } from 'redux-immutable';

export default combineReducers ({
// 在这里合并不同组件的 reducer
});