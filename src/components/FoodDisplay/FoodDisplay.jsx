// src/components/FoodDisplay/FoodDisplay.js
import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { useNavigate } from 'react-router-dom';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1); // State để theo dõi trang hiện tại
    const itemsPerPage = 8; // Số sản phẩm mỗi trang

    const truncateName = (name) => {
        const words = name.split(' ');
        return words.length > 7 ? words.slice(0, 7).join(' ') + '...' : name;
    };

    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.length > 6 ? words.slice(0, 6).join(' ') + '...' : description;
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`); // Điều hướng đến trang chi tiết sản phẩm
    };

    // Lọc sản phẩm dựa trên category
    const filteredItems = food_list.filter(item => category === "All" || category === item.category);
    // Tính tổng số trang
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    // Lấy danh sách sản phẩm hiện tại dựa trên trang hiện tại
    const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Chuyển trang
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='food-display' id='food-display'>
            <h2>Bán chạy</h2>
            <div className="food-display-list">
                {currentItems.map((item, index) => (
                    <div key={index} onClick={() => handleProductClick(item._id)}>
                        <FoodItem 
                            id={item._id} 
                            name={truncateName(item.name)}
                            description={truncateDescription(item.description)} 
                            price={item.price} 
                            image={item.image} 
                        /> 
                    </div>
                ))}
            </div>
            {/* Điều hướng phân trang */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                        key={i + 1} 
                        className={currentPage === i + 1 ? 'active' : ''}
                        onClick={() => goToPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;
