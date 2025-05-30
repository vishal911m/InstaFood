import { useState, useEffect } from "react";
import { GET_RESTAURANT_MENU} from "../config";

import { restaurantMenu } from '../config';

const useRestaurant = (resId) => {
  const [restaurant, setRestaurant] = useState(null); 

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  const getRestaurantInfo = async () => {
    try {
      /* Live Data */
      const response = await fetch(GET_RESTAURANT_MENU + resId);
      const res_data = await response.json();
      console.log("API response:", res_data);
      const menuItemsList = res_data.data.cards[4]["groupedCard"].cardGroupMap.REGULAR.cards;
      // const itemCategory = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
      const itemCategory = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
      const NestedItemCategory = "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory";

      /* Mock Data */
      //const res_data =  restaurantMenu;

      const menu = menuItemsList.map(item => {
        if((item.card.card["@type"] === itemCategory) || (item.card.card["@type"] === NestedItemCategory) ) {
          return item.card.card;
        }
      })

      const modifiedData = {
        info : res_data.data.cards[2].card.card.info,
        menu : menu.filter(value => value !== undefined), // removes "undefined" menu items from the list
        menu1: menu,
      };

      setRestaurant(modifiedData)
    } catch (error) {
      console.log(error);
    }
  };
    // Log the restaurant state whenever it changes
    useEffect(() => {
      if (restaurant) {
        console.log("Restaurant state:", restaurant);
      }
    }, [restaurant]);

  return restaurant;

}

export default useRestaurant;