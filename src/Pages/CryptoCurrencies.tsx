import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootObject } from "../models/Api.model";
import { getCoins } from "../Services/Api";
import "./cryptoCurrencies.css"

const CryptoCurrencies = ({simplified}:any) => {
  const dispatch = useDispatch();
  const count = simplified ? 10 : 100
  const cryptoList = useSelector((state:RootObject) => state.coins.coins.coins)
  const [cryptos, setCryptos] = useState(cryptoList);
  const status = useSelector((state:RootObject) => state.coins.status)
  const [search, setSearch] = useState('');
  useEffect(() => {
    window.scroll(0,0)
    const filterData = cryptoList.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    setCryptos(filterData)
  }, [cryptoList,search]);
  

  return (
  <div className="crypto-card-main">
    {count === 100 && (
      <div className="search-crypto">
      <Input placeholder="Search CryptoCurrencies" onChange={(e) => setSearch(e.target.value)} />
      </div>
    )}
    <Row gutter={[32,32]} className='crypto-card-container'>
      {cryptos.slice(0,count).map((crypto) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
          <Link to={`/crypto/${crypto.uuid}`}>
            <Card title={`${crypto.rank} . ${crypto.name}`}
            extra={<img className="crypto-image" src={crypto.iconUrl} />}
            hoverable
            >
              <p>Price : {millify(Number(crypto.price))}</p>
              <p>Market Cap : {millify(Number(crypto.marketCap))}</p>
              <p>Daily Change : {millify(Number(crypto.change))}</p>
            </Card>
          </Link>
        </Col>
      ))
      }
    </Row>
    </div>
    )
};

export default CryptoCurrencies;
