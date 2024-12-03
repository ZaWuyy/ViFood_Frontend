// src/components/RatingForm.jsx

import React from "react";
import { Form, Input, Select, Rate, Button, Space } from "antd";
import PropTypes from "prop-types";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const RatingForm = ({ initialValues, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={
        initialValues
          ? {
              comment: initialValues.comment,
              rating: initialValues.rating,
              productId: initialValues.productId,
              userId: initialValues.userId,
            }
          : {}
      }
      onFinish={handleFinish}
    >
      <Form.Item
        label="Người Đánh Giá"
        name="userId"
        rules={[{ required: true, message: "Vui lòng chọn người đánh giá!" }]}
      >
        <Select placeholder="Chọn người đánh giá">
          {/* Replace with dynamic user options */}
          <Option value="user1">Người Dùng 1</Option>
          <Option value="user2">Người Dùng 2</Option>
          {/* ... */}
        </Select>
      </Form.Item>

      <Form.Item
        label="Sản Phẩm"
        name="productId"
        rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
      >
        <Select placeholder="Chọn sản phẩm">
          {/* Replace with dynamic product options */}
          <Option value="product1">Sản Phẩm 1</Option>
          <Option value="product2">Sản Phẩm 2</Option>
          {/* ... */}
        </Select>
      </Form.Item>

      <Form.Item
        label="Đánh Giá"
        name="rating"
        rules={[{ required: true, message: "Vui lòng đánh giá!" }]}
      >
        <Rate />
      </Form.Item>

      <Form.Item
        label="Bình Luận"
        name="comment"
        rules={[{ required: true, message: "Vui lòng nhập bình luận!" }]}
      >
        <TextArea rows={4} placeholder="Nhập bình luận" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Cập Nhật" : "Thêm Mới"}
          </Button>
          <Button onClick={onCancel}>Hủy</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

RatingForm.propTypes = {
  initialValues: PropTypes.shape({
    comment: PropTypes.string,
    rating: PropTypes.number,
    productId: PropTypes.string,
    userId: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default RatingForm;