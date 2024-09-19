import { Button, Drawer, Layout, Modal, Select, Space } from "antd";
import { useCrypto } from "../../context/CryptoContext";
import { useEffect, useState } from "react";
import { CoinInfoModal } from "../CoinInfoModal";
import { Crypto } from "../../types";
import { AddAssetForm } from "../AddAssetForm";

const headerStyle: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const { crypto } = useCrypto();
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState<Crypto>();

  useEffect(() => {
    const keypress = (event: KeyboardEvent) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  const handleSelect = (value: string) => {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const onClose = () => {
    setDrawer(false);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        style={{ width: 250 }}
        onSelect={handleSelect}
        value="press / to open"
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button onClick={() => setDrawer(true)} type="primary">
        Add Asset
      </Button>
      <Modal footer={null} open={modal} onCancel={handleCancel}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        title="Add Asset"
        onClose={onClose}
        open={drawer}
        width={600}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
