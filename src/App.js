import React from 'react'

// 路由
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
import routes from './routes/index.js';
import { HashRouter } from 'react-router-dom';
// 使用 redux 的组件要用这个元素包裹
import { Provider } from 'react-redux'
// 导入状态
import store from './store/index'
// 一定要注意export default 和export的区别
import { GlobalStyle } from './style'
// 在这里写页面
// 注意函数组件是没有this的
function App() { 
    // 要用括号包裹，这样才能换行
    return (
      <Provider store={store}>
        <HashRouter>
            {/* 引入全局样式组件 */}
            <GlobalStyle></GlobalStyle>
            {/* 渲染路由配置，在路由配置文件中已经定义好了根路径，先把根路径渲染出来
              但是没有办法渲染下一个路径，还需要在 Home组建中渲染
            */}
            { renderRoutes(routes) }
        </HashRouter>
      </Provider>
    )
    
}
// 暴露出主组件
export default App