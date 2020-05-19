import * as actionTypes from './constants';
// 将 JS 对象转换成 immutable 对象
import { fromJS } from 'immutable';
// axios请求
import { getBannerRequest, getRecommendListRequest } from '../../../api/request';

// 把收到改变的数据转换成 immutable 数据类型
export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS (data)
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS (data)
});

// 要改变数据时发出 request 请求
export const getBannerList = () => {
  // step3: 发送request请求
  // 分发动作改变的指令
  return (dispatch) => {
    getBannerRequest().then (data => {
      // 把改变成 immutable 的数据发送给 store,再由store发送给 reducer，设置成新状态
      // step4: 把改变后的状态发送给reducer函数处理
      dispatch (changeBannerList (data.banners));
    }).catch (() => {
      console.log ("轮播图数据传输错误");
    }) 
  }
};

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest ().then (data => {
      dispatch (changeRecommendList (data.result));
    }).catch (() => {
      console.log ("推荐歌单数据传输错误");
    });
  }
};
