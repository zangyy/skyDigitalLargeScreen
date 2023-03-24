import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay,Pagination } from "swiper";
import { refreshAt } from '@/view/hook/refreshAt'
import { useEffect } from 'react';
import Img from './plotOfLand/img'
import Progress from './plotOfLand/progress'
import NodalColumn from './plotOfLand/nodalColumn'
export default function Test() {
  useEffect(() => {
    refreshAt(24, 0, 0)
  }, [])
  // 轮播按钮
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap' }}>
      <Swiper
        pagination={
          // clickable: true,
          pagination
        }
        loop={true}
        modules={[Autoplay,Pagination]}
        autoplay={{
          delay: 30000, // 自动切换的时间间隔，单位为毫秒
          disableOnInteraction: true // 用户操作之后是否停止自动切换，默认为 true
        }}
        className="mySwiper"
      >
        <SwiperSlide data-path="/img"><Img /></SwiperSlide>
        <SwiperSlide data-path="/progress"><Progress /></SwiperSlide>
        <SwiperSlide data-path="/nodalColumn"><NodalColumn /></SwiperSlide>
      </Swiper>
    </div>
  );
}
