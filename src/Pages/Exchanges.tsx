import { Avatar, Col, Collapse, Row, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootObject } from "../models/Api.model";
import { getCryptoDetails, getExchanges } from "../Services/Api";
import 'react-loading-skeleton/dist/skeleton.css'
import './exchanges.css'

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const dispatch = useDispatch()
  const exchanges = useSelector((state: RootObject) => state.coins.exchanges);
  const description = useSelector((stete: RootObject) => stete.coins.coin.coin.description);
  const [coinId, setCoinId] = useState('Qwsogvtv82FCd');
  const status = useSelector((state: RootObject) => state.coins.status);
  const exchangeList = exchanges.coins
  console.log(exchanges)
  const getCoin = (id:string) => {
    getCryptoDetails(dispatch,coinId)
    setCoinId(id)
  }
  useEffect(() => {
    getExchanges(dispatch)
  }, ['']);
  return (
    <div>
      <Row className="exchange-title">
        <Col span={6}> Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Price</Col>
      </Row>
      <Row>
        {exchangeList?.map((exchange) => (
          <Col span={24} onClick={() => getCoin(exchange.uuid)} className='exchange-col'>
            <Collapse>
            <Panel
            className="panel"
            key={exchange.uuid}
            showArrow={false}
            header={(
              <Row key={exchange.uuid} className='exchange-panel-title'>
                <Col span={6}>
                  <Text><strong> {exchange.rank}.</strong></Text>
                  <Avatar className="exchange-image" src={exchange.iconUrl} />
                  <Text><strong> {exchange.name}</strong></Text>
                </Col>
                <Col span={6}>{millify(Number(exchange["24hVolume"]))}</Col>
                <Col span={6}>{millify(Number(exchange.numberOfMarkets))}</Col>
                <Col span={6}>$ {millify(Number(exchange.price))}</Col>
              </Row>
            )}
            >
              {status === 'loading' ? <Skeleton count={8} height={30} /> : HTMLReactParser(description)}
            </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Exchanges;
