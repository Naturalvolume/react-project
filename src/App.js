import React from 'react';
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';
// 路由
//1.renderRoutes 读取路由配置转化为 Route 标签
import { renderRoutes } from 'react-router-config';
// 2.路由配置文件
import routes from './routes/index.js';
// 3.包裹路由文件的元素
import { HashRouter } from 'react-router-dom';

// redux状态管理库
// 包裹需要状态管理元素的元素
import { Provider } from 'react-redux'
// 引入store，公共元素
import store from './store/index'


// 这是根组件
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes (routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;