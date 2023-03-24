import { useEffect } from 'react';
import * as echarts from 'echarts';

function useChart (chartRef:any, options:any) {

    let myChart:any = null;

    function renderChart() {
        const chart = echarts.getInstanceByDom(chartRef.current)
        if (chart) {
            myChart = chart
        } else {
            myChart = echarts.init(chartRef.current)
        }
        myChart.setOption(options)
    };

    useEffect(() => {
        renderChart()
    }, [options])

    useEffect(() => {
        return () => {
            myChart && myChart.dispose()
        }
    }, [])

  return [myChart, (options:echarts.SetOptionOpts) => {
    myChart.setOption(options);
    }]
}

export default useChart