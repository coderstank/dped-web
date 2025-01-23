import React, { useEffect, useState } from "react";
import { Select, Button, Row, Col, Form, Table, Checkbox, notification, Tag, Modal, Input, Space } from "antd";
import { DROPDOWNS } from "../utills/common";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getAllCandidates, Payment } from "../api/auth";
import UploadFile from "../components/UploadFile";
import Title from "antd/es/typography/Title";

function Home() {
  const navigate = useNavigate();
 const [form] = Form.useForm();
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]); 
  const [paymentAmount, setPaymentAmount] = useState("");
 

  const handlePayClick = () => {
    setSelectedIds(selectedStudents);
    setIsModalVisible(true); 
  };

  const handleModalOk = () => {
    setIsModalVisible(false); 
    notification.success({ message: "Payment processed successfully!" });
    console.log("Selected IDs:", selectedIds);
    console.log("Payment Amount:", paymentAmount);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); 
  };
console.log(selectedStudents)
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

  const [data,setData] = useState([])
  const getAllRecords = async () => {
    try {
       const { data } = await getAllCandidates();
       setData(data)
    } catch (error) {
      notification.error({ message: error.message || "something went wrong" });
    }
  }

  const onFinishPayment = async (values) => {
        try {
          values.candidates=selectedStudents
          const data = await Payment(values);
          notification.success('payment marked successful')
          getAllRecords()
          setSelectedStudents([])
          handleModalCancel()
          form.resetFields()
        } catch (error) {
          notification.error({ message: error.message || "something went wrong" });
        }
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
          disabled={students.some(student => student.application_state === "submitted")}
        />
      ),
      key: "select",
      render: (text, record) => (
        <Checkbox
          checked={selectedStudents.includes(record.id)}
          onChange={() => handleSelectChange(record.id)}
          disabled={record.application_state === "submitted"}
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
        <>
        <Button type="primary"  onClick={() => navigate(`/edit-student/${record.id}`)}
        disabled={record.application_state === "submitted"}
        >
          Edit
        </Button>
        
       </>
      ),
    },
  ];



  useEffect(()=>{
    getAllRecords()
  },[])

  return (
    <div>
      <Form >
        <Row gutter={16} style={{ display: "flex" }}>
        <Col span={12}>
          <Title level={3}>Students</Title>
        </Col>
        <Col  span={12} style={{ textAlign: "right" }}>
          <Space>
            <Button onClick={() => navigate("/add-student")} type="primary">
              Add Student
            </Button>
            <Button disabled={!selectedStudents.length>0} onClick={handlePayClick} type="default">
              Pay Now
            </Button>
          </Space>
        </Col>
        </Row>
      </Form>

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
      />

      <Modal
      title="Payment Confirmation"
      onCancel={handleModalCancel}
      visible={isModalVisible}
      footer={null} 
      >
      <div span={12}>
        <div>
          <p
            style={{
              color: "black",
              margin: "12px 0",
            }}
          >
            Upload Signature with White Background (Signature Size 10 KB to 50 KB) only .jpg
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Form
              form={form}
              onFinish={onFinishPayment}
            >
            {/* <Form.Item
              name={"candidates"}
              label={"Candidates"}
              rules={[{ required: true, message: "Please select candidates" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select candidates"
                options={data.map((student) => ({
                  label: student.name,
                  value: student.id,
                }))}
                
              />
            </Form.Item> */}

            <Form.Item
              name={"payment_amount"}
              label={"Payment Amount"}
              rules={[{ required: true, message: "Please enter the payment amount" }]}
            >
              <Input
                type="number"
                placeholder="Enter payment amount"
                
              />
            </Form.Item>
            <Form.Item
              name={"payment_file"}
              label={"Payment Receipt"}
              rules={[{ required: true, message: "Please upload the payment receipt" }]}
            >
              <UploadFile
                setFile={(e) => {
                  form.setFieldValue(["payment_file"], e);
                  form.validateFields(["payment_file"]);
                }}
                showFile={false}
                type={"payment_file"}
                meta={{
                  fileTypes: ["image/png", "image/jpg", "image/jpeg"],
                  maxSize: 50,
                  minSize: 10,
                }}
                id={new Date().getDate().toString()}
                file={form.getFieldValue(["payment_file"])}
              />
              <Form.Item
                noStyle
                shouldUpdate={(prev, curr) => prev.payment_file !== curr.payment_file}
              >
                {() => {
                  const fileUrl = form.getFieldValue(["payment_file"]);
                  return (
                    fileUrl && (
                      <div style={{ margin: "16px 0" }}>
                        <img
                          src={`${fileUrl}?${performance.now()}`}
                          alt="payment receipt"
                          style={{
                            height: "150px",
                            width: "150px",
                            border: "1px solid black",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )
                  );
                }}
              </Form.Item>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      </Modal>;

    </div>
  );
}

export default Home;
