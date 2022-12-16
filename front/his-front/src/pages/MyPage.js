import React, { useEffect, useRef, useState } from "react";
// style
import '../styles/scss/reset.scss';
import '../styles/mypage.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import axios from "axios";

const MyPage = () => {
    const [visiblePwChange, setVisiblePwChange] = useState(false);
    const [visibleAddrChange, setVisibleAddrChange] = useState(false);
    const [myInfo, setMyInfo] = useState([{}]);
    const presentPwd = useRef("");
    const newPwd = useRef("");
    const newAddr = useRef("");
    const token = localStorage.getItem('jwt') || '';


    useEffect(() => {

        axios.post("http://localhost:9090/user/myPage", {}, {
            headers : {'Authorization': token,}
        })
        .then((res) => {
            setMyInfo(res.data)
        });
    }, [token]);

    const changePwd = () => {

        const pwd = {
            presentPwd: presentPwd.current,
            newPwd: newPwd.current
        }

        axios.post("http://localhost:9090/user/changePwd", JSON.stringify(pwd),
        {
            headers: {
                'Content-Type' : `application/json`, 
                'Authorization': token
            }
        })
        .then((res) => {

            alert(res.data)
            window.location.reload();
        })
    }

    const changeAddr = () => {
        
        const addr = {
            newAddr: newAddr.current
        }

        axios.post("http://localhost:9090/user/changeAddr", JSON.stringify(addr), 
        {
            headers: {
                'Content-Type' : `application/json`,
                'Authorization': token
            }
        })
        .then((res) => {
            alert(res.data);
            window.location.reload();
        })

    }

    return(
        <div className="myPage">
            <main className="main">
            <div className='top'>
                <EmpBar />
            </div>
            <div className="infoBox">
                <div className="devide1">
                    <p className="infoTitle">개인정보</p>
                    <hr />
                    <div className="infoContent">
                        <ul className="infoUl">
                            <li className="infoLi">
                                <label className="infoLabel">이름</label> 
                                <input className="infoInput" readOnly value={myInfo[0].EMP_NAME || ''}/>
                            </li>
                            <li className="infoLi">
                                <label className="infoLabel">주민등록번호</label> 
                                <input className="infoInput" readOnly value={myInfo[0].EMP_SSN || ''} />
                            </li>
                            <li className="infoLi">
                                <label className="infoLabel">아이디</label> 
                                <input className="infoInput" readOnly value={myInfo[0].USERNAME || ''} />
                            </li>
                            <li className="infoLi">
                                <label className="infoLabel">비밀번호</label> 
                                <input className="infoInput" type={"password"} readOnly value={"123456789"} />
                            </li>
                            <button 
                                className="pwChange" 
                                onClick={() => {
                                    setVisiblePwChange(!visiblePwChange);
                            }}>
                            비밀번호 변경</button>
                        </ul>
                    </div>
                </div>

                {visiblePwChange && <div className="devide2">
                    <p>비밀번호 변경</p>
                    <hr />
                    <div className="change-box1">
                        <ul>

                            <li>
                                <span>현재 비밀번호</span> 
                                <input 
                                    type={"password"}
                                    onChange={(e)=> {
                                        presentPwd.current = e.target.value;
                                    }} 
                                />
                            </li>

                            <li> 
                                <span>새로운 비밀번호</span> 
                                <input 
                                    type={"password"}
                                    onChange={(e)=> {
                                        newPwd.current = e.target.value;
                                    }}
                                /> 
                            </li>

                            <button 
                                className="btn"
                                onClick={() => {
                                    changePwd();
                                }}
                            >변경</button>
                        </ul>
                    </div>
                </div>}
            </div>

            <div className="jobBox">
                <div className="devide3">
                    <p className="jobTitle">직종정보</p>
                    <hr />
                    <div className="jobContent">
                        <ul className="jobUl">
                            <li className="jobLi">
                                <label className="jobLabel">직종</label> 
                                <input className="jobInput" readOnly value={myInfo[0].JOB_NAME || ''} /> 
                            </li>
                            <li className="jobLi">
                                <label className="jobLabel">사원번호</label> 
                                <input className="jobInput" readOnly value={myInfo[0].EMP_ID_PK || ''}/>
                            </li>
                            <li className="jobLi"> 
                                <label className="jobLabel">면허번호</label> 
                                <input className="jobInput" readOnly value={myInfo[0].LICENSE || ''}/>
                            </li>
                        </ul>
                        <ul className="jobUl">
                            <li className="jobLi"> 
                                <label className="jobLabel">진료과</label> 
                                <input className="jobInput" readOnly value={myInfo[0].SPECIALITY_NAME || ''} />
                            </li>
                            <li className="jobLi"> 
                                <label className="jobLabel">재직구분</label> 
                                <input className="jobInput" readOnly value={myInfo[0].EMP_STATUS || ''} />
                            </li>
                            <li className="jobLi">
                                <label className="jobLabel">입사일</label> 
                                <input className="jobInput" readOnly value={myInfo[0].HIREDATE || ''} />
                            </li>
                        </ul>
                    </div>
                    <div className="addr-box">
                        <span>주 소</span><input readOnly value={myInfo[0].EMP_ADDR || ''} /> <br />
                        <button 
                            className="btn"
                            onClick={() => {
                                setVisibleAddrChange(!visibleAddrChange);
                            }}
                        >주소 변경</button>
                    </div>
                </div>

                {visibleAddrChange && <div className="devide4">
                    <p>주소 변경</p>
                    <hr />
                    <div className="change-box2">
                        <ul>
                            <li>
                                <span>현재 주소</span> 
                                <input value={myInfo[0].EMP_ADDR || ''}  />
                            </li>
                            <li>
                                <span>변경된 주소</span> 
                                <input 
                                    type={"text"}
                                    onChange={(e) => {
                                        newAddr.current = e.target.value;
                                    }}
                                />
                            </li>
                            <button 
                                className="btn"
                                onClick={() => {
                                    changeAddr();
                                }}
                            >
                            변경</button>
                        </ul>
                    </div>
                </div>}
            </div>
            </main>
        </div>
    )
}

export default MyPage;