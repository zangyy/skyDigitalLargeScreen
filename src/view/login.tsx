
import './login.less';
import logo from '@/assets/logo.png'
import number from '@/assets/icon_number.png'
import cipher from '@/assets/icon_cipher.png'
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  interface AccountPW {
    account: string | number,
    password: string
  }
  const [accountPW, setAccountPW] = useState<AccountPW>({
    // account: 'xklz',
    // password: '88888888'
    account: '',
    password: ''
  })
  const jump = useNavigate()
  const login = () => {
    console.log(accountPW)
    if (accountPW.account === 'xklz' && accountPW.password === '88888888') {
      localStorage.setItem('accessToken', JSON.stringify(accountPW))
      // react跳转
      jump('/building')
    } else {
      alert('账号密码错误')
    }
  }
  return (
    <div className="login">
      <div className='window'>
        <img className='logo' src={logo} alt="" />
        <div className='accountNumber' style={{ marginBottom: '40px' }}>
          <img className='icon' src={number} alt="" />
          <input className='input' type="text" placeholder='请输入账号/手机号' value={accountPW.account} onChange={ (e)=>{setAccountPW({account:e.target.value,password:accountPW.password})} } />
        </div>
        <div className='passWord'>
        <img className='icon' src={cipher} alt="" />
          <input className='input' type="password" placeholder='请输入密码' value={accountPW.password} onChange={ (e)=>{setAccountPW({account:accountPW.account,password:e.target.value})} }/>
        </div>
        <div style={{width:'340px',marginTop:'20px'}}>
          <span className='label'>忘记密码</span>
          <span className='label' style={{float:'right'}}>立即注册</span>
        </div>
        <div className='loginBut' onClick={login}>登录</div>
      </div>
    </div>
  );
}