// 对数据的处理
import {getRankListRequest} from '../../api/request'
import fromJs from 'immutable'

//constants
export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST';
export const CHANGE_LOADING = 'home/rank/CHANGE_LOADING';

// actionCreator，用括号包裹相当于 return ({object})
const changeRankList = (data) => ({
  type: CHANGE_RANK_LIST,
  data: fromJs(data)
})

export const getRankList = () => {
  // 这里是dispatch action的意思，所以返回的函数参数就是dispatch
  return (dispatch) => {
    getRankListRequest().then(data => {
      let list = data && data.list
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}

const changeLoading = (data) => ({
  type: CHANGE_LOADING,
  data
})

//reducer
const defaultState = fromJs ({
  rankList: [],
  loading: true
})

// reducer
export const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case CHANGE_RANK_LIST:
      return state.set ('rankList', action.data)
    case CHANGE_LOADING:
      return state.set ('loading', action.data);
    default:
      return state;
  }
}