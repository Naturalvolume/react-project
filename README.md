# 一、react的基本使用
[react官方文档](https://react.docschina.org/docs/getting-started.html)
### 1.项目目录、结构
使用`create-react-app`脚手架直接生成react项目，免去了配置webpack的过程，在`react-scripts`中是`create-react-app`生成项目所有的依赖。

通常情况下，我们创建spa应用时是使用npm安装项目依赖，在通过配置`webpack.config.js`进行配置，搭建好环境后在`src`编写源代码。而`create-react-app`是自动构建，在`package.json`中只有`react-scripts`作为依赖，而在`react-scripts`中已经配置好了项目所有需要的。
### 2.JSX
组件名称的首字母必须大写，因为JSX语法，最后需要通过babel转义成ES5语法，而babel在进行转义JSX语法时，是调用了 React.createElement() 这个方法，这个方法需要接收三个参数：type, config, children。第一个参数声明了这个元素的类型，当创建自定义组件时如果首字母小写， babel会在转义时按照一个字符串进行传递；当首字母大写时，babel在转义时按照一个变量进行传递。问题就在这里，如果传递的是一个字符串，那么在创建虚拟DOM对象时，React会认为这是一个原生的HTML标签，但是这显然不是一个原生的HTML标签，因此去创建一个不存在的标签肯定是会报错的。如果首字母大写，那么就会当成一个变量传递进去，这个时候React会知道这是一个自定义组件，因此他就不会报错了。
### 3.定义组件
[关于函数组件和类组件的对比](https://www.jianshu.com/p/028b0edfa082)
- 无状态函数组件 ``function`
不会被实例化，整体渲染性能高，但组件不能访问this对象，无生命周期方法，只能访问输入的props，无法管理状态
- class组件 
```javascript
class Component extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <h1>component</h1>
        );
    }
}
```
特点：
（1）函数不会自动绑定this，需要手动绑定，否则this不能获取当前组件实例对象
```javascript
// 手动绑定方法
// 1.构造函数中绑定
constructor(props) {
    super(props);
    this.myFun= this.myFun.bind(this);
}
// 2.调用时绑定
<div onClick={this.handleClick.bind(this)}></div> 
// 3.使用箭头函数绑定
<div onClick={(param)=>this.handleClick(param)}></div> 
```
（2）可以使用生命周期函数
（3）能使用状态state
（4）性能低
- 使用hook的有状态函数组件
利用hook与function组件可以使用状态、生命周期、引用等，且性能比函数组件高
### 4.es6、es5 和 commonjs 模块化的区别
- CommonJS规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。
- AMD规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，AMD规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
- CMD规范与AMD规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在Node.js中运行。不过，依赖SPM 打包，模块的加载逻辑偏重
- ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
本项目直接使用es6的模块化，自己的疑问，react
参考：
- [前端模块化详解(完整版)](https://juejin.im/post/5c17ad756fb9a049ff4e0a62#heading-8)
- [阮一峰老师的Module 的加载实现](https://es6.ruanyifeng.com/#docs/module-loader)
### 5.props传值、父子组件传值
props是组件的对外接口，子组件可以使用父组件的props，对于子组件，props是只读属性，不能直接修改props；state是组件的对内接口，组件用来维护管理自身数据。
### 6.虚拟dom
虚拟dom的核心就是`diff`算法，用来比较新dom和老dom的差异，要注意以下几点：
- 生命周期函数`shouldComponentUpdate`比较类组件的`props`或`state`变化时，触发比较，在函数组件中不能使用这个函数，要实现`props`的浅层比较能使用react为函数组件提供的一个`memo`方法，用法很简单，直接将函数传入 memo 中导出即可。
```javascript
function Home () {
    //xxx
} 
export default React.memo (Home);
```
`memo`只是浅层比较数据是否改变，若是使用引用数据类型，将无法对比引用数据类型的改变，比如数组中添加了数据，地址没有变但是内容变了，`memo`无法对比出改变了，因此这里是有问题的，可以使用 `immutable`数据或`immer`数据。
- react为了减少对比次数，要给每个组件添加key值，这个key值不能是数组下标，因为下标容易改变，要在列表中给每个组件定义一个独一无二的key值。
### 7.生命周期／钩子函数
react的生命周期主要分为三个阶段，挂载组件阶段、更新组件阶段、销毁组件阶段，具体使用参见大神博客：[你真的了解 React 生命周期吗](https://juejin.im/post/5df648836fb9a016526eba01)
# 二、react路由
路由是实现单页面应用的基础，原生js可通过超链接标签和监听url地址改变的api实现单页面应用，具体看：[SPA](https://github.com/Naturalvolume/IFE-2016Spring/blob/master/SPA.html)
**1.react的路由实现原理有**
- 原生的锚点（hash）+ window.onhashchange，但不利于seo，因为搜索引用来说任何一个hash不是一个新但url地址，不会收录
- 是H5新增的history API
- ajax也可以实现，但没有历史记录，不能来回跳转
- iframe框架集，但seo不友好、操作不方便
**2.react路由容器**
常用的react路由就前两种，根据这两种，react有对应的两种路由容器
```javascript
// 锚点，常用于开发环境，方便跳转，但不利于seo
import { HashRouter as Router } from 'react-router-dom' 
// history，上线后使用
import { BrowerRouter as Router } from 'react-router-dom'
// 所以一般将这两个容器都命名未Router，方便上线后更改
```
**3.路由映射表**
Route是路线的意思，需要该组件定义好路径和显示组件的对应关系，叫做路由表，定义映射关系
```javascript
import { Route } from 'react-router-dom'
```
**4.页面跳转**
```javascript
// a链接实现声明式跳转
import { Link } from 'react-router-dom'
// NavLin跟Link不同就在于，它可以定义一个高亮显示类activeClassName
import { NavLink } from 'react-router-dom'
```
**参考**
（1）[react router中文文档](http://react-guide.github.io/react-router-cn/index.html)
（2）[router的基本使用](https://segmentfault.com/a/1190000019790930)
（3）[router的原理](https://www.jianshu.com/p/d991a4a55ae1)
# 三、react hook
# 四、redux
redux是一个轻量级的状态管理框架，是一种思想，可以在很多个框架中使用，不只适用于react。它将状态存放在一起，状态根据视图层的动作改变，进而又改变视图。
[2019 React Redux 完全指南](https://github.com/xitu/gold-miner/blob/master/TODO1/redux-tutorial.md)
[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
# 五、immutable数据
# 六、style-components
style-components就是以组件的形式书写样式
- 对设置全局样式提供了`createGlobalStyle`全局样式组件，在react组件的最外层引入即可。
- 引入图片要用import导入，再以变量`${image}`的方式引入
关于现在用js写css的流行框架分析：[CSS-in-JS，向Web组件化再迈一大步](https://www.jianshu.com/p/cefd3ae73255)
# 七、axios
axios是ajax请求框架，直接写ajax有些麻烦，所以使用axios。react可以在`componentDidMount`生命周期函数里请求ajax，因为在`render`里执行，会出现很多问题，比如一直循环渲染；在`componentWillMount`里执行，在使用RN时，又会有冲突。所以强烈建议在`componentDidMount`函数里作ajax请求。
#### 关于axios的博客
- [axios全攻略](https://ykloveyxk.github.io/2017/02/25/axios%E5%85%A8%E6%94%BB%E7%95%A5/#more)
# 八、性能优化
- 图片懒加载，加载所有图片会造成页面空白甚至卡顿，所以可以只加载显示视口内的图片，同时在图片未显示的时候给它一个**默认的精简的**图片占位，可以直接使用成熟的`react-lazyload`库。
- redux数据缓存，页面切换的时候没有必要多次发送ajax请求，所以可以通过判断redux数据是否存在来决定是否要发送请求。
# 九、遇到的问题
1. 跨域资源共享：用两个react项目访问网易云音乐接口，后一个打开的react项目将不能获取数据，出现CORS问题。关于CORS：[HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
2. 堆叠上下文
3. flex布局