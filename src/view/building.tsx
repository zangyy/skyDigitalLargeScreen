import './building.less'
import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import { getBuildingsData } from '@/api/index'
import { init } from '@/view/useWebGL'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import { refreshAt } from '@/view/hook/refreshAt'
export default function Building() {
  const [deepen, setDeepen] = useState('已完成') // 深化进度
  const [data, setData] = useState<{ [key: string]: any } | undefined>(undefined)
  const [index, setIndex] = useState(0)
  // const [ConstructionChart, setConstructionOptions] = useChart(window.document.getElementById(`manufacture${index}`), {})   //用于初始化echarts实例并绘制图表


  const manufacture = useRef(null) // 制造进度标签
  // const [ConstructionChart, setConstructionOptions]=useChart(manufacture, {})   //用于初始化echarts实例并绘制图表

  // const construction = useRef(null) // 施工进度标签
  const manufactureOptions = {
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
            value: 90,
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
              }
            },
            borderRadius: 200
          },
          {
            value: 10, name: '剩余率',
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
  } // 制造进度饼状图配置
  const constructionOptions = {
    series: [
      {
        type: 'pie',
        radius: ['75%', '99%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: '{c}%',
            textStyle: {
              fontSize: '20',
              // fontWeight: 'bold'
              color: '#ffffff'
            }
          },
        },
        data: [
          {
            value: 90,
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
                    color: '#FF5353'
                  },
                  {
                    offset: 1,
                    color: '#FFB378'
                  }
                ],
                globalCoord: false
              }
            },
            borderRadius: [20, 20, 0, 0]
          },
          {
            value: 10, name: '剩余率',
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
  } // 施工进度饼状图配置

  const Manufacturing = useRef(null) // 构件制造标签
  const ManufacturingOptions = {
    grid: {
      left: '10',
      right: '16',
      top: '12',
      bottom: '10',
      containLabel: true
    },
    yAxis: {
      type: 'category',
      data: ['1节柱', '2节柱', '3节柱', '4节柱', '5节柱', '6节柱', '7节柱', '8节柱', '9节柱'],
      axisLabel: {
        show: true,
        color: '#ffffff',
        fontSize: 20
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#5a6273',
          type: 'dashed'
        },
        alignWithLabel: true
      }
    },
    xAxis: {
      axisLabel: {
        show: true,
        color: '#ffffff',
        fontSize: 16,
        formatter: function (value: any) {
          return value + '月';
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      },
      min: 1,
      max: 12,
      type: 'value',
      axisTick: {
        alignWithLabel: true
      },
      splitLine: { show: false },
      interval: 1 // X 轴刻度间隔为 1,
    },
    series: [{
      type: 'line',
      data: [1, 2, 4.5, 2, 3, 4, 5, 6, 7],
      lineStyle: {
        color: '#7B88FF',
      },
      label: {
        show: true,
        position: 'top',
        color: '#ffffff',
        fontSize: 16,
        formatter: '{c}月'
      },
      itemStyle: {
        color: '#D045FF',
      },
      symbolSize: 8
    }, {
      type: 'line',
      data: [2, 3, 4.5, 4, 5, 5, 6, 7, 9],
      lineStyle: {
        color: '#0EDAD5',
      },
      label: {
        show: true,
        position: 'top',
        color: '#ffffff',
        fontSize: 16,
        formatter: '{c}月'
      },
      itemStyle: {
        color: '#D045FF',
      },
      symbolSize: 8
    }]
  } // 构件制造进度配置
  const Construction = useRef(null) // 构件施工标签
  const ConstructionOptions = {
    grid: {
      left: '10',
      right: '16',
      top: '12',
      bottom: '10',
      containLabel: true
    },
    yAxis: {
      type: 'category',
      data: ['1节柱', '2节柱', '3节柱', '4节柱', '5节柱', '6节柱', '7节柱', '8节柱', '9节柱'],
      axisLabel: {
        show: true,
        color: '#ffffff',
        fontSize: 20
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#5a6273',
          type: 'dashed'
        },
        alignWithLabel: true
      }
    },
    xAxis: {
      axisLabel: {
        show: true,
        color: '#ffffff',
        fontSize: 16,
        formatter: function (value: any) {
          return value + '月';
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff'
        }
      },
      min: 1,
      max: 12,
      type: 'value',
      axisTick: {
        alignWithLabel: true
      },
      splitLine: { show: false },
      interval: 1 // X 轴刻度间隔为 1,
    },
    series: [{
      type: 'line',
      data: [1, 2, 4.5, 2, 3, 4, 5, 6, 7],
      lineStyle: {
        color: '#7B88FF',
      },
      label: {
        show: true,
        position: 'top',
        color: '#ffffff',
        fontSize: 16,
        formatter: '{c}月'
      },
      itemStyle: {
        color: '#D045FF',
      },
      symbolSize: 8
    }, {
      type: 'line',
      data: [2, 3, 4.5, 4, 5, 5, 6, 7, 9],
      lineStyle: {
        color: '#0EDAD5',
      },
      label: {
        show: true,
        position: 'top',
        color: '#ffffff',
        fontSize: 16,
        formatter: '{c}月'
      },
      itemStyle: {
        color: '#D045FF',
      },
      symbolSize: 8
    }]
  } // 构件施工进度配置
  const FullRange = useRef(null) // 全程进度标签
  const FullRangeOptions = {
    xAxis: {
      type: 'category',
      data: ['下料', '拼焊', '涂装', '出厂', '进场', '吊装', '校正', '焊接'],
      axisLine: {
        lineStyle: {
          color: '#ffffff'
        }
      },
      axisLabel: {
        fontSize: 20
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#5a6273',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}节柱',
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
      min: 0,
      max: 10,
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: function (params: any) {
        return params.name + ': ' + params.value + '节柱';
      }
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
        type: 'bar',
        barWidth: '20%',
        data: [1, 2, 3, 6, 1, 9, 7, 8],
        itemStyle: {
          color: function (params: any) {
            var colorList = [
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#CD505D' },
                  { offset: 1, color: '#5B8FF9' }
                ]
              },
              {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#3A8FFF' },
                  { offset: 1, color: '#01ECFF' }
                ]
              }
            ];
            var index = Math.floor(params.dataIndex / 4); // 每4根柱子颜色变化一次
            return colorList[index % colorList.length];
          }
        },
        label: {
          show: true,
          position: 'top',
          color: '#ffffff',
          fontSize: 20,
          formatter: ((val: any) => {
            return val.value + '节柱'
          })
        }
      }
    ]
  } // 全程进度柱状图配置
  useEffect(() => {
    getBuildingsData({ projectId: 67 }).then((res: any) => {
      setData(res.data.result)
    })
    refreshAt(24, 0, 0)
  }, [])
  useEffect(() => {
    if (data) {
      console.log(data);
      data.forEach((item: any, index: number) => {
        echarts.init(window.document.getElementById(`manufacture${index}`) as HTMLElement).setOption(
          {
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
                    value: item.makeSegmentedColumnProgress,
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
                            color: '#78A5FF'
                          },
                          {
                            offset: 1,
                            color: '#8153FF'
                          }
                        ],
                        globalCoord: false
                      },
                      borderRadius: 10
                    },
                    borderRadius: 200
                  },
                  {
                    value: 100 - item.makeSegmentedColumnProgress,
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
          }
        );
        echarts.init(window.document.getElementById(`construction${index}`) as HTMLElement).setOption(
          {
            series: [
              {
                type: 'pie',
                radius: ['75%', '99%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: true,
                    position: 'center',
                    formatter: '{c}%',
                    textStyle: {
                      fontSize: '20',
                      // fontWeight: 'bold'
                      color: '#ffffff'
                    }
                  },
                },
                data: [
                  {
                    value: item.installSegmentedColumnProgress,
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
                    borderRadius: [20, 20, 0, 0]
                  },
                  {
                    value: 100 - item.installSegmentedColumnProgress,
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
          }
        );
        echarts.init(window.document.getElementById(`manufactureLine${index}`) as HTMLElement).setOption(
          {
            grid: {
              left: '10',
              right: '16',
              top: '12',
              bottom: '10',
              containLabel: true
            },
            yAxis: {
              type: 'category',
              data: item.makeLineChart.map((it: any) => it.segmentedColumnNo),
              axisLabel: {
                show: true,
                color: '#ffffff',
                fontSize: 18,
                formatter: function (value: any) {
                  return `${value}节柱`;
                }
              },
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#ffffff'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#5a6273',
                  type: 'dashed'
                },
                alignWithLabel: true
              },
              interval: 0 // X 轴刻度间隔为 1,
            },
            xAxis: {
              axisLabel: {
                show: true,
                color: '#ffffff',
                fontSize: 16,
                formatter: function (value: any) {
                  if (value == 13) {
                    return ''
                  } else {
                    return value + '月';
                  }
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#ffffff'
                }
              },
              min: 1,
              max: 13,
              type: 'value',
              axisTick: {
                alignWithLabel: true
              },
              splitLine: { show: false },
              interval: 1 // X 轴刻度间隔为 1,
            },
            series: [{
              type: 'line',
              data: item.makeLineChart.map((item: any) => item.planTimeValue),
              lineStyle: {
                color: '#FFD53D',
                width: 4
              },
              label: {
                show: true,
                position: 'top',
                color: '#ffffff',
                fontSize: 16,
                formatter: (params: any) => {
                  return Math.floor(params.value) + ((params.value - Math.floor(params.value)) == 0 ? '-1' : '-' + ((params.value - Math.floor(params.value)) * 31).toFixed(0))
                },
                // 偏移量
                offset: [25, 25]
              },
              itemStyle: {
                color: '#D045FF',
              },
              symbolSize: 8
            }, {
              type: 'line',
              data: item.makeLineChart.map((item: any) => item.realTimeValue),
              lineStyle: {
                color: '#7b88ff',
                width: 4
              },
              label: {
                show: true,
                position: 'top',
                color: '#ffffff',
                fontSize: 16,
                formatter: (params: any) => {
                  return Math.floor(params.value) + ((params.value - Math.floor(params.value)) == 0 ? '-1' : '-' + ((params.value - Math.floor(params.value)) * 31).toFixed(0))
                },
                offset: [-20, 10]

              },
              itemStyle: {
                color: '#D045FF',
              },
              symbolSize: 8
            }]
          }
        );
        echarts.init(window.document.getElementById(`Construction${index}`) as HTMLElement).setOption(
          {
            grid: {
              left: '10',
              right: '16',
              top: '12',
              bottom: '10',
              containLabel: true
            },
            yAxis: {
              type: 'category',
              data: item.installLineChart.map((it: any) => it.segmentedColumnNo),
              axisLabel: {
                show: true,
                color: '#ffffff',
                fontSize: 18,
                formatter: function (value: any) {
                  return `${value}节柱`;
                }
              },
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#ffffff'
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#5a6273',
                  type: 'dashed'
                },
                alignWithLabel: true
              },
              interval: 0 // X 轴刻度间隔为 1,
            },
            xAxis: {
              axisLabel: {
                show: true,
                color: '#ffffff',
                fontSize: 16,
                formatter: function (value: any) {
                  if (value == 13) {
                    return ''
                  } else {
                    return value + '月';
                  }
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#ffffff'
                }
              },
              min: 1,
              max: 13,
              type: 'value',
              axisTick: {
                alignWithLabel: true
              },
              splitLine: { show: false },
              interval: 1 // X 轴刻度间隔为 1,
            },
            series: [{
              type: 'line',
              data: item.installLineChart.map((item: any) => item.planTimeValue),
              lineStyle: {
                color: '#FFD53D',
                width: 4
              },
              label: {
                show: true,
                position: 'top',
                color: '#ffffff',
                fontSize: 16,
                formatter: (params: any) => {
                  return Math.floor(params.value) + ((params.value - Math.floor(params.value)) == 0 ? '-1' : '-' + ((params.value - Math.floor(params.value)) * 31).toFixed(0))
                },
                offset: [25, 25]
              },
              itemStyle: {
                color: '#D045FF'
              },
              symbolSize: 8
            }, {
              type: 'line',
              data: item.installLineChart.map((item: any) => item.realTimeValue),
              lineStyle: {
                color: '#00FFF6',
                width: 4
              },
              label: {
                show: true,
                position: 'top',
                color: '#ffffff',
                fontSize: 16,
                formatter: (params: any) => {
                  return Math.floor(params.value) + ((params.value - Math.floor(params.value)) == 0 ? '-1' : '-' + ((params.value - Math.floor(params.value)) * 31).toFixed(0))
                },
                offset: [-20, 10]
              },
              itemStyle: {
                color: '#D045FF',
              },
              symbolSize: 8
            }]
          }
        );
        echarts.init(window.document.getElementById(`FullRange${index}`) as HTMLElement).setOption(
          {
            xAxis: {
              type: 'category',
              data: item.allProgressBarGraph.map((it: any) => it.processName),
              // ['下料', '拼焊', '涂装', '出厂', '进场', '吊装', '校正', '焊接'],
              // axisLine: {
              //   lineStyle: {
              //     color: '#ffffff'
              //   }
              // },
              axisLabel: {
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
                onZero: false, // 关闭x轴上的坐标轴线
                lineStyle: {
                      color: '#ffffff'
                },
                symbol:['none', 'arrow'],//箭头一端没效果,一端箭头
                symbolOffset: [0, 1],//箭头段移动1个像素
                symbolSize: [20, 30],//箭头大小
            },
            axisTick: {
                show: false // 隐藏刻度线
            }
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}节柱',
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
              min: 0,
              max: 10,
            },
            tooltip: {
              show: true,
              trigger: 'item',
              formatter: function (params: any) {
                return params.name + ': ' + params.value + '节柱';
              }
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
                type: 'bar',
                barWidth: '20%',
                data: item.allProgressBarGraph.map((i: any) => i.segmentedColumnNo),
                itemStyle: {
                  color: function (params: any) {
                    var colorList = [
                      {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          { offset: 0, color: '#78A5FF' },
                          { offset: 1, color: '#8153FF' }
                        ]
                      },
                      {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          { offset: 0, color: '#12FEE0' },
                          { offset: 1, color: '#026DB2' }
                        ]
                      }
                    ];
                    var index = Math.floor(params.dataIndex / 4); // 每4根柱子颜色变化一次
                    return colorList[index % colorList.length];
                  }
                },
                label: {
                  show: true,
                  position: 'top',
                  color: '#ffffff',
                  fontSize: 20,
                  formatter: ((val: any) => {
                    return val.value == 0 ? '' : val.value + '节柱'
                  })
                }
              }
            ]
          }
        );
        if (Object.keys(item.model).length === 0) return false;
        init(window.document.getElementById(`model${index}`), item.model.coord, item.model.colour, 'LINES', [-13274, -26500, -item.model.maxHigh - 9500], [10, 44, 0],[1,1,1])
        // if (index === 0) {
        //   init(window.document.getElementById(`model${index}`), item.model.coord, item.model.colour, 'LINES', [-13274, -16000, -item.model.maxHigh-4500], [10, 44, 0])
        // } else {
        //   init(window.document.getElementById(`model${index}`), item.model.coord, item.model.colour, 'LINES', [-13274, -23000, -item.model.maxHigh-4500], [10, 44, 0])
        // }
      })
      document.addEventListener('click', function (e: any) {
        var div = document.getElementsByClassName('enlargedImage');
        if (e.target.className!='enlargedImage'&&e.target.className!='img') {
          setHighlightedIndex(null);
        }
      })
    }
  }, [data])
  // 轮播按钮
  const pagination = {
    clickable: true,
    renderBullet:
        function (index: any, className: any) {
        return '<span class="' + className + '">' + (data?data[index].buildingNo:'') + "</span>";
      },
  };
  const [highlightedIndex, setHighlightedIndex] = useState<number|null>(null);
  const handleImageClick = (index: number | null) => {
    if (index === highlightedIndex) {
      setHighlightedIndex(null); // 取消高亮
    } else {
      setHighlightedIndex(index); // 设置高亮
    }
  };
  return (
    <div className="building">
      <Swiper
        // direction={"vertical"}
        pagination={pagination}
        loop={true}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 30000, // 自动切换的时间间隔，单位为毫秒
          disableOnInteraction: true // 用户操作之后是否停止自动切换，默认为 true
        }}
        className="mySwiper"
      >
        {data ?
          data.map((item: any, index: number) => {
            return (

              <SwiperSlide key={index}>
                <div className="building" >
                  {/* {
                    index != 0 ? <header style={{ marginBottom: '24px' }}>
                      <img style={{ width: '464px' }} src="src/assets/logo.png" alt="" />
                      <Clock />
                    </header> : null
                  } */}

                  <div style={{ height: '73px' }}></div>
                  <div className="model">
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                      <div className='NO'>{item.buildingNo}<span style={{ fontSize: '35px' }}>#</span></div>
                      <div className='colorBlock'>
                      <div className='F'>
                          <div className='purple'></div>
                          <div className='name'>制造进度</div>
                        </div>
                        {
                          item.makeSegmentedColumn!==0?<div style={{fontSize:'20px',marginLeft:'30px',marginBottom:'15px',color:'#7b88ff'}}>{item.makeSegmentedColumn}节柱{ item.makeStorey }</div>:null
                        }
                        <div className='F'>
                          <div className='blue'></div>
                          <div className='name'>施工进度</div>
                        </div>
                        {
                          item.installSegmentedColumn!==0?<div style={{fontSize:'20px',marginLeft:'30px',color:'#0edad5'}}>{item.installSegmentedColumn}节柱{ item.installStorey }</div>:null
                        }
                      </div>
                    </div>
                    <div style={{ width: '100%', textAlign: 'center', fontSize: '32px' }}>5D孪生模型</div>
                    <div className='drawingContainer'>
                      <div style={{textAlign:'center'}}>
                        <div className={['drawing', 0 === highlightedIndex ? 'active' : null].join(' ')} onClick={() => handleImageClick(0)}>
                          <img className='img' src={item.images[0]} alt="" />
                        </div>
                        <div className='name'>一节柱</div>
                      </div>
                      <div style={{textAlign:'center'}}>
                        <div className={['drawing', 1 === highlightedIndex ? 'active' : null].join(' ')} onClick={() => handleImageClick(1)}>
                          <img className='img' src={item.images[1]} alt="" />
                        </div>
                        <div className='name'>标准层</div>
                      </div>
                      <div style={{textAlign:'center'}}>
                        <div className={['drawing', 2 === highlightedIndex ? 'active' : null].join(' ')} onClick={() => handleImageClick(2)}>
                          <img className='img' src={item.images[2]} alt="" />
                        </div>
                        <div className='name'>屋面层</div>
                      </div>
                      {
                        highlightedIndex == null? '' :
                      <img  className='enlargedImage' src={highlightedIndex==null?'':item.images[highlightedIndex]} alt="" onBlur={() => handleImageClick(3)} />
                          
                      }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <canvas id={`model${index}`} style={{ width: '430px', height: '600px', marginTop: '20px' }}></canvas>
                    </div>
                  </div>
                  {/* <div className={['progress', index == data.length - 1 ? 'noBottom' : null].join(' ')}> */}
                  <div className='progress'>
                    <div className='items'>
                      <div className='item'>
                        <div className='title'>深化进度 BIM</div>
                        <div className='degree'>
                          {
                            item.deepeningProgress == '已完成' ? <div style={{ fontSize: '46px', color: '#78a5ff' }}>{item.deepeningProgress}</div> : item.deepeningProgress == '未完成' ? <div style={{ fontSize: '46px', color: '#ff8750' }}>{item.deepeningProgress}</div> : <div style={{ fontSize: '38px' }}>{item.deepeningProgress}</div>
                          }

                        </div>
                      </div>
                      <div className='item'>
                        <div className='title'>制造进度 Manufacturing</div>
                        <div className='box'>
                          <div className='text'>
                            <div className='left'>
                              <div style={{ fontSize: '22px', color: ' #98A7B9' }}>当前节柱</div>
                              <div style={{ fontSize: '36px', color: ' #0EDAD5', fontFamily: 'Arial-Black' }}>{item.makeSegmentedColumn}</div>
                            </div>
                            <div className='right'>
                              <div style={{ fontSize: '22px', color: ' #98A7B9', marginBottom: '10px' }}>预计完成时间</div>
                              <div style={{ fontSize: '24px' }}>{item.makeSegmentedColumnPlanTime}</div>
                            </div>
                          </div>
                          <div id={`manufacture${index}`} style={{ width: '100px', height: '100px' }}>
                          </div>
                        </div>
                      </div>
                      <div className='item'>
                        <div className='title'>施工完成进度 Construction</div>
                        <div className='box'>
                          <div className='text'>
                            <div className='left'>
                              <div style={{ fontSize: '22px', color: ' #98A7B9' }}>当前节柱</div>
                              <div style={{ fontSize: '36px', color: ' #0EDAD5', fontFamily: 'Arial-Black' }}>{item.installSegmentedColumn}</div>
                            </div>
                            <div className='right'>
                              <div style={{ fontSize: '22px', color: ' #98A7B9', marginBottom: '10px' }}>预计完成时间</div>
                              <div style={{ fontSize: '24px' }}>{item.installSegmentedColumnPlanTime}</div>
                            </div>
                          </div>
                          <div id={`construction${index}`} style={{ width: '100px', height: '100px' }}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='process'>
                      <div className='item'>
                        <div className='titleBox'>
                          <div className='text'>构件制造进度  Manufacturing</div>
                          <div className='colorBlock'>
                            <div className='F'>
                              <div className='purple'></div>
                              <div className='name'>计划时间</div>
                            </div>
                            <div className='F'>
                              <div className='blue' style={{ backgroundColor: '#7b88ff' }}></div>
                              <div className='name'>实际时间</div>
                            </div>
                          </div>
                        </div>
                        <div className='chart'>
                          {/* <div  id='manufactureLine' className='LineChart' ref={Manufacturing}> */}
                          <div id={`manufactureLine${index}`} className='LineChart'>
                          </div>
                        </div>
                      </div>
                      <div className='item'>
                        <div className='titleBox'>
                          <div className='text'>施工完成进度  Construction</div>
                          <div className='colorBlock'>
                            <div className='F'>
                              <div className='purple'></div>
                              <div className='name'>计划时间</div>
                            </div>
                            <div className='F'>
                              <div className='blue'></div>
                              <div className='name'>实际时间</div>
                            </div>
                          </div>
                        </div>
                        <div className='chart'>
                          <div id={`Construction${index}`} className='LineChart' ref={Construction}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='fullRange'>
                      <div className='titleBox'>
                        <div className='text'>全程进度 Lifecycle </div>
                      </div>
                      <div className='fullProgress'>
                        <div id={`FullRange${index}`} style={{ width: '100%', height: '100%', boxSizing: 'border-box' }}></div>
                      </div>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            )
          }) : null
        }
      </Swiper>

    </div>
  )
}