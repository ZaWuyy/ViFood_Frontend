// src/components/BlogList.jsx

import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./BlogList.css";

const BlogList = ({ blogs, onEdit, onDelete }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Author",
      dataIndex: ["author", "username"],
      key: "author",
      sorter: (a, b) => a.author.username.localeCompare(b.author.username),
    },
    {
      title: "Published Date",
      dataIndex: "publishedDate",
      key: "publishedDate",
      sorter: (a, b) => new Date(a.publishedDate) - new Date(b.publishedDate),
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
          <Popconfirm
            title="Are you sure to delete this blog?"
            onConfirm={() => onDelete(record.id)}
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
      dataSource={blogs}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      className="blog-list-table"
    />
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BlogList;