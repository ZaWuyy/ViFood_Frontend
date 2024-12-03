// src/components/OrderDetailsModal.jsx

import React from 'react';
import { Modal, Descriptions, Table } from 'antd';
import PropTypes from 'prop-types';
import './OrderDetailsModal.css';

const OrderDetailsModal = ({ visible, order, onClose }) => {
  const columns = [
    {
      title: 'Product',
      dataIndex: ['product', 'name'],
      key: 'productName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Total ($)',
      key: 'total',
      render: (text, record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
  ];

  return (
    <Modal
      visible={visible}
      title={`Order Details - ${order._id}`}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Order ID">{order._id}</Descriptions.Item>
        <Descriptions.Item label="User">{order.user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{order.user.email}</Descriptions.Item>
        <Descriptions.Item label="Status">{order.status}</Descriptions.Item>
        <Descriptions.Item label="Total Price">
          ${order.totalPrice.toFixed(2)}
        </Descriptions.Item>
        <Descriptions.Item label="Shipping Address">
          {order.shippingAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(order.createdAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>

      <h3 style={{ marginTop: '20px' }}>Order Items</h3>
      <Table
        columns={columns}
        dataSource={order.items}
        rowKey={(record) => record._id}
        pagination={false}
        bordered
      />
    </Modal>
  );
};

OrderDetailsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  order: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    status: PropTypes.string,
    totalPrice: PropTypes.number,
    shippingAddress: PropTypes.string,
    createdAt: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        product: PropTypes.shape({
          name: PropTypes.string,
        }),
        quantity: PropTypes.number,
        price: PropTypes.number,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetailsModal;