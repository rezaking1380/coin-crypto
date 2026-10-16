import { Alert, Avatar, Table, Typography } from "antd";
import millify from "millify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootObject } from "../models/Api.model";
import { getExchanges } from "../Services/Api";
import "./exchanges.css";

const formatCompact = (value: unknown) => {
  const num = Number(value);
  return Number.isFinite(num) ? millify(num) : "\u2014";
};

const columns: any[] = [
  {
    title: "#",
    dataIndex: "rank",
    key: "rank",
    width: 70,
    render: (rank: number) => <Typography.Text strong>{rank}</Typography.Text>,
    sorter: (a: any, b: any) => a.rank - b.rank,
  },
  {
    title: "Exchange",
    dataIndex: "name",
    key: "name",
    render: (_: unknown, exchange: any) => (
      <span className="exchange-cell">
        <Avatar src={exchange.iconUrl} alt={`${exchange.name} icon`} size="small" />
        <Typography.Text strong>{exchange.name}</Typography.Text>
      </span>
    ),
  },
  {
    title: "24h Volume",
    dataIndex: "24hVolume",
    key: "volume",
    align: "right",
    render: (value: unknown) => formatCompact(value),
    sorter: (a: any, b: any) => Number(a["24hVolume"]) - Number(b["24hVolume"]),
  },
  {
    title: "Markets",
    dataIndex: "numberOfMarkets",
    key: "markets",
    align: "right",
    render: (value: unknown) => formatCompact(value),
    sorter: (a: any, b: any) => Number(a.numberOfMarkets) - Number(b.numberOfMarkets),
  },
];

const Exchanges = () => {
  const dispatch = useDispatch();
  const exchanges = useSelector((state: RootObject) => state.coins.exchanges);
  const status = useSelector((state: RootObject) => state.coins.status);
  useEffect(() => {
    getExchanges(dispatch);
  }, [dispatch]);

  return (
    <div className="exchanges-page">
      <Typography.Title level={2}>Exchanges</Typography.Title>
      {status === "error" && (
        <Alert
          message="Could not load exchanges"
          description="Please check your connection and try again."
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Table
        columns={columns}
        dataSource={exchanges.coins}
        rowKey="uuid"
        loading={status === "loading"}
        pagination={{ pageSize: 15, showSizeChanger: false }}
        scroll={{ x: 480 }}
      />
    </div>
  );
};

export default Exchanges;
