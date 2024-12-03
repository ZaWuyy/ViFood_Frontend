// src/pages/UserManagementPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  Space,
  Popconfirm,
  notification,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../redux/user/userAction.js";
import "./UserManagementPage.css";

const { Option } = Select;

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: error,
      });
    }
  }, [error]);

  const showEditModal = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .then(() => {
        notification.success({
          message: "Success",
          description: "User deleted successfully.",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: err.response?.data?.message || err.message,
        });
      });
  };

  const handleUpdate = (values) => {
    const updatedData = {
      ...editingUser,
      role: values.role,
    };
    dispatch(updateUser(editingUser._id, updatedData))
      .then(() => {
        notification.success({
          message: "Success",
          description: "User updated successfully.",
        });
        setIsModalVisible(false);
        setEditingUser(null);
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: err.response?.data?.message || err.message,
        });
      });
  };

  const columns = [
    {
      title: "Tên Người Dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai Trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <span style={{ textTransform: "capitalize" }}>{role}</span>
      ),
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-management-page">
      <h2>Quản Lý Người Dùng</h2>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        bordered
      />

      <Modal
        title="Cập Nhật Vai Trò Người Dùng"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={editingUser}
          onFinish={handleUpdate}
        >
          <Form.Item label="Tên Người Dùng">
            <span>{editingUser?.name}</span>
          </Form.Item>
          <Form.Item label="Email">
            <span>{editingUser?.email}</span>
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai Trò"
            rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value="admin">Administrator</Option>
              <Option value="user">User</Option>
              {/* Add more roles as needed */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Cập Nhật
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagementPage;