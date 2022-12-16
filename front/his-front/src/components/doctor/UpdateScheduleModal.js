import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
// style
import '../../components/doctor/UpdateScheduleModal.scss';

const UpdateScheduleModal = ({schedulePk, closeModal}) => {

    const scheduleIdPk = schedulePk;
    const [schedule, setSchedule] = useState([{}]);

    const scheduleCategory = useRef("");
    const startTime = useRef("");
    const endTime = useRef("");
    const scheduleTitle = useRef("");
    const scheduleLocation = useRef("");
    const scheduleContent = useRef("");

    useEffect(() => {

        axios.get("http://localhost:9090/user/selectedSchedule", {params :{scheduleIdPk: scheduleIdPk}})
        .then((res) => {
          console.log(res.data)
          setSchedule(res.data)
          scheduleCategory.current = res.data[0].SCHEDULE_CATEGORY
          startTime.current = res.data[0].SCHEDULE_START_TIME
          endTime.current = res.data[0].SCHEDULE_END_TIME
          scheduleTitle.current = res.data[0].SCHEDULE_TITLE
          scheduleLocation.current = res.data[0].SCHEDULE_PLACE
          scheduleContent.current = res.data[0].SCHEDULE_CONTENT
        })

    }, [scheduleIdPk]);

    const updateSchedule = () => {

        const data = {
            scheduleCategory: scheduleCategory.current,
            startTime: startTime.current,
            endTime: endTime.current,
            scheduleTitle: scheduleTitle.current,
            scheduleLocation: scheduleLocation.current,
            scheduleContent: scheduleContent.current,
            scheduleIdPk: schedulePk
        }

        axios.post("http://localhost:9090/user/updateSchedule", JSON.stringify(data),
        {
          headers: {
            "Content-Type" : `application/json`,
          },
        })
        .then((res)=>{
          alert(res.data)
          closeModal()
        })

    }

    return (
        <div className="update-box">
        <header>
            <p>일정 수정</p>
            <hr />
        </header>
        <div className="update-div">
            <table>
                <tbody>
                    <tr>
                        <th>일정 종류</th>
                        <td>
                            <select
                                defaultValue={schedule[0].SCHEDULE_CATEGORY}
                                key={schedule[0].SCHEDULE_CATEGORY} 
                                onChange={(e) => scheduleCategory.current = e.target.value}>
                                <option>병원 일정</option>
                                <option>의사 일정</option>
                                <option>개인 일정</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>시간</th>
                        <td><input className="time" type={"text"} defaultValue={schedule[0].SCHEDULE_START_TIME} onChange={(e) => startTime.current = e.target.value} /> &nbsp; ~ &nbsp;
                            <input className="time" type={"text"} defaultValue={schedule[0].SCHEDULE_END_TIME} onChange={(e) => endTime.current = e.target.value} />
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td><input defaultValue={schedule[0].SCHEDULE_TITLE} onChange={(e) => scheduleTitle.current = e.target.value}/></td>
                    </tr>
                    <tr>
                        <th>장소</th>
                        <td><input defaultValue={schedule[0].SCHEDULE_PLACE} onChange={(e) => scheduleLocation.current = e.target.value}/></td>
                    </tr>
                    <tr>
                        <th>일정 내용</th>
                        <td><input defaultValue={schedule[0].SCHEDULE_CONTENT} onChange={(e) => scheduleContent.current = e.target.value} /></td>
                    </tr>
                </tbody>
            </table>
            <button 
                onClick={() => {
                    updateSchedule();
            }}>수 정</button>
        </div>
    </div>
    );
}

export default UpdateScheduleModal;