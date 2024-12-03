// src/pages/BlogManagementPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Spin, Space, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BlogList from "../components/BlogList.jsx";
import BlogForm from "../components/BlogForm.jsx";
import { fetchBlogs, addBlog, updateBlog, deleteBlog } from "../redux/blog/blog.actions";
import { addToast } from "../redux/toast/toast.action";
import "./BlogManagementPage.css";

const { Title } = Typography;

const BlogManagementPage = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(addToast({ message: error, type: "error" }));
    }
  }, [error, dispatch]);

  const handleAddClick = () => {
    setCurrentBlog(null);
    setIsFormVisible(true);
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
      .then(() => dispatch(addToast({ message: "Blog deleted successfully!", type: "success" })))
      .catch(() => dispatch(addToast({ message: "Failed to delete blog.", type: "error" })));
  };

  const handleFormSubmit = (blog) => {
    if (blog.id) {
      dispatch(updateBlog(blog))
        .then(() => {
          dispatch(addToast({ message: "Blog updated successfully!", type: "success" }));
          setIsFormVisible(false);
        })
        .catch(() => dispatch(addToast({ message: "Failed to update blog.", type: "error" })));
    } else {
      dispatch(addBlog(blog))
        .then(() => {
          dispatch(addToast({ message: "Blog added successfully!", type: "success" }));
          setIsFormVisible(false);
        })
        .catch(() => dispatch(addToast({ message: "Failed to add blog.", type: "error" })));
    }
  };

  return (
    <div className="blog-management-page">
      <Row justify="space-between" align="middle" className="header">
        <Col>
          <Title level={2}>Blog Management</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClick}>
            Add Blog
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      ) : (
        <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <BlogForm
        visible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onSubmit={handleFormSubmit}
        blog={currentBlog}
      />
    </div>
  );
};

export default BlogManagementPage;