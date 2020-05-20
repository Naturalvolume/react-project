// reducer 的参数是先前的状态preState和执行的动作action，生成新的状态state
// 导入所有让动作 action类型
import * as actionTypes from './constants'
// 防止浅层对比无法对比出引用数据的变化，所以用 immutable
import {fromJS} from 'immutable'

// 设置默认状态，作为reducer函数的输入，要把默认状态也转换成 immutable 数据类型
const defaultState = fromJS ({
  bannerList: [],
  recommendList: [],
});

// 使用箭头函数(匿名函数)直接把reducer函数暴露出去
export default (state=defaultState, action) => {
  // 这里是返回的 action对象
  // action {
  //   type: actionTypes.CHANGE_BANNER,
  //   data: fromJS (data)
  // }
  switch(action.type) {
    // step5: 把状态更新到 state
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data)
      case actionTypes.CHANGE_RECOMMEND_LIST:
        return state.set ('recommendList', action.data);
      default:
        return state;
  }
}