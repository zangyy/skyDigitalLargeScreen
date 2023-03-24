import { useState, useEffect } from 'react'
import './home.less'
export default function Clock() {
  const [YMD, setYMD] = useState('')
  const [HMS, setHMS] = useState('')
  useEffect((): any => {
    const time = setInterval(() => {
      setYMD(`${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}`)
      setHMS(`${new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()}`)
    }, 1000)
    // 销毁定时器
    return () => clearInterval(time)
  }, [])

  return (
    <div className='date'>
      <span className='NO' style={{ marginRight: '20px' }}>{YMD}</span>
      <span className='NO'>{HMS}</span>
    </div>
  )
}