import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 입원 환자 정보 Read
export const getInpatientInfo = createAsyncThunk(
    'inPatientInfoSlice/getInpatientInfo',
    async(selectedInInfo) => {
        const resp = await axios.post("http://localhost:9090/patient/outInfo",
        selectedInInfo,
        {
          headers: {
            "Content-Type" : `application/json`,
          },
        });
        return resp.data
    }
)

// 입원 환자 퇴원 예정일 Update
export const changeDischargeDueDate = createAsyncThunk(
  'inPatientInfoSlice/changeDischargeDueDate',
  async(dischargeDueDateElement) => {
      const resp = await axios.put("http://localhost:9090/patient/dischargeDueDate",
      dischargeDueDateElement,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)

// 특정 환자 간호기록 Read
export const getCareInfo = createAsyncThunk(
  'inPatientInfoSlice/getCareInfo',
  async(elements) => {
      const resp = await axios.post("http://localhost:9090/admission/careInfos",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)


// 특정 환자 간호기록 create
export const setCareInfo = createAsyncThunk(
  'inPatientInfoSlice/setCareInfo ',
  async(elements) => {
      const resp = await axios.post("http://localhost:9090/admission/createdCareInfo",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)

// 특정 환자 간호기록 UPDATE
export const changeCareInfo = createAsyncThunk(
  'inPatientInfoSlice/changedCareInfo ',
  async(elements) => {
      const resp = await axios.put("http://localhost:9090/admission/changedCareInfo",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)



// 특정 환자 처방 기록 Read
export const getMediRecords = createAsyncThunk(
  'inPatientInfoSlice/getMediRecords',
  async(elements) => {
      const resp = await axios.post("http://localhost:9090/admission/mediRecords",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)



// 특정 환자 처방 기록 Create
export const setMediRecord = createAsyncThunk(
  'inPatientInfoSlice/setMediRecord',
  async(elements) => {
      const resp = await axios.post("http://localhost:9090/admission/createdMediRecord",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)

// 특정 환자 처방 기록 Update
export const changeMediRecord = createAsyncThunk(
  'inPatientInfoSlice/changedMediRecord',
  async(elements) => {
      const resp = await axios.put("http://localhost:9090/admission/changedMediRecord",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      
      return resp.data
  }
)

// 특정 환자 처방 기록 복약 여부 Update
export const changeTakeMediStatus = createAsyncThunk(
  'inPatientInfoSlice/changeTakeMediStatus',
  async(elements) => {
      const resp = await axios.put("http://localhost:9090/admission/changedMediRecord/status",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)



//병동 전체 오늘 일정 Read
export const getInpatientSchedules = createAsyncThunk(
  'inPatientInfoSlice/getInpatientSchedules',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/schedules",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)

//병동 전체 일정 create
export const setInpatientSchedule = createAsyncThunk(
  'inPatientInfoSlice/setInpatientSchedule',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/createdSchedule",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)


//병동 전체 일정 update
export const changeSchedule = createAsyncThunk(
  'inPatientInfoSlice/changeSchedule',
  async(specialityElements) => {
      const resp = await axios.put("http://localhost:9090/admission/changedSchedule",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)

//병동 일정 상태 update
export const changeScheduleStatus = createAsyncThunk(
  'inPatientInfoSlice/changeScheduleStatus',
  async(data) => {
      const resp = await axios.put("http://localhost:9090/admission/changedSchedule/status",
      data,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)





//나에게 전달 된 인계사항 READ
export const getReceiveHandOver = createAsyncThunk(
  'inPatientInfoSlice/getReceiveHandOver',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/toMyHandOvers",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
    
      return resp.data
  }
)

//내가 작성한 인계사항 READ
export const getSendHandOver = createAsyncThunk(
  'inPatientInfoSlice/getSendHandOver',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/fromMyHandOvers",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
    
      return resp.data
  }
)

//인계사항 Create
export const setHandOver = createAsyncThunk(
  'inPatientInfoSlice/setHandOver',
  async(specialityElements) => {
      const resp = await axios.post("http://localhost:9090/admission/handOver",
      specialityElements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
     
  }
)


// 내가 작성한 인계사항 Update
export const changeHandover = createAsyncThunk(
  'inPatientInfoSlice/changeHandover',
  async(elements) => {
      const resp = await axios.put("http://localhost:9090/admission/myHandOver",
      elements,
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      });
      return resp.data
  }
)


