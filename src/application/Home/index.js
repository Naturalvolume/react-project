import React from 'react'
import {Top, Tab } from './style'
import { renderRoutes } from "react-router-config";
import { NavLink } from 'react-router-dom';// 利用 NavLink 组件进行路由跳转
import Player from '../Player';// 在这里写顶部栏公共组件
// 注意了组件都要大写
// 注意这里要用 props
// 在routes/index.js 中定义路由的时候
function Home(props) {
  // 路由就是props中的一个固定属性
  const { route } = props;
  
  return (
    <div>
      <Top>
        <span className='iconfont menu'>&#xe64f;</span>
        <span>Kathy Music</span>
        <NavLink to='/find'><span className='iconfont search'>&#xe63c;</span></NavLink>
      </Top>
      <Tab>
        {/* 利用NavLink的activeClassName属性，实现点击动态样式*/}
        {/* 注意了，用NavLink后，该元素就变成了 a 元素，所以别忘了在style.js中设置a标签的样式 */}
        <NavLink to='/search' activeClassName="selected"><span>发现</span></NavLink>
        <NavLink to='/singers' activeClassName="selected"><span>歌手</span></NavLink>
        <NavLink to='/rank' activeClassName="selected"><span>排行榜</span></NavLink>      
      </Tab>
      {/* 这里要显示出来下一级路由，必须再调用一次路由渲染函数 */}
      <Player></Player>
      { renderRoutes (route.routes) }
      
    </div>
  ) 
}

export default React.memo (Home);