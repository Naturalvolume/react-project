// 使用immutable数据
import { fromJS } from 'immutable';
import * as actionTypes from './constants';

// 转换成immutable数据
const defaultState = fromJS({
  singerList: [],
  enterLoading: true,     //控制进场Loading
  pullUpLoading: false,   //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  pageCount: 0            //这里是当前页数，我们即将实现分页功能
});

// immutable数据用set设置新状态，get取状态
// reducer根据新action更新view
export default (state = defaultState, action) => {
    switch(action.type) {
      case actionTypes.CHANGE_SINGER_LIST:
        return state.set('singerList', action.data);
      case actionTypes.CHANGE_PAGE_COUNT:
        return state.set('pageCount', action.data);
      case actionTypes.CHANGE_ENTER_LOADING:
        return state.set('enterLoading', action.data);
      case actionTypes.CHANGE_PULLUP_LOADING:
        return state.set('pullUpLoading', action.data);
      case actionTypes.CHANGE_PULLDOWN_LOADING:
        return state.set('pullDownLoading', action.data);
      default:
        return state;
    }
  }