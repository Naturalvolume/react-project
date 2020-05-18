// 这里封装不同的网络请求
import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  // 地址是去掉基础地址之后的
  return axiosInstance.get ('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}