// src/components/CommentList.jsx

import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, ReplyOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./CommentList.css";

const CommentList = ({ comments, onEdit, onDelete, onReply }) => {
  const columns = [
    {
      title: "Content",
      dataIndex: "commentText",
      key: "content",
      sorter: (a, b) => a.commentText.localeCompare(b.commentText),
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Author",
      dataIndex: ["user", "username"],
      key: "author",
      sorter: (a, b) => a.user.username.localeCompare(b.user.username),
    },
    {
      title: "Product Title",
      dataIndex: ["product", "title"],
      key: "productTitle",
      sorter: (a, b) => a.product.title.localeCompare(b.product.title),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            type="default"
          >
            Edit
          </Button>
          <Button
            icon={<ReplyOutlined />}
            onClick={() => onReply(record)}
            type="default"
          >
            Reply
          </Button>
          <Popconfirm
            title="Are you sure to delete this comment?"
            onConfirm={() => onDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger type="text">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={comments}
      columns={columns}
      rowKey="_id"
      pagination={{ pageSize: 5 }}
      className="comment-list-table"
    />
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
};

export default CommentList;