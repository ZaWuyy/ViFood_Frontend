import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, Input, Typography, Modal, Upload } from "antd";
import { PlusOutlined, SendOutlined, PaperClipOutlined } from "@ant-design/icons";
import { useChat } from "../../utils/ChatContext";
import UploadToCloudinary from "../../utils/uploadToCloudinary";
import { getOptimizedImageUrl } from "../../utils/optimizeImages";
import MessageWidget from "../MessageWidget/MessageWidget"; // Import the MessageWidget

const { TextArea } = Input;

const MainChatArea = ({ chatId }) => {
  const { sendMessage, messages } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const { user } = useSelector((store) => store.user);

  // Modal state for Image Preview
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim() && selectedImages.length === 0) return;

    let imageUrls = [];
    if (selectedImages.length > 0) {
      try {
        const uploads = selectedImages.map((file) => UploadToCloudinary(file.originFileObj, "chat_images"));
        imageUrls = await Promise.all(uploads);
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    sendMessage(chatId, user._id, newMessage.trim(), imageUrls);
    setNewMessage("");
    setSelectedImages([]);
  };

  const handleOpenModal = (imgUrl) => {
    setModalImage(imgUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const uploadProps = {
    multiple: true,
    beforeUpload: (file) => {
      setSelectedImages((prev) => [...prev, file]);
      return false; // Prevent auto-upload by Ant Design
    },
    onRemove: (file) => {
      setSelectedImages((prev) => prev.filter((f) => f.uid !== file.uid));
    },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar src="/placeholder.svg" />
          <div>
            <Typography.Text strong>Chat Room</Typography.Text>
            <Typography.Text type="success" style={{ display: "block", fontSize: 12 }}>
              User is typing...
            </Typography.Text>
          </div>
        </div>
        <Button icon={<PlusOutlined />} />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isCurrentUser = msg.sender?._id === user._id;
            return (
              <MessageWidget
                key={index}
                message={msg}
                isCurrentUser={isCurrentUser}
                userAvatar={user.avatarUrl || "/placeholder.svg"}
                handleOpenModal={handleOpenModal}
              />
            );
          })
        ) : (
          <Typography.Text type="secondary">No messages yet. Start the conversation!</Typography.Text>
        )}
      </div>

      {/* Image Upload and Message Input */}
      <div style={{ padding: 16, borderTop: "1px solid #f0f0f0" }}>
        <Upload {...uploadProps} listType="picture-card" fileList={selectedImages}>
          <Button icon={<PaperClipOutlined />}>Attach</Button>
        </Upload>
        <TextArea
          rows={2}
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              handleSendMessage();
              e.preventDefault();
            }
          }}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} style={{ marginTop: 8 }}>
          Send
        </Button>
      </div>

      {/* Modal for Image Preview */}
      <Modal visible={openModal} footer={null} onCancel={handleCloseModal} centered>
        <img src={modalImage} alt="Preview" style={{ width: "100%", borderRadius: 8 }} />
      </Modal>
    </div>
  );
};

export default MainChatArea;
