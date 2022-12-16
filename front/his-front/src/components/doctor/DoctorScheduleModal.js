import React, { useEffect, useRef, useState } from "react";
// style
import '../../styles/scss/reset.scss';
import '../../components/doctor/DoctorSchedule.scss';
import '../../components/doctor/ScheduleModal.scss';
import { CgCloseR } from "react-icons/cg";

//component
import ScheduleModal from "./ScheduleModal";
import AddModal from "./AddModal";
import UpdateScheduleModal from "./UpdateScheduleModal";
import axios from "axios";

const DoctorScheduleModal = (props) => {

    const [addSchedule, setAddSchedule] = useState(false);
    const [updateSchedule, setUpdateSchedule] = useState(false);
    const [scheduleList, setScheduleList] = useState([{}]);
    const schedulePk = useRef("");

    const scheduleCount = useRef(0);
    const date = props.modalDate;
    const empIdPk = localStorage.getItem('empIdPk') || '';

    useEffect(() => {

        axios.get("http://localhost:9090/user/myScheduleList", 
            {params : {date: date,
                       empIdPk: empIdPk
            }}
        ).then((res) => {
            console.log(res.data.length)
            scheduleCount.current = res.data.length
            setScheduleList(res.data)
        })

    }, [date, empIdPk]);

    const deleteSchedule = (schedulePk) => {

        const data = {
            empIdPk: empIdPk,
            date: date,
            schedulePk: schedulePk
        }

        axios.post("http://localhost:9090/user/deleteSchedule", JSON.stringify(data), 
            {headers: {
                "Content-Type" : `application/json`
            }}
        ).then((res) => {
            console.log(res.data)
            scheduleCount.current = res.data.length
            setScheduleList(res.data)
        })

    }

    const checkOnlyOne = (check) => {
        const checkbox = document.getElementsByName('category')
        for(let i=0; i<checkbox.length; i++) {
            if(checkbox[i] !== check) {
                checkbox[i].checked = false
            }
        }
    }
    
    const filtering = (checked, data) => {

        if(checked) {
            axios.get("http://localhost:9090/user/filterCategory", {
                params: {
                    category: data,
                    empIdPk: empIdPk,
                    date: date
                }}
            ).then((res) => {
                console.log(res.data)
                scheduleCount.current = res.data.length
                setScheduleList(res.data)
                })
        }else if(!checked) {

            axios.get("http://localhost:9090/user/myScheduleList", {
                params : {
                    date: date,
                    empIdPk: empIdPk
                }}
            ).then((res) => {
                console.log(res.data.length)
                scheduleCount.current = res.data.length
                setScheduleList(res.data)
            })

        }

    }

    return(
        <div className="schedule-box">
            <main>
                <div>
                    <p>일정 관리</p>
                    <hr />
                    <br />
                    <div className="schedule-div">
                        <p className="date">{props.modalDate}</p>
                        <button className="btn" onClick={() => setAddSchedule(!addSchedule)}>일정 추가</button>
                        {addSchedule && (
                        <ScheduleModal closeModal={() => setAddSchedule(!addSchedule)}>
                            <AddModal props={props} closeModal={() => setAddSchedule(!addSchedule)} setScheduleList = {setScheduleList} scheduleCount = {scheduleCount} />
                        </ScheduleModal>
                        )}
                        <div className="count">
                            <span className="count-span">{scheduleCount.current}개의 일정</span>
                        </div>

                        <div className="checkbox">
                                <input 
                                    type={"checkbox"}
                                    name={"category"} 
                                    value={"개인 일정"} 
                                    onChange={(e) => {
                                        checkOnlyOne(e.target)
                                        filtering(e.target.checked, e.target.value)
                                    }} 
                                /> <span className="checkbox-span">개인 일정</span>

                                <input 
                                    type={"checkbox"} 
                                    name={"category"} 
                                    value={"병원 일정"} 
                                    onChange={(e) => {
                                        checkOnlyOne(e.target)
                                        filtering(e.target.checked, e.target.value)
                                    }} 
                                /> <span className="checkbox-span">병원 일정</span>

                                <input 
                                    type={"checkbox"} 
                                    name={"category"} 
                                    value={"의사 일정"} 
                                    onChange={(e) => {
                                        checkOnlyOne(e.target)
                                        filtering(e.target.checked, e.target.value)
                                    }} 
                                /> <span className="checkbox-span">의사 일정</span>
                        </div>
                        {scheduleList.map((scheduleList, index) => (
                            <div 
                                className="schedule-content" 
                                key={index} 
                                >
                                <div className="section1">
                                    <span 
                                        className="category" 
                                        style={ scheduleList.SCHEDULE_CATEGORY === '병원 일정' ? {backgroundColor: '#0af'} : 
                                        (scheduleList.SCHEDULE_CATEGORY === '의사 일정' ? {backgroundColor: '#BA94D1'} : {backgroundColor: '#393E46'}) } // 다중 삼항 연산자 이용해서 카테고별 컬러 지정
                                    >{scheduleList.SCHEDULE_CATEGORY} </span> &nbsp; 
                                    <span>{scheduleList.SCHEDULE_TITLE}</span> 
                                    <CgCloseR className="icon" onClick={() => deleteSchedule(scheduleList.SCHEDULE_ID_PK)} />
                                </div>
                                <div 
                                    className="section2"
                                    onClick={() => {
                                        schedulePk.current = scheduleList.SCHEDULE_ID_PK;
                                        setUpdateSchedule(!updateSchedule);
                                        }}
                                    >
                                    <span>시간 : </span> <span className="content-span">{scheduleList.SCHEDULE_START_TIME}</span> &nbsp; <span>장소 : </span> <span className="content-span">{scheduleList.SCHEDULE_PLACE}</span> <br/>
                                    <span>내용 : </span> <span className="content-span">{scheduleList.SCHEDULE_CONTENT}</span>
                                </div>
                            </div>
                        ))}
                        {updateSchedule && (
                        <ScheduleModal closeModal={() => setUpdateSchedule(!updateSchedule)}>
                            <UpdateScheduleModal 
                                schedulePk = {schedulePk.current}  
                                closeModal={() => {
                                    setUpdateSchedule(!updateSchedule)

                                    axios.get("http://localhost:9090/user/myScheduleList", 
                                    {params : {date: date,
                                               empIdPk: empIdPk
                                    }}
                                    ).then((res) => {
                                    console.log(res.data.length)
                                    scheduleCount.current = res.data.length
                                    setScheduleList(res.data)
                                    })
                                }} 
                            />
                        </ScheduleModal>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DoctorScheduleModal;