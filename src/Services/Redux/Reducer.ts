import { RootCoins, RootObject, Stats, Coins } from "../../models/Api.model";
import { API_ERROR, GET_COINS, GET_CRYPTODETAILS, GET_CRYPTOHISTORY, GET_EXCHANGES, REQUEST_CRYPTODETAILS, REQUEST_CRYPTOHISTORY, REQUEST_EXCHANGES, REQUEST_GET_COINS } from "./Action";

const initialState: RootCoins = {
    status: 'idle',
    error: '',
    coins: {
        stats: {
            total: 0,
            total24hVolume: '',
            totalCoins: 0,
            totalExchanges: 0,
            totalMarketCap: '',
            totalMarkets: 0
        },
        coins: []
    },
    coin: {
        status: '',
        coin: {
            uuid: '',
            symbol: '',
            name: '',
            description: '',
            color: '',
            iconUrl: '',
            websiteUrl: '',
            links: [],
            numberOfMarkets: 0,
            numberOfExchanges: 0,
            '24hVolume': '',
            marketCap: '',
            fullyDilutedMarketCap: '',
            price: '',
            btcPrice: '',
            priceAt: 0,
            change: '',
            rank: 0,
            sparkline: [],
            coinrankingUrl: '',
            tier: 0,
            lowVolume: true,
            listedAt: 0,
            hasContent: true,
            notices: null,
            tags: [],
        },
    },
    coinHistory: {
        status: '',
        data: {
            change: '',
            history: []
        }
    },
    exchanges: {
        stats: {
            total: 0
        },
        coins: []
    }
}

export const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_COINS:
            return {
                ...state,
                coins: action.payload.data,
                status: 'success'
            }
        case REQUEST_GET_COINS:
            return {
                ...state,
                status: 'loading'
            }
        case GET_CRYPTODETAILS:
            return {
                // API responds with { status, data: { coin } } — unwrap to { coin }
                ...state,
                coin: action.payload.data.data,
                status: 'success'
            }
        case REQUEST_CRYPTODETAILS:
            return {
                ...state,
                status: 'loading'
            }
        case GET_CRYPTOHISTORY:
            return {
                ...state,
                coinHistory: action.payload,
                status: 'success'
            }
        case REQUEST_CRYPTOHISTORY:
            return {
                ...state,
                status: 'loading'
            }
        case GET_EXCHANGES:
            return {
                // /exchanges responds with { status, data: { stats, exchanges } }
                ...state,
                exchanges: {
                    stats: action.payload.data?.stats ?? { total: 0 },
                    coins: action.payload.data?.exchanges ?? [],
                },
                status: 'success'
            }
        case REQUEST_EXCHANGES:
            return {
                ...state,
                status: 'loading'
            }
        case API_ERROR:
            return {
                ...state,
                status: 'error',
                error: action.payload
            }
        default:
            return state
    }
}
