import React from "react";
import { Button, Flex, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authSlice";
import "../css/components/navbar.css";

const Navbar = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log('user',user?.name)
  const navigate = useNavigate();
  const onLogout = async () => {
    dispatch(logout());
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="navbar-container">
        <Flex style={{width:'100%'}} align="center" justify="space-between">

      <Typography.Title className="cname"  level={5} style={{textTransform:'uppercase',color:'white',margin:0}}>{user?.name}</Typography.Title>
        <Button onClick={onLogout} icon={<LogoutOutlined />}>
          Logout
        </Button>
        </Flex>
    </div>
  );
};

export default Navbar;
