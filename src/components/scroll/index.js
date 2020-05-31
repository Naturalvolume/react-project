// 这个滑动是最难的组件之一！！！用了好多hooks
import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle, useMemo } from "react"
import PropTypes from "prop-types"
// 封装好的scroll插件
import BScroll from "better-scroll"
import { ScrollContainer, PullUpLoading, PullDownLoading } from './style'
// 加入loading组件，创建加载中动画
import Loading from '../../baseUI/loading';
import LoadingV2 from '../../baseUI/loading-v2';
// 防抖函数
import {debounce} from '../../api/utils'

// 用 forwardRef 包裹改变函数式组件不能被上层组件调用ref的情况
const Scroll = forwardRef((props, ref) => {
  // 设置控制滑动实例的状态
  const [bScroll, setBScroll] = useState ();
  // 用来获取scroll的dom元素
  const scrollContainerRef = useRef ();

  const { direction, click, refresh,  bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll, pullUpLoading, pullDownLoading } = props;
  // 是否显示上拉和下拉动画
  const PullUpdisplayStyle = pullUpLoading ? {display: ""} : { display:"none" };
  const PullDowndisplayStyle = pullDownLoading ? { display: ""} : { display:"none" };
  // ?????? 这里真的不太明白，useMemo如何使用
  // 防抖函数，防止频繁上拉下拉刷新
  // useMemo深入优化，只会在依赖项改变时才重新计算，避免每次渲染时都有很高的性能开销
  // ?????? 一直报错，防抖函数错误
  let pullUpDebounce = useMemo (() => {
    console.log(pullUp)
    return debounce(pullUp, 300)
  }, [pullUp]);
  // 千万注意，这里不能省略依赖，
  // 不然拿到的始终是第一次 pullUp 函数的引用，相应的闭包作用域变量都是第一次的，产生闭包陷阱。下同。
  
  let pullDownDebounce = useMemo (() => {
    return debounce (pullDown, 300)
  }, [pullDown]);

  // 第一次渲染滑动组件实例，并设置销毁函数
  useEffect (() => {
    // 创建scroll实例
    // 注意！！第一个参数是包裹scroll的dom元素
    const scroll = new BScroll (scrollContainerRef.current, {
      // BScroll实例中的设置选项，布尔值
      // 根据设置的 direction 判断滑动方向
      scrollX: direction === "horizontal",// 默认返回true
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    // 设置实例存储到状态 bScroll中
    setBScroll (scroll);
    // 注意啦！！这里用到了useEffect()的return方法！！！
    // return 的内容是每次实例销毁时执行的
    // 每次销毁实例都把实例设置为null
    return () => {
      setBScroll (null);
    }
    //eslint-disable-next-line
  }, []);

  // 每次渲染scroll组件都给它绑定scroll事件，销毁scroll组件就解绑
  useEffect (() => {
    if (!bScroll || !onScroll) return;
    bScroll.on ('scroll', (scroll) => {
      onScroll (scroll);
    })
    return () => {
      bScroll.off ('scroll');
    }
  }, [onScroll, bScroll]);

  // 判断是否被拉到顶部，调用上拉刷新函数
  useEffect (() => {
    if (!bScroll || !pullUp) return;
    bScroll.on ('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100){
        pullUpDebounce ();
      }
    });
    // 解绑
    return () => {
      bScroll.off ('scrollEnd');
    }
  }, [pullUpDebounce, bScroll]);
  // 判断是否被拉到底部，调用下拉刷新函数
  useEffect (() => {
    if (!bScroll || !pullDown) return;
    bScroll.on ('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce ();
      }
    });
    return () => {
      bScroll.off ('touchEnd');
    }
  }, [pullDownDebounce, bScroll]);

  // 每次重新渲染都要刷新实例，防止无法滑动
  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ();
    }
  });
  // 规定父组件只能调用以下规定的实例函数
  // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle (ref, () => ({
    // 父组件可以通过这样的形式刷新scroll组件：scrollRef.current.refresh()
    refresh () {
      if (bScroll) {
        bScroll.refresh ();
        bScroll.scrollTo (0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }));


  return (
    <ScrollContainer ref={scrollContainerRef}>
      {/* ？？？猜测这里的意思是  渲染props中创建的这个dom元素下的元素 */}
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={ PullUpdisplayStyle }><Loading></Loading></PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={ PullDowndisplayStyle }><LoadingV2></LoadingV2></PullDownLoading>
    </ScrollContainer>
  );
})
// 默认参数
Scroll.defaultProps = {
  // 默认垂直滑动、支持点击、刷新
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};
// Scorll组件参数规定的类型
Scroll.propTypes = {
  // 滚动方向
  direction: PropTypes.oneOf (['vertical', 'horizontal']),
  click: true,// 是否支持点击
  refresh: PropTypes.bool,// 是否刷新
  onScroll: PropTypes.func,// 滑动触发的回调函数
  pullUp: PropTypes.func,// 上拉加载逻辑
  pullDown: PropTypes.func,// 下拉加载逻辑
  pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向下吸底
};

export default Scroll;