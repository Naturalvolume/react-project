import * as actionTypes from './constants'
import {fromJS} from 'immutable'

const defaultState = fromJS({
  currentAlbum: [],
  // 进场动画每个组件都设置
  enterLoading: false
})

export default (state=defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return state.set ('currentAlbum', action.data)
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data)
    // 注意！一定要记得不管是switch语句还是state的原因，都一定要有默认输出default
    default:
      return state
  }
}
