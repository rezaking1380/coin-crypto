import {
  CaretDownOutlined,
  CaretUpOutlined,
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  ExclamationOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Alert, Avatar, Card, Col, Row, Select, Spin, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LineChart from "../Components/LineChart";
import { RootObject } from "../models/Api.model";
import { getCryptoDetails, getCryptoHistory } from "../Services/Api";
import "./cryptoDetails.css";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const formatMoney = (value: unknown) => {
  const num = Number(value);
  return Number.isFinite(num) ? `$${millify(num)}` : "\u2014";
};

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { coinId } = useParams();
  const coin = useSelector((state: RootObject) => state.coins.coin.coin);
  const coinHistory = useSelector((state: RootObject) => state.coins.coinHistory);
  const status = useSelector((state: RootObject) => state.coins.status);
  const error = useSelector((state: RootObject) => state.coins.error);
  const [timePeriod, setTimePeriod] = useState("7d");
  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  useEffect(() => {
    getCryptoDetails(dispatch, coinId);
    getCryptoHistory(dispatch, coinId, timePeriod);
  }, [coinId, timePeriod, dispatch]);

  if (status === "error") {
    return (
      <div className="main-coin">
        <Alert
          message="Could not load coin data"
          description={error || "Please check your connection and try again."}
          type="error"
          showIcon
        />
      </div>
    );
  }

  if (status === "loading" && !coin?.uuid) {
    return (
      <div className="main-coin coin-loading">
        <Spin size="large" aria-label="Loading coin data" />
      </div>
    );
  }

  const stats = [
    {
      title: "Price to USD",
      value: formatMoney(coin?.price),
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coin?.rank ?? "\u2014", icon: <NumberOutlined /> },
    {
      title: "24h volume",
      value: formatMoney(coin?.["24hVolume"]),
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: formatMoney(coin?.marketCap),
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high (daily avg.)",
      value: formatMoney(coin?.allTimeHigh?.price),
      icon: <ThunderboltOutlined />,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: coin?.numberOfMarkets ?? "\u2014",
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coin?.numberOfExchanges ?? "\u2014",
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: coin?.supply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationOutlined />,
    },
    {
      title: "Total Supply",
      value: formatMoney(coin?.supply?.total),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: formatMoney(coin?.supply?.circulating),
      icon: <ExclamationCircleOutlined />,
    },
  ];

  const changeNum = Number(coin?.change);
  const changeBadge = Number.isFinite(changeNum) ? (
    <span className={changeNum >= 0 ? "change-up" : "change-down"}>
      {changeNum >= 0 ? <CaretUpOutlined /> : <CaretDownOutlined />}{" "}
      {Math.abs(changeNum).toFixed(2)}%
    </span>
  ) : null;

  return (
    <div className="main-coin">
      <Card className="coin-hero">
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar size={56} src={coin?.iconUrl} alt={`${coin?.name ?? "coin"} icon`} />
          </Col>
          <Col flex="auto">
            <Title level={2} className="coin-name">
              {coin?.name} <Text type="secondary">({coin?.symbol})</Text>
            </Title>
            <Text type="secondary">Rank #{coin?.rank ?? "\u2014"}</Text>
          </Col>
          <Col className="hero-price">
            <Title level={2} className="hero-price-value">
              {formatMoney(coin?.price)}
            </Title>
            {changeBadge}
          </Col>
        </Row>
      </Card>

      <Card
        className="chart-card"
        title={`${coin?.name ?? "Coin"} Price Chart`}
        extra={
          <Select
            value={timePeriod}
            onChange={(value) => setTimePeriod(value)}
            className="select-time"
            aria-label="Select time range"
          >
            {time.map((date) => (
              <Option key={date} value={date}>
                {date}
              </Option>
            ))}
          </Select>
        }
      >
        <LineChart coinHistory={coinHistory} />
      </Card>

      <Row gutter={[16, 16]} className="stats-container">
        <Col xs={24} lg={12}>
          <Card title={`${coin?.name ?? "Coin"} value statistics`} className="stats-card">
            {stats.map(({ title, value, icon }) => (
              <div className="coin-stats" key={title}>
                <span className="coin-stats-name">
                  <span className="coin-stats-name-icon">{icon}</span>
                  <span className="coin-stats-name-title">{title}</span>
                </span>
                <Text className="stats">{value}</Text>
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Other statistics" className="stats-card">
            {genericStats.map(({ title, value, icon }) => (
              <div className="coin-stats" key={title}>
                <span className="coin-stats-name">
                  <span className="coin-stats-name-icon">{icon}</span>
                  <span className="coin-stats-name-title">{title}</span>
                </span>
                <Text className="stats">{value}</Text>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="coin-desc-link">
        <Col xs={24} lg={14}>
          <Card title={`What is ${coin?.name ?? "this coin"}?`}>
            <Paragraph>
              {coin?.description
                ? HTMLReactParser(coin.description)
                : "No description available."}
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title={`${coin?.name ?? "Coin"} links`}>
            {coin?.links?.map((link) => (
              <div className="coin-link" key={link.name}>
                <Text strong>{link.type}</Text>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CryptoDetails;
