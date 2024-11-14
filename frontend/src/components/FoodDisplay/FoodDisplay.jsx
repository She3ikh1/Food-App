import React, { useContext } from 'react'
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem.jsx/FoodItem';
const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h1>Top Dishes For You</h1>
        <div className="food-display-list">
            {food_list.map((item,index)=>{
              if(category==="All" ||category===item.category ){
                return <FoodItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} description={item.description}/>
              }
            })}
        </div>
    </div>  
  )
}

export default FoodDisplay