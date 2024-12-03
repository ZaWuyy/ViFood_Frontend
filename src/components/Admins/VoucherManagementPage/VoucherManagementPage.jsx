// src/pages/VoucherManagementPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
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
  fetchVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from "../redux/voucher/voucherAction.js";
import VoucherForm from "../components/VoucherForm.jsx";
import "./VoucherManagementPage.css";

const VoucherManagementPage = () => {
  const dispatch = useDispatch();
  const { vouchers, loading, error } = useSelector((state) => state.voucher);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: error,
      });
    }
  }, [error]);

  const handleAdd = () => {
    setEditingVoucher(null);
    setIsModalVisible(true);
  };

  const handleEdit = (voucher) => {
    setEditingVoucher(voucher);
    setIsModalVisible(true);
  };

  const handleDelete = (code) => {
    dispatch(deleteVoucher(code))
      .then(() => {
        notification.success({
          message: "Success",
          description: "Voucher deleted successfully.",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: err.response?.data?.message || err.message,
        });
      });
  };

  const handleFormSubmit = (values) => {
    const voucherData = {
      name: values.name,
      code: values.code,
      expiryDate: values.expiryDate.format("YYYY-MM-DD"),
      discount: values.discount,
    };

    if (editingVoucher) {
      dispatch(updateVoucher(editingVoucher.code, voucherData))
        .then(() => {
          notification.success({
            message: "Success",
            description: "Voucher updated successfully.",
          });
          setIsModalVisible(false);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err.response?.data?.message || err.message,
          });
        });
    } else {
      dispatch(createVoucher(voucherData))
        .then(() => {
          notification.success({
            message: "Success",
            description: "Voucher created successfully.",
          });
          setIsModalVisible(false);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err.response?.data?.message || err.message,
          });
        });
    }
  };

  const columns = [
    {
      title: "Tên Voucher",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã Voucher",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Ngày Hết Hạn",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Giảm Giá (%)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa voucher này?"
            onConfirm={() => handleDelete(record.code)}
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
    <div className="voucher-management-page">
      <h2>Quản Lý Voucher</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Thêm Voucher
      </Button>
      <Table
        columns={columns}
        dataSource={vouchers}
        rowKey="code"
        loading={loading}
        bordered
      />

      <Modal
        title={editingVoucher ? "Chỉnh Sửa Voucher" : "Thêm Mới Voucher"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <VoucherForm
          initialValues={editingVoucher}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default VoucherManagementPage;