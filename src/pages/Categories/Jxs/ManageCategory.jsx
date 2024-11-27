import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Css/ManageCategory.css';
import AddCategory from './AddCategory';

const ManageCategories = ({ url }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${url}/api/category/list`);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = (e) => setFilterActive(e.target.value);

  const handleAddClick = () => setShowAddForm(true);

  const filteredCategories = categories.filter((category) => {
    return (
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterActive === '' || category.active === (filterActive === 'true'))
    );
  });

  return (
    <div className="manage-categories">
      <h2>Category Management</h2>

      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={filterActive} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button onClick={handleAddClick} className="add-btn">
          Add Category
        </button>
      </div>

      {/* Hiển thị danh sách category */}
      <div className="list-table">
        <div className="list-table-format title">
          <b>ID</b>
          <b>Name</b>
          <b>Active</b>
        </div>
        {filteredCategories.map((category) => (
          <div key={category._id} className="list-table-format">
            <p>{category._id}</p>
            <p>{category.name}</p>
            <p>{category.active ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>

      {/* Form thêm mới category */}
      {showAddForm && <AddCategory url={url} onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default ManageCategories;
