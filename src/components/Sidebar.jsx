import React, { useEffect, useState } from "react";

import { Menu } from "antd";
import { FileOutlined, DollarOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const items=[
    {
      key: "1",
      icon: <DollarOutlined />,
      label: <Link to="/">Dashboard</Link>,
  },
   { 
        key:'2',
        icon:<FileOutlined />,
        label:<Link to="/students">Students</Link>,
   },
  
   {
        key: "3",
        icon:  <CreditCardOutlined  />,
        label: <Link to="payment">Payment</Link>,
  },
   
]

function Sidebar() {
    const [selectedKeys, setSelectedKeys] = useState(
        JSON.parse(localStorage.getItem("activeMenu")) || ["1"]
      );

      const [openKeys, setOpenKeys] = useState(
        JSON.parse(localStorage.getItem("openSubMenu")) || []
      );
    
      const handleMenuClick = ({ key, keyPath }) => {
        setSelectedKeys(keyPath);
        setOpenKeys(keyPath.slice(0, -1)); 
        localStorage.setItem("activeMenu", JSON.stringify(keyPath));
        localStorage.setItem("openSubMenu", JSON.stringify(keyPath.slice(0, -1)));
      };

      useEffect(() => {
        return () => {
          localStorage.removeItem("activeMenu");
          localStorage.removeItem("openSubMenu");
        };
      }, []);
  return (
    <Menu
      theme="dark"
      items={items}
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={(keys) => setOpenKeys(keys)}
      onClick={handleMenuClick}
    ></Menu>
  )
}

export default Sidebar
