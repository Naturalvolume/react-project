// 因为使用了immutable.js的数据结构，所以用 redux-immutable 中的方法合并不同模块的reducer
import { combineReducers } from 'redux-immutable'
import { reducer as searchReducer } from '../application/Search/store/index'
import { reducer as singersReducer } from '../application/Singers/store';
import { reducer as rankReducer } from '../application/Rank/store';
import { reducer as albumReducer } from '../application/Album/store'

export default combineReducers ({
 // 在这里合并不同组件的 reducer
 search: searchReducer,
 singers: singersReducer,
 rank: rankReducer,
 album: albumReducer
});