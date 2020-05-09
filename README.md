## 一、react的基本使用
[react官方文档](https://react.docschina.org/docs/getting-started.html)
#### 1.项目目录、结构
#### 2.JSX
组件名称的首字母必须大写，因为JSX语法，最后需要通过babel转义成ES5语法，而babel在进行转义JSX语法时，是调用了 React.createElement() 这个方法，这个方法需要接收三个参数：type, config, children。第一个参数声明了这个元素的类型，当创建自定义组件时如果首字母小写， babel会在转义时按照一个字符串进行传递；当首字母大写时，babel在转义时按照一个变量进行传递。问题就在这里，如果传递的是一个字符串，那么在创建虚拟DOM对象时，React会认为这是一个原生的HTML标签，但是这显然不是一个原生的HTML标签，因此去创建一个不存在的标签肯定是会报错的。如果首字母大写，那么就会当成一个变量传递进去，这个时候React会知道这是一个自定义组件，因此他就不会报错了。
#### 3.定义组件
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
#### 3.props传值、父子组件传值
#### 4.es6、es5 和 commonjs 模块化的区别
#### 5.生命周期
## 二、react路由
[react router中文文档](http://react-guide.github.io/react-router-cn/index.html)
[router的基本使用](https://segmentfault.com/a/1190000019790930)
[router的原理](https://www.jianshu.com/p/d991a4a55ae1)
## 三、react hook
## 四、redux
## 五、immutable数据
## 六、style-components
## 七、axios
## 八、性能优化