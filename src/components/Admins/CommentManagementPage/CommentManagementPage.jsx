// src/pages/CommentManagementPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Spin, Space, Row, Col } from "antd";
import { PlusOutlined, ReplyOutlined } from "@ant-design/icons";
import CommentList from "../components/CommentList.jsx";
import CommentForm from "../components/CommentForm.jsx";
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
  replyToComment,
} from "../redux/comment/comment.actions";
import { addToast } from "../redux/toast/toast.action";
import "./CommentManagementPage.css";

const { Title } = Typography;

const CommentManagementPage = () => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [parentComment, setParentComment] = useState(null);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(addToast({ message: error, type: "error" }));
    }
  }, [error, dispatch]);

  const handleAddClick = () => {
    setCurrentComment(null);
    setIsFormVisible(true);
  };

  const handleEdit = (comment) => {
    setCurrentComment(comment);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteComment(id))
      .then(() =>
        dispatch(
          addToast({ message: "Comment deleted successfully!", type: "success" })
        )
      )
      .catch(() =>
        dispatch(
          addToast({ message: "Failed to delete comment.", type: "error" })
        )
      );
  };

  const handleReply = (comment) => {
    setParentComment(comment);
    setIsReplyVisible(true);
  };

  const handleFormSubmit = (comment) => {
    if (comment.id) {
      dispatch(updateComment(comment))
        .then(() => {
          dispatch(
            addToast({ message: "Comment updated successfully!", type: "success" })
          );
          setIsFormVisible(false);
        })
        .catch(() =>
          dispatch(
            addToast({ message: "Failed to update comment.", type: "error" })
          )
        );
    } else {
      dispatch(addComment(comment))
        .then(() => {
          dispatch(
            addToast({ message: "Comment added successfully!", type: "success" })
          );
          setIsFormVisible(false);
        })
        .catch(() =>
          dispatch(
            addToast({ message: "Failed to add comment.", type: "error" })
          )
        );
    }
  };

  const handleReplySubmit = (reply) => {
    dispatch(replyToComment(parentComment.id, reply))
      .then(() => {
        dispatch(
          addToast({ message: "Reply added successfully!", type: "success" })
        );
        setIsReplyVisible(false);
        setParentComment(null);
      })
      .catch(() =>
        dispatch(
          addToast({ message: "Failed to add reply.", type: "error" })
        )
      );
  };

  return (
    <div className="comment-management-page">
      <Row justify="space-between" align="middle" className="header">
        <Col>
          <Title level={2}>Comment Management</Title>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddClick}
          >
            Add Comment
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      ) : (
        <CommentList
          comments={comments}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReply={handleReply}
        />
      )}

      <CommentForm
        visible={isFormVisible}
        onCancel={() => setIsFormVisible(false)}
        onSubmit={handleFormSubmit}
        comment={currentComment}
      />

      <CommentForm
        visible={isReplyVisible}
        onCancel={() => {
          setIsReplyVisible(false);
          setParentComment(null);
        }}
        onSubmit={handleReplySubmit}
        comment={parentComment}
        isReply
      />
    </div>
  );
};

export default CommentManagementPage;