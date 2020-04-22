// 定义slider组件

import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style';
// 引入新安装的插件
import "swiper/css/swiper.css";
import Swiper from "swiper";

function Slider (props) {
    // 数组解构
  const [sliderSwiper, setSliderSwiper] = useState (null);
  // 对象解构
  const { bannerList } = props;

    // 调用函数显示图片
  useEffect (() => {
      // 有图片列表传入
    if (bannerList.length && !sliderSwiper){
        // 定义显示图片列表函数
        let newSliderSwiper = new Swiper(".slider-container", {
            // 循环自动播放
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {el:'.swiper-pagination'},
        });
        // 
        setSliderSwiper(newSliderSwiper);
    }
  }, [bannerList.length, sliderSwiper]);
  
  // 最外面函数的返回值
  return (
    <SliderContainer>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
              /*遍历图片数组的每个值，显示图片*/
            bannerList.map (slider => {
              return (
                <div className="swiper-slide" key={slider.imageUrl}>
                  <div className="slider-nav">
                    <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div> 
      <div className="before"></div>
    </SliderContainer>
  );
}

export default React.memo (Slider);