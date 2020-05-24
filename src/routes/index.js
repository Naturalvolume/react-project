// 路由step1:导入react router相关插件，Redirect 表示直接渲染子路由（自己理解）
import React from 'react';
import { Redirect } from "react-router-dom";
// 路由step2:导入要添加路由的组件
import Home from '../application/Home';
import Mine from '../application/Mine';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Search from '../application/Search';
import Album from '../application/Album'
import Singer from '../application/Singer'

// 路由step3:配置路由映射表
export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        // 在这个根目录下已经渲染过home组件
        path: "/",
        // 这个exact没搞懂
        exact: true,
        // 在这里相当于重定位到搜索组件，直接渲染搜索组件
        // 后来点击路由切换的时候，相当于又更改了路径，渲染其它组件
        render: () => (
          <Redirect to={"/search"}/>
        )
      },
      {
        path: "/search/",
        component: Search,
        routes:[
          {
            path:'/search/:id',
            component: Album
          }     
        ]
      },
      {
        path: "/singers",
        component: Singers,
        routes: [
          {
            path:"/singers/:id",
            component: Singer
          }
        ]
      },
      {
        path: "/rank",
        component: Rank,
        routes:[
          {
            path:'/rank/:id',
            component: Album
          }     
        ]
      },
      {
        path: "/mine",
        component: Mine
      }
    ]
  }
]