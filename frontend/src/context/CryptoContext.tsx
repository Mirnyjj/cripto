import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Assets, Crypto } from "../types";
import { fakeFetchCrypto, fetchAssets } from "../api";
import { percentDifference } from "../utils";

type CryptoContextType = {
  assets: Assets[];
  crypto: Crypto[];
  loading: boolean;
  AddAsset: (newAsset: Assets) => void;
};

const initialContext: CryptoContextType = {
  assets: [],
  crypto: [],
  loading: false,
  AddAsset: () => {},
};
export const CryptoContext = createContext<CryptoContextType>(initialContext);

type CryptoContextProviderProps = {
  children: ReactNode;
};

export const CryptoContextProvider = ({
  children,
}: CryptoContextProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCripto] = useState<Crypto[]>([]);
  const [assets, setAssets] = useState<Assets[]>([]);

  function mapAssets(assets: Assets[], result: Crypto[]) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);

      return {
        grow: asset.price < (coin?.price || 0), // выросла ли стоимость
        growPercent: percentDifference(asset.price, coin?.price || 0), // сколько в процентах изменилась стоимость
        totalAmount: asset.amount * (coin?.price || 0), // сколько крипты в деньгах
        totalProfit:
          asset.amount * (coin?.price || 0) - asset.amount * asset.price, // сколько мы заработали
        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();
      setAssets(mapAssets(assets, result));
      setCripto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function AddAsset(newAsset: Assets) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, AddAsset }}>
      {children}
    </CryptoContext.Provider>
  );
};

export function useCrypto() {
  return useContext(CryptoContext);
}
