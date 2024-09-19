import {
  Button,
  Card,
  Layout,
  List,
  Modal,
  Statistic,
  Tag,
  Typography,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";
import { useCrypto } from "../../context/CryptoContext";
import { useState } from "react";

const siderStyle: React.CSSProperties = {
  padding: "1rem",
};

export default function AppSider() {
  const { assets } = useCrypto();
  const [modal, setModal] = useState(false);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit?.toFixed(2),
                withTag: true,
              },
              {
                title: "Asset Amount",
                value: Number(asset.amount),
                isPlain: true,
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value.toFixed(2)}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value}
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
          <Button
            style={{
              position: "relative",
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
            onClick={() => setModal(true)}
          >
            Delete Asset
          </Button>
          <Modal open={modal} onCancel={() => setModal(false)}>
            Do you really want to remove the {asset.name} from the portfolio?
          </Modal>
        </Card>
      ))}
    </Layout.Sider>
  );
}
