// src/components/ProductVariantForm.jsx

import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import PropTypes from "prop-types";

const ProductVariantForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="variantForm"
      onFinish={handleFinish}
      initialValues={initialValues || {}}
    >
      <Form.Item
        name="name"
        label="Variant Name"
        rules={[{ required: true, message: "Please enter the variant name!" }]}
      >
        <Input placeholder="Enter variant name" />
      </Form.Item>

      <Form.Item
        name="sku"
        label="SKU"
        rules={[{ required: true, message: "Please enter the SKU!" }]}
      >
        <Input placeholder="Enter SKU" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price ($)"
        rules={[{ required: true, message: "Please enter the price!" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          placeholder="Enter price"
        />
      </Form.Item>

      <Form.Item
        name="stock"
        label="Stock"
        rules={[{ required: true, message: "Please enter the stock quantity!" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          placeholder="Enter stock quantity"
        />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update" : "Create"}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

ProductVariantForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    sku: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductVariantForm;