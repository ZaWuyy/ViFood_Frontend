import React from "react";
import { Avatar, Typography, Card, Grid, Divider, Space } from "antd";
import { CloseOutlined, LinkOutlined } from "@ant-design/icons";

const { Meta } = Card;

const RightSidebar = () => (
  <div style={{ width: 320, borderLeft: "1px solid #f0f0f0", display: "flex", flexDirection: "column" }}>
    {/* Header */}
    <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between" }}>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Detail Group
      </Typography.Title>
      <CloseOutlined style={{ fontSize: 16, cursor: "pointer" }} />
    </div>

    {/* Content */}
    <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
      {/* Group Info */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Avatar size={80} src="/placeholder.svg" alt="United Family" />
        <Typography.Title level={5} style={{ marginTop: 8 }}>
          United Family
        </Typography.Title>
      </div>

      {/* Descriptions Card */}
      <Card style={{ marginBottom: 24 }}>
        <Meta
          title="Descriptions"
          description={
            <Typography.Text type="secondary">
              Hey lads, tough game yesterday...
            </Typography.Text>
          }
        />
      </Card>

      {/* Link Group Card */}
      <Card style={{ marginBottom: 24 }}>
        <Meta
          title="Link Group"
          description={
            <Space>
              <LinkOutlined />
              <a href="https://ws.140hoam/" target="_blank" rel="noopener noreferrer">
                https://ws.140hoam/
              </a>
            </Space>
          }
        />
      </Card>

      {/* Media Card */}
      <Card>
        <Typography.Title level={5}>Media</Typography.Title>
        <Divider />
        <Grid container gutter={[8, 8]}>
          {[...Array(9)].map((_, i) => (
            <Grid item xs={8} sm={8} key={i}>
              <div style={{ backgroundColor: "#f0f0f0", height: 80, borderRadius: 8 }} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  </div>
);

export default RightSidebar;
