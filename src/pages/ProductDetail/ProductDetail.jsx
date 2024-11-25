import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { url, addToCart } = useContext(StoreContext);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${url}/api/food/${id}`);
                if (response.data.success) {
                    setProduct(response.data.data);
                    fetchRelatedProducts(response.data.data.category);
                } else {
                    console.error("Error fetching product details:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProduct();
    }, [id, url]);

    const fetchRelatedProducts = async (category) => {
        try {
            const response = await axios.get(`${url}/api/food/list?search=&category=${category}`);
            if (response.data.success) {
                const allRelated = response.data.data.filter(item => item._id !== id);
                const shuffled = allRelated.sort(() => 0.5 - Math.random());
                const selectedProducts = shuffled.slice(0, 4);
                setRelatedProducts(selectedProducts);
            } else {
                console.error("Error fetching related products:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching related products:", error);
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    return ( 
        <>  
        <div className='product-detail'>
        <button className="return-button" onClick={() => navigate('/')}>
        ⟵
        </button>
            <img className='product-detail-img' src={`${url}/images/${product.image}`} alt={product.image} />
            <h1>{product.name}</h1>
            <p>Mô tả: {product.description}</p>
            <p>Hướng dẫn sử dụng:</p>
            <img src="" alt="Hình ảnh thêm của sản phẩm" className="" />
            <p>Giá: {product.price}₫</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>

            <h2>Gợi ý những sản phẩm liên quan</h2>
            <div className="related-products">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((relatedProduct) => (
                        <div
                            className="food-item"
                            key={relatedProduct._id}
                            onClick={() => navigate(`/product/${relatedProduct._id}`)}
                        >
                            <img src={`${url}/images/${relatedProduct.image}`} alt={relatedProduct.name} />
                            <h3>{relatedProduct.name}</h3>
                            <p>{relatedProduct.price}₫</p>
                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm nào liên quan.</p>
                )}
            </div>
        </div>
        </>
      
)};
export default ProductDetail;
