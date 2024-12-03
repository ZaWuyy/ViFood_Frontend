// src/pages/Blogs.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import BlogList from "../components/BlogList.jsx";
import "./BlogPage.css";

const BlogPage = () => {
  const navigate = useNavigate();

  const handleReadMore = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="blogs-page">
      <h2>Our Blog</h2>
      <BlogList onReadMore={handleReadMore} />
    </div>
  );
};

export default BlogPage;