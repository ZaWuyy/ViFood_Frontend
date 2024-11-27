import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AddVoucher from "./AddVoucher";
import EditVoucher from "./EditVoucher";
import "../Css/ManageVoucher.css";

const VoucherManager = ({ url }) => {
  const [vouchers, setVouchers] = useState([]);
  const [editVoucher, setEditVoucher] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const navigate = useNavigate();

  const fetchVouchers = async () => {
    try {
      const response = await axios.get(`${url}/api/voucher/list`, {
        params: { search: searchTerm, sortBy: sortType },
      });
      if (response.data) setVouchers(response.data);
    } catch (error) {
      toast.error("Error fetching vouchers.");
    }
  };

  const deleteVoucher = async (id) => {
    try {
      await axios.delete(`${url}/api/voucher/${id}`);
      toast.success("Voucher deleted successfully.");
      fetchVouchers();  // Reload after deletion
    } catch (error) {
      toast.error("Error deleting voucher.");
    }
  };

  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

  useEffect(() => {
    fetchVouchers();
  }, [searchTerm, sortType]);

  return (
    <div className="voucher-manager">
      <h2>Voucher Management</h2>

      {/* Search and Add Voucher Section */}
      <div className="voucher-controls">
        <input
          type="text"
          placeholder="Search by code or name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort By</option>
          <option value="status">Status</option>
          <option value="minOrderValue">Min Order Value</option>
          <option value="maxDiscountAmount">Max Discount Amount</option>
          <option value="discountType">Discount Type</option>
        </select>
        <button onClick={() => setIsAdding(true)}>+ Add Voucher</button>
      </div>

      {isAdding && (
        <AddVoucher url={url} onSuccess={fetchVouchers} onClose={() => setIsAdding(false)} />
      )}

      {editVoucher && (
        <EditVoucher url={url} voucher={editVoucher} onSuccess={fetchVouchers} onClose={() => setEditVoucher(null)} />
      )}

      {/* Voucher Table */}
      <div className="voucher-table">
        <div className="voucher-header">
          <div>Name</div>
          <div>Code</div>
          <div>Discount</div>
          <div>Min Order Value</div>
          <div>Max Discount Amount</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {vouchers.length > 0 ? (
          vouchers.map((voucher) => (
            <div
              key={voucher._id}
              className="voucher-row"
              onClick={() => navigate(`/vouchers/${voucher._id}`)}
            >
              <div>{voucher.name}</div>
              <div>{voucher.code}</div>
              <div>
                {formatPrice(voucher.discount)}
                {voucher.discountType === "percentage" ? "%" : "k₫"}
              </div>
              <div>{formatPrice(voucher.minOrderValue)+"k₫"}</div>
              <div>{formatPrice(voucher.maxDiscountAmount)+"k₫"}</div>
              <div className={`status ${voucher.status}`}>
                {voucher.status}
              </div>
              <div>
                <button onClick={(e) => { e.stopPropagation(); setEditVoucher(voucher); }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); deleteVoucher(voucher._id); }}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div>No vouchers found.</div>
        )}
      </div>
    </div>
  );
};

export default VoucherManager;