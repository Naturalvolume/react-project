import React from 'react'
import { getCount } from "../../api/utils"
import { 
  ListWrapper,
  ListItem,
  List
} from './style';
// 图片懒加载
import LazyLoad from "react-lazyload"

function RecommendList(props) {
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {
          props.recommendList.map ((item, index) => {
            return (
              <ListItem key={item.id + index}>
                <div className="img_wrapper">
                  {/* <div className="decorate"></div> */}
                  {/* 优化性能一：图片懒加载包裹元素，src定义图片未加载时的占位图片 */}
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./music.png')} alt="music"/>}>
                    {/* 加 param 参数可以设置请求图片的分辨率，减小请求的图片资源大小 */}
                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    {/* getCount 函数用来计算播放量的数量级，当数量级过高时，使用 ‘万’ ‘亿’ */}
                    <span className="count">{getCount (item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList)