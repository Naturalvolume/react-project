import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style'
import "swiper/css/swiper.css"
import Swiper from "swiper"

// 轮播图组件
function Slider(props) {
  // 相当于设置新state { sliderSwiper: null }
  const [sliderSwiper, setSliderSwiper] = useState (null)
  const { bannerList } = props
  // 首次渲染结束，调用这个函数设置轮播图的播放速度等参数
   useEffect(() => {
    if (bannerList.length && !sliderSwiper){
      // 实例化 Swiper，让 slider-container 具有轮播图性质
      let newSliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {el:'.swiper-pagination'},
      })
      setSliderSwiper(newSliderSwiper)
    }
  }, [bannerList.length, sliderSwiper])
  return(
    <SliderContainer>
      {/*<div className='mask'></div>*/}
      <div className='slider-container'>
        <div className="swiper-wrapper">
          {/* 渲染轮播图 */}
          {
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
    </SliderContainer>
  )
}

export default Slider