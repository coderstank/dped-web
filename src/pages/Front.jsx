import React from 'react';
import { Card, Row, Col, Button, Typography, Space } from 'antd';

const { Title, Text } = Typography;

export default function Front() {
  return (
    <Space direction='vertical' style={{ padding: '0px' }}>
      

     
      <Card
        title={<Title level={4} style={{ color: '#fff', margin: 0 }}>1. Bank Details</Title>}
        bordered={false}
        style={{ backgroundColor: '#9aa0ef', color: '#fff' }}
      >
        <Row>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>BANK NAME:</Text> <Text>HDFC BANK LIMITED</Text>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>IFSC CODE:</Text> <Text>HDFC0006223</Text>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>ACCOUNT NUMBER:</Text> <Text>50100454546268</Text>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>BRANCH NAME:</Text> <Text>मौर्यालोक शाखा</Text>
          </Col>
          <Col span={24}>
            <Text strong>BRANCH ADDRESS:</Text> <Text>
संतोषा कॉम्प्लेक्स, ग्राउंड फ्लोर, शॉप नo-2.A तथा 2.B
मौर्यालोक, पटना- 800001

              </Text>
          </Col>
        </Row>
      </Card>

      <Card
        title={<Title level={4} style={{ color: '#fff',margin:'0' }}>2. Bank Details</Title>}
        bordered={false}
        style={{ backgroundColor: 'rgb(154, 192, 238)', color: '#fff' }}
      >
        <Row>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>BANK NAME:</Text> <Text>PUNJAB NATIONAL BANK</Text>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>IFSC CODE:</Text> <Text>PUNB0291000</Text>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>ACCOUNT NUMBER:</Text> <Text>2910000100296765</Text>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>BRANCH NAME:</Text> <Text>बोरिंग रोड</Text>
          </Col>
          <Col span={24}>
            <Text strong>BRANCH ADDRESS:</Text> <Text>
            चन्दन भवन, बोरिंग रोड, पटना - 800001</Text>
          </Col>
        </Row>
      </Card>
    </Space>
  );
}
