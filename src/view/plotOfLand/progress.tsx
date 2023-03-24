import './progress.less'
import { useState, useEffect, useRef } from 'react';
import useChart from '../hook/useChart2';
import { getBlockPlan } from '@/api/index'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from "swiper";
import "swiper/css/pagination";
import { Pagination } from "swiper";

export default function Progress() {
  // const [data, setData] = useState<{[key: string]: any}>({})
  const [data, setData] = useState<{ [key: string]: any } | undefined>(undefined);
  const Construction = useRef(null)
  const Manufacture = useRef(null)
  const percentageOfConstruction = useRef(null)
  const percentageOfManufacture = useRef(null)
  const [ConstructionChart, setConstructionOptions] = useChart(Construction, {})   //用于初始化echarts实例并绘制图表
  const [ManufactureChart, setManufactureOptions] = useChart(Manufacture, {})
  const [percentageOfConstructionChart, setPercentageOfConstructionOptions] = useChart(percentageOfConstruction, {})
  const [percentageOfManufactureChart, setPercentageOfManufactureOptions] = useChart(percentageOfManufacture, {})
  useEffect(() => {
    getBlockPlan({ projectId: 67 }).then((res: any) => {
      setData(res.data.result)
    })
  }, [])
  useEffect(() => {
    if (data) {
      setConstructionOptions({
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',],
          axisLine: {
            lineStyle: {
              color: '#C3CBD4'
            }
          },
          axisLabel: {
            fontSize: 20,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            // formatter: '{value}节柱',
            color: '#ffffff',
            fontSize: 20
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#5a6273',
              type: 'dashed'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ffffff'
            }
          },
        },
        tooltip: {
          show: true,
          trigger: 'item',
          // formatter: function (params: any) {
          //   return params.name + ': ' + params.value + '节柱';
          // }
        },
        grid: {
          left: '0',
          right: '0',
          top: '10px',
          bottom: '0',
          containLabel: true
        },
        series: [
          {
            name: '实际进度',
            type: 'bar',
            barWidth: '20%',
            data: data.installBeamColumnMonth.map((item: any) => item.realNumber),
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#12FEE0' },
                  { offset: 1, color: '#026DB2' }
                ]
              },
            },
          },
          {
            name: '计划进度',
            type: 'bar',
            barWidth: '20%',
            // data:null,
            data: data.installBeamColumnMonth.map((item: any) => item.planNumber),
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#FFE875' },
                  { offset: 1, color: '#FF7948' }
                ]
              },
            },
          }
        ]
      })
      setManufactureOptions({
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',],
          axisLine: {
            lineStyle: {
              color: '#C3CBD4'
            }
          },
          axisLabel: {
            fontSize: 20,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            // formatter: '{value}节柱',
            color: '#ffffff',
            fontSize: 20
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#5a6273',
              type: 'dashed'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ffffff'
            }
          },
        },
        tooltip: {
          show: true,
          trigger: 'item',
          // formatter: function (params: any) {
          //   return params.name + ': ' + params.value + '节柱';
          // }
        },
        grid: {
          left: '0',
          right: '0',
          top: '10px',
          bottom: '0',
          containLabel: true
        },
        series: [
          {
            name: '实际进度',
            type: 'bar',
            barWidth: '20%',
            // data:null,
            data: data.makeBeamColumnMonth.map((item: any) => item.realNumber),
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#12FEE0' },
                  { offset: 1, color: '#026DB2' }
                ]
              },
            },
          },
          {
            name: '计划进度',
            type: 'bar',
            barWidth: '20%',
            // data:null,
            data: data.makeBeamColumnMonth.map((item: any) => item.planNumber),
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#FFE875' },
                  { offset: 1, color: '#FF7948' }
                ]
              },
            },
          }
        ]
      })
      setPercentageOfConstructionOptions({
        series: [
          {
            type: 'pie',
            radius: ['75%', '100%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: '{c}%',
                textStyle: {
                  fontSize: '20',
                  color: '#ffffff'
                }
              },
            },
            data: [
              {
                value: Math.round(data?.sumInstallNumber/data?.sumInstallPlanNumber*100),
                name: '完成率',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#75F0C2'
                      },
                      {
                        offset: 1,
                        color: '#49CCF0'
                      }
                    ],
                    globalCoord: false,
                  },
                  borderRadius: 10
                },
                borderRadius: 200,
              },
              {
                value: 100,
                name: '剩余率',
                label: {
                  show: false
                },
                itemStyle: {
                  color: '#3E4E6C'
                }
              }
            ]
          }
        ]
      })
      setPercentageOfManufactureOptions({
        series: [
          {
            type: 'pie',
            radius: ['75%', '100%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                formatter: '{c}%',
                textStyle: {
                  fontSize: '20',
                  color: '#ffffff'
                }
              },
            },
            data: [
              {
                value: Math.round(data?.sumMakeRealNumber/data?.sumMakePlanNumber*100),
                name: '完成率',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#75F0C2'
                      },
                      {
                        offset: 1,
                        color: '#49CCF0'
                      }
                    ],
                    globalCoord: false
                  },
                  borderRadius: 10
                },
                borderRadius: 200
              },
              {
                value: 100,
                name: '剩余率',
                label: {
                  show: false
                },
                itemStyle: {
                  color: '#3E4E6C'
                }
              }
            ]
          }
        ]
      })
      console.log(Construction);
    }
  }, [data, Construction, Manufacture,percentageOfConstruction]);


  return (
    <div className='main'>
      <div className='top'>
        <div className='titleBox'>
          <div className='text'>施工计划 Construction</div>
          <div className='colorBlock'>
            <div className='F'>
              <div className='purple' style={{backgroundImage: 'linear-gradient(0deg, #FF7948 0%, #FFE875 100%)'}}></div>
              <div className='name'>计划构件</div>
            </div>
            <div className='F'>
              <div className='blue' style={{backgroundImage: 'linear-gradient(0deg, #026DB2 0%, #12FEE0 100%)'}}></div>
              <div className='name'>完成构件</div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='plan' style={{marginLeft:'15px'}}>
            <div className='title'>计划构件</div>
            <div className='quantity' style={{ color: '#00FFDE', marginBottom: '30px' }}>{data?.sumInstallPlanNumber}</div>
            <div className='title'>完成构件</div>
            <div className='quantity' style={{ color: ' #ffd53d' }}>{data?.sumInstallNumber}</div>
            <div className='title'>完成百分比</div>
            <div style={{width:'100px',height:'100px',marginTop:'10px'}} ref={percentageOfConstruction}></div>
          </div>
          <div className='table'>
            <table>
              <thead>
                <tr>
                  <th>日期</th>
                  <th>计划完成</th>
                  <th>实际完成</th>
                </tr>
              </thead>
              <tbody >
                {data?.installBeamColumnMonth?.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td style={{ color: '#a0a3a9', lineHeight: '40px'}}>{item.month}</td>
                      <td>{item.planNumber}</td>
                      <td>{item.realNumber}</td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </table>
          </div>
          <div style={{ width: '1200px', height: '330px' }} ref={Construction}></div>
        </div>

      </div>
      <div className='bottom'>
        <div className='left'>
          <div className='titleBox'>
            <div className='text'>深化计划 BIM</div>
          </div>
          <div className='manufacturingBox'>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th>楼栋号</th>
                    <th>是否完成</th>
                    <th>计划时间</th>
                    <th>完成时间</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.deepenProgressDTOS?.map((item: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{item.buildingNo}</td>
                        {item.isFinish === '未完成' ? <td style={{ color: '#FF5353 ' }}>{item.isFinish}</td> : <td>{item.isFinish}</td>}
                        <td>{item.planTime}</td>
                        <td>{item.finishTime}</td>
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='right'>
          <div className='titleBox'>
            <div className='text'>制造计划 Manufacturing</div>
            <div className='colorBlock'>
              <div className='F'>
                <div className='purple' style={{backgroundImage: 'linear-gradient(0deg, #FF7948 0%, #FFE875 100%)'}}></div>
                <div className='name'>计划构件</div>
              </div>
              <div className='F'>
                <div className='blue' style={{backgroundImage: 'linear-gradient(0deg, #026DB2 0%, #12FEE0 100%)'}}></div>
                <div className='name'>完成构件</div>
              </div>
            </div>
          </div>
          <div className='manufacturingBox'>
            <div className='plan' style={{marginLeft:'15px'}}>
              <div className='title'>计划构件</div>
              <div className='quantity' style={{ color: '#00FFDE', marginBottom: '30px' }}>{data?.sumMakePlanNumber}</div>
              <div className='title'>完成构件</div>
              <div className='quantity' style={{ color: '#ffd53d' }}>{data?.sumMakeRealNumber}</div>
              <div className='title'>完成百分比</div>
              <div style={{width:'100px',height:'100px',marginTop:'10px'}} ref={percentageOfManufacture}></div>
            </div>
            <div style={{ width: '940px', height: '300px' }} ref={Manufacture}></div>
          </div>
        </div>
      </div>
    </div>
  )
}