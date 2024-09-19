import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
} from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../context/CryptoContext";
import { Crypto, DataForm, NewAssetType } from "../types";
import { CoinInfo } from "./CoinInfo";

type FieldType = {
  amount?: number;
  price?: number;
  total?: number;
  date?: Date;
};

type Props = {
  onClose: () => void;
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} in not valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export const AddAssetForm = ({ onClose }: Props) => {
  const { crypto, AddAsset } = useCrypto();
  const [form] = Form.useForm();
  const [coin, setCoin] = useState<Crypto>();
  const [submitted, setSabmitted] = useState(false);
  const assetRef = useRef<NewAssetType | null>(null);

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current?.amount} of ${coin?.name} by price ${assetRef.current?.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
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
    );
  }

  const onFinish = (values: DataForm) => {
    const newAsset = {
      id: coin.id,
      name: coin.name,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    console.log("Success:", values);
    assetRef.current = newAsset;
    AddAsset(newAsset);
    setSabmitted(true);
  };

  const handlAmountChange = (value: number | null) => {
    if (!value) {
      return;
    }
    const price = form.getFieldValue("price");

    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };
  const handlPriceChange = (value: number | null) => {
    if (!value) {
      return;
    }
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />
      <Form.Item<FieldType>
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          style={{ width: "100%" }}
          onChange={handlAmountChange}
        />
      </Form.Item>
      <Form.Item<FieldType> label="Price" name="price">
        <InputNumber onChange={handlPriceChange} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item<FieldType> label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item<FieldType> label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};
