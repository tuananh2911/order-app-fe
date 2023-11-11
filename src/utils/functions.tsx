import { FoodItem, cartItem, FoodCategories, FoodCategory } from "../../types";
import { GiFruitTree, GiChickenOven, GiBeerBottle, GiBowlOfRice } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { FaFish } from "react-icons/fa";
import { Categories, setCategories } from "./categories";

import { MdShoppingBasket } from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const addToCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  fid: number,
  dispatch: any,
) => {
  if (cartItems.some((item: cartItem) => item["fid"] === fid)) {
    toast.error("Item already in cart", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
      toastId: "itemAlreadyInCart",
    });
  } else {
    const data: cartItem = {
      id: Date.now(),
      fid: fid,
      qty: 1,
    };
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: [...cartItems, data],
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
  }
};

export const addToOrder = (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  currentOrderTotal: string,
  dispatch: any,
  customerId: any,
  tableId: any,
) => {
  if (!cartItems || cartItems.length === 0) {
    toast.error("No items in the cart to add to order", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
      toastId: "emptyCart",
    });
    return;
  }
  dispatch({
    type: "SET_ORDERITEMS",
    orderItems: cartItems,
  });
  calculateOrderTotal(cartItems, foodItems, currentOrderTotal, dispatch);
  tableId = localStorage.getItem('tableId');
  customerId = localStorage.getItem('customerId');
  console.log("tableId addtoorder", tableId);
  sendOrderToAPI(customerId, tableId, cartItems);
};

export const sendOrderToAPI = async (
  customerId: string,
  tableId: any,
  orderItems: cartItem[]
) => {
  console.log("tableId sendto", tableId);
  const apiUrl = `https://vtda.online/api/v1/orders?tableId=${tableId}&customerId=${customerId}`;


  const orderData = {
    customerId: customerId,
    items: orderItems.map((item) => ({
      fid: item.fid,
      qty: item.qty,
    })),
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log("Order placed successfully:", data);
  } catch (error) {
    console.error("Error placing order:", error);

    toast.error("Error placing order. Please try again.", {
      icon: <MdShoppingBasket className="text-2xl text-cartNumBg" />,
    });
  }
};

export const fetchUserCartData = async (user: any, dispatch: any) => {
  if (user) {
    const customerId = localStorage.getItem("customerId");
    const tableId = localStorage.getItem("tableId");
  } else {
    localStorage.setItem("cartItems", "undefined");
  }
};

export const fetchFoodData = async (dispatch: any, categoryId: string) => {
  const apiUrl = `https://vtda.online/api/v1/foods/${categoryId}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    dispatch({
      type: "SET_FOOD_ITEMS",
      foodItems: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFoodyById = (menu: FoodItem[], fid: number) => {
  return menu.find((item: FoodItem) => item.id === fid);
};

export const fetchCategory = async (dispatch: any) => {
  const apiUrl = 'https://vtda.online/api/v1/categories';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const mappedCategories: FoodCategories = data.map((category: FoodCategory) => {
      return {
        id: category.id,
        name: category.name,
        urlParam: category.id,
        imageUrl: category.imageUrl,
      };
    });

    setCategories(mappedCategories);
    dispatch({
      type: "SET_CATEGORY",
      categories: mappedCategories,
    });
  } catch (error) {
    console.log(error);
  }
};
export const fetchFoodPopular = async (dispatch: any) => {
  const apiUrl = 'https://vtda.online/api/v1/foods/popular';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    dispatch({
      type: "SET_FOODS_POPULAR",
      foodItemsPopular: data,
    });

    // Cập nhật trạng thái loading sau khi fetch dữ liệu xong
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  } catch (error) {
    console.log(error);
    // Cập nhật trạng thái loading nếu có lỗi
    dispatch({
      type: "SET_LOADING",
      loading: false,
    });
  }
};


// Update Cart Item Quantity
export const updateCartItemQty = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any,
  val: number
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems[index].qty += val;
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
  }
};

//  Delete Cart Item
export const deleteCartItem = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  item: cartItem,
  dispatch: any
) => {
  const index = cartItems.findIndex(
    (cartItem: cartItem) => cartItem.id === item.id
  );
  if (index !== -1) {
    cartItems.splice(index, 1);
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: cartItems,
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
  }
};

//format total
export function formatNumber(number: any) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Calculate Total Price Round to 2 decimal places
export const calculateCartTotal = (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  let total = 0;
  cartItems.forEach((item: cartItem) => {
    const foodItem = getFoodyById(foodItems, item.fid);
    total += item.qty * parseFloat(foodItem?.price || "0");
  });
  const formattedTotal = formatNumber(total);
  dispatch({
    type: "SET_CART_TOTAL",
    cartTotal: formattedTotal,
  });
};
// Calculate Total Price Round to 2 decimal places
export const calculateOrderTotal = (
  newOrderItems: cartItem[],
  foodItems: FoodItem[],
  currentOrderTotal: string,
  dispatch: any
) => {
  let total = parseFloat(currentOrderTotal);
  newOrderItems.forEach((item: cartItem) => {
    const foodItem = getFoodyById(foodItems, item.fid);
    total += item.qty * parseFloat(foodItem?.price || "0");
  });
  if (typeof total === "number") {
    dispatch({
      type: "SET_ORDER_TOTAL",
      orderTotal: total.toFixed(0),
    });
  } else {
    console.error("Total is not a number:", total);
  }
};

// Empty Cart
export const emptyCart = async (
  cartItems: cartItem[],
  foodItems: FoodItem[],
  dispatch: any
) => {
  if (cartItems.length > 0) {
    dispatch({
      type: "SET_CARTITEMS",
      cartItems: [],
    });
    calculateCartTotal(cartItems, foodItems, dispatch);
  } else {
    toast.warn("Cart is already empty");
  }
};

// Hide Cart
export const hideCart = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CART",
    showCart: !true,
  });
};


// Hide Order
export const hideOrderform = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_ORDER_FORM",
    showOrderForm: !true,
  });
};

// Hide Mobile Nav
export const hideMobileNav = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_MOBILE_NAV",
    showMobileNav: !true,
  });
};

// Hide Cart
export const hideContractform = (dispatch: any) => {
  dispatch({
    type: "TOGGLE_CONTRACT_FORM",
    showContractForm: !true,
  });
};

export const shuffleItems = (items: any) => {
  let currentIndex = items.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [items[currentIndex], items[randomIndex]] = [
      items[randomIndex],
      items[currentIndex],
    ];
  }

  return items;
};


export const ToggleAdminMode = (dispatch: any, state: boolean) => {
  dispatch({
    type: "SET_ADMIN_MODE",
    adminMode: state,
  });
  localStorage.setItem("adminMode", JSON.stringify(state));
  console.log(state);
};

export const isAdmin = (user: any) => {
  let isAdmin =
    user?.email == "bentilshadrack72@gmail.com" ||
    user?.email == "admin@test.com";
  return isAdmin;
};


