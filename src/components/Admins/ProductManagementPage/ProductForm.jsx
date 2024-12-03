// src/components/ProductForm.jsx

import React, { useEffect } from "react";
import { Form, Input, InputNumber, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Option } = Select;

const ProductForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        category: initialValues.category._id,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleFinish = (values) => {
    // Handle image upload if necessary
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="productForm"
      onFinish={handleFinish}
      initialValues={{
        ...initialValues,
        category: initialValues?.category?._id || "",
      }}
    >
      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: "Please enter the product name!" }]}
      >
        <Input placeholder="Enter product name" />
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
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select category">
          {/* Replace with dynamic category options */}
          <Option value="category1">Category 1</Option>
          <Option value="category2">Category 2</Option>
          {/* ... */}
        </Select>
      </Form.Item>

      <Form.Item label="Product Image" name="image">
        <Upload
          name="productImage"
          listType="picture"
          beforeUpload={() => false}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please enter the description!" }]}
      >
        <Input.TextArea rows={4} placeholder="Enter product description" />
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

ProductForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductForm;