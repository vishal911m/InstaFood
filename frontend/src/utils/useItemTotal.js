import { useSelector } from "react-redux";

import React from "react";

function useItemTotal() {
  const cartItems = useSelector((store) => store.cart.items);

  const getItemTotal = () => {
    let total =
      cartItems &&
      Object.values(cartItems)
        // .map((item) => (item.price / 100) * item.quantity)
        .map((item) => ((item.price ?? item.defaultPrice ?? 0) / 100) * item.quantity)
        .reduce((acc, curr) => acc + curr, 0);

    return total;
  };

  return getItemTotal;
}
export default useItemTotal;
