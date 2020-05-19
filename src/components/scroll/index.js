import React, { forwardRef, useState,useEffect, useRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"
// 封装好的scroll插件
import BScroll from "better-scroll"
import { ScrollContainer } from './style'

// 用 forwardRef 包裹改变函数式组件不能被上层组件调用ref的情况
const Scroll = forwardRef ((props, ref) => {
  // 实例化 scroll 插件
  const [bScroll, setBScroll] = useState ();
  // 用来获取scroll的dom元素
  const scrollContainerRef = useRef ();

  const { direction, click, refresh,  bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;

  useEffect (() => {
    // 创建scroll实例
    const scroll = new BScroll (scrollContainerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    // 设置实例
    setBScroll (scroll);
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
        pullUp ();
      }
    });
    return () => {
      bScroll.off ('scrollEnd');
    }
  }, [pullUp, bScroll]);
  // 判断是否被拉到底部，调用下拉刷新函数
  useEffect (() => {
    if (!bScroll || !pullDown) return;
    bScroll.on ('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown ();
      }
    });
    return () => {
      bScroll.off ('touchEnd');
    }
  }, [pullDown, bScroll]);

  // 每次重新渲染都要刷新实例，防止无法滑动
  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ();
    }
  });

  useImperativeHandle (ref, () => ({
    refresh () {
      if (bScroll) {
        bScroll.refresh ();
        bScroll.scrollTo (0, 0);
      }
    },
    getBScroll () {
      if (bScroll) {
        return bScroll;
      }
    }
  }));


  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
    </ScrollContainer>
  );
})

Scroll.defaultProps = {
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

Scroll.propTypes = {
  direction: PropTypes.oneOf (['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
};

export default Scroll;