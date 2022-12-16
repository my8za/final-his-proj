import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../utils/constants/Config';

// 진료메모 / 치료오더 SELECT
export const getTreatmentInfo = createAsyncThunk(
  'OutpatientPageInfoSlice/getTreatmentInfo',
  async (receiveId) => {
    const resp = await axios.post( API_URL + "/outpatient/treatmentInfos",
    {receiveId: receiveId},
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    });
    return resp.data
  }
);



// 환자 과거병력 조회 SELECT
export const getPatientRegistrationInfo = createAsyncThunk(
  'OutpatientPageInfoSlice/getPatientRegistrationInfo',
  async (info) => {
    const resp = await axios.post( API_URL + "/patient/regInfo",
    {
      PATIENT_NAME: info.patName,
      PATIENT_SSN : info.PATIENT_SSN
    },
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    });
    return resp.data
  }
);



// 외래진료 상태코드 UPDATE
export const changeOutpatientStatus = createAsyncThunk(
  'OutpatientPageInfoSlice/changeOutpatientStatus',
  async (info) => {
    console.log(info.opStatusCode)
    const resp = await axios.put(API_URL + "/outpatient/changeOutpatientStatus",
    {
      status: info.opStatusCode,
      receiveId: info.receiveId
    },
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    });
    return resp.data
  }
);



// 대기 환자 진찰로 상태 변경시 TREATMENT_INFO_TB INSERT
export const addPatientStatusInfo = createAsyncThunk(
  'OutpatientPageInfoSlice/addPatientStatusInfo',
  async (info) => {
    console.log(info)
    const resp = await axios.post(API_URL + "/outpatient/addPatientStatusInfo",
    {
      receiveId: info.receiveId,
      patientId: info.patientId,
      empId: info.empId,
      status: 'OA'
    },
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    });
    return resp.data
  }
);



// 상세 과거병력 
export const getDetailedMedicalHistory = createAsyncThunk(
  'OutpatientPageInfoSlice/getDetailedMedicalHistory',
  async (info) => {
    const resp = await axios.get(API_URL + "/patient/getTreatmentHistoryDetail",
    {params :{
      patientID: info.PATIENT_ID_PK,
      treatmentDate: info.TREATMENT_DATE,
      regTime: info.REGISTRATION_TIME
    }},
    {
      headers: {
        "Content-Type" : `application/json`,
      },
    });
    return resp.data;
  }
);