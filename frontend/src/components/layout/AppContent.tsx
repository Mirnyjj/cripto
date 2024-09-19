import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/CryptoContext";
import { Crypto } from "../../types";
import { PortfolioChart } from "../PortfolioChart";
import { AssetsTable } from "../AssetsTable";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { crypto, assets } = useCrypto();
  const cryptoPriceMap = crypto.reduce(
    (acc: Record<string, number>, c: Crypto) => {
      acc[c.id] = c.price;
      return acc;
    },
    {} as Record<string, number>
  );
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => {
            return asset.amount * cryptoPriceMap[asset.id];
          })
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
