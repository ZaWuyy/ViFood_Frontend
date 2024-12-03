import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import './AboutPage.css';

const { Title, Text } = Typography;

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <Title level={1} className="about-title">Giới Thiệu Về Thực Phẩm Chay</Title>
        <Text className="about-description">
          Thực phẩm chay không chỉ là sự lựa chọn lành mạnh, mà còn là một phong cách sống giúp bảo vệ sức khỏe, động vật và môi trường.
        </Text>
      </div>

      <Row gutter={[16, 16]} className="about-content">
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={<img alt="Healthy Food" src="../../assets/heathy-food.png"/>}
            
            className="about-card"
          >
            <Title level={4}>Lợi ích của Thực Phẩm Chay</Title>
            <Text>
              Thực phẩm chay cung cấp đầy đủ dinh dưỡng, giúp giảm nguy cơ mắc bệnh mãn tính và duy trì sức khỏe lâu dài.
            </Text>
            <Button type="primary" className="learn-more-button">Tìm hiểu thêm</Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={<img alt="Sustainable Living" src="https://via.placeholder.com/300" />}
            className="about-card"
          >
            <Title level={4}>Bảo Vệ Môi Trường</Title>
            <Text>
              Chế độ ăn chay có thể giảm thiểu tác động đến môi trường, giúp giảm thiểu lượng khí thải carbon và bảo vệ động vật.
            </Text>
            <Button type="primary" className="learn-more-button">Tìm hiểu thêm</Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={<img alt="Plant-Based Food" src="https://via.placeholder.com/300" />}
            className="about-card"
          >
            <Title level={4}>Thực Phẩm Chay Đa Dạng</Title>
            <Text>
              Thực phẩm chay mang đến sự đa dạng trong bữa ăn, từ rau quả tươi ngon đến các sản phẩm thay thế thịt hoàn hảo.
            </Text>
            <Button type="primary" className="learn-more-button">Tìm hiểu thêm</Button>
          </Card>
        </Col>
      </Row>

      <div className="about-footer">
        <Button type="primary" className="join-now-button">Tham gia ngay</Button>
      </div>
    </div>
  );
};

export default AboutPage;
