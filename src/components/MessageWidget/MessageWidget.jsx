import React, { useState } from "react";
import { Avatar, Typography, Modal } from "antd";
import { getOptimizedImageUrl } from "../../utils/optimizeImages";

const MessageWidget = ({ message, isCurrentUser, userAvatar }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleOpenModal = (imgUrl) => {
    setModalImage(imgUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isCurrentUser ? "row-reverse" : "row",
        gap: "12px",
        marginBottom: "16px",
      }}
    >
      <Avatar
        size={40}
        src={isCurrentUser ? userAvatar : message.sender?.avatarUrl || "/placeholder.svg"}
        alt={isCurrentUser ? "You" : message.sender?.firstname || "Unknown"}
      />
      <div
        style={{
          maxWidth: "60%",
          backgroundColor: isCurrentUser ? "#1890ff" : "#f0f0f0",
          color: isCurrentUser ? "white" : "black",
          borderRadius: "8px",
          padding: "12px",
        }}
      >
        <Typography.Text strong style={{ color: isCurrentUser ? "white" : "black" }}>
          {isCurrentUser ? "You" : message.sender?.username || "Unknown"}
        </Typography.Text>
        <Typography.Text style={{ display: "block", marginTop: "4px" }}>
          {message.message}
        </Typography.Text>
        {message.images && message.images.length > 0 && (
          <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {message.images.map((imgUrl, idx) => (
              <img
                key={idx}
                src={getOptimizedImageUrl(imgUrl)}
                alt={`attachment-${idx}`}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenModal(getOptimizedImageUrl(imgUrl))}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal for Image Preview */}
      <Modal
        visible={openModal}
        footer={null}
        onCancel={handleCloseModal}
        centered
        bodyStyle={{ padding: 0 }}
      >
        <img
          src={modalImage}
          alt="Full View"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </Modal>
    </div>
  );
};

export default MessageWidget;
