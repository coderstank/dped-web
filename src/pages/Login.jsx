import React, { useEffect, useState } from 'react'
import "../css/pages/login.css";
import { Form, Input, Button, notification } from 'antd';
import { getNotificationList, loginUser } from "../api/auth";
import { login, setUser } from "../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Login() {
  const [loginState, setLoginState] = useState("login");
  const [notificationList, setNotificationList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const { data } = await getNotificationList();
        setNotificationList(data);
      } catch (error) {
        notification.error({
          message: error.message || "something went wrong",
        });
      }
    };
    fetchNotification();
  }, []);


  const onFinishLogin = async (values) => {
    try {
      setLoading(true)
      const { data } = await loginUser(values);
      console.log(data)
      dispatch(login(data.token));
      dispatch(setUser(data.user));
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
          <h2 style={{ color: "red" }}>D P. ED. EXAMINATION (SESSION 2024-26) </h2>
          <h3 style={{ color: "red", textAlign: "center" }}> REGISTRATION FORM</h3>
        </div>
        <div>
          <p>Help Mobile-: +91 82102 68047</p>
        </div>
      </div>


      <div className="login-content">
        <div className="form-container">
        <div className="information">
            {" "}
            <h2> Important Links</h2>
            <ol>
                {notificationList.map((file) => (
                  <li style={{ padding: "12px" }}>
                    <a
                      style={{ textTransform: "uppercase" }}
                      href={`${import.meta.env.VITE_BASE_URL}/files/others/${
                        file.filename
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.label}
                    </a>
                    {file.is_new && (
                      <span>
                        <img src="/images/New.gif" alt="" />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
           
          </div>


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
