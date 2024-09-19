import { Divider, Tag, Typography } from "antd";
import { Crypto } from "../types";
import { CoinInfo } from "./CoinInfo";

type CoinProps = {
  coin?: Crypto;
};
export const CoinInfoModal = ({ coin }: CoinProps) => {
  if (!coin) {
    return null;
  }
  return (
    <>
      <CoinInfo coin={coin} withSymbol={true} />
      <Divider />
      <Typography.Paragraph>
        {coin.priceChange1h && (
          <>
            <Typography.Text strong>1 hour:</Typography.Text>
            <Tag
              color={coin.priceChange1h > 0 ? "green" : "red"}
              style={{ marginLeft: 5 }}
            >
              {coin.priceChange1h}%
            </Tag>
          </>
        )}
        {coin.priceChange1d && (
          <>
            <Typography.Text strong>1 day:</Typography.Text>
            <Tag
              color={coin.priceChange1d > 0 ? "green" : "red"}
              style={{ marginLeft: 5 }}
            >
              {coin.priceChange1d}%
            </Tag>
          </>
        )}
        {coin.priceChange1w && (
          <>
            <Typography.Text strong>1 week:</Typography.Text>
            <Tag
              color={coin.priceChange1w > 0 ? "green" : "red"}
              style={{ marginLeft: 5 }}
            >
              {coin.priceChange1w}%
            </Tag>
          </>
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {coin.price && (
          <Typography.Text strong>
            Price: {coin.price.toFixed(2)}$
          </Typography.Text>
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {coin.priceBtc && (
          <Typography.Text strong>Price BTC: {coin.priceBtc}</Typography.Text>
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {coin.marketCap && (
          <Typography.Text strong>
            Market Cap: {coin.marketCap}$
          </Typography.Text>
        )}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {coin.contractAddress && (
          <Typography.Text strong>
            Contract Address: {coin.contractAddress}
          </Typography.Text>
        )}
      </Typography.Paragraph>
    </>
  );
};
