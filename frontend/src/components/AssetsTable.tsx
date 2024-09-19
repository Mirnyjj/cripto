import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useCrypto } from "../context/CryptoContext";

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  amount: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export const AssetsTable: React.FC = () => {
  const { assets } = useCrypto();

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
  }));
  return <Table pagination={false} columns={columns} dataSource={data} />;
};
