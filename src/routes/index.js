import React from 'react';
// 路由包裹元素
import { Redirect } from "react-router-dom";
import Home from '../application/Home';
import Mine from '../application/Mine';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Search from '../application/Search';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/search"}/>
        )
      },
      {
        path: "/search",
        component: Search
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      },
      {
        path: "/mine",
        component: Mine
      }
    ]
  }
]