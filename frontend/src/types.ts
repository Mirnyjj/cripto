export interface Crypto {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceBtc: number;
  volume: number;
  marketCap: number;
  availableSupply: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  redditUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  contractAddress?: string;
  decimals?: number;
  explorers: string[];
}
export interface Meta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CryptoData {
  result: Crypto[];
  meta: Meta;
}

export interface Assets {
  id: string;
  amount: number;
  price: number;
  date: string | Date;
  grow?: boolean;
  growPercent?: number;
  totalAmount?: number;
  totalProfit?: number;
  name: string;
}

export interface DataForm {
  amount: number;
  price: number;
  date: {
    $d: string;
  };
}

export interface NewAssetType {
  id: string;
  amount: number;
  price: number;
  date: string | Date;
}
