// src/components/CategoryForm.jsx

import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import PropTypes from "prop-types";
import "./CategoryForm.css";

const { TextArea } = Input;

const CategoryForm = ({ visible, onCancel, onSubmit, category }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description,
      });
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const categoryData = category ? { ...category, ...values } : values;
        onSubmit(categoryData);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title={category ? "Edit Category" : "Add Category"}
      okText={category ? "Update" : "Add"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="category_form"
        initialValues={{
          name: category ? category.name : "",
          description: category ? category.description : "",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please input the name of the category!" },
          ]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the description of the category!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Enter category description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

CategoryForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  category: PropTypes.object,
};

export default CategoryForm;