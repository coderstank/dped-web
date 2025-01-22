import React, { useEffect, useState } from "react";
import { Select, Button, Row, Col, Form, Table, Checkbox, notification, Tag } from "antd";
import { DROPDOWNS } from "../utills/common";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getAllCandidates } from "../api/auth";

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
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const onFinish = (values) => {
    console.log("Form values:", values);
    
  };

  const handleSelectChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedStudents([]); 
    } else {
      setSelectedStudents(students.map((student) => student.id)); 
    }
    setIsAllSelected(!isAllSelected); 
  };

  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={
            selectedStudents.length > 0 && selectedStudents.length < students.length
          }
          checked={isAllSelected}
          onChange={handleSelectAllChange}
        />
      ),
      key: "select",
      render: (text, record) => (
        <Checkbox
          checked={selectedStudents.includes(record.id)}
          onChange={() => handleSelectChange(record.id)}
        />
      ),
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
      title: "Status",
      key: "application_state",
      render: (text, record) => (
        <span>
          {record.application_state == "saved" ? (
           <Tag color="yellow" title="Pending">Pending</Tag>
          ) : (
            <Tag color="green" title="Pending">Submitted</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary"  onClick={() => navigate(`/edit-student/${record.id}`)}>
          Edit
        </Button>
      ),
    },
  ];

  const [data,setData] = useState([])
  const getAllRecords = async () => {
    try {
       const { data } = await getAllCandidates();
       setData(data)
       console.log(data)
    } catch (error) {
      notification.error({ message: error.message || "something went wrong" });
    }
  }

  useEffect(()=>{
    getAllRecords()
  },[])

  return (
    <div>
      <Form onFinish={onFinish}>
        <Row gutter={16} style={{ display: "flex" }}>
        <Col span={12}>
          <h2>Students</h2>
        </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button onClick={() => navigate("/add-student")} type="primary">
              Add Student
            </Button>
          </Col>
        </Row>
      </Form>

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
}

export default Home;
