import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
// 注册recommend下的reducer
export default combineReducers ({
    // recommend
    recommend: recommendReducer,
});