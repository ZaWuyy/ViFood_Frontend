import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [searchSuggestions, setSearchSuggestions] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url +"/api/cart/add", {itemId}, {headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", {itemId}, {headers:{token}});
        }
    }
    const getTotalCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    };
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async (search = '') => {
        try {
            const response = await axios.get(`${url}/api/food/list?search=${search}`);
            if (response.data.success) {
                setFoodList(response.data.data);
                // Nếu có tìm kiếm, cập nhật gợi ý
                if (search) {
                    const suggestions = response.data.data.map(item => ({ id: item._id, name: item.name }));
                    setSearchSuggestions(suggestions);
                }
            } else {
                console.error("Error fetching food list:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/list", {headers:{token}});
        setCartItems(response.data.cartData);
    };
    const fetchFoodDetail = async (id) => {
        try {
            const response = await axios.get(`${url}/api/food/${id}`);
            console.log(response.data); // Log dữ liệu để kiểm tra
            if (response.data.success) {
                return response.data.data;
            } else {
                console.error("Error fetching food detail:", response.data.message);
                return null;
            }
        } catch (error) {
            console.error("Error fetching food detail:", error);
            return null;
        }
    };

    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            if (localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        fetchFoodList,
        fetchFoodDetail,
        searchSuggestions,
        getTotalCartCount,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;