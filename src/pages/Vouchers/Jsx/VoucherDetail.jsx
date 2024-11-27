import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../Css/VoucherDetail.css";
import { url } from "../../../api/api";


const VoucherDetail = () => {
  const { id } = useParams();
  const [voucher, setVoucher] = useState(null);

  const fetchVoucherDetail = async () => {
    try {
      console.log("ID: ", id);
      console.log("url: ", url);
      const response = await axios.get(`${url}/api/voucher/${id}`);
      if (response.data) {

        console.log("hahah",response.data);
        setVoucher(response.data);
      } else {
        toast.error("Voucher not found.");
      }
    } catch (error) {
      toast.error("Error fetching voucher details.");
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

  useEffect(() => {
    fetchVoucherDetail();
  }, [id, url]);

  if (!voucher) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="p">h1</div>
    <div className="voucher-detail">
      <h2>Voucher Detail</h2>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={voucher.name} readOnly />
        </div>
        <div className="form-group">
          <label>Code:</label>
          <input type="text" value={voucher.code} readOnly />
        </div>
        <div className="form-group">
          <label>Discount:</label>
          <input type="text" value={`${formatPrice(voucher.discount)}${voucher.discountType === "percentage" ? "%" : "k₫"}`} readOnly />
        </div>
        <div className="form-group">
          <label>Min Order Value:</label>
          <input type="text" value={`${formatPrice(voucher.minOrderValue)+"k₫"}`} readOnly />
        </div>
        <div className="form-group">
          <label>Max Discount Amount:</label>
          <input type="text" value={`${formatPrice(voucher.maxDiscountAmount)+"k₫"}`} readOnly />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input type="text" value={new Date(voucher.expiryDate).toLocaleString()} readOnly />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input type="text" value={voucher.status} readOnly />
        </div>
      </form>
    </div>
    </>
    
  );
};

export default VoucherDetail;