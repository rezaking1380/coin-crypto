import millify from "millify";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const chartOptions: any = {
  responsive: true,
  plugins: {
    legend: { labels: { color: "#9aa4b2", boxWidth: 12 } },
  },
  scales: {
    x: {
      ticks: { color: "#9aa4b2", maxTicksLimit: 8, maxRotation: 0 },
      grid: { color: "rgba(255,255,255,0.06)" },
    },
    y: {
      ticks: {
        color: "#9aa4b2",
        callback: (v: number | string) => `$${millify(Number(v))}`,
      },
      grid: { color: "rgba(255,255,255,0.06)" },
    },
  },
};

const LineChart = ({ coinHistory }: any) => {
  const history = coinHistory?.data?.history ?? [];
  const coinPrice: string[] = [];
  const coinTimesTamp: string[] = [];
  for (let i = 0; i < history.length; i++) {
    coinPrice.push(history[i].price);
    coinTimesTamp.push(
      new Date(history[i].timestamp * 1000).toLocaleDateString()
    );
  }
  const data = {
    labels: coinTimesTamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        borderColor: "#f0b90b",
        backgroundColor: "rgba(240, 185, 11, 0.12)",
        fill: true,
        tension: 0.25,
        pointRadius: 0,
      },
    ],
  };
  return <Line data={data} options={chartOptions} aria-label="Price history chart" />;
};

export default LineChart;
