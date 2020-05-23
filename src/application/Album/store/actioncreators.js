import {fromJS} from 'immutable'
import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constants'
import  {getAlbumDetailRequest} from '../../../api/request'

// 注意啦！这里是箭头函数的高级用法，加了括号的函数体返回对象字面量
const changeAlbumList = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS (data)
})

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  // 布尔值不需要进行数据转换
  data
})

// dispatch 不能作为外层函数的参数，这里传入的是在ui界面调用改变状态的事件时传入的参数
export const getAlbumDetailList = (id) => {
  // dispatch应该在这里作为参数，因为这个返回函数才是发送dispatch的地方
  console.log(id)
  return (dispatch) => {
    // 注意啦，这里要传进需要请求的歌单id
    getAlbumDetailRequest(id).then((res) => {
      let data = res.playlist
      dispatch(changeAlbumList(data))
      // 疑问：为什么一直设置进场动画false，默认值也是false
      // 这里是已经收到异步数据，把数据转换成immutable之后再dispatch给store
      // 所以同时把等待动画关闭，说明已经收到了数据，开始渲染数据
      dispatch(changeEnterLoading(false))
    }).catch((err) => {
      console.log(err)
      console.log('歌单详情网络错误')
    })}
}
// 进场动画动作是跟数据请求动作一起被发送的，它们是同时的状态
//  export const getEnterLoading = (dispatch) => {
//    return (
//      dispatch(changeEnterLoading())
//    )
//  }