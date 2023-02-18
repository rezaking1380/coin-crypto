import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import Exchanges from "./Pages/Exchanges";
import CryptoCurrencies from "./Pages/CryptoCurrencies";
import CryptoDetails from "./Pages/CryptoDetails";
import { Layout } from "antd";
import 'antd/dist/reset.css';
import NotFound from "./Pages/NotFound";

function App() {
  return (
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
  );
}

export default App;
