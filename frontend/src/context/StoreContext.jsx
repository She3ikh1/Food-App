import { createContext, useEffect } from "react";

export const StoreContext = createContext(null);
import { useState } from "react";
import axios from 'axios';

const StoreContextProvider = (props) => {
  const [cardItems, setCardItems] = useState({});
  const url= "http://localhost:4000";
  const [token,setToken]=useState ("");
  const [food_list,setFoodList]=useState([]);


  const addToCart = async (itemId) => {
    if (!cardItems[itemId]) {
      setCardItems((prev) => ({ ...prev, [itemId]:  1 }));
    } else {
      setCardItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart =  async (itemId) => {
    setCardItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };


  const getTotalCartAmount =()=>{
    let totalAmount=0;
    for (const item in cardItems){
      if(cardItems[item]>0){
        let itemInfO= food_list.find((product)=>product._id===item);
        totalAmount+=itemInfO.price*cardItems[item];
      }
    }
    return totalAmount;
  }


  // fetch data of food from database//
  const fetchFoodList=async()=>{
    const response =await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)

  }

  // ensure that when page get reload the cart data should be shown //
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, {
        headers: { token },
      });
      setCardItems(response.data.cartData || {}); // Ensure it’s an object
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };
 

   //is function se jb hum page reload kren gy tw wo logout nai hoga
  useEffect(()=>{
    
   async function loadData() {
    await fetchFoodList()
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"));
    }
   }
   loadData();
  },[])
  // useEffect(()=>{
  //   // console.log

  // },[cardItems])
  const contextValue = {
    food_list,
    cardItems,
    setCardItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
