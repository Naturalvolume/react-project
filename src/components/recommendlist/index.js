import React from 'react'
import { getCount } from "../../api/utils"
import { 
  ListWrapper,
  ListItem,
  List
} from './style';
// 图片懒加载
import LazyLoad from "react-lazyload"
// 这是让子组件也能跳转路由的方法
import { withRouter } from 'react-router-dom';

function RecommendList(props) {
  // 添加跳转函数
  const enterDetail = (id) => {
    // 用的history方法，根据id值跳转到对应的页面
    // history方法很神奇，一push就可以根据哈西值跳转，这一点还要研究
    // 有两种方式可以让组件取到history值，一种是父组件传值，一种是使用withRouter包裹
    
    props.history.push (`/search/${id}`)
    console.log(id)
  }

  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {
          props.recommendList.map ((item) => {
            return (
              <ListItem key={item.id} onClick={() => enterDetail (item.id)}>
                {/* 点击对应的列表框跳转 */}
                <div className="img_wrapper">
                  {/* <div className="decorate"></div> */}
                  {/* 优化性能一：图片懒加载包裹元素，src定义图片未加载时的占位图片 */}
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require ('../../assets/image/music.png')} alt="music"/>}>
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

export default React.memo(withRouter(RecommendList));