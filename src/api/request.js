// 这里封装不同的网络请求
import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  // 地址是去掉基础地址之后的
  return axiosInstance.get ('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}

// 注意啦！！！！发送带有参数的网络请求，应该用代码符号而不是引号！！！
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}
export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
};

export const getAlbumDetailRequest = (id) => {
  console.log(id)
  return  axiosInstance.get (`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = id => {
  console.log(id)
  return axiosInstance.get (`/artists?id=${id}`);
};