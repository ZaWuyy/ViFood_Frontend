import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Mì phở chay",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Kiểm tra giá nhập vào
    if (name === 'price' && isNaN(value)) {
      toast.error("Giá phải là một số!");
      return;
    }

    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Kiểm tra các trường bắt buộc
    if (!data.name || !data.description || !data.price || !image) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Mì phở chay",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here...' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' placeholder='Write content here...' rows="6" required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Mì phở chay">Mì phở chay</option>
              <option value="Ruốc nấm chay">Ruốc nấm chay</option>
              <option value="Bò chay khô">Bò chay khô</option>
              <option value="Cá chay khô">Cá chay khô</option>
              <option value="Gà chay khô">Gà chay khô</option>
              <option value="Heo chay khô">Heo chay khô</option>
              <option value="Giò chả chay">Giò chả chay</option>
              <option value="Rau củ quả sạch">Rau củ quả sạch</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='20.000' required />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
}

export default Add;
