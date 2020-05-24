import {getSingerInfoRequest} from '../../../api/request'
import * as actionTypes from './constants'
import {fromJS} from 'immutable'

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

const changeSingerInfo = (data) => ({
  type: actionTypes.CHANGE_SINGER_INFO,
  data: fromJS (data)
})

// dispatch了两次，一次是在ui界面dispatch下面这个函数，发起异步请求
// 第二次是在这里函数里面，更改state数据
export const getSingerInfo = (id) => {
  return (dispatch) => {
    getSingerInfoRequest(id).then(res => {
      let data = res
      dispatch(changeSingerInfo(data))
      dispatch(changeEnterLoading(false))
    }).catch(() => {
      console.log('歌手详细获取失败')
    })
  }
}