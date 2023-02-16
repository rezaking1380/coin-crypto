export interface RootObject {
    coins: RootCoins
}
export interface RootCoins {
    status: string;
    coins: Coins;
    coin: CoinDetails;
    coinHistory: CoinHistory
}
  
export interface Coins {
    stats: Stats;
    coins: Coin[];
  }
  
  
export interface Stats {
    total: number;
    totalCoins: number;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: string;
    total24hVolume: string;
  }

  interface CoinHistory {
    status: string;
    data: Data;
  }
  
  interface Data {
    change: string;
    history: History[];
  }
  
  interface History {
    price: string;
    timestamp: number;
  }

  interface CoinDetails {
    status: string;
    coin : Coin;
  }
  
  interface Coin {
    uuid: string;
    symbol: string;
    name: string;
    description: string;
    color: string;
    iconUrl: string;
    websiteUrl: string;
    links: Link[];
    supply?: Supply;
    numberOfMarkets: number;
    numberOfExchanges: number;
    "24hVolume": string;
    marketCap: string;
    fullyDilutedMarketCap: string;
    price: string;
    btcPrice: string;
    priceAt: number;
    change: string;
    rank: number;
    sparkline: string[];
    allTimeHigh?: AllTimeHigh;
    coinrankingUrl: string;
    tier: number;
    lowVolume: boolean;
    listedAt: number;
    hasContent: boolean;
    notices?: any;
    tags: string[];
  }
  
  interface AllTimeHigh {
    price: string;
    timestamp: number;
  }
  
  interface Supply {
    confirmed: boolean;
    supplyAt: number;
    max: string;
    total: string;
    circulating: string;
  }
  
  interface Link {
    name: string;
    type: string;
    url: string;
  }