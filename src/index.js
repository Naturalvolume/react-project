import React from 'react'
// react-dom是react专门用来操作dom的
import ReactDOM from 'react-dom'
import App from './App'
// 把主组件挂载到页面根目录上,注意此时App已经是dom元素了，要用元素的形式写它
// react会自动创建一个root元素用来挂载根组件
ReactDOM.render(<App/>, document.getElementById('root'))