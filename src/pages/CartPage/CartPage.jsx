import React, { useState } from 'react';
import { Table, Button, InputNumber, Typography, Row, Col, Checkbox, Input, Space } from 'antd';
import { PlusOutlined, MinusOutlined, DeleteOutlined, ShoppingCartOutlined, ShoppingOutlined, FileTextOutlined, ClearOutlined } from '@ant-design/icons';
import './CartPage.css';

const { Text, Title } = Typography;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      variantId: '1',
      productName: 'Vegetable Burger',
      size: 'Large',
      originalPrice: 6.99,
      discountedPrice: 5.49,
      quantity: 2,
      images: ['burger-image.jpg'],
      note: '',
    },
    {
      variantId: '2',
      productName: 'Vegan Pizza',
      size: 'Medium',
      originalPrice: 10.99,
      discountedPrice: 8.99,
      quantity: 1,
      images: ['pizza-image.jpg'],
      note: '',
    },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleQuantityChange = (variantId, value) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.variantId === variantId ? { ...item, quantity: value } : item
      )
    );
  };

  const handleRemoveSelected = () => {
    setCartItems(prevItems => prevItems.filter(item => !selectedRowKeys.includes(item.variantId)));
    setSelectedRowKeys([]);
  };

  const handleNoteChange = (variantId, note) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.variantId === variantId ? { ...item, note } : item
      )
    );
  };

  const columns = [
    {
      title: '',
      dataIndex: 'images',
      key: 'images',
      render: (images) => <img src={images[0]} alt="Product" className="cart-item-image" />,
    },
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary">Size: {record.size}</Text>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
      render: (text, record) => (
        <div>
          <Text strong className="discounted-price">{`$${text.toFixed(2)}`}</Text>
          <br />
          <Text delete type="secondary" className="original-price">{`$${record.originalPrice.toFixed(2)}`}</Text>
        </div>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <div className="quantity-actions">
          <Button
            icon={<MinusOutlined />}
            size="small"
            onClick={() => handleQuantityChange(record.variantId, Math.max(1, quantity - 1))}
          />
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => handleQuantityChange(record.variantId, value)}
            style={{ width: 50, margin: '0 5px' }}
          />
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => handleQuantityChange(record.variantId, quantity + 1)}
          />
        </div>
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, record) => (
        <Text strong className="total-price">{`$${(record.discountedPrice * record.quantity).toFixed(2)}`}</Text>
      ),
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      render: (note, record) => (
        <Input
          placeholder="Add a note..."
          value={note}
          onChange={(e) => handleNoteChange(record.variantId, e.target.value)}
          prefix={<FileTextOutlined />}
        />
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    selections: [
      {
        key: 'selectAll',
        text: 'Select All',
        onSelect: () => setSelectedRowKeys(cartItems.map(item => item.variantId)),
      },
      {
        key: 'clearAll',
        text: 'Clear All',
        onSelect: () => setSelectedRowKeys([]),
      },
    ],
  };

  return (
    <div className="cart-page">
      <Title level={2} className="cart-title">
        <ShoppingCartOutlined /> Your Cart
      </Title>
      <Text className="cart-summary-text">
        {`You have ${cartItems.length} items in your cart.`}
      </Text>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={cartItems}
        rowKey="variantId"
        pagination={false}
        className="cart-table"
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={5}>
              <div className="cart-summary">
                <Text strong>Total Amount:</Text>
                <Text className="grand-total">
                  {`$${cartItems
                    .filter(item => selectedRowKeys.includes(item.variantId))
                    .reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0)
                    .toFixed(2)}`}
                </Text>
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />

      <Row justify="space-between" className="cart-actions">
        <Space>
          <Button icon={<ShoppingOutlined />} onClick={() => console.log('Continue Shopping')}>
            Continue Shopping
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={handleRemoveSelected}
            disabled={!selectedRowKeys.length}
          >
            Remove Selected
          </Button>
        </Space>
        <Button
          icon={<ShoppingCartOutlined />}
          type="primary"
          onClick={() => console.log('Proceed to Checkout')}
          disabled={!selectedRowKeys.length}
        >
          Checkout
        </Button>
      </Row>
    </div>
  );
};

export default CartPage;
