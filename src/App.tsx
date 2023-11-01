import "react-toastify/dist/ReactToastify.css";

import {
  About,
  Home,
  Menu,
  Services,
} from "./Pages";
import { Cart, Footer, Header } from "./components";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import {
  calculateCartTotal,
  fetchCategory,
  fetchFoodData,
  fetchUserCartData,
  isAdmin,
} from "./utils/functions";
import { AnimatePresence } from "framer-motion";
import Contract from "./components/Contact";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useStateValue } from "./context/StateProvider";
import Order from "./components/Order";
import QRNotification from "./Pages/Error/QRNotification";

function App() {
  const [
    {
      showCart,
      showMobileNav,
      showOrderForm,
      showOrder,
      user,
      foodItems,
      categories,
      cartItems,
      adminMode,
      filter,
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    fetchCategory(dispatch);
    fetchFoodData(dispatch, filter);
    user && fetchUserCartData(user, dispatch);
    if (showOrderForm) {
      dispatch({ type: "SHOW_ORDER_FORM", showOrderForm: false });
    }
  }, [filter]);

  useEffect(() => {
    foodItems &&
      cartItems.length > 0 &&
      calculateCartTotal(cartItems, foodItems, dispatch);
  }, [cartItems, foodItems, dispatch]);
  const token = localStorage.getItem("tableId");
  const navigate = useNavigate();
  if (!token) {
    navigate("/qr-notification");

    return (
      <Routes>
        {/* Các Route khác */}
        <Route path="/qr-notification" element={<QRNotification />} />
      </Routes>
    );
  }
  return (
    <AnimatePresence exitBeforeEnter>
      <ToastContainer />
      <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary">
        {showCart && <Cart />}
        {showOrderForm && <Order />}
        {showOrder && <Order />}
        {showMobileNav && <Header />}
        {!(adminMode && isAdmin(user)) && <Header />}
        <main
          className={`${
            !(adminMode && isAdmin(user)) &&
            "mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4"
          } w-full h-auto`}
          onClick={() => {}}
        >
          {/* Routes */}
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/services" element={<Services />} />
          </Routes>

          {!(adminMode && isAdmin(user)) && <Footer />}
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
