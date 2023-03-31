import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay,Navigation } from "swiper";
import './img.less'
import plot from "../../assets/地块图.jpg";
import { getImg } from '@/api/index'
import { useState, useEffect, useRef } from 'react';
// 现场生产施工图页
export default function Img() {
  interface Img {
    overview: any[],
    progressBig: any[],
    progressSmall: any[],
    detail: any[],
    manufacture: any[]
  }

  const [img ,setImag] = useState<any>([])
  useEffect(() => {
    getImg({ projectId: 67 }).then((res: any) => {
      setImag(res.data.result)

    })
  }, [])
  console.log(img);

  return (
    <div className='container'>
      <div className='left'>
        <div style={{ width:'100%',height: '468px' }}>
          <div className='bigTitle'>
            <div className='name'>宁波市鄞州区瞻岐镇保障房项目</div>
            <div className='subtitle' style={{ border: 'none' }}>鄞州区瞻岐07号地块项目Ⅱ标段</div>
          </div>
          <div className='PlotOfLand'>
            <img style={{ width:'100%',height: '100%' }} src={plot} alt="" />
          </div>
        </div>
        <div className='imgBox'>
          <div className='Aerial'>航拍图 Overview</div>
          <div>
            <div style={{ height: '100%' }}>
              <Swiper
                // slidesPerView={3}
                // spaceBetween={20}
                loop={true}
                modules={[Autoplay, Navigation]}
                navigation={true}
                autoplay={{
                  delay: 5000, // 自动切换的时间间隔，单位为毫秒
                  disableOnInteraction: true // 用户操作之后是否停止自动切换，默认为 true
                }}
              // className="mySwiper"
              >
                {
                  img.overview?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <div style={{width:'100%',height:'100%'}}>
                          <img style={{width:'100%',height:'100%'}} src={item} alt="" />
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>

          </div>
        </div>
      </div>
      <div className='right'>
        <div className='imgBox'>
          <div className='titleBox'><div className='text'>进度图 Progress</div></div>
          {/* <div className='picture1'>
            <div style={{ height: '346px' }}>
              <Swiper
                slidesPerView={3}
                spaceBetween={20}
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false
                }}
              >
                {
                  img.progressBig?.map((item: any, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className='img' >
                          <img src={item.imagePath} alt="" />
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>

          </div> */}
          <div className='picture2'>
            <div style={{ width: '638px', height: '384px' }}>
              {/* <div style={{ width: '624px', height: '100%' }}> */}
              <Swiper
                loop={true}
                modules={[Autoplay, Navigation]}
                navigation={true}
                autoplay={{
                  delay: 5000, // 自动切换的时间间隔，单位为毫秒
                  disableOnInteraction: true // 用户操作之后是否停止自动切换，默认为 true
                }}
                className="mySwiper"
              >
                {img.progressBig?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className='img2' >
                      <img src={item} alt="" />
                    </div>
                  </SwiperSlide>

                ))}
              </Swiper>
            </div>
            <div style={{ width: '308px', height: '384px', marginLeft: '16px' }}>
              {/* <div style={{ width: '300px', height: '100%', marginLeft: '20px' }}> */}
              <Swiper
                loop={true}
                modules={[Autoplay, Navigation]}
                navigation={true}
                autoplay={{
                  delay: 5000, // 自动切换的时间间隔，单位为毫秒
                  disableOnInteraction: true // 用户操作之后是否停止自动切换，默认为 true
                }}
                className="mySwiper"
              >
                {img.progressSmall?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className='img' >
                      <img src={item} alt="" />
                    </div>
                  </SwiperSlide>

                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className='imgBox'>
          <div className='titleBox'><div className='text'>细节图 Detail</div></div>
          <div className='picture2'>
            <div style={{ width: '638px', height: '384px' }}>
              {/* <div style={{ width: '624px', height: '100%' }}> */}
              <Swiper
                loop={true}
                modules={[Autoplay, Navigation]}
                navigation={true}
                autoplay={{
                  delay: 5000, // 自动切换的时间间隔，单位为毫秒
                  disableOnInteraction: true // 用户操作之后是否停止自动切换，默认为 true
                }}
                className="mySwiper"
              >
                {img.detailBig?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className='img2' >
                      <img src={item} alt="" />
                    </div>
                  </SwiperSlide>

                ))}
              </Swiper>
            </div>
            <div style={{ width: '308px', height: '384px', marginLeft: '16px' }}>
              {/* <div style={{ width: '300px', height: '100%', marginLeft: '20px' }}> */}
              <Swiper
                loop={true}
                modules={[Autoplay, Navigation]}
                navigation={true}
                autoplay={{
                  delay: 5000, // 自动切换的时间间隔，单位为毫秒
                  disableOnInteraction: true // 用户操作之后是否停止自动切换，默认为 true
                }}
                className="mySwiper"
              >
                {img.detailSmall?.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className='img' >
                      <img src={item} alt="" />
                    </div>
                  </SwiperSlide>

                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}