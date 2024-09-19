import { cryptoAssets, cryptoData } from './data';
import { Assets, CryptoData } from './types';

export function fakeFetchCrypto() {
  return new Promise<CryptoData>((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1);
  });
}
export function fetchAssets() {
  return new Promise<Assets[]>((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}
