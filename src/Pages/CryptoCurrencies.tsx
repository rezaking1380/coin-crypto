import { Alert, Card, Col, Empty, Input, Row, Skeleton } from "antd";
import millify from "millify";
import { useEffect, useState } from "react";
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

  // Fetch the full list when opened directly (e.g. deep link), not only via Home
  useEffect(() => {
    if (!simplified && cryptoList.length < count && status !== "loading") {
      getCoins(dispatch, count);
    }
  }, [cryptoList, count, simplified, status, dispatch]);

  useEffect(() => {
    window.scroll(0,0)
    const filterData = cryptoList.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    setCryptos(filterData)
  }, [cryptoList,search]);

  const loading = status === "loading" && cryptos.length === 0;

  return (
  <div className="crypto-card-main">
    {status === "error" && (
      <Alert
        message="Could not load cryptocurrencies"
        description="Please check your connection and try again."
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    )}
    {count === 100 && (
      <div className="search-crypto">
      <Input placeholder="Search CryptoCurrencies" aria-label="Search cryptocurrencies" onChange={(e) => setSearch(e.target.value)} />
      </div>
    )}
    {loading ? (
      <Row gutter={[16,16]} className='crypto-card-container'>
        {Array.from({ length: count }).map((_, i) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={i}>
            <Card><Skeleton active paragraph={{ rows: 2 }} /></Card>
          </Col>
        ))}
      </Row>
    ) : cryptos.length === 0 ? (
      <Empty description={search ? "No coins match your search" : "No cryptocurrencies found"} />
    ) : (
    <Row gutter={[16,16]} className='crypto-card-container'>
      {cryptos.slice(0,count).map((crypto) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.uuid}>
          <Link to={`/crypto/${crypto.uuid}`} aria-label={`${crypto.name} details`}>
            <Card title={`${crypto.rank}. ${crypto.name}`}
            extra={<img className="crypto-image" src={crypto.iconUrl} alt={`${crypto.name} icon`} />}
            hoverable
            >
              <p>Price: <strong>{millify(Number(crypto.price))}</strong></p>
              <p>Market Cap: {millify(Number(crypto.marketCap))}</p>
              <p>Daily Change: {millify(Number(crypto.change))}%</p>
            </Card>
          </Link>
        </Col>
      ))
      }
    </Row>
    )}
    </div>
    )
};

export default CryptoCurrencies;
