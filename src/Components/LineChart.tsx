import { Col, Row, Typography } from "antd";
import millify from "millify";
import React from "react";
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import moment from "moment";



const {Title} = Typography

const LineChart = ({coinHistory, currentPrice ,coinName}:any) => {
    Chart.register(CategoryScale);
  const coinPrice = []
  const coinTimesTamp = []
  for (let i = 0; i < coinHistory.data.history.length; i++) {
    coinPrice.push(coinHistory.data.history[i].price)
    coinTimesTamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString())
  }
  const data = {
    labels: coinTimesTamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        borderColor: '#0071bd',
        backgroundColor: '#0071bd',
        fill: false
      }
    ]
  };
  const option ={
    scales: {
        yAxis: [
            {
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    }
  }
  return <div>
     <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
        <Col className="price-container">
            <Title level={5} className='price-change'>{coinHistory.data.change} %</Title>
            <Title level={5} className='current-price'>Current {coinName} Price: $ {millify(Number(currentPrice))}</Title>
        </Col>
     </Row>
     <Line data={data} options={option} />
  </div>;
};

export default LineChart;
