// 存放initialState和reducer函数
// 声明初始化state
import * as actionTypes from './constants';
// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构
import { fromJS } from 'immutable';

const defaultState = fromJS ({
  bannerList: [],
  recommendList: [],
  enterLoading: true,
});
// 加入处理逻辑，immutable数据结构必须用set方法设置新状态，用get方法取状态
// 这是直接暴露函数，可以不需要函数名，因为在import它的文件中有变量接收
export default (state = defaultState, action) => {
    switch (action.type) {
      case actionTypes.CHANGE_BANNER:
        return state.set ('bannerList', action.data);
      case actionTypes.CHANGE_RECOMMEND_LIST:
        return state.set ('recommendList', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
          return state.set ('enterLoading', action.data);
      default:
        return state;
    }
  }