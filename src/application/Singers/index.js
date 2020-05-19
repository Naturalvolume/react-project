import React, {useState} from 'react';
import Horizon from '../../baseUI/horizon-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import { Content } from './style';

function Singers() {
  // 要实现点击更改元素的样式，要获得元素的key值
  let [category, setCategory] = useState ('');
  let [alpha, setAlpha] = useState ('');

  let handleUpdateAlpha = (val) => {
    setAlpha (val);
  }

  let handleUpdateCategory = (val) => {
    setCategory (val);
  }

  return(
    <Content>
      {/* 注意啦！滑动框能滑动的原理是里面的内容宽度超过外面了的父元素宽度，所以一定要给滑动框加父元素 */}
      {/* 现在还是不能滑动，因为滑动内容的宽度没有确定，需要操作dom元素获得horizon组件的宽度，这一点在组件中实现了 */}

      {/* 要点击改变对应元素的边框 */}
      <Horizon list={categoryTypes} title={"分类 (默认热门):"} handleClick={handleUpdateCategory} curVal={category}></Horizon>
      <Horizon list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} curVal={alpha}></Horizon>
    </Content>
  ) 
}
export default Singers