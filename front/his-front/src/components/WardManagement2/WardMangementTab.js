import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InpatientDetail from './InPatientDetail';
import CareInfo from './CareInfo';
import TakeMediCheck from './TakeMediCheck';
import '../../styles/tab.scss'
import '../WardManagement2/wardMangementTab.scss';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {changeDischargeDueDate, getCareInfo, getMediRecords} from '../../redux/AdmissionPatientInfoApi';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function WardMangeMentTap() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
 
   
  const [changeDischargeDate, setChangeDischargeDate] =React.useState("");
  const [sendDischargeDate ,setSendDischargeDate]=React.useState({
    dischargeDueDate: "",
    admissionIdPk : "",
    ward: "",
    name: "",
    roomNum: "",
    bedNum: ""
  });

  const inpatientDetail = useSelector(state=>{
    return state.inPatientInfo.value[5]
  })

  React.useEffect(()=>{
    if(inpatientDetail != null){
      setChangeDischargeDate(inpatientDetail.DISCHARGE_DUEDATE)
    }
  },[inpatientDetail])
 
  const careElements = useSelector(state=>{
    return state.inPatientInfo.value[0]
  })

  const ChangeDueDate = (e) =>{
        setChangeDischargeDate(e.target.value)
  
        setSendDischargeDate( {
          dischargeDueDate: e.target.value,
          admissionIdPk : inpatientDetail.ADMISSION_ID_PK,
          ward: careElements.ward,
          name: careElements.name,
          roomNum: careElements.roomNum,
          bedNum: careElements.bedNum
        })
  
    }
    React.useEffect(()=>{
      const sendDischarge = document.getElementById('dischargeEnroll');
      sendDischarge.addEventListener('click',
      
     (dispatch(changeDischargeDueDate(sendDischargeDate)))
      )
    },[dispatch, sendDischargeDate])
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="환자 정보" {...a11yProps(0)} />
          <Tab label="간호 기록" {...a11yProps(1)} onClick={() => { if(careElements){dispatch(getCareInfo(careElements))}}}/>
          <Tab label="처방 기록" {...a11yProps(2)} onClick={() => { if(careElements){dispatch(getMediRecords(careElements))}}}/>
        </Tabs>
      </Box>
      <div className='inpatient-info-wapper'>
            <div className='inpatient-info'>
              <p><span>환자명 : </span>{(inpatientDetail != null) ? inpatientDetail.PATIENT_NAME : ""}</p>
            </div>                    
            <div className='inpatient-info'>
              <p><span>S/A : </span>{(inpatientDetail != null) ?  inpatientDetail.GENDER : ""}/{(inpatientDetail != null) ?  inpatientDetail.PATIENT_AGE: ""}</p>
            </div>                    
            <div className='inpatient-info'>
              <p><span>주치의 : </span>{(inpatientDetail != null) ? inpatientDetail.SPECIALITY_NAME: ""}/{(inpatientDetail != null) ?  inpatientDetail.EMP_NAME : ""}</p>
            </div>
            <div className='inpatient-info'>
              <p><span>입원일 : </span>{(inpatientDetail != null) ?  inpatientDetail.ADMISSION_DATE: ""}</p>
            </div>
            <div className='inpatient-info'>
            
                <div className='discharge-duedate'>
                <span>퇴원 예정일 : </span>
                {(inpatientDetail != null) ? <input className = 'discharge-insert' type="date" value={inpatientDetail.DISCHARGE_DUEDATE ? changeDischargeDate || "": ""} onChange={ChangeDueDate}></input> : <input className = 'discharge-insert' type="date" value= ""></input> }    
                  <a href='#!' id = "dischargeEnroll" className='btn'>등록</a>      
                </div>
            </div>                
        </div>
      <TabPanel value={value} index={0}>
      <InpatientDetail/>
        </TabPanel>
      <TabPanel value={value} index={1}>
        <CareInfo/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TakeMediCheck/>
      </TabPanel>
    </Box>
  );
}


