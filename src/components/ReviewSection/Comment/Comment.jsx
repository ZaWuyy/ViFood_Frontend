// Comment.jsx

import React from 'react';
import { List, Avatar, Typography, Image } from 'antd';
import './Comment.css';

const { Text } = Typography;

const Comment = ({ comments }) => {
  return (
    <div className="comment-container">
      <List
        itemLayout="vertical"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item key={comment._id}>
            <List.Item.Meta
              avatar={<Avatar src={comment.user.avatarUrl} />}
              title={
                <div className="comment-header">
                  <Text strong>{comment.user.username}</Text>
                  <Text type="secondary">{new Date(comment.createdAt).toLocaleDateString()}</Text>
                </div>
              }
              description={comment.commentText}
            />
            {comment.images && comment.images.length > 0 && (
              <div className="comment-images">
                {comment.images.map((img, index) => (
                  <Image
                    key={index}
                    width={100}
                    src={img.url}
                    alt={`Comment Image ${index + 1}`}
                    style={{ marginRight: '8px' }}
                  />
                ))}
              </div>
            )}
          </List.Item>
        )}
        locale={{ emptyText: 'Chưa có bình luận nào.' }}
      />
    </div>
  );
};

export default Comment;