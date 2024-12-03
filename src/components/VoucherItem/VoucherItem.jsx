// src/components/VoucherItem.jsx

import React from "react";
import { Card, Button, Tooltip, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addVoucher } from "../redux/user/userAction.js";
import "./VoucherItem.css";

const { Title, Text } = Typography;

const VoucherItem = ({ voucher }) => {
  const dispatch = useDispatch();

  const handleSaveVoucher = () => {
    dispatch(addVoucher(voucher));
  };

  return (
    <Card className="voucher-item-card">
      <div className="voucher-content">
        <Title level={4}>{voucher.name}</Title>
        <Text strong>Mã: {voucher.code}</Text>
        <br />
        <Text>Hạn dùng: {new Date(voucher.expiryDate).toLocaleDateString()}</Text>
        <br />
        <Text type="success">
          Giảm giá: {voucher.discount}% 
        </Text>
      </div>
      <div className="voucher-actions">
        <Tooltip title="Lưu Voucher">
          <Button
            type="primary"
            shape="circle"
            icon={<SaveOutlined />}
            onClick={handleSaveVoucher}
          />
        </Tooltip>
      </div>
    </Card>
  );
};

VoucherItem.propTypes = {
  voucher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    expiryDate: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
  }).isRequired,
};

export default VoucherItem;