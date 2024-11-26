import React, { useState, useEffect } from 'react';
import './TableStyles.css';

// Sample Data
const sampleData = [
  { id: 1, name: 'Product A', price: '$100', category: 'Electronics' },
  { id: 2, name: 'Product B', price: '$200', category: 'Furniture' },
  { id: 3, name: 'Product C', price: '$150', category: 'Apparel' },
  { id: 4, name: 'Product D', price: '$50', category: 'Electronics' },
  { id: 5, name: 'Product E', price: '$120', category: 'Furniture' },
  { id: 6, name: 'Product F', price: '$80', category: 'Apparel' },
];

const DataTable = () => {
  const [data, setData] = useState(sampleData);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const sortData = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return newSortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortOrder(newSortOrder);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sortData('name')}>Name</th>
            <th onClick={() => sortData('price')}>Price</th>
            <th onClick={() => sortData('category')}>Category</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <ul className="pagination">
          {[...Array(Math.ceil(data.length / itemsPerPage))].map((_, index) => (
            <li key={index} className={index + 1 === currentPage ? 'active' : ''}>
              <a
                href="#"
                onClick={() => handlePageClick(index + 1)}
                className={index + 1 === currentPage ? 'active' : ''}
              >
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTable;
