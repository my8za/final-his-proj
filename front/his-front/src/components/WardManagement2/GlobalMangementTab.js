import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../styles/tab.scss'
import Inpatientschedule from './Inpatientschedule';
import HandOver from './HandOver';

//redux
import { getReceiveHandOver } from '../../redux/AdmissionPatientInfoApi';
import { useDispatch} from 'react-redux';
import { setStartDate } from '../../redux/InChangeDateSlice';
import { parseISO } from 'date-fns';
import AdmissionDue from './AdmissionDue';

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

export default function GlobalMangementTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const reloadSchedule = () =>{
  const newDate = new Date();
  let today = newDate;
  today = today.getFullYear()+"-"+ ("00" + (today.getMonth()+1)).slice(-2)+ "-" + ("00" + today.getDate()).slice(-2);

    dispatch(setStartDate(parseISO(today)))
  }
  const userName = window.localStorage.getItem('userName');

  const ToHandOver = () =>{
    let user = {
      "userName" : userName
    }
    let handOverElement = JSON.stringify(user)

    dispatch(getReceiveHandOver(handOverElement));
  }

  
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="환자 일정" {...a11yProps(0)} onClick={reloadSchedule}/>
          <Tab label="인계 사항" {...a11yProps(1)} onClick={ToHandOver}/>
          <Tab label="입원 예정" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Inpatientschedule/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HandOver/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdmissionDue />
      </TabPanel>
    </Box>
  );
}


