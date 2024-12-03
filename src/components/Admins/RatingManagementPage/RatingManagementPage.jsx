// src/pages/RatingManagementPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Rate,
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
  getAllRatings,
  updateRating,
  deleteRating,
} from "../redux/rating/ratingAction.js";
import RatingForm from "../components/RatingForm.jsx";
import "./RatingManagementPage.css";

const { Option } = Select;

const RatingManagementPage = () => {
  const dispatch = useDispatch();
  const { ratings, loading, error } = useSelector((state) => state.rating);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRating, setEditingRating] = useState(null);

  useEffect(() => {
    dispatch(getAllRatings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Lỗi",
        description: error,
      });
    }
  }, [error]);

  const showEditModal = (rating) => {
    setEditingRating(rating);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteRating(id))
      .then(() => {
        notification.success({
          message: "Thành Công",
          description: "Đánh giá đã được xóa thành công.",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Lỗi",
          description: err.response?.data?.message || err.message,
        });
      });
  };

  const handleUpdate = (values) => {
    const updatedData = {
      ...editingRating,
      comment: values.comment,
      rating: values.rating,
      productId: values.productId,
      userId: values.userId,
    };
    dispatch(updateRating(editingRating._id, updatedData))
      .then(() => {
        notification.success({
          message: "Thành Công",
          description: "Đánh giá đã được cập nhật thành công.",
        });
        setIsModalVisible(false);
        setEditingRating(null);
      })
      .catch((err) => {
        notification.error({
          message: "Lỗi",
          description: err.response?.data?.message || err.message,
        });
      });
  };

  const columns = [
    {
      title: "Người Đánh Giá",
      dataIndex: ["user", "name"],
      key: "userName",
    },
    {
      title: "Sản Phẩm",
      dataIndex: ["product", "name"],
      key: "productName",
    },
    {
      title: "Đánh Giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Bình Luận",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Ngày Đánh Giá",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
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
            title="Bạn có chắc chắn muốn xóa đánh giá này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="rating-management-page">
      <h2>Quản Lý Đánh Giá</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingRating(null);
          setIsModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Thêm Đánh Giá
      </Button>
      <Table
        columns={columns}
        dataSource={ratings}
        rowKey="_id"
        loading={loading}
        bordered
      />

      <Modal
        title={editingRating ? "Cập Nhật Đánh Giá" : "Thêm Mới Đánh Giá"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <RatingForm
          initialValues={editingRating}
          onSubmit={handleUpdate}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default RatingManagementPage;