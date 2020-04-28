import React from 'react';
// 图片懒加载
import LazyLoad from 'react-lazy-load';
// 保证当滑动的时候让下面的图片依次显示
import { forceCheck } from 'react-lazyload';
import { 
  ListWrapper,
  ListItem,
  List
} from './style';

import { getCount } from '../../api/utils'

function RecommendList (props) {
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {
          props.recommendList.map ((item, index) => {
            return (
              <ListItem key={item.id + index}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                    <Lazyload placeholder={<img width="100%" height="100%" src={require ('./music.png')} alt="music"/>}>
                    {/* 加param参数可以减小请求的图片资源大小 */}
                      <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                    </Lazyload>
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
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
  );
  }
 
export default React.memo (RecommendList);