import { ConfigProvider, Layout } from "antd";
import "antd/dist/reset.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import CryptoCurrencies from "./Pages/CryptoCurrencies";
import CryptoDetails from "./Pages/CryptoDetails";
import Exchanges from "./Pages/Exchanges";
import HomePage from "./Pages/HomePage";
import { appTheme } from "./theme";

function App() {
  return (
    <ConfigProvider theme={appTheme}>
      <div className="App">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
                <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              </Routes>
            </div>
          </Layout>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
