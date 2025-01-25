import React, { useState } from 'react'
import "../css/pages/login.css";
import { Form, Input, Button, notification } from 'antd';
import { loginUser } from "../api/auth";
import { login } from "../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  const [loginState, setLoginState] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const onFinishLogin = async (values) => {
    try {
      setLoading(true)
      const { data } = await loginUser(values);
      dispatch(login(data));
      notification.success({ message :  "Welcome Sir" });
      navigate("/");
    } catch (error) {
      notification.error({ message: error.message || "something went wrong" });
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img className="logo-image" src="/images/biharlogo.png" alt="" />

        <div>
          <h2 style={{ color: "red" }}>D P. ED. EXAMINATION (SESSION 2025-27) </h2>
          <h3 style={{ color: "red", textAlign: "center" }}>APPLICATION FORM</h3>
        </div>
        <div>
          <p>Help Mobile-: +91 82102 68047</p>
        </div>
      </div>


      <div className="login-content">
        <div className="form-container">
          <div className="form-content">
            <div className="content">
              {loginState === "login" && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: "16px" }}>
                    <h1>Login</h1>
                  </div>
                  <Form
                    name="loginForm"
                    onFinish={onFinishLogin}
                    layout="vertical"
                  >
                    <Form.Item
                      label="College Code"
                      name="code"
                      rules={[
                        {
                          required: true,
                          message: "Please enter College Code",
                        },
                      ]}
                    >
                      <Input placeholder="College code" />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password",
                        },
                      ]}
                    >
                      <Input.Password placeholder="password" />
                    </Form.Item>
                    <Form.Item>
                      <Button disabled={loading} type="primary" htmlType="submit">
                        Log in
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
