import { Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootObject } from "../models/Api.model";
import { getCoins } from "../Services/Api";
import CryptoCurrencies from "./CryptoCurrencies";
import './homePage.css'

const HomePage = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state: RootObject) => state.coins.coins.stats);
  const status = useSelector((state: RootObject) => state.coins.status);
  const [count, setcount] = useState(10);
  const clicked = () => setcount(100)
  useEffect(() => {
    if (status !== "success") getCoins(dispatch,count);
  }, [count]);
  return (
    <div className="crypto-status">
      <Typography.Title level={2} className="heading">
        Global Crypto Status
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total " value={millify(stats?.total)} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total CryptoCurrencies"
            value={millify(stats?.totalCoins)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(stats?.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(Number(stats?.totalMarketCap))} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(Number(stats?.total24hVolume))} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(stats?.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Typography.Title level={2} className='home-heading-container-title'>Top 10 CryptoCurrencies in the world</Typography.Title>
        <Typography.Title level={3} onClick={clicked} className='home-heading-container-title'><Link to='/cryptocurrencies'>Show More</Link></Typography.Title>
      </div>
      <CryptoCurrencies simplified={count} />
    </div>
  );
};

export default HomePage;
