import axios from 'axios'
import { API_URL } from '../utils/constants/Config'

// 전체 리스트 가져오기
// export const allPatient = () => {
//     return axios.get(`${API_URL}/board`).then(res=> console.log(res))
// }

// test
export const getPatient = (inputValue) => {
    return axios.get(`${API_URL}/patient/${inputValue}`)
}

