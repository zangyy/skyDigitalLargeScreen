import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from "swiper";
import './img.less'
import plot from "../../assets/地块图.jpg";
import { getManufactureImg, getInstallImg } from '@/api/index'
import { useState, useEffect, useRef } from 'react';
// 现场生产施工图页
export default function Img() {
  const [ManufactureImg, steManufactureImg] = useState([])
  const [InstallImg, steInstallImgImg] = useState<{ [key: string]: any }>({})
  useEffect(() => {
    getManufactureImg({ projectId: 67 }).then((res: any) => {
      steManufactureImg(res.data.result)
    })
    getInstallImg({ projectId: 67 }).then((res: any) => {
      steInstallImgImg(res.data.result)
    })
  }, [])

  console.log(InstallImg);
  return (
    <div className='container'>
      <div className='left'>
        <div className='name'>宁波市鄞州区瞻岐镇保障房项目</div>
        <div className='subtitle' style={{border: 'none'}}>鄞州区瞻岐07号地块项目Ⅱ标段</div>
        <div className='PlotOfLand'>
          <img style={{height:'814px'}} src={plot} alt="" />
        </div>
      </div>
      <div className='right'>
        <div className='imgBox'>
          {/* <div className='titleBox'><div className='text'>生产制造 Manufacturing</div></div> */}
          <div className='picture1'>
            <Swiper
              slidesPerView={3}
              // dir="rtl"
              // slidesPerGroup={-1}
              spaceBetween={20}
              loop={true}
              modules={[Autoplay]}
              autoplay={{
                delay: 5000, // 自动切换的时间间隔，单位为毫秒
                disableOnInteraction: false // 用户操作之后是否停止自动切换，默认为 true
              }}
              // className="mySwiper"
            >
              {
                ManufactureImg?.map((item: any, index: number) => {
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
        </div>
        <div className='imgBox'>
          {/* <div className='titleBox'><div className='text'>工程施工 Construction</div></div> */}
          <div className='picture2'>
            {/* <div style={{ width: '624px', height: '346px' }}> */}
            <div style={{ width: '624px', height: '100%' }}>
              <Swiper
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000, // 自动切换的时间间隔，单位为毫秒
                  disableOnInteraction: false // 用户操作之后是否停止自动切换，默认为 true
                }}
                className="mySwiper"
              >
                {InstallImg.effectPicture && InstallImg.effectPicture.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className='img2' >
                      <img src={item.imagePath} alt="" />
                    </div>
                  </SwiperSlide>

                ))}
              </Swiper>
            </div>
            {/* <div style={{ width: '300px', height: '346px', marginLeft: '20px' }}> */}
            <div style={{ width: '300px', height: '100%', marginLeft: '20px' }}>
              <Swiper
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 5000, // 自动切换的时间间隔，单位为毫秒
                  disableOnInteraction: false // 用户操作之后是否停止自动切换，默认为 true
                }}
                className="mySwiper"
              >
                {InstallImg.photos && InstallImg.photos.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <div className='img' >
                      <img src={item.imagePath} alt="" />
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