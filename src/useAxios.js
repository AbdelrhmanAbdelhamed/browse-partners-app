import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

export default makeUseAxios({
    axios: axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL })
})