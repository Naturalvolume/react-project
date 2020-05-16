import React from 'react'
import Home from './application/Home'
// 一定要注意export default 和export的区别
import { GlobalStyle } from './style'
// 在这里写页面
// 注意函数组件是没有this的
function App() { 
    const name = 'kathy'
    // 要用括号包裹，这样才能换行
    return (
        
        <div className='App'>
            {/* 引入全局样式组件 */}
            <GlobalStyle></GlobalStyle>
            <Home></Home>
            {name}
        </div>
    );
    
}
// 暴露出主组件
export default App