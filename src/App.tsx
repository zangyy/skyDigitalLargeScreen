import { useState, useEffect } from 'react'
import './App.less'
import Home from './view/home'

function App() {
  const [count, setCount] = useState(0)

  //数据大屏自适应函数
  const handleScreenAuto = () => {
    const designDraftWidth = 1890;//设计稿的宽度
    const designDraftHeight = 1080;//设计稿的高度
    //根据屏幕的变化适配的比例
    const scale = document.documentElement.clientWidth / document.documentElement.clientHeight < designDraftWidth / designDraftHeight ?
      (document.documentElement.clientWidth / designDraftWidth) :
      (document.documentElement.clientHeight / designDraftHeight);
    //缩放比例
    (document.querySelector('#screen') as any).style.transform = `scale(${scale}) translate(-50%)`;
  }

  //React的生命周期
  useEffect((): any => {
    //初始化自适应  ----在刚显示的时候就开始适配一次
    handleScreenAuto();
    //绑定自适应函数   ---防止浏览器栏变化后不再适配
    window.onresize = () => handleScreenAuto();
    //退出大屏后自适应消失
    return () => window.onresize = null;
  }, [])


  return (
    <div className="screen-wrapper">
        <div className="screen" id="screen">
            <Home />
        </div>
        <footer className="large-footer"></footer>
    </div>
  )
}

export default App
