import React from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';

const { Title, Text } = Typography;

export default function Front() {
  return (
    <div style={{ padding: '0px' }}>
      {/* Dashboard Cards */}
      {/* <Row gutter={16} style={{ marginBottom: '30px' }}>
        <Col span={8}>
          <Card
            title={<Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#212529' }}>16</Text>}
            bordered={false}
            style={{ backgroundColor: '#ffe8a1', color: '#212529', textAlign: 'center' }}
          >
            <Text style={{ fontSize: '16px', color: '#212529' }}>Paid Registrations</Text>
            <br />
            <Button type="link" style={{ color: '#212529' }}>
              More info →
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#212529' }}>6</Text>}
            bordered={false}
            style={{ backgroundColor: '#f8d7da', color: '#212529', textAlign: 'center' }}
          >
            <Text style={{ fontSize: '16px', color: '#212529' }}>Unpaid Registrations</Text>
            <br />
            <Button type="link" style={{ color: '#212529' }}>
              More info →
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={<Text style={{ fontSize: '16px', fontWeight: 'bold', color: '#212529' }}>Download Blank Form</Text>}
            bordered={false}
            style={{ backgroundColor: '#d1ecf1', color: '#212529', textAlign: 'center' }}
          >
            <Button type="primary" shape="round" style={{ backgroundColor: '#fff', color: '#0c5460' }}>
              Download ⬇
            </Button>
          </Card>
        </Col>
      </Row> */}

     
      <Card
        title={<Title level={4} style={{ color: '#fff', margin: 0 }}>1. Bank Details</Title>}
        bordered={false}
        style={{ backgroundColor: '#9aa0ef', color: '#fff' }}
      >
        <Row>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>BANK NAME:</Text> <Text>HDFC BANK</Text>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>IFSC CODE:</Text> <Text>HDFC0006223</Text>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>ACCOUNT NUMBER:</Text> <Text>50100454546268</Text>
          </Col>
          <Col span={24} style={{ marginBottom: '10px' }}>
            <Text strong>BRANCH NAME:</Text> <Text>MAURYALOK BRANCH</Text>
          </Col>
          <Col span={24}>
            <Text strong>BRANCH ADDRESS:</Text> <Text>SANTOSH COMPLEX, GROUND FLOOR, SHOP NO. 2A & 2B, MAURYALOK, PATNA, 800001</Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
