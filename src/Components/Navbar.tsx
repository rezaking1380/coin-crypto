import { useEffect, useState } from "react";
import { Avatar, Button, Menu, Space, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import icon from "../assets/bitcoin.svg";
import {
  CloseOutlined,
  FundOutlined,
  GithubFilled,
  HomeOutlined,
  LinkedinFilled,
  MenuOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import "./navbar.css";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screen, setscreen] = useState(1000);
  const { pathname } = useLocation();
  const selectedKey = pathname.startsWith("/crypto") || pathname.startsWith("/cryptocurrencies")
    ? "cryptocurrencies"
    : pathname.startsWith("/exchanges")
    ? "exchanges"
    : "home";
  const clicked = () => {
    if (screen < 425) {
      setActiveMenu(false);
    }
  };
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
          <Avatar src={icon} size="large" className="logo-site" alt="CoinCrypto logo" />
          <Typography.Title level={2} className="logo">
            <Link to="/">CoinCrypto</Link>
          </Typography.Title>
        </div>
        <div className="main-menu-control-container">
          <Button
            className="menu-control-container"
            aria-label="Toggle navigation menu"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            {activeMenu ? <CloseOutlined /> : <MenuOutlined />}
          </Button>
        </div>
      </div>
      {activeMenu && (
        <>
          <Menu theme="dark" className="menu-open" onClick={clicked} selectedKeys={[selectedKey]}>
            <Menu.Item key="home" icon={<HomeOutlined className="menu-icons" />}>
              <Link to="/" className="menu-title">
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="cryptocurrencies" icon={<FundOutlined className="menu-icons" />}>
              <Link to="/cryptocurrencies" className="menu-title">
                CryptoCurrencies
              </Link>
            </Menu.Item>
            <Menu.Item key="exchanges" icon={<MoneyCollectOutlined className="menu-icons" />}>
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
            <Space className="footer-social">
              <a
                href="https://www.linkedin.com/in/reza-nangir/"
                target="_blank"
                rel="noreferrer"
                aria-label="Reza Nangir on LinkedIn"
              >
                <LinkedinFilled />
              </a>
              <a
                href="https://github.com/rezaking1380"
                target="_blank"
                rel="noreferrer"
                aria-label="Reza Nangir on GitHub"
              >
                <GithubFilled />
              </a>
            </Space>
            <Typography.Title level={5} className="footer-email">
              reza.ngr8@gmail.com
            </Typography.Title>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
