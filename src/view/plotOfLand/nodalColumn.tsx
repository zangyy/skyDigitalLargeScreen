import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from "swiper";
import './nodalColumn.less'
import React, { useState, useEffect, useRef } from 'react'
import { getBuildingBlock } from '@/api/index'
import { init } from '@/view/useWebGL'
function NodalColumn() {
  const [data, setData] = useState<{ [key: string]: any }>([])
  const webgl = useRef(null);
  // const { data, error, loading }  = useRequest(() => getBuildingBlock({ projectId: 67 }))
  useEffect(() => {
    getBuildingBlock({ projectId: 67 }).then((res: any) => {
      setData(res.data.result)
    })
  }, [])
  useEffect(() => {
    if (data.length !== 0) {
      console.log(data[1]);

      data.forEach((item: any, index: number) => {
        // 模型是空的就不渲染
        if (Object.keys(item.model).length === 0) return false;
        init(window.document.getElementById(`3d${index}`), data[index].model.coord, data[index].model.colour, 'TRIANGLES', [-800, -4400, -9000], [20, 60, 0])
      });
    }
  }, [data])

  return (
    <div>
      <Swiper
        slidesPerView={2}
        // slidesPerGroup={1}
        spaceBetween={24}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000, // 自动切换的时间间隔，单位为毫秒
          disableOnInteraction: false // 用户操作之后是否停止自动切换，默认为 true
        }}
      >
        {data.map((item: any, index: number) => {
          return (
            <SwiperSlide key={item.buildingId}>
              <div className="containers">
                <div className='building'>
                  <div className='top'>
                    <div className='left'>
                      <div className='NO'>{item.buildingNo}<span style={{ fontSize: '35px' }}>#</span></div>
                      <div className='headline'>节柱进度</div>
                      <div className='table'>
                        <table>
                          <thead>
                            <tr>
                              <th>节柱</th>
                              <th>制造完成</th>
                              <th>安装完成</th>
                              <th>预计完成时间</th>
                              <th>施工天数</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.segmentedColumnList ?
                              item.segmentedColumnList.map((it: any, i: number) => {
                                return (
                                  <tr key={i}>
                                    <td style={{ color: '#a0a3a9' }}>{it.sumSegmentedColumnNo}</td>
                                    <td>{it.makeComplete}%</td>
                                    <td>{it.installComplete}%</td>
                                    <td>{it.installCompleteTime}</td>
                                    <td>{it.days}</td>
                                  </tr>
                                )
                              }) : null
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='right'>
                      <div className='legend'>
                        <div className='colorBlock'>
                          <div className='F'>
                            <div className='shallow'></div>
                            <div className='name'>深化完成</div>
                          </div>
                          <div className='F'>
                            <div className='in'></div>
                            <div className='name'>制造完成</div>
                          </div>
                          <div className='F'>
                            <div className='deep'></div>
                            <div className='name'>施工完成</div>
                          </div>
                        </div>
                      </div>
                      <div className='Model'>
                        <canvas id={`3d${index}`} style={{ width: '250px', height: '580px'}} ref={webgl}></canvas>
                      </div>
                    </div>
                  </div>
                  <div className='bottom'>
                    <div className='deepen'>
                      <div className='title'>深化进度</div>
                      {
                        item.deepeningProgress == '已完成'?<div className='flag'>{item.deepeningProgress}</div>:item.deepeningProgress=='未完成'?<div className='flag' style={{color:'#FF5353'}}>{item.deepeningProgress}</div>:<div className='flag' style={{ fontSize: '30px' }}>{item.deepeningProgress}</div>
                      }
                    </div>
                    <div className='manufacture'>
                      <div className='box' style={{ marginRight: '50px' }}>
                        <div className='title'>累计制造</div>
                        <div>
                          <span className='big' style={{ color: '#00FFFF' }}>{item.cumulativeManufacturing}</span>
                          <span className='small'>/{item.sumBeamColumnNumber}</span>
                        </div>
                      </div>
                      <div className='box'>
                        <div className='title'>当前节柱</div>
                        <div>
                          <span className='big' style={{ color: '#00FFFF' }}>{item.makeSegmentedColumn}节</span>
                          <span className='small'>/{item.sumSegmentedColumnNumber}节</span>
                        </div>
                      </div>
                    </div>
                    <div className='construction'>
                      <div className='box' style={{ marginRight: '50px' }}>
                        <div className='title'>累计施工</div>
                        <div>
                          <span className='big' style={{ color: '#00A0FF' }}>{item.cumulativeConstruction}</span>
                          <span className='small'>/{item.sumBeamColumnNumber}</span>
                        </div>
                      </div>
                      <div className='box'>
                        <div className='title'>当前节柱</div>
                        <div>
                          <span className='big' style={{ color: '#00A0FF' }}>{item.installSegmentedColumn}节</span>
                          <span className='small'>/{item.sumSegmentedColumnNumber}节</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>

          )
        })
        }
      </Swiper>

    </div>
  )
}
// export default React.memo(NodalColumn)
export default NodalColumn