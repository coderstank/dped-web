import React from 'react';
import { 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Button, 
  Card,
  Row,
  Col 
} from 'antd';

const { Option } = Select;

function Students() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="DPED Application Form">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="collegeCode"
                label="College Code"
                rules={[{ required: true, message: 'Please enter college code' }]}>
                <Input placeholder="Enter college code" maxLength={20} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="collegeName"
                label="College Name"
                rules={[{ required: true, message: 'Please enter college name' }]}>
                <Input placeholder="Enter college name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="studentNameEnglish"
                label="Student's Name (In English)"
                rules={[{ required: true, message: 'Please enter student name in English' }]}>
                <Input placeholder="Enter name in English" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentNameHindi"
                label="Student's Name in Hindi"
                rules={[{ required: true, message: 'Please enter student name in Hindi' }]}>
                <Input placeholder="Enter name in Hindi" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="motherNameEnglish"
                label="Mother's Name (In English)"
                rules={[{ required: true, message: 'Please enter mother name in English' }]}>
                <Input placeholder="Enter mother's name in English" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="motherNameHindi"
                label="Mother's Name in Hindi"
                rules={[{ required: true, message: 'Please enter mother name in Hindi' }]}>
                <Input placeholder="Enter mother's name in Hindi" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="fatherNameEnglish"
                label="Father's Name (In English)"
                rules={[{ required: true, message: 'Please enter father name in English' }]}>
                <Input placeholder="Enter father's name in English" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="fatherNameHindi"
                label="Father's Name in Hindi"
                rules={[{ required: true, message: 'Please enter father name in Hindi' }]}>
                <Input placeholder="Enter father's name in Hindi" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="dateOfBirth"
                label="Date of Birth"
                rules={[{ required: true, message: 'Please select date of birth' }]}>
                <DatePicker style={{ width: '100%' }} placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="boardName"
                label="Class XII passing Board's Name"
                rules={[{ required: true, message: 'Please enter board name' }]}>
                <Input placeholder="Enter board name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="rollNumber"
                label="Roll Number"
                rules={[{ required: true, message: 'Please enter roll number' }]}>
                <Input placeholder="Enter roll number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="passingYear"
                label="Passing Year"
                rules={[{ required: true, message: 'Please enter passing year' }]}>
                <Input placeholder="Enter year" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="marksObtained"
                label="Marks Obtained"
                rules={[{ required: true, message: 'Please enter marks' }]}>
                <Input placeholder="Enter marks" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="percentage"
                label="% of Marks"
                rules={[{ required: true, message: 'Please enter percentage' }]}>
                <Input placeholder="Enter percentage" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select gender' }]}>
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="transgender">Transgender</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Caste Category"
                rules={[{ required: true, message: 'Please select category' }]}>
                <Select placeholder="Select category">
                  <Option value="general">General</Option>
                  <Option value="sc">SC</Option>
                  <Option value="st">ST</Option>
                  <Option value="ebc">EBC</Option>
                  <Option value="bc">BC</Option>
                  <Option value="ews">EWS</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="nationality"
                label="Nationality"
                rules={[{ required: true, message: 'Please select nationality' }]}>
                <Select placeholder="Select nationality">
                  <Option value="indian">Indian</Option>
                  <Option value="foreign">Foreign</Option>
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
                <Select placeholder="Select religion">
                  <Option value="hindu">Hindu</Option>
                  <Option value="muslim">Muslim</Option>
                  <Option value="christian">Christian</Option>
                  <Option value="sikh">Sikh</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="email"
                label="E-mail Id (Compulsory)"
                rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="mobile"
                label="Mobile no. of student (Compulsory)"
                rules={[{ required: true, message: 'Please enter mobile number' }, { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' }]}>
                <Input placeholder="Enter mobile number" maxLength={10} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="area"
                label="Area"
                rules={[{ required: true, message: 'Please select area' }]}>
                <Select placeholder="Select area">
                  <Option value="rural">Rural</Option>
                  <Option value="urban">Urban</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button 
              style={{ marginLeft: '8px' }}
              onClick={() => form.resetFields()}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Students;
