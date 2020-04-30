import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index';

// 注册局部reducer，连接到全局
export default combineReducers ({
    // recommend
    recommend: recommendReducer,
    singer: singersReducer,
    rank: rankReducer
});