import React, { useEffect } from "react";
import { Layout, Tabs, Input, List, Avatar, Typography, Space } from "antd";
import { SearchOutlined, PushpinOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserChats } from "../../redux/chat/chat.action";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const LeftSidebar = ({ activeTab, setActiveTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchUserChats());
  }, [dispatch]);

  const handleChatClick = (chatId, user2Id) => {
    navigate(`/messages/${chatId}/${user2Id}`);
  };

  return (
    <Layout style={{ width: 320, height: "100vh", borderRight: "1px solid #f0f0f0" }}>
      <Header style={{ background: "#fff", padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Messages
        </Typography.Title>
      </Header>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        centered 
        style={{ borderBottom: "1px solid #f0f0f0" }}
      >
        <TabPane tab="All" key="all" />
        <TabPane tab="Unread" key="unread" />
        <TabPane tab="Starred" key="starred" />
      </Tabs>

      <div style={{ padding: "16px", borderBottom: "1px solid #f0f0f0" }}>
        <Input
          placeholder="Search chats..."
          prefix={<SearchOutlined />}
          allowClear
          style={{ borderRadius: 8 }}
        />
      </div>

      <div style={{ padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafafa", borderBottom: "1px solid #f0f0f0" }}>
        <Typography.Text type="secondary">Pinned Message</Typography.Text>
        <PushpinOutlined />
      </div>

      <Content style={{ overflowY: "auto", padding: "16px" }}>
        <List
          itemLayout="horizontal"
          dataSource={chats}
          renderItem={(chat) => {
            const otherParticipant = chat.participants.find((p) => p._id !== user._id);
            if (!otherParticipant) return null;

            return (
              <List.Item
                style={{ cursor: "pointer", borderRadius: 8, padding: 8 }}
                onClick={() => handleChatClick(chat._id, otherParticipant._id)}
              >
                <List.Item.Meta
                  avatar={<Avatar src={otherParticipant.avatarUrl || "/placeholder.svg"} />}
                  title={
                    <Space style={{ justifyContent: "space-between", width: "100%" }}>
                      <Typography.Text strong>{otherParticipant.username}</Typography.Text>
                      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {chat.lastMessageTime}
                      </Typography.Text>
                    </Space>
                  }
                  description={
                    <Typography.Text type="secondary" ellipsis>
                      {chat.lastMessage || "No messages yet"}
                    </Typography.Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      </Content>
    </Layout>
  );
};

export default LeftSidebar;
