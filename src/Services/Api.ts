import axios from "axios";
import {
  API_ERROR,
  GET_COINS,
  GET_CRYPTODETAILS,
  GET_CRYPTOHISTORY,
  GET_EXCHANGES,
  REQUEST_CRYPTODETAILS,
  REQUEST_CRYPTOHISTORY,
  REQUEST_EXCHANGES,
  REQUEST_GET_COINS,
} from "./Redux/Action";

const ApiHeaders: any = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
};
const baseUrl: string = "https://coinranking1.p.rapidapi.com/";

const handleError = (dispatch: any, error: unknown) => {
  console.error(error);
  dispatch({
    type: API_ERROR,
    payload: "Failed to load data from the CoinRanking API. Please try again.",
  });
};

export const getCoins = (dispatch: any, count: number) => {
  dispatch({ type: REQUEST_GET_COINS });
  axios
    .request({ url: `${baseUrl}coins?limit=${count}`, headers: ApiHeaders })
    .then((res) => dispatch({ type: GET_COINS, payload: res.data }))
    .catch((error) => handleError(dispatch, error));
};

export const getCryptoDetails = (dispatch: any, coinId?: string) => {
  dispatch({ type: REQUEST_CRYPTODETAILS });
  axios
    .request({ url: `${baseUrl}coin/${coinId}`, headers: ApiHeaders })
    .then((res) => dispatch({ type: GET_CRYPTODETAILS, payload: res.data }))
    .catch((error) => handleError(dispatch, error));
};

export const getCryptoHistory = (
  dispatch: any,
  coinId?: string,
  timePeriod?: string
) => {
  dispatch({ type: REQUEST_CRYPTOHISTORY });
  axios
    .request({
      url: `${baseUrl}coin/${coinId}/history?timePeriod=${timePeriod}`,
      headers: ApiHeaders,
    })
    .then((res) => dispatch({ type: GET_CRYPTOHISTORY, payload: res.data }))
    .catch((error) => handleError(dispatch, error));
};

export const getExchanges = (dispatch: any) => {
  dispatch({ type: REQUEST_EXCHANGES });
  axios
    .request({ url: `${baseUrl}exchanges`, headers: ApiHeaders })
    .then((res) => dispatch({ type: GET_EXCHANGES, payload: res.data }))
    .catch((error) => handleError(dispatch, error));
};
