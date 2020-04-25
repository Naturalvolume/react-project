import { combineReducers } from 'redux-immutable';
// 注册recommend下的reducer
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';

export default combineReducers ({
    // recommend
    recommend: recommendReducer,
});