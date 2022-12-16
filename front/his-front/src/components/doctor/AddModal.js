import React, { useRef } from "react";
// style
import '../../styles/scss/reset.scss';
import '../../components/doctor/AddModal.scss';
import axios from "axios";

const AddModal = ({props, closeModal, setScheduleList, scheduleCount}) => {

    const scheduleCategory = useRef("병원 일정");
    const startTime = useRef("");
    const endTime = useRef("");
    const scheduleDate = props.modalDate;
    const scheduleTitle = useRef("");
    const scheduleLocation = useRef("");
    const scheduleContent = useRef("");
    const empIdPk = localStorage.getItem('empIdPk') || '';

    const addSchedule = () => {

        const data = {
            scheduleCategory: scheduleCategory.current,
            startTime: startTime.current,
            endTime: endTime.current,
            scheduleDate: scheduleDate,
            scheduleTitle: scheduleTitle.current,
            scheduleLocation: scheduleLocation.current,
            scheduleContent: scheduleContent.current,
            empIdPk: empIdPk
        }

        axios.post("http://localhost:9090/user/addSchedule", JSON.stringify(data),
        {
          headers: {
            "Content-Type" : `application/json`,
          },
        })
        .then((res)=>{
            scheduleCount.current = res.data.length
            setScheduleList(res.data)
            closeModal()
        })

    }

    return(
        <div className="add-box">
            <header>
                <p>일정 등록</p>
                <hr />
            </header>
            <div className="add-div">
                <table>
                    <tbody>
                        <tr>
                            <th>일정 종류</th>
                            <td>
                                <select onChange={(e) => scheduleCategory.current = e.target.value}>
                                    <option>병원 일정</option>
                                    <option>의사 일정</option>
                                    <option>개인 일정</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>시간</th>
                            <td><input className="time" type={"text"} defaultValue={"00:00"} onChange={(e) => startTime.current = e.target.value} /> &nbsp; ~ &nbsp;
                                <input className="time" type={"text"} defaultValue={"00:00"} onChange={(e) => endTime.current = e.target.value}/>
                            </td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td><input onChange={(e) => scheduleTitle.current = e.target.value} /></td>
                        </tr>
                        <tr>
                            <th>장소</th>
                            <td><input onChange={(e) => scheduleLocation.current = e.target.value} /></td>
                        </tr>
                        <tr>
                            <th>일정 내용</th>
                            <td><input onChange={(e) => scheduleContent.current = e.target.value} /></td>
                        </tr>
                    </tbody>
                </table>
                <button 
                    onClick={() => {
                        addSchedule();
                }}>등 록</button>
            </div>
        </div>
    )

}

export default AddModal