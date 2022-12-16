import React, {useState } from 'react';
import '../styles/login.scss';
import axios from 'axios';
import logo from '../assets/DOUZONE.png';

const Login = () => {

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const userLogin = () => {
    axios.post("http://localhost:9090/login", {
    username: inputId,
    pw: inputPw
    })
    .then((res)=>{
      localStorage.setItem('jwt', res.headers.get('Authorization'))
    })
    .then(() => {
      axios.post("http://localhost:9090/user/myPage", {}, {
          headers : {'Authorization': localStorage.getItem('jwt')}
      })
      .then((res) => {
        localStorage.setItem('userName', res.data[0].USERNAME);
        localStorage.setItem('empIdPk', res.data[0].EMP_ID_PK);
        localStorage.setItem('name', res.data[0].EMP_NAME);
        localStorage.setItem('specialityName', res.data[0].SPECIALITY_NAME);
        localStorage.setItem('role', res.data[0].ROLE);
        localStorage.setItem('ward', res.data[0].WARD);
        if(res.data[0].ROLE === 'ROLE_DOCTOR') {
          window.location.href = 'http://localhost:3000/doctor';
        } else if (res.data[0].ROLE === 'ROLE_INNURSE') {
          window.location.href = 'http://localhost:3000/ward-management2';
        } else if (res.data[0].ROLE === 'ROLE_OUTNURSE') {
          window.location.href = 'http://localhost:3000/outpatient';
        } else if (res.data[0].ROLE === 'ROLE_OUTRECEIPT') {
          window.location.href = 'http://localhost:3000/reception';
        } else if (res.data[0].ROLE === 'ROLE_INRECEIPT') {
          window.location.href = 'http://localhost:3000/ward-management';
        }
      }); 
    })
  }

    return (
        <div className='wrap'>
          <div className='his'>
            <h1>Health Information <br/>System</h1>
            <h2>헬스케어솔루션사업본부</h2>
          </div>
          <div className='login-wrap'>
            <div className='login-form'>
              <h1><img src={logo} alt='logo'/></h1>
              <form>
                <input 
                  value={inputId} 
                  onChange={(e) => {
                    setInputId(e.target.value);
                  }} 
                  placeholder='아이디를 입력 해주세요' 
                /><br/>
                <input 
                  value={inputPw} 
                  onChange={(e) => {
                    setInputPw(e.target.value);
                  }} 
                  type = "password" 
                  placeholder='비밀번호를 입력해주세요' 
                /><br/>
                <a
                  href='#!'
                  className='btn' 
                  onClick={() => {
                    userLogin();
                  }}
                >로그인</a>
              </form>
            </div>
          </div>
        </div>
    )
}

export default Login;
