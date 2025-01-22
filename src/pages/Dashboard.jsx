import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
import { Outlet } from "react-router-dom";
import { Layout, Button, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import Home from "./home";
import Students from "./Students";

const { Header, Sider, Content } = Layout;
function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{minHeight:"100vh"}}>
        <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
        }}
        width={250}
        className="print"
      >
        <div className="demo-logo-vertical" />
        <Sidebar />
      </Sider>  
      <Layout
        style={{ marginLeft: collapsed ? 80 : 250,flex:1 }}
        className="layout-print"
      >
        <div
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "fixed",
            display: "flex",
            left: collapsed ? 80 : 250,
            right: 0,
            zIndex: 1,
          }}
          className="print"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            className="print"
          />
          <Navbar />
        </div>
        <Content
          style={{
            margin: "80px 16px 24px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="content-print"
        >
          
          <Outlet />
          {/* <Home/> */}
          {/* <Students/> */}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
