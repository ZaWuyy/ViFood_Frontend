// Rating.jsx

import React from 'react';
import { List, Avatar, Rate, Image, Typography } from 'antd';
import './Rating.css';

const { Text } = Typography;

const Rating = ({ ratings }) => {
  return (
    <div className="rating-container">
      <List
        itemLayout="vertical"
        dataSource={ratings}
        renderItem={(rating) => (
          <List.Item key={rating._id}>
            <List.Item.Meta
              avatar={<Avatar src={rating.user.avatarUrl} />}
              title={
                <div className="rating-header">
                  <Text strong>{rating.user.username}</Text>
                  <div className="rating-score">
                    <Rate disabled defaultValue={rating.value} />
                    <Text className="rating-number">{rating.value}/5</Text>
                  </div>
                </div>
              }
              description={rating.comment}
            />
            {rating.images && rating.images.length > 0 && (
              <div className="rating-images">
                {rating.images.map((img, index) => (
                  <Image
                    key={index}
                    width={100}
                    src={img.url}
                    alt={`Rating Image ${index + 1}`}
                    style={{ marginRight: '8px' }}
                  />
                ))}
              </div>
            )}
            <Text type="secondary" className="rating-date">
              {new Date(rating.createdAt).toLocaleDateString()}
            </Text>
          </List.Item>
        )}
        locale={{ emptyText: 'Không có đánh giá nào.' }}
      />
    </div>
  );
};

export default Rating;