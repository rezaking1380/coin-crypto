import {
  Alert,
  Button,
  Card,
  Skeleton,
  Statistic,
  Typography,
} from "antd";
import {
  DollarCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import millify from "millify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootObject } from "../models/Api.model";
import { getCoins } from "../Services/Api";
import CryptoCurrencies from "./CryptoCurrencies";
import "./homePage.css";

const formatStat = (value: unknown, money = false) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "\u2014";
  return (money ? "$" : "") + millify(num);
};

const statCards = (stats: any) => [
  { title: "Total Cryptocurrencies", value: stats?.totalCoins, icon: <NumberOutlined /> },
  { title: "Total Exchanges", value: stats?.totalExchanges, icon: <MoneyCollectOutlined /> },
  { title: "Total Market Cap", value: stats?.totalMarketCap, money: true, icon: <DollarCircleOutlined /> },
  { title: "Total 24h Volume", value: stats?.total24hVolume, money: true, icon: <ThunderboltOutlined /> },
  { title: "Total Markets", value: stats?.totalMarkets, icon: <FundOutlined /> },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state: RootObject) => state.coins.coins.stats);
  const status = useSelector((state: RootObject) => state.coins.status);
  const error = useSelector((state: RootObject) => state.coins.error);
  const [count] = useState(10);
  useEffect(() => {
    if (status !== "success" && status !== "loading") getCoins(dispatch, count);
  }, [count, status, dispatch]);
  const loading = status === "loading";

  return (
    <div className="crypto-status">
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>

      {status === "error" ? (
        <Alert
          message="Could not load market data"
          description={error || "Please check your connection and try again."}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      ) : (
        <div className="stat-grid">
          {statCards(stats).map(({ title, value, money, icon }) => (
            <Card className="stat-card" hoverable key={title}>
              <Skeleton loading={loading} active paragraph={{ rows: 1 }}>
                <Statistic
                  title={title}
                  value={formatStat(value, money)}
                  prefix={<span className="stat-icon">{icon}</span>}
                />
              </Skeleton>
            </Card>
          ))}
        </div>
      )}

      <div className="home-heading-container">
        <Typography.Title level={3} className="home-heading-container-title">
          Top 10 Cryptocurrencies
        </Typography.Title>
        <Link to="/cryptocurrencies">
          <Button type="link">Show more</Button>
        </Link>
      </div>
      <CryptoCurrencies simplified={count} />
    </div>
  );
};

export default HomePage;
