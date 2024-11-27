import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '../redux/actions/categoryActions';
import DataTable from '../components/Table/DataTable';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Category Management</h2>
      <DataTable
        columns={['ID', 'Name', 'Active', 'Actions']}
        data={categories.map((category) => ({
          ID: category._id,
          Name: category.name,
          Active: category.active ? 'Yes' : 'No',
          Actions: (
            <button onClick={() => handleDelete(category._id)}>Delete</button>
          ),
        }))}
      />
    </div>
  );
};

export default CategoryList;
