import React, { useEffect, useState } from "react";
import { Select, Button, Row, Col, Form, Table, Checkbox, notification, Tag, Modal, Input, Space, Pagination } from "antd";
import { DROPDOWNS } from "../utills/common";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getAllCandidates, Payment } from "../api/auth";
import UploadFile from "../components/UploadFile";
import Title from "antd/es/typography/Title";

function Students() {
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

  const handleModalCancel = () => {
    setIsModalVisible(false); 
  };

  const handleSelectChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );


  };


  const [data,setData] = useState([])
  const [limit,setLimit]=useState(50)
  const [page,setPage]=useState(1)
  const [pageDetails,setPageDetails]=useState({})
  const getAllRecords = async (limit,page,application_state) => {
    try {
       const { data } = await getAllCandidates(limit,page,application_state);
       setData(data.docs)
       setPageDetails({...data,docs:[]})
    } catch (error) {
      notification.error({ message: error.message || "something went wrong" });
    }
  }

  const onFinishPayment = async (values) => {
        try {
          values.candidates=selectedStudents
          const data = await Payment(values);
          notification.success({message:'payment marked successful'})
          getAllRecords(limit,page,'')
          setSelectedStudents([])
          handleModalCancel()
          form.resetFields()
        } catch (error) {
          notification.error({ message: error.message || "something went wrong" });
        }
      };

  const columns = [
    {
      title: "Select",
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
      title: "Created At",
      render: (text, {created_at}) => (
        <span>{moment(created_at).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "Status",
      key: "application_state",
      render: (text, record) => (
        <span>
          {record.application_state == "saved" ? (
           <Tag color="yellow" title="Pending">Pending</Tag>
          ) : (
            <Tag color="green" title="Submitted">Submitted</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
        {record.application_state==="saved"?
        
      
        <Button   onClick={() => navigate(`/edit-student/${record.id}`)}
        >
          Edit
        </Button>:
        <Button type="primary"  onClick={() => navigate(`/preview/${record.id}`)}
        >
          Preview
        </Button> 
        }

       </>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <>
    //     <Button type="primary"  onClick={() => navigate(`/preview/${record.id}`)}
    //     >
    //       Preview
    //     </Button>
        
    //    </>
    //   ),
    // },
  ];



  useEffect(()=>{
    getAllRecords(limit,page,'')
  },[limit,page])

  const handleSelect = (value) => {
    getAllRecords(limit,1,value)
  }

  return (
    <div>
      <Form >
        <Row gutter={16} style={{ display: "flex" , alignItems:'center',marginBottom:20 }}>
        <Col span={12}>
          <Title level={3}>Students</Title>
        </Col>
        <Col  span={12} style={{ textAlign: "right" }}>
          <Space>
            <Button onClick={() => navigate("/add-student")} type="primary">
              Add Student
            </Button>
            <Button disabled={!selectedStudents.length>0} onClick={handlePayClick} type="default">
              Pay Now ({selectedStudents.length})
            </Button>
          <Select
          style={{width:120,textAlign:'left'}}
          defaultValue={''}
          onChange={handleSelect}
          options={[
            {label:'All',value:''},
            {label:'Pending',value:'saved'},
            {label:'Submitted',value:'submitted'}
          ]}
          />
          </Space>
        </Col>
        </Row>
      </Form>

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
      />
      <Pagination
      align="center"
      style={{marginTop:30}}
      total={pageDetails?.totalDocs}
      pageSize={pageDetails?.limit}
      onChange={page=>setPage(page)}
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

export default Students;
