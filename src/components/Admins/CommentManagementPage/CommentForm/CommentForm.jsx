// src/components/CommentForm.jsx

import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import "./CommentForm.css";

const { TextArea } = Input;
const { Option } = Select;

const CommentForm = ({ visible, onCancel, onSubmit, comment, isReply }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (comment && !isReply) {
      form.setFieldsValue({
        commentText: comment.commentText,
        userId: comment.user._id,
        productId: comment.product._id,
      });
    } else if (comment && isReply) {
      form.setFieldsValue({
        commentText: "",
        userId: comment.user._id,
        productId: comment.product._id,
        parentId: comment._id,
      });
    } else {
      form.resetFields();
    }
  }, [comment, form, isReply]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const commentData = comment
          ? { ...comment, ...values }
          : values;
        onSubmit(commentData);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title={isReply ? "Reply to Comment" : comment ? "Edit Comment" : "Add Comment"}
      okText={isReply ? "Reply" : comment ? "Update" : "Add"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="comment_form"
        initialValues={{
          commentText: comment ? comment.commentText : "",
          userId: comment ? comment.user._id : "",
          productId: comment ? comment.product._id : "",
          parentId: comment ? comment._id : "",
        }}
      >
        <Form.Item
          name="commentText"
          label="Comment"
          rules={[
            { required: true, message: "Please input the comment text!" },
            { max: 1000, message: "Comment cannot exceed 1000 characters." },
          ]}
        >
          <TextArea rows={4} placeholder="Enter comment text" />
        </Form.Item>
        <Form.Item
          name="userId"
          label="User"
          rules={[
            { required: true, message: "Please select the user!" },
          ]}
        >
          <Select placeholder="Select a user">
            {/* Replace with actual user options */}
            <Option value="user1">User 1</Option>
            <Option value="user2">User 2</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="productId"
          label="Product"
          rules={[
            { required: true, message: "Please select the product!" },
          ]}
        >
          <Select placeholder="Select a product">
            {/* Replace with actual product options */}
            <Option value="product1">Product 1</Option>
            <Option value="product2">Product 2</Option>
          </Select>
        </Form.Item>
        {isReply && (
          <Form.Item
            name="parentId"
            label="Parent Comment ID"
          >
            <Input disabled />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

CommentForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  comment: PropTypes.object,
  isReply: PropTypes.bool,
};

CommentForm.defaultProps = {
  comment: null,
  isReply: false,
};

export default CommentForm;