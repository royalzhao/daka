import axios from 'axios'
const wx = require('weixin-js-sdk')
const HOST = 'http://127.0.0.1'
const STATUS = 1
export default {
    async getWxpayData({ commit, state, getters }, params) {
        
        const { data } = await axios.post(`${HOST}/wxpaySign/createOrder`,params, {
          headers: {
            token: state.token
          }
        })
        return data
    },
    async wxpayConfig({ commit, state, getters }, params) {
        
        const { data } = await axios.post(`${HOST}/wxpaySign/js_access`,params, {
          headers: {
            token: state.token
          }
        })
        return data
    },
    
   
}