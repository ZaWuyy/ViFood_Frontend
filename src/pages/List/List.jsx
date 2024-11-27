import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
    const [list, setList] = useState([]);
    const [editFood, setEditFood] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        image: null,
    });
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [sortType, setSortType] = useState(""); // State để quản lý kiểu sắp xếp
    const [searchTerm, setSearchTerm] = useState(""); // State để quản lý giá trị tìm kiếm

    const categories = [
        "Mì phở chay",
        "Ruốc nấm chay",
        "Bò chay khô",
        "Cá chay khô",
        "Gà chay khô",
        "Heo chay khô",
        "Giò chả chay",
        "Rau củ quả sạch",
    ];

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫";
    };

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`, {
            params: {
                sortBy: sortType,
                search: searchTerm, // Gửi giá trị tìm kiếm
            },
        });
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error fetching food list.");
        }
    };

    const handleEdit = (food) => {
        setEditFood(food);
        setFormData({
            name: food.name,
            price: food.price,
            description: food.description,
            category: food.category,
            image: null,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const updateFood = async () => {
        const data = new FormData();
        data.append("id", editFood._id);
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category", formData.category);

        if (formData.image) {
            data.append("image", formData.image);
        }

        const response = await axios.post(`${url}/api/food/update`, data);
        if (response.data.success) {
            toast.success(response.data.message);
            await fetchList();
            setEditFood(null);
        } else {
            toast.error("Error updating food.");
        }
    };

    const toggleSelectFood = (foodId) => {
        if (selectedFoods.includes(foodId)) {
            setSelectedFoods(selectedFoods.filter((id) => id !== foodId));
        } else {
            setSelectedFoods([...selectedFoods, foodId]);
        }
    };

    const deleteSelectedFoods = async () => {
        const response = await axios.post(`${url}/api/food/remove`, { ids: selectedFoods });
        if (response.data.success) {
            toast.success(response.data.message);
            await fetchList();
            setSelectedFoods([]); // Clear selection after deletion
        } else {
            toast.error("Error deleting selected foods.");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    useEffect(() => {
        fetchList();
    }, [searchTerm, sortType]); // Gọi lại khi searchTerm hoặc sortType thay đổi

    // Thêm sự kiện reload khi người dùng sử dụng nút Back
    useEffect(() => {
        const handlePopState = () => {
            window.location.reload(); // Reload trang khi nhấn Back
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState); // Clean up sự kiện khi component bị hủy
        };
    }, []);

    return (
        <div className="list add flex-col">
            <p>All Foods List</p>

            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="category">Category</option>
            </select>

            <div className="list-table">
                <div className="list-table-format">
                    <b>Select</b>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>

                {list.map((item) => {
                    return (
                        <div className="list-table-format" key={item._id}>
                            <input
                                type="checkbox"
                                checked={selectedFoods.includes(item._id)}
                                onChange={() => toggleSelectFood(item._id)}
                            />
                            <img src={`${url}/images/` + item.image} alt={item.name} />
                            <p><strong>{item.name}</strong></p>
                            <p>{item.category}</p>
                            <p>{formatPrice(item.price)}</p>
                            <p onClick={() => handleEdit(item)} className="cursor edit-btn">Edit</p>
                        </div>
                    );
                })}
            </div>

            {selectedFoods.length > 0 && (
                <button className="delete-btn" onClick={deleteSelectedFoods}>
                    Delete Selected
                </button>
            )}

            {editFood && (
                <div className="modal-overlay">
                    <div className="edit-form">
                        <h3>Edit Food</h3>
                        <input type="file" onChange={handleImageChange} />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                        />
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />
                        <button onClick={updateFood}>Save</button>
                        <button onClick={() => setEditFood(null)} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
