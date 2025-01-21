import React from "react";
import { Button } from "antd";
import "../css/components/navbar.css";

const Navbar = () => {

  
  return (
    <div className="navbar-container">
      <div style={{ display: "flex" }}></div>
      <div className="navbar-left-container">
        <Button >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
