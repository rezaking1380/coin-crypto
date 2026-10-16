import { Alert, Avatar, Col, Collapse, Row, Typography } from "antd";
import millify from "millify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootObject } from "../models/Api.model";
import { getExchanges } from "../Services/Api";
import "react-loading-skeleton/dist/skeleton.css";
import "./exchanges.css";

const { Text } = Typography;
const { Panel } = Collapse;

const formatCompact = (value: unknown) => {
  const num = Number(value);
  return Number.isFinite(num) ? millify(num) : "\u2014";
};

const Exchanges = () => {
  const dispatch = useDispatch();
  const exchanges = useSelector((state: RootObject) => state.coins.exchanges);
  const exchangeList = exchanges.coins;
  const status = useSelector((state: RootObject) => state.coins.status);
  useEffect(() => {
    getExchanges(dispatch);
  }, []);
  return (
    <div>
      {status === "error" && (
        <Alert
          message="Could not load exchanges"
          description="Please check your connection and try again."
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      <Row className="exchange-title">
        <Col span={8}>Exchanges</Col>
        <Col span={8}>24h Trade Volume</Col>
        <Col span={8}>Markets</Col>
      </Row>
      <Row className="exchange-container">
        {exchangeList?.map((exchange) => (
          <Col span={24} className="exchange-col" key={exchange.uuid}>
            <Collapse>
              <Panel
                className="panel"
                key={exchange.uuid}
                showArrow={false}
                header={
                  <Row className="exchange-panel-title">
                    <Col span={8} className="exchange-panel-title-name">
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange.iconUrl}
                        alt={exchange.name}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={8}>{formatCompact(exchange["24hVolume"])}</Col>
                    <Col span={8}>{formatCompact(exchange.numberOfMarkets)}</Col>
                  </Row>
                }
              ></Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Exchanges;
