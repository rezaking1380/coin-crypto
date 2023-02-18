import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  ExclamationOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Col, Row, Select, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LineChart from "../Components/LineChart";
import { RootObject } from "../models/Api.model";
import { getCryptoDetails, getCryptoHistory } from "../Services/Api";
import "./cryptoDetails.css";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { coinId } = useParams();
  const coin = useSelector((stete: RootObject) => stete.coins.coin.coin);
  const coinHistory = useSelector(
    (stete: RootObject) => stete.coins.coinHistory
  );
  const [timePeriod, setTimePeriod] = useState("7d");
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  if (coin === undefined) {
    getCryptoDetails(dispatch, coinId);
  }
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coin?.price && millify(Number(coin?.price))}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coin?.rank, icon: <NumberOutlined /> },
    {
      title: "24h volume",
      value: `$ ${coin["24hVolume"] && millify(Number(coin["24hVolume"]))}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coin?.marketCap && millify(Number(coin?.marketCap))}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(Number(coin?.allTimeHigh?.price))}`,
      icon: <ThunderboltOutlined />,
    },
  ];
  const genericStats = [
    {
      title: "Number Of Markets",
      value: coin?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coin?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: coin?.supply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(Number(coin?.supply?.total))}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(Number(coin?.supply?.circulating))}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  useEffect(() => {
    getCryptoDetails(dispatch, coinId);
    getCryptoHistory(dispatch, coinId, timePeriod);
  }, [coinId, timePeriod]);
  return (
    <div className="main-coin">
      <Col className="coin-details-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {coin?.name} ({coin?.symbol}) Price
          </Title>
          <p>
            {coin?.name} live price in us dollars. View value statistics, market
            cap and supply.
          </p>
        </Col>
        <div className="main-select-time">
          <Select
            defaultValue="7d"
            className="select-time"
            placeholder="Select Time"
            onChange={(value) => setTimePeriod(value)}
          >
            {time.map((date) => (
              <Option key={date}>{date}</Option>
            ))}
          </Select>
        </div>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={coin.price}
          coinName={coin.name}
        />
        <Col className="stats-container">
          <Col className="coin-value">
            <Col className="coin-value-heading">
              <Title level={3} className="coin-details-heading">
                {coin?.name} value statistics
              </Title>
              <p>An overview showing the stats of {coin?.name}</p>
            </Col>
            {stats.map(({ title, value, icon }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text className="coin-stats-name-icon">{icon}</Text>
                  <Text className="coin-stats-name-title">{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="coin-value">
            <Col className="coin-value-heading">
              <Title level={3} className="coin-details-heading">
                Other statistics
              </Title>
              <p>An overview showing the stats of all cryptocurrencies</p>
            </Col>
            {genericStats.map(({ title, value, icon }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text className="coin-stats-name-icon">{icon}</Text>
                  <Text className="coin-stats-name-title">{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              what is {coin?.name}
              {HTMLReactParser(coin.description)}
            </Title>
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {coin?.name} Links
            </Title>
            {coin?.links.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </div>
  );
};

export default CryptoDetails;
