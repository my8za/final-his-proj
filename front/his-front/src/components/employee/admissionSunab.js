import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Waiting4Payment from '../patient/Waiting4Payment';
import '../employee/admissionSunab.scss';
import '../../styles/tab.scss';
import Receipt from '../patient/Receipt';
import AdmissionOrder from './admissionOrder';
import DischargeDue from './dischargeDue';
import axios from 'axios';
import { API_URL } from '../../utils/constants/Config';


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
            <Typography>{children}</Typography>
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

  

  export default function AdmissionSunab({setBedInfo, bedInfo}) {
    const [value, setValue] = React.useState(0);
    const [sunabList, setSunabList] = React.useState([]);
    const [test,setTest] = React.useState("");
    const [reRender , setReRender] = React.useState(true);
    const [checkedList, setCheckedList] = React.useState([]);
    //middlePayment , All , today

    // console.log(sunabInfo);
    // console.log(sunabInfo2);

    let sunabInfo = checkedList;

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    React.useEffect(()=>{
      setTimeout(() => 
      axios.post(API_URL +"/AdmissionReceipt/AdReceiptList", {filter : sunabInfo}, {headers:{"Content-Type" : `application/json`},})
        .then(res => setSunabList(res.data))
        ,50);
        setTest("");
    },[reRender,sunabInfo]);
    
    /*-------------------------------------------------------------*/
    const CATEGORY_LIST = [
      { id: 0, value: 'today' , data: '?????? ?????? ??????' },
      { id: 1, value: 'middlePayment' , data: '?????? ?????? ??????' }
    ];

    function ProdBasicInfo() {
      // ???????????? ?????? ?????????

      // onChange????????? ???????????? ????????? ??????, ????????? ??? ????????????
      const onCheckedElement = (checked, item) => {
        if (checked) {
          setCheckedList([...checkedList, item]);
          setReRender(!reRender);
        } else if (!checked) {
          setCheckedList(checkedList.filter(el => el !== item));
          setReRender(!reRender);
        }
      };
      console.log(checkedList);
      return (
        <div>
            {CATEGORY_LIST.map(item => {
              return (
                <li key={item.id}>
                  <input
                    type="checkbox"
                // ?????? value????????? data??? ???????????????.
                    value={item.value}
               // onChange???????????? ???????????? check????????? value(data)?????? ???????????? ????????? data??? ????????????.
                    onChange={e => {
                      onCheckedElement(e.target.checked, e.target.value);
                    }}
               // ???????????? & ????????? ????????? ??????. ????????? data??? ????????? true, ????????? false
                    checked={checkedList.includes(item.value) ? true : false}
                  />{item.data}
                </li>
                
              );
            })}
          </div>

      )
    }
    /*-------------------------------------------------------------*/
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="?????? ??????" {...a11yProps(0)} />
            <Tab label="?????? ??????" {...a11yProps(1)} />
            <Tab label="?????? ??????" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <div className='qwer'>
                <div className='a'>
                    <ul className = 'filter'>
                      <ProdBasicInfo />
                    </ul>
                </div>
                <div className='b'>
                    <Waiting4Payment sunabList={sunabList} setTest={setTest}/>
                </div>
                <div className='c'>
                    <Receipt test={test} reRender={reRender} setReRender={setReRender}/>
                </div>
            </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <div className='asdf'>
                <AdmissionOrder bedInfo={bedInfo} setBedInfo={setBedInfo}/>
            </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <div className='asdf'>
                <DischargeDue bedInfo={bedInfo} setBedInfo = {setBedInfo} />
            </div>
        </TabPanel>
      </Box>
    );
}