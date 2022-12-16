import React, { useEffect, useMemo, useState } from 'react';
// style
import '../styles/scss/reset.scss';
import'../styles/statstic.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import ECharts from 'echarts-for-react';
import StaticTab from '../components/static/StaticTab';
import axios from 'axios';


function Stastic() {
  let nowYear = new Date().getFullYear();
  const dateArray =  useMemo(()=>{
    return [(nowYear-3).toString(),(nowYear-2).toString(),(nowYear-1).toString(),(nowYear).toString()];
  },[nowYear])

  const [chartData, setChartData] = useState()
  const [barOptions, setbarOptions]= useState("")
  const [outPatinetOptions, setOutPatinetOptions]= useState("")
  const [inPatinetOptions, setInPatinetOptions]= useState("")


  useEffect(()=>{

    let yearElements = {
      
        year :nowYear,
        spectiality1 : "내과",
        spectiality2 : "정형외과",
        spectiality3 : "이비인후과"
      }
      yearElements = JSON.stringify(yearElements);
  
    axios.post('http://localhost:9090/stastic/year',
      yearElements,
        { 
          headers: {
            "Content-Type" : `application/json`,
          },
        }).then(res=> {
            setChartData(res.data)
            setbarOptions(
              {
                title: {
                  text: "연도별 매출액",
                  left: "10px",
                  textStyle: {
                    fontSize: "20px"
                  },
                },
                legend: {},
                tooltip: {},
                dataset: {
                  source: [
                    ['year', dateArray[0], dateArray[1] , dateArray[2], dateArray[3]],
                    ['Total', res.data[9].totalIncome/1000, res.data[6].totalIncome/1000, res.data[3].totalIncome/1000,0],
                    ['내과', res.data[9].spectialityIncome/1000, res.data[6].spectialityIncome /1000, res.data[3].spectialityIncome/1000, 0],
                    ['이비인후과', res.data[11].spectialityIncome/1000, res.data[8].spectialityIncome/1000 , res.data[5].spectialityIncome/1000, 0],
                    ['정형외과', res.data[10].spectialityIncome/1000, res.data[7].spectialityIncome/1000, res.data[4].spectialityIncome/1000, 0]
                  ]
                },
                xAxis: { type: 'category' },
                yAxis: {
                  name : "(천원)"
                },
                // Declare several bar series, each will be mapped
                // to a column of dataset.source by default.
                series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' },{ type: 'bar' }]
              }
          )

          setOutPatinetOptions({
            title: {
              text: "외래 환자 수",
              subtext: "단위 : %",
              left: "10px",
              textStyle: {
                fontSize: "20px"
              },
            },
            tooltip: {
            trigger: 'item'
            },
            legend: {
            top: '5%',
            left: 'center'
            },
            series: [
            {
              name: '외래 환자 %',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                },
              },
              labelLine: {
                show: false
              },
              data: [
                { value: (res.data[3].spectialityOutPatinetNum/res.data[3].totalOutPatinetNum*100).toFixed(2), name: '내과' },
                { value: (res.data[5].spectialityOutPatinetNum/res.data[3].totalOutPatinetNum*100).toFixed(2), name: '이비인후과' },
                { value: (res.data[4].spectialityOutPatinetNum/res.data[3].totalOutPatinetNum*100).toFixed(2), name: '정형외과' },
              ]
            }
          ]
          })

          setInPatinetOptions({
            title: {
              text: "입원 환자 수",
              subtext: "단위 : %",
              left: "10px",
              textStyle: {
                fontSize: "20px"
              },
            },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: '입원 환자 %',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                },
              },
              labelLine: {
                show: false
              },
              data: [
                { value: (res.data[3].spectialityInPatientNum/res.data[3].toalInPatientNum*100).toFixed(2), name: '내과' },
                { value: (res.data[5].spectialityInPatientNum/res.data[3].toalInPatientNum*100).toFixed(2), name: '이비인후과' },
                { value: (res.data[4].spectialityInPatientNum/res.data[3].toalInPatientNum*100).toFixed(2), name: '정형외과' },
              ]
            }
          ]
          })     
        })
  },[nowYear, dateArray])

  return (

    <div className='Stastic-wapper'>
        <div className='top'>
          <EmpBar />
        </div>
    {chartData != null &&    
      <div className='chart-container'>
        <div className='tap'>
          <StaticTab/>
        </div>
          <div className='item1'>
          <span className='scale'>단위 : 천원 , 명</span>
          <table>
            <thead className='static-header'>
              <tr>
                <th className='static-contnet'></th>
                <th className='static-x-contnet'>TOTAL</th>
                <th className='static-x-contnet'>내과</th>
                <th className='static-x-contnet'>이비인후과</th>
                <th className='static-x-contnet'>정형외과</th>
              </tr>
            </thead>
           {chartData != null && <tbody>
            <tr>
                <td className='static-contnet'>{dateArray[3]} 매출액</td>
                <td className='static-date'>0</td>
                <td className='static-writer'>0</td>
                <td className='static-writer'>0</td>
                <td className='static-writer'>0</td>
              </tr>
              <tr>
                <td className='static-contnet'>{dateArray[2]} 매출액</td>
                <td className='static-date'>{(chartData[3].totalIncome/1000).toLocaleString()}</td>
                <td className='static-writer'>{(chartData[3].spectialityIncome/1000).toLocaleString()}</td>
                <td className='static-writer'>{(chartData[5].spectialityIncome/1000).toLocaleString()}</td>
                <td className='static-writer'>{(chartData[4].spectialityIncome/1000).toLocaleString()}</td>
              </tr>
              <tr>
                <td className='static-contnet'>{dateArray[1]} 매출액</td>
                <td className='static-date'>{(chartData[6].totalIncome/1000).toLocaleString()}</td>
                <td className='static-writer'>{(chartData[6].spectialityIncome/1000).toLocaleString()}</td>
                <td className='static-writer'>{(chartData[8].spectialityIncome/1000).toLocaleString()}</td>
                <td className='static-writer'>{(chartData[7].spectialityIncome/1000).toLocaleString()}</td>
              </tr>
              <tr>
                <td className='static-contnet'>{dateArray[0]} 매출액</td>
                <td className='static-date'>{(chartData[9].totalIncome/1000).toLocaleString()}</td>
                <td className='static-writer'>{(chartData[9].spectialityIncome/1000).toLocaleString()}</td>
                <td className='static-writer'>{(chartData[11].spectialityIncome/1000).toLocaleString()}</td>
                <td className='static-writer'>{(chartData[10].spectialityIncome/1000).toLocaleString()}</td>
              </tr>
              <tr>
                <td className='static-contnet'>올해 외래 환자 수</td>
                <td className='static-date'>{chartData[3].totalOutPatinetNum}</td>
                <td className='static-writer'>{chartData[3].spectialityOutPatinetNum}</td>
                <td className='static-writer'>{chartData[5].spectialityOutPatinetNum}</td>
                <td className='static-writer'>{chartData[4].spectialityOutPatinetNum}</td>
              </tr>
              <tr>
                <td className='static-contnet'>올해 입원 환자 수</td>
                <td className='static-date'>{chartData[3].toalInPatientNum}</td>
                <td className='static-writer'>{chartData[3].spectialityInPatientNum}</td>
                <td className='static-writer'>{chartData[5].spectialityInPatientNum}</td>
                <td className='static-writer'>{chartData[4].spectialityInPatientNum}</td>
              </tr>
              </tbody>
            }
        </table>
          </div>
          <div className='item2'>
          <ECharts option={barOptions} style={{ width: "100%", height: "100%" }}/>
          </div>
          <div className='item3'>
          <ECharts option={outPatinetOptions} style={{ width: "100%", height: "100%" }}/>
          </div>
          <div className='item4'>
          <ECharts option={inPatinetOptions} style={{ width: "100%", height: "100%" }}/>
          </div>
      </div>}
    </div>
   
  )
}
export default Stastic;
