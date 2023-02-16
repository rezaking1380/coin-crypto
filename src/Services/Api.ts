import { ConsoleSqlOutlined } from "@ant-design/icons"
import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import axios from "axios"
import { GET_COINS, GET_CRYPTODETAILS, GET_CRYPTOHISTORY, GET_EXCHANGES, REQUEST_CRYPTODETAILS, REQUEST_CRYPTOHISTORY, REQUEST_EXCHANGES, REQUEST_GET_COINS } from "./Redux/Action";


const ApiHeaders:any = {
    'X-RapidAPI-Key': '022474a802msh4ba1a762c8137fbp1c848ejsnbb9458a91a93',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
const baseUrl:string = 'https://coinranking1.p.rapidapi.com/'

export const getCoins = (dispatch:any,count:number) => {
    dispatch({type: REQUEST_GET_COINS})
    axios.request({url:`${baseUrl}coins?limit=100`,headers:ApiHeaders})
    .then((res) => dispatch({type: GET_COINS,payload: res.data}))
    .catch((error) => console.error(error));
}
export const getCryptoDetails = (dispatch:any,coinId?:string) => {
    dispatch({type: REQUEST_CRYPTODETAILS})
    axios.request({url:`${baseUrl}coin/${coinId}`,headers:ApiHeaders})
    .then((res) => dispatch({type: GET_CRYPTODETAILS,payload: res.data}))
    .catch((error) => console.error(error));
}
export const getCryptoHistory = (dispatch:any,coinId?:string,timePeriod?:string) => {
    dispatch({type: REQUEST_CRYPTOHISTORY})
    axios.request({url:`${baseUrl}coin/${coinId}/history?timePeriod=${timePeriod}`,headers:ApiHeaders})
    .then((res) => dispatch({type: GET_CRYPTOHISTORY,payload: res.data}))
    .catch((error) => console.error(error));
}
export const getExchanges = (dispatch:any) => {
    dispatch({type: REQUEST_EXCHANGES})
    axios.request({url:`${baseUrl}exchange/-zdvbieRdZ/coins?limit=100`,headers:ApiHeaders})
    .then((res) => dispatch({type: GET_EXCHANGES,payload: res.data}))
    .catch((error) => console.error(error));
}

