import React, { useContext } from "react";
import "./Fooditem.css";
import { assets } from "../../assets/assets";
// import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = ({ id, name, price, image, description }) => {

  // const[itemCount,setItemCount]=useState(0);
  const{cardItems,addToCart,removeFromCart,url} =useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img   className="food-item-image" src={url+"/images/"+image} alt="error"/>
        {
          !cardItems[id]
          ?<img className="add" onClick={()=>addToCart(id) }src={assets.add_icon_white} alt=""/>
          :
          <div className="food-item-counter">
            <img onClick={()=>removeFromCart(id)}src={assets.remove_icon_red} alt="" />
            <p>{cardItems[id]}</p>
            <img onClick={()=>addToCart(id)}src={assets.add_icon_green} alt="" />


          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>
            {name}
            <img src={assets.rating_starts} alt="" />
          </p>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
