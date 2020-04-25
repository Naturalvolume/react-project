// 存放initialState和reducer函数

// 声明初始化state
import * as actionTypes from './constants';
// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构
import { fromJS } from 'immutable';

const defaultState = fromJS ({
  bannerList: [],
  recommendList: [],
});
// 加入处理逻辑，immutable数据结构必须用set方法设置新状态，用get方法取状态
export default (state = defaultState, action) => {
    switch (action.type) {
      case actionTypes.CHANGE_BANNER:
        return state.set ('bannerList', action.data);
      case actionTypes.CHANGE_RECOMMEND_LIST:
        return state.set ('recommendList', action.data);
      default:
        return state;
    }
  }