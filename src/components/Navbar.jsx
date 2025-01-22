import React from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authSlice";
import "../css/components/navbar.css";

const Navbar = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const onLogout = async () => {
    dispatch(logout());
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className="navbar-container">
      <div style={{ display: "flex" }}></div>
      <div className="navbar-left-container">
      <p>{user?.name}</p>
        <Button onClick={onLogout} icon={<LogoutOutlined />}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
