// src/components/VoucherList.jsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Spin, Empty } from "antd";
import VoucherItem from "./VoucherItem.jsx";
import { fetchVouchers } from "../redux/voucher/voucherAction.js";
import "./VoucherList.css";

const VoucherList = () => {
  const dispatch = useDispatch();
  const { vouchers, loading, error } = useSelector((state) => state.voucher);

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  if (loading) {
    return <Spin className="spinner-container" />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (vouchers.length === 0) {
    return <Empty description="No Vouchers Available" />;
  }

  return (
    <div className="voucher-list">
      <Row gutter={[16, 16]}>
        {vouchers.map((voucher) => (
          <Col key={voucher.code} xs={24} sm={12} md={8} lg={6}>
            <VoucherItem voucher={voucher} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VoucherList;