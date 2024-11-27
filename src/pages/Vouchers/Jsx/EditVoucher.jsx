import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../Css/Modal.css"

const EditVoucher = ({ url, voucher, onSuccess, onClose }) => {
  const [formData, setFormData] = useState(voucher);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log(voucher._id);
      const response = await axios.put(`${url}/api/voucher/update/${voucher._id}`,{ ...formData, id: voucher._id });
      
      if (response.data) {
        toast.success("Voucher updated successfully.");
        onSuccess();
        onClose();
    
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Error updating voucher.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="edit-form">
        <h3>Edit Voucher</h3>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="code" value={formData.code} onChange={handleChange} placeholder="Code" />
        <select name="discountType" value={formData.discountType} onChange={handleChange}>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
        <input name="discount" type="number" value={formData.discount} onChange={handleChange} placeholder="Discount" />
        <input name="expiryDate" type="datetime-local" value={formData.expiryDate} onChange={handleChange} />
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
        <input name="minOrderValue" type="number" value={formData.minOrderValue} onChange={handleChange} placeholder="Min Order Value" />
        <input name="maxDiscountAmount" type="number" value={formData.maxDiscountAmount} onChange={handleChange} placeholder="Max Discount Amount" />
        <input name="appliedFoods" value={formData.appliedFoods} onChange={handleChange} placeholder="Applied Foods" />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditVoucher;
