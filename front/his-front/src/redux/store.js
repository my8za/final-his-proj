import { configureStore } from '@reduxjs/toolkit';
import inPatientInfoSlice from './InPatientInfoSlice';
import inChangeDateSlice from './InChangeDateSlice';
import outpatientPageInfoSlice from './outpatientPageInfoSlice';

// store : 모든 slice를 통합
const store = configureStore({
  reducer: {
    readDetailedMedicalHistory: outpatientPageInfoSlice.reducer,
    selectEmpName: outpatientPageInfoSlice.reducer,
    selectSpeciality: outpatientPageInfoSlice.reducer,
    checkOpStatusCode:outpatientPageInfoSlice.reducer,
    changePatientCode: outpatientPageInfoSlice.reducer,
    readPatientRegistrationInfo: outpatientPageInfoSlice.reducer,
    readOutpatientInfo: outpatientPageInfoSlice.reducer,
    inPatientInfo:inPatientInfoSlice.reducer,
    inChangeDate:inChangeDateSlice.reducer
    // 모든 reducer를 통합하여 store에 하나의 reducer로 저장
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
  
});


export default store;