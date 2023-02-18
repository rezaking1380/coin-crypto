import React, { useEffect, useState } from "react";
import { Avatar, Button, Menu, Space, Typography } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import icon from "../assets/bitcoin.svg";
import {
  BulbOutlined,
  CloseOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import "./navbar.css";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screen, setscreen] = useState(1000);
  const clicked = () => {
    if (screen < 425) {
      setActiveMenu(false)
    }
  }
  useEffect(() => {
    const handelResize = () => setscreen(window.innerWidth);
    window.addEventListener("resize", handelResize);
    handelResize();
    return () => window.removeEventListener("resize", handelResize);
  }, []);
  useEffect(() => {
    if (screen < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screen]);

  return (
    <div className={activeMenu ? "nav-container" : "nav-container-close"}>
      <div className="logo-container">
        <div className="logo-title-icon">
        <Avatar src={icon} size="large" className="logo-site" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CoinCrypto</Link>
        </Typography.Title>
        </div>
        <div className="main-menu-control-container">
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          {activeMenu ? <CloseOutlined /> : <MenuOutlined />}
        </Button>
        </div>
        
      </div>
      {activeMenu && (
        <>
          <Menu theme="dark" className="menu-open" onClick={clicked}>
            <Menu.Item icon={<HomeOutlined className="menu-icons" />}>
              <Link to="/" className="menu-title">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined className="menu-icons" />}>
              <Link to="/cryptocurrencies" className="menu-title">
                CryptoCurrencies
              </Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined className="menu-icons" />}>
              <Link to="/exchanges" className="menu-title">
                Exchanges
              </Link>
            </Menu.Item>
          </Menu>
          <div className="footer">
            <Typography.Title level={5} className="footer-title">
              CoinCrypto <br />
              All rights reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
