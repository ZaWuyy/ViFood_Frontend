// src/components/BlogForm.jsx

import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import "./BlogForm.css"; // Updated import

const { TextArea } = Input;

const BlogForm = ({ visible, onCancel, onSubmit, blog }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (blog) {
      form.setFieldsValue({
        title: blog.title,
        content: blog.content,
      });
    } else {
      form.resetFields();
    }
  }, [blog, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title={blog ? "Edit Blog" : "Create Blog"}
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        name="blog_form"
        initialValues={{
          title: "",
          content: "",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of the blog!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[
            {
              required: true,
              message: "Please input the content of the blog!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

BlogForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  blog: PropTypes.object, // Adjust shape as needed
};

export default BlogForm;