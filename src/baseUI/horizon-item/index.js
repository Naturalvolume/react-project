import React, { useState, useRef, useEffect, memo } from 'react'
import Scroll from '../../components/scroll'
// PropTypes 用来规定传入的 props 中每个属性的类型，一旦传入类型不对就会报错
import { PropTypes } from 'prop-types'
import { List, ListItem } from './style'

function Horizon(props) {
  const { list, curVal, title, handleClick} = props
  // 使用useRef hook挂载dom元素，因为函数组件不能
  const Category = useRef (null)
  
  // 加入初始化内容宽度的逻辑
  useEffect (() => {
    let categoryDOM = Category.current;
    // 找到这个标签下的所有 span 元素，计算它们的宽度
    let tagElems = categoryDOM.querySelectorAll ("span");
    let totalWidth = 0;
    Array.from (tagElems).forEach (ele => {
      totalWidth += ele.offsetWidth;
    });
    // 把元素宽度设置成内容的总宽度，这样就可以滑动了
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return(
    // 先用滑动框包裹，设置滑动方向.注意滑动方向要以参数的形式传入
    <Scroll direction={'horizontal'}>
      {/* 这里跟推荐列表的滑动框一样要用div包裹里面的内容，否则会不能滑动 */}
      {/* 把Category挂载到这里，可以获取这个元素的dom元素 */}
      <div ref={Category}>        
        <List>
          <List>i am here</List>
          <span>{title}</span>
          {
            list.map((item) => {
              return (
                <ListItem 
                  key={item.key}
                  // 把点击的当前元素变成被选择的样式，curVal是通过下面的点击事件设置的
                  className={`${curVal === item.key ? 'selected': ''}`} 
                  // 点击后执行的函数是从父元素传过来的，这里 handleClice 函数就是把 item.key 更新到状态中
                  onClick={() => handleClick (item.key)}>
                    {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

// 先考虑接受的参数,设置默认参数
//list 为接受的列表数据
//curVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizon.defaultProps = {
  list: [],
  curVal: '',
  title: '',
  handleClick: null
};
// 设置传入值规定的类型，若不是这个类型会报错
Horizon.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
};
export default memo (Horizon);