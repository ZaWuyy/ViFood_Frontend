// src/pages/OrderManagementPage.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from '../redux/actions/orderAction.js';
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Modal,
  Select,
  notification,
  Spin,
  Alert,
} from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import OrderDetailsModal from '../components/OrderDetailsModal.jsx';
import './OrderManagementPage.css';

const { Option } = Select;

const OrderManagementPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const showDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleStatusChange = (value, orderId) => {
    setStatus(value);
    dispatch(updateOrderStatus(orderId, { status: value }))
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Order status updated successfully.',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Error',
          description:
            err.response?.data?.message || 'Failed to update order status.',
        });
      });
  };

  const confirmDelete = (orderId) => {
    dispatch(deleteOrder(orderId))
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Order deleted successfully.',
        });
      })
      .catch((err) => {
        notification.error({
          message: 'Error',
          description:
            err.response?.data?.message || 'Failed to delete the order.',
        });
      });
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'User',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
    {
      title: 'Total Price ($)',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          value={text}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record._id)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Processing">Processing</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => showDetails(record)}
            type="primary"
          >
            View
          </Button>
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => confirmDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Loading orders..." />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div className="order-management-page">
      <h2>Order Management</h2>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        bordered
      />

      {selectedOrder && (
        <OrderDetailsModal
          visible={isModalVisible}
          order={selectedOrder}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default OrderManagementPage;