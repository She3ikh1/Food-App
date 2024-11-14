import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cardItems , food_list ,removeFromCart,getTotalCartAmount ,url} = useContext(StoreContext); // Use cardItems to match the context
  const navigate=useNavigate();
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quality</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cardItems[item._id]>0){
            return(
            <div>
              <div className='cart-items-title cart-items-item'>
                {/* <p>{item.name}</p> */}
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cardItems[item._id]}</p>
                <p>${item.price*cardItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr />
              </div>
            )
          }

        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
            <p>Total</p>
            <b>${getTotalCartAmount()+5}</b>
            </div>
          </div>
          <button onClick={()=>navigate("/order")}>Proceed To Checkout </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If You Have Any Promo Code Enter It here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Enter promocode' />
                <button>Submit</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Cart;
