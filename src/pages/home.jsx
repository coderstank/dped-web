import React, { useState } from "react";
import { Select, Button, Row, Col, Form, Table, Space } from "antd";
import { DROPDOWNS } from "../utills/common";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const staticStudents = [
    {
      id: 1,
      name: "John Doe",
      father_name: "Michael Doe",
      dob: "15/08/2005",
      reg_no: "REG123",
      state: "saved",
    },
    {
      id: 2,
      name: "Jane Smith",
      father_name: "Robert Smith",
      dob: "22/11/2004",
      reg_no: "REG456",
      state: "approved",
    },
    {
      id: 3,
      name: "Sam Wilson",
      father_name: "Peter Wilson",
      dob: "10/02/2006",
      reg_no: "REG789",
      state: "saved",
    },
  ];

  const [students, setStudents] = useState(staticStudents);

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Since the data is static, no API call is made here.
  };

  
  const columns = [
    {
      title: "S.No",
      dataIndex: "s_no",
      key: "serial no",
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "student Name",
    },
    {
      title: "Father Name",
      dataIndex: "father_name",
      key: "father name ",
    },
    {
      title: "DOB",
      render: (text, record) => (
        <span>{moment(record.dob, "DD/MM/YYYY").format("DD-MM-YYYY")}</span>
      ),
      key: "dob",
    },
    {
      title: "Registration Number",
      dataIndex: "reg_no",
      key: "registration_no",
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        <span>
          {record.state === "saved" ? (
            <p style={{ color: "#942210" }}>Pending</p>
          ) : (
            <p style={{ color: "green" }}>{record.state}</p>
          )}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" >
          View
        </Button>
      ),
    },
  ];


  return (
    <div    >
      <Form onFinish={onFinish} >
        <Row gutter={16}   style={{ display:"flex"}}>
          <Col span={6}>
            <Form.Item
              name="session"
              rules={[{ required: true, message: "Please select a session" }]}
            >
              <Select
                options={DROPDOWNS.SESSION}
                style={{ width: "100%" }}
                placeholder="Select Session"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="year"
              rules={[{ required: true, message: "Please select a year" }]}
            >
              <Select
                options={DROPDOWNS.YEAR}
                style={{ width: "100%" }}
                placeholder="Select year"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="exam_type"
              rules={[
                { required: true, message: "Please select an exam type" },
              ]}
            >
              <Select
                options={DROPDOWNS.EXAM_TYPE}
                style={{ width: "100%" }}
                placeholder="Exam Type"
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button  onClick={() => navigate("/dashboard/add-student")} type="primary" >
              Add Student
            </Button>
          </Col>
        </Row>
      </Form>

      <Table
        dataSource={students.map((s, i) => ({ ...s, s_no: i + 1 }))}
        columns={columns}
        pagination={false}
      />

    </div>
  );
}

export default Home;
