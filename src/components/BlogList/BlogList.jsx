// src/components/BlogList.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spin, Empty } from "antd";
import BlogItem from "./BlogItem.jsx";
import { getBlogs } from "../redux/blog/blogAction.js";
import "./BlogList.css";

const BlogList = ({ onReadMore }) => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(getBlogs());
    }
  }, [dispatch, blogs.length]);

  if (loading) {
    return <Spin className="spinner-container" />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (blogs.length === 0) {
    return <Empty description="No Blogs Available" />;
  }

  return (
    <div className="blog-list">
      <Row gutter={[16, 16]}>
        {blogs.map((blog) => (
          <Col key={blog._id} xs={24} sm={12} md={8} lg={6}>
            <BlogItem blog={blog} onReadMore={onReadMore} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogList;