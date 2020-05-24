import * as actionTypes from './constants'
import {fromJS} from 'immutable'
// 注意，这里设置初始状态的时候要转换数据类型
const defaultState = fromJS({
  artist: {},
  enterLoading: false
}
)
export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SINGER_INFO:
      // 不要忘记 return
      return state.set('artist', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    // 所以在第一次 dispatch 时，因为没有对应的action，所以状态还是保持不变
    default:
      return state
  }
}