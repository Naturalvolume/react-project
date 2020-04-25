// 封装不同的网络请求
import { axiosInstance } from "./config";
// 需要的两个接口
export const getBannerRequest = () => {
  return axiosInstance.get ('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}