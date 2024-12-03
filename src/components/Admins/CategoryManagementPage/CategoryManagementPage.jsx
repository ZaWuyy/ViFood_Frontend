// src/pages/CategoryManagementPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Spin, Space, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CategoryList from "../components/CategoryList.jsx";
import CategoryForm from "../components/CategoryForm.jsx";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../redux/category/category.actions";
import { addToast } from "../redux/toast/toast.action";
import "./CategoryManagementPage.css";

const { Title } = Typography;

const CategoryManagementPage = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.category
  );

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(addToast({ message: error, type: "error" }));
    }
  }, [error, dispatch]);

  const handleAddClick = () => {
    setCurrentCategory(null);
    setIsFormVisible(true);
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id))
      .then(() =>
        dispatch(
          addToast({ message: "Category deleted successfully!", type: "success" })
        )
      )
      .catch(() =>
        dispatch(
          addToast({ message: "Failed to delete category.", type: "error" })
        )
      );
  };

  const handleFormSubmit = (category) => {
    if (category.id) {
      dispatch(updateCategory(category))
        .then(() => {
          dispatch(
            addToast({ message: "Category updated successfully!", type: "success" })
          );
          setIsFormVisible(false);
        })
        .catch(() =>
          dispatch(
            addToast({ message: "Failed to update category.", type: "error" })
          )
        );
    } else {
      dispatch(addCategory(category))
        .then(() => {
          dispatch(
            addToast({ message: "Category added successfully!", type: "success" })
          );
          setIsFormVisible(false);
        })
        .catch(() =>
          dispatch(
            addToast({ message: "Failed to add category.", type: "error" })
          )
        );
    }
  };

  return (
    <div className="category-management-page">
      <Row justify="space-between" align="middle" className="header">
        <Col>
          <Title level={2}>Category Management</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddClick}
          >
            Add Category
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      ) : (
        <CategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CategoryForm
        visible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onSubmit={handleFormSubmit}
        category={currentCategory}
      />
    </div>
  );
};

export default CategoryManagementPage;