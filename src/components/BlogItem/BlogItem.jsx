// src/components/BlogItem.jsx

import React from "react";
import { Card, Button, Tooltip } from "antd";
import { ReadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./BlogItem.css";

const { Meta } = Card;

const BlogItem = ({ blog, onReadMore }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={blog.title}
          src={blog.imageUrl || "/default-blog-image.jpg"}
          className="blog-image"
        />
      }
      className="blog-item-card"
    >
      <Meta title={blog.title} description={blog.excerpt} />
      <div className="blog-actions">
        <Tooltip title="Read More">
          <Button
            type="primary"
            icon={<ReadOutlined />}
            onClick={() => onReadMore(blog._id)}
          >
            Read More
          </Button>
        </Tooltip>
      </div>
    </Card>
  );
};

BlogItem.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onReadMore: PropTypes.func.isRequired,
};

export default BlogItem;