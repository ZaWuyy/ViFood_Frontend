// src/pages/ProductManagementPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Modal,
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
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../redux/product/productAction.js";
import {
  getProductVariants,
  createProductVariant,
  updateProductVariant,
  deleteProductVariant,
} from "../redux/productVariant/productVariantAction.js";
import ProductForm from "../components/ProductForm.jsx";
import ProductVariantForm from "../components/ProductVariantForm.jsx";
import "./ProductManagementPage.css";

const ProductManagementPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const { productVariants } = useSelector((state) => state.productVariant);

  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isVariantModalVisible, setIsVariantModalVisible] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [editingVariant, setEditingVariant] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: error,
      });
    }
  }, [error]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalVisible(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsProductModalVisible(true);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id))
      .then(() => {
        notification.success({
          message: "Success",
          description: "Product deleted successfully.",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: err.response?.data?.message || err.message,
        });
      });
  };

  const handleProductFormSubmit = (values) => {
    if (editingProduct) {
      dispatch(updateProduct(editingProduct._id, values))
        .then(() => {
          notification.success({
            message: "Success",
            description: "Product updated successfully.",
          });
          setIsProductModalVisible(false);
          setEditingProduct(null);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err.response?.data?.message || err.message,
          });
        });
    } else {
      dispatch(createProduct(values))
        .then(() => {
          notification.success({
            message: "Success",
            description: "Product created successfully.",
          });
          setIsProductModalVisible(false);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err.response?.data?.message || err.message,
          });
        });
    }
  };

  const handleManageVariants = (productId) => {
    setCurrentProductId(productId);
    dispatch(getProductVariants(productId));
  };

  const handleAddVariant = () => {
    setEditingVariant(null);
    setIsVariantModalVisible(true);
  };

  const handleEditVariant = (variant) => {
    setEditingVariant(variant);
    setIsVariantModalVisible(true);
  };

  const handleDeleteVariant = (variantId) => {
    dispatch(deleteProductVariant(currentProductId, variantId))
      .then(() => {
        notification.success({
          message: "Success",
          description: "Product variant deleted successfully.",
        });
      })
      .catch((err) => {
        notification.error({
          message: "Error",
          description: err.response?.data?.message || err.message,
        });
      });
  };

  const handleVariantFormSubmit = (values) => {
    if (editingVariant) {
      dispatch(
        updateProductVariant(currentProductId, editingVariant._id, values)
      )
        .then(() => {
          notification.success({
            message: "Success",
            description: "Product variant updated successfully.",
          });
          setIsVariantModalVisible(false);
          setEditingVariant(null);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err.response?.data?.message || err.message,
          });
        });
    } else {
      dispatch(createProductVariant(currentProductId, values))
        .then(() => {
          notification.success({
            message: "Success",
            description: "Product variant created successfully.",
          });
          setIsVariantModalVisible(false);
        })
        .catch((err) => {
          notification.error({
            message: "Error",
            description: err.response?.data?.message || err.message,
          });
        });
    }
  };

  const productColumns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "categoryName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record)}
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDeleteProduct(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleManageVariants(record._id)}
          >
            Manage Variants
          </Button>
        </Space>
      ),
    },
  ];

  const variantColumns = [
    {
      title: "Variant Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditVariant(record)}
          />
          <Popconfirm
            title="Are you sure to delete this variant?"
            onConfirm={() => handleDeleteVariant(record._id)}
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
    <div className="product-management-page">
      <h2>Product Management</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddProduct}
        style={{ marginBottom: 16 }}
      >
        Add Product
      </Button>
      <Table
        columns={productColumns}
        dataSource={products}
        rowKey="_id"
        loading={loading}
        bordered
      />

      {/* Product Modal */}
      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        visible={isProductModalVisible}
        footer={null}
        onCancel={() => setIsProductModalVisible(false)}
        destroyOnClose
      >
        <ProductForm
          initialValues={editingProduct}
          onSubmit={handleProductFormSubmit}
          onCancel={() => setIsProductModalVisible(false)}
        />
      </Modal>

      {/* Variant Modal */}
      <Modal
        title={editingVariant ? "Edit Product Variant" : "Add New Variant"}
        visible={isVariantModalVisible}
        footer={null}
        onCancel={() => setIsVariantModalVisible(false)}
        destroyOnClose
      >
        <ProductVariantForm
          initialValues={editingVariant}
          onSubmit={handleVariantFormSubmit}
          onCancel={() => setIsVariantModalVisible(false)}
        />
      </Modal>

      {/* Variants Table */}
      <Modal
        title="Product Variants"
        visible={currentProductId !== null && isVariantModalVisible === false}
        footer={null}
        onCancel={() => setCurrentProductId(null)}
        width={800}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddVariant}
          style={{ marginBottom: 16 }}
        >
          Add Variant
        </Button>
        <Table
          columns={variantColumns}
          dataSource={productVariants}
          rowKey="_id"
          loading={loading}
          bordered
        />
      </Modal>
    </div>
  );
};

export default ProductManagementPage;