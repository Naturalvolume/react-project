import React from 'react'
import Home from './application/Home'
// 路由
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
import routes from './routes/index.js';
import { HashRouter } from 'react-router-dom';
// 一定要注意export default 和export的区别
import { GlobalStyle } from './style'
// 在这里写页面
// 注意函数组件是没有this的
function App() { 
    // 要用括号包裹，这样才能换行
    return (
        
        <HashRouter>
            {/* 引入全局样式组件 */}
            <GlobalStyle></GlobalStyle>
            { renderRoutes(routes) }
        </HashRouter>
    );
    
}
// 暴露出主组件
export default App