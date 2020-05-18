import React from 'react';
import Slider from '../../components/slider'
import Scroll from '../../components/scroll';
import RecommendList from '../../components/recommendlist'
import { Content } from './style'

function Search() {
  //mock 数据
  const bannerList = [1,2,3,4].map (item => {
    return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
  });

  const recommendList = [1,2,3,4,5,6,7,8,9,10].map (item => {
    return {
      id: 1,
      picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
      playCount: 17171122,
      name: "朴树、许巍、李健、郑钧、老狼、赵雷"
    }
  });

  return(
    <div>
      {/* better-scroll 就是在元素高度超过父元素高度时，使用transfrom 动画产生滑动效果
          所以它的外部容器一定是固定高度，不然没法滚动
      */}
      <Content>
        <Scroll className="list">
          {/* 注意啦，这里要给滑动组件 scroll 中的子组件添加一个元素包裹，不然会无法滑动 */}
          <div>
            <Slider bannerList={bannerList}></Slider>
            <RecommendList recommendList={recommendList}></RecommendList>
          </div>
        </Scroll>
      </Content> 
      
    </div>

  ) 
}
export default Search