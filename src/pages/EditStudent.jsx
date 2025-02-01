import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Card, Row, Col, Upload, notification } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
const { Option } = Select;
import { useDispatch, useSelector } from "react-redux";
import { AddCandidate, getCandidatesById, updateCandidatesById } from '../api/auth';
import { setLoading, setUser } from '../reducers/authSlice';
import UploadFile from "../components/UploadFile";
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";

// import {useReactToPrint} from "react-to-print";
import { useRef } from "react";

function EditStudents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const [formStatus, setFormStatus] = useState("submitted")
  const handleUppercase = (fieldName, value) => {
    form.setFieldsValue({ [fieldName]: value.toUpperCase() });
  };

 

  const [nationality, setNationality] = useState("");
  const [disabled, setDisablity] = useState("");
  const [religion, setReligion] = useState("");

  const handleNationalityChange = (value) => {
    setNationality(value);
  };
  const handleDisabledChange = (value) => {
    setDisablity(value);
  };
  const handleReligionChange = (value) => {
    setReligion(value);
  };
  const [fileList, setFileList] = useState({
    signature: [],
    photo: [],
  });
  const validate = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter marks"));
    }
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    if (!regex.test(value)) {
      return Promise.reject(
        new Error("Marks must contain both numbers and alphabets")
      );
    }
    return Promise.resolve();
  };


  const validateMarks = (_, value) => {
    if (!value || /^\d+(\.\d{1,2})?$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Numeric values only"));
  };

  const validatePercentage = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Percentage is required"));
    }
    if (/^\d+(\.\d{1,2})?$/.test(value) && value >= 33 && value <= 100) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Enter a valid percentage (33-100 with up to 2 decimal places)"));
  };

  const validateYear = (_, value) => {
    const currentYear = new Date().getFullYear();
    if (!value) {
      return Promise.reject(new Error("Passing year is required"));
    }
    if (/^\d{4}$/.test(value) && value >= 1900 && value <= currentYear) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Enter a valid 4-digit year between 1900 and the current year"));
  };

  const validateHindiName = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Student's name in Hindi is required"));
    }
    if (/^[\u0900-\u097F\s]+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Only Hindi characters are allowed"));
  };


  const onFinishLogin = async (values) => {

    try {
      setLoading(true)

      const { data } = await updateCandidatesById(id, values);
      notification.success('Candidate updated successfully!')
      navigate("/students");
    } catch (error) {
      notification.error({ message: error.message || "something went wrong" });
    }
    finally {
      setLoading(false)
    }
  };

  const fetchCandidate = async () => {
    try {
      setLoading(true)
      const { data } = await getCandidatesById(id);
      form.setFieldsValue(data);
      setDisablity(data.differently_abled)
      setNationality(data.nationality)
      setReligion(data.religion)
      setFormStatus(data.application_state)
    } catch (error) {
      notification.error({
        message: "Error fetching candidate data",
        description: error.message || "Something went wrong",
      });
    }
    finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchCandidate();
  }, [id]);



  return (
    <div id="form-container" style={{ padding: '24px', border: "1px solid black", borderRadius: "5px" }}>
      <Card title={<div style={{ textAlign: 'center' }}>DPED APPLICATION FORM</div>}>
        <Form
          disabled={formStatus === "submitted"}
          form={form}
          layout="vertical"
          onFinish={onFinishLogin}
          autoComplete="off"
        >

          <h3>Personal Information</h3>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Student's Name (In English)"
                rules={[{ required: true, message: 'Please enter student name in English' },
                {
                  pattern: /^[A-Za-z\s]*$/,
                  message: "Only alphabets and spaces are allowed",
                }
                ]}>
                <Input placeholder="Enter name in English"
                  onChange={(e) => handleUppercase('name', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="name_in_hindi"
                label="Student's Name in Hindi"
                rules={[{ required: true, message: 'Please enter student name in Hindi' },
                { validator: validateHindiName },
                ]}>
                <Input placeholder="Enter name in Hindi"

                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="mother_name"
                label="Mother's Name (In English)"
                rules={[{ required: true, message: 'Please enter mother name in English' },
                {
                  pattern: /^[A-Za-z\s]*$/,
                  message: "Only alphabets and spaces are allowed",
                }
                ]}>
                <Input placeholder="Enter mother's name in English"
                  onChange={(e) => handleUppercase('mother_name', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="mother_name_in_hindi"
                label="Mother's Name in Hindi"
                rules={[{ required: true, message: 'Please enter mother name in Hindi' },
                { validator: validateHindiName },
                ]}>
                <Input placeholder="Enter mother's name in Hindi" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="father_name"
                label="Father's Name (In English)"
                rules={[{ required: true, message: 'Please enter father name in English' },
                {
                  pattern: /^[A-Za-z\s]*$/,
                  message: "Only alphabets and spaces are allowed",
                }
                ]}>
                <Input placeholder="Enter father's name in English"
                  onChange={(e) => handleUppercase('father_name', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="father_name_in_hindi"
                label="Father's Name in Hindi"
                rules={[{ required: true, message: 'Please enter father name in Hindi' },
                { validator: validateHindiName },
                ]}>
                <Input placeholder="Enter father's name in Hindi" />
              </Form.Item>
            </Col>
          </Row>


          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="mobile_number"
                label="Mobile"
                rules={[{ required: true, message: 'Please enter mobile number' }, { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }]}>
                <Input placeholder="Enter mobile number" maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="E-mail Id"
                rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="Enter email address"
                  onChange={(e) => handleUppercase('email', e.target.value)}
                />
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter address' }]}>
                <Input.TextArea placeholder="Enter your address"
                  onChange={(e) => handleUppercase('address', e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="pincode"
                label="Pincode"
                rules={[{ required: true, message: 'Please enter pincode number' }, { pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit pincode number' }]}>
                <Input placeholder="Enter pin number" maxLength={6} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[{ required: true, message: 'Please select date of birth' }]}>
                <Input type='date' style={{ width: '100%' }} placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="aadhar_no"
                label="Aadhar"
                rules={[{ required: true, message: 'Please enter aadhar number' },
                { pattern: /^[0-9]{12}$/, message: 'Please enter a valid 12-digit aadhar number' }

                ]}>
                <Input placeholder="Enter your aadhar number" maxLength={12} />
              </Form.Item>
            </Col>


          </Row>

          <h3>Additional Information</h3>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select gender' }]}>
                <Select style={{ textTransform: 'uppercase' }} placeholder="Select gender">
                  <Option value="MALE">MALE</Option>
                  <Option value="FEMALE">FEMALE</Option>
                  <Option value="TRANSGENDER">TRANSGENDER</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Caste Category"
                rules={[{ required: true, message: 'Please select category' }]}>
                <Select style={{ textTransform: 'uppercase' }} placeholder="Select category">
                  <Option value="GENERAL">GENERAL</Option>
                  <Option value="SC">SC</Option>
                  <Option value="ST">ST</Option>
                  <Option value="EBC">EBC</Option>
                  <Option value="BC">BC</Option>
                  <Option value="EWS">EWS</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="nationality"
                label="Nationality"
                rules={[{ required: true, message: 'Please select nationality' }]}>
                <Select style={{ textTransform: 'uppercase' }} placeholder="Select nationality"
                  value={nationality}
                  onChange={handleNationalityChange}
                >
                  <Option value="INDIAN">INDIAN</Option>
                  <Option value="OTHERS">OTHERS</Option>
                </Select>
              </Form.Item>
              {nationality === "OTHERS" && (
                <Form.Item
                  name="nationality_others"
                  label="Specify Nationality"
                  rules={[{ required: true, message: "Please specify nationality" }]}
                >
                  <Input placeholder="Enter nationality"

                    onChange={(e) => handleUppercase('nationality_others', e.target.value)}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="identification_marks"
                label="First Identification Mark"
                rules={[{ required: true, message: 'Please enter the first identification mark' }]}>
                <Input placeholder="Enter the first identification mark"
                  onChange={(e) => handleUppercase('identification_marks', e.target.value)}
                />
              </Form.Item>

            </Col>
            <Col span={8}>
              <Form.Item
                name="identification_marks_2"
                label="Second Identification Mark"
                rules={[{ required: true, message: 'Please enter the second identification mark' }]}>
                <Input placeholder="Enter the second identification mark"
                  onChange={(e) => handleUppercase('identification_marks_2', e.target.value)}
                />
              </Form.Item>

            </Col>

            <Col span={8}>
              <Form.Item
                name="exam_medium"
                label="Medium"
                rules={[{ required: true, message: 'Please select ' }]}>
                <Select style={{ textTransform: 'uppercase' }} placeholder="Select Medium " >
                  <Option value="HINDI">HINDI</Option>
                  <Option value="ENGLISH">ENGLISH</Option>

                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>

            <Col span={8}>
              <Form.Item
                name="differently_abled"
                label="Differently Abled"
                rules={[{ required: true, message: 'Please select ' }]}>
                <Select style={{ textTransform: 'uppercase' }} placeholder="Please select"
                  value={nationality}
                  onChange={handleDisabledChange}
                >
                  <Option value="YES">YES</Option>
                  <Option value="NO">NO</Option>
                </Select>
              </Form.Item>
              {disabled === "YES" && (
                <Form.Item
                  name="differently_abled_others"
                  label="Specify Disability"
                  rules={[{ required: true, message: "Please specify Disability" }]}
                >
                  <Input placeholder="Enter Disability"
                    onChange={(e) => handleUppercase('differently_abled_others', e.target.value)}
                  />
                </Form.Item>
              )}
            </Col>
            <Col span={8}>
              <Form.Item
                name="marital_status"
                label="Marital Status"
                rules={[{ required: true, message: 'Please select' }]}>
                <Select style={{ textTransform: 'uppercase' }} placeholder="Select marital status">
                  <Option value="MARRID">MARRID</Option>
                  <Option value="UNMARRIED">UNMARRIED</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="area"
                label="Area"
                rules={[{ required: true, message: 'Please select area' }]}>
                <Select style={{ textTransform: 'uppercase' }} placeholder="Select area">
                  <Option value="RURAL">RURAL</Option>
                  <Option value="URBAN">URBAN</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="religion"
                label="Religion"
                rules={[{ required: true, message: 'Please select religion' }]}>
                <Select style={{ textTransform: 'uppercase' }} placeholder="Select religion"
                  value={religion}
                  onChange={handleReligionChange}
                >
                  <Option value="HINDUISM">HINDUISM</Option>
                  <Option value="ISLAM">ISLAM</Option>
                  <Option value="SIKHISM">SIKHISM</Option>
                  <Option value="CHRISTIAN">CHRISTIAN</Option>
                  <Option value="JAINISM">JAINISM</Option>
                  <Option value="OTHERS">OTHERS</Option>
                </Select>
              </Form.Item>
              {religion === "OTHERS" && (
                <Form.Item
                  name="religion_others"
                  label="Specify Religion"
                  rules={[{ required: true, message: "Please specify Religion" }]}
                >
                  <Input placeholder="Enter Religion"
                    onChange={(e) => handleUppercase('religion_others', e.target.value)} />
                </Form.Item>
              )}
            </Col>
          </Row>

          <h3>Educational Information</h3>
          <Row gutter={16}>

            <Col span={8}>
              <Form.Item
                name="class_12_board_name"
                label="Class XII passing Board's Name"
                rules={[{ required: true, message: 'Please enter board name' },
                {
                  pattern: /^[A-Za-z\s]*$/,
                  message: "Only alphabets allowed",
                }
                ]}>
                <Input placeholder="Enter board name"
                  onChange={(e) => handleUppercase('class_12_board_name', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="class_12_board_code"
                label="Class XII passing Board's code"
                rules={[{ required: true, message: 'Please enter board code' },
                { validator: validate },
                ]}>
                <Input placeholder="Enter board code"
                  onChange={(e) => handleUppercase('class_12_board_code', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="roll_no"
                label="Roll Number"
                rules={[{ required: true, message: 'Please enter roll number' },
                { validator: validateMarks },
                ]}>
                <Input placeholder="Enter roll number" />
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="passing_year"
                label="Passing Year"
                rules={[
                  { required: true, message: "Please enter passing year" },
                  { validator: validateYear },
                ]}>
                <Input placeholder="Enter year" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="marks_obtained"
                label="Marks Obtained"
                rules={[
                  { required: true, message: "Please enter marks" },
                  { validator: validateMarks },
                ]}
              >
                <Input placeholder="Enter marks" maxLength={4} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="percentage_of_marks"
                label="% of Marks"
                rules={[
                  { required: true, message: "Please enter percentage" },
                  { validator: validatePercentage },
                ]}>
                <Input placeholder="Enter percentage" />
              </Form.Item>
            </Col>
          </Row>




          <Row gutter={16}>

            <Col span={12}>
              <div>
                <p
                  style={{
                    color: "black",
                    margin: "12px 0",
                  }}
                >
                  Upload Signature with White Background (Signature Size
                  10 KB to 50 KB) only .jpg
                </p>
                <div style={{ display: "flex", gap: "16px" }}>
                  <Form.Item
                    name={"sign"}
                    label={"Student Signature"}
                  // rules={[requiredRule("sign")]}
                  >
                    <UploadFile
                      setFile={(e) => {
                        form.setFieldValue(["sign"], e);
                        form.validateFields(["sign"]);
                      }}
                      showFile={false}
                      type={"sign"}
                      meta={{
                        fileTypes: [
                          "image/png",
                          "image/jpg",
                          "image/jpeg",
                        ],
                        // height: 2,
                        // width: 4,
                        maxSize: 50,
                        minSize: 10,
                      }}
                      id={new Date().getDate().toString()}
                      file={form.getFieldValue(["sign"])}
                    />
                    <Form.Item
                      noStyle
                      shouldUpdate={(prev, curr) =>
                        prev.sign !== curr.sign
                      }
                    >
                      {() => {
                        return (
                          <div style={{ margin: "16px 0" }}>
                            <img
                              src={`${form.getFieldValue([
                                "sign",
                              ])}?${performance.now()}`}
                              alt="signature"
                              style={{
                                height: "150px",
                                width: "150px",
                                border: "1px solid black",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        );
                      }}
                    </Form.Item>
                  </Form.Item>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <p
                  style={{
                    color: "black",
                    margin: "12px 0",
                  }}
                >
                  Upload Signature with White Background (Signature Size
                  10 KB to 50 KB) only .jpg
                </p>
                <div style={{ display: "flex", gap: "16px" }}>
                  <Form.Item
                    name={"photo"}
                    label={"Student Photo"}
                  // rules={[requiredRule("sign")]}
                  >
                    <UploadFile
                      setFile={(e) => {
                        form.setFieldValue(["photo"], e);
                        form.validateFields(["photo"]);
                      }}
                      showFile={false}
                      type={"photo"}
                      meta={{
                        fileTypes: [
                          "image/png",
                          "image/jpg",
                          "image/jpeg",
                        ],
                        // height: 2,
                        // width: 4,
                        maxSize: 50,
                        minSize: 10,
                      }}
                      id={new Date().getDate().toString()}
                      file={form.getFieldValue(["photo"])}
                    />
                    <Form.Item
                      noStyle
                      shouldUpdate={(prev, curr) =>
                        prev.sign !== curr.sign
                      }
                    >
                      {() => {
                        return (
                          <div style={{ margin: "16px 0" }}>
                            <img
                              src={`${form.getFieldValue([
                                "photo",
                              ])}?${performance.now()}`}
                              alt="phpto"
                              style={{
                                height: "150px",
                                width: "150px",
                                border: "1px solid black",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        );
                      }}
                    </Form.Item>
                  </Form.Item>
                </div>
              </div>
            </Col>

          </Row>
          <Form.Item>
            {formStatus === "submitted" ?
              <>
                <Button
                className="print-hide"
                  style={{ width: "100%", marginTop: "20px" }}  onClick={() => navigate("/students")} type="primary" htmlType="button">
                  Back
                </Button>
                <Button
                className="print-hide"
                  disabled={loading}
                  icon={<DownloadOutlined />}
                  style={{ width: "100%", marginTop: "20px" }}
                  type="default"
                  // onClick={handleDownloadPDF}
                  onClick={() => window.print()}
                  // onClick={()=>reactToPrintFn()}
                >
                  {loading ? 'Loading' :
                    'Print'
                  }
                </Button>
              </>

              :
              <Button
                disabled={!loading}
                style={{ width: "100%", marginTop: "20px" }} type="primary" htmlType="submit">
                Update
              </Button>
            }

          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default EditStudents;
