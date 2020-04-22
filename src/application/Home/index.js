import React from 'react';
// 用这个渲染recommend页面，不加的话，就没办法渲染出来了
import { renderRoutes } from "react-router-config";
import { 
  Top,
  Tab, 
  TabItem,
} from './style'
// 利用 NavLink 组件进行路由跳转
import { NavLink } from 'react-router-dom';


function Home (props) {
  // 对props进行一个解构赋值的操作
  const { route } = props;

  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>
      { renderRoutes (route.routes) }
    </div>
  );
}

// 在index.js中导出Home组件，可以在Home文件下直接import出来
// 用 exprot default 暴露出来的组件，在其他地方引用时，不需要加大括号
// 直接 import Home form Home
export default React.memo (Home);