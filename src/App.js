import React from 'react';
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';
//renderRoutes 读取路由配置转化为 Route 标签
import { renderRoutes } from 'react-router-config';
// 路由配置文件
import routes from './routes/index.js';
import { HashRouter } from 'react-router-dom';
// 这是根组件
function App() {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {renderRoutes (routes)}
      <i className="iconfont">&#xe62b;</i>
      <div>success</div>
    </HashRouter>
  );
}

export default App;