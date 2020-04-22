import React from 'react';
// 渲染路由界面
import { Redirect } from "react-router-dom";
// 引入各个页面
import Home from '../application/Home';
import Recommend from '../application/Home/Recommend';
import Singers from '../application/Home/Singers';
import Rank from '../application/Home/Rank';
// 写路由跳转
export default [
    {
      // 主路由是home，即首页是home
      path: "/",
      component: Home,
      // 各个路径
      routes: [
        {
          path: "/",
          exact: true,
          // home跳转到推荐页面
          render: () => (
            <Redirect to={"/recommend"}/>
          )
        },
        // 写每个path对应的页面
        {
          path: "/recommend",
          component: Recommend
        },
        {
          path: "/singers",
          component: Singers
        },
        {
          path: "/rank",
          component: Rank
        }
      ]
    }
  ]
    
