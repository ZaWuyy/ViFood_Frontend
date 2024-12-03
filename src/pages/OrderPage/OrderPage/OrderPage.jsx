import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Button, Space, Descriptions, Divider } from 'antd';
import { EyeOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import './OrderPage.css';

const { Title, Text } = Typography;

const OrderPage = () => {
  const [orders, setOrders] = useState([
    {
      _id: '1',
      user: { name: 'John Doe', email: 'johndoe@gmail.com' },
      created_date: '2024-11-25',
      total_price: 150.0,
      note: 'Deliver before noon',
      address: '123 Green Lane, City Center',
      phone: '123456789',
      order_details: [{ productName: 'Apple', quantity: 2, price: 30 }, { productName: 'Banana', quantity: 5, price: 20 }],
      status: 'pending',
      method: 'online',
    },
    {
      _id: '2',
      user: { name: 'Jane Smith', email: 'janesmith@gmail.com' },
      created_date: '2024-11-28',
      total_price: 300.0,
      note: 'Ring the doorbell twice',
      address: '456 Blue Avenue, Uptown',
      phone: '987654321',
      order_details: [{ productName: 'Carrot', quantity: 3, price: 25 }, { productName: 'Potato', quantity: 7, price: 15 }],
      status: 'completed',
      method: 'offline',
    },
  ]);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <div>
          <Text strong>{user.name}</Text>
          <br />
          <Text type="secondary">{user.email}</Text>
        </div>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'created_date',
      key: 'created_date',
      render: (date) => <Text>{new Date(date).toLocaleDateString()}</Text>,
    },
    {
      title: 'Total Price',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => <Text strong>${price.toFixed(2)}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColor = {
          pending: 'orange',
          confirmed: 'blue',
          canceled: 'red',
          delivered: 'purple',
          completed: 'green',
        };
        return <Tag color={statusColor[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => viewOrderDetails(record)}>
            View
          </Button>
          {record.status === 'pending' && (
            <Button icon={<CheckCircleOutlined />} type="primary">
              Confirm
            </Button>
          )}
          {record.status === 'pending' && (
            <Button icon={<CloseCircleOutlined />} danger>
              Cancel
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const viewOrderDetails = (order) => {
    // Placeholder for viewing order details
    console.log('Viewing order details:', order);
  };

  return (
    <div className="order-page">
      <Title level={2} className="order-page-title">Order Management</Title>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        bordered
        className="order-table"
      />
    </div>
  );
};

export default OrderPage;
