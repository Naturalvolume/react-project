import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';

// 注册recommend下的reducer
export default combineReducers ({
    // recommend
    recommend: recommendReducer,
    singer: singersReducer,
});