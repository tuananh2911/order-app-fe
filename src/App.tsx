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
import { customAlphabet, nanoid } from 'nanoid';
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useStateValue } from "./context/StateProvider";
import OrderDetail from "./components/OrderDetail";
import Order from "./components/Order";
import QRNotification from "./Pages/Error/QRNotification";
import WelcomeModal from "./components/WelcomeForm";

function App() {
  const [
    {
      showCart,
      showMobileNav,
      showOrderForm,
      showOrderDetail,
      user,
      foodItems,
      categories,
      cartItems,
      adminMode,
      filter,
    },
    dispatch,
  ] = useStateValue();
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);
  useEffect(() => {
    // fetchFoodData(dispatch, filter);
    user && fetchUserCartData(user, dispatch);

    if (showOrderDetail) {
      dispatch({ type: "SHOW_ORDER_DETAIL", showOrderDetail: false });
    }
    if (showOrderForm) {
      dispatch({ type: "SHOW_ORDER_FORM", showOrderForm: false });
    }
  }, [filter]);

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      setIsWelcomeModalVisible(true);
    } else {
      dispatch({
        type: 'SET_USER',
        user: userName,
      });
      setIsWelcomeModalVisible(false);
    }
  }, [dispatch]);
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

  const handleWelcomeModalClose = (name: any) => {
    const existingCustomerId = localStorage.getItem('customerId');
    let customerId;

    if (existingCustomerId) {
      customerId = existingCustomerId;
    } else {
      const nanoId = customAlphabet('123456789',6)
      const randomPart = nanoId();
      customerId = `${randomPart}`;
      localStorage.setItem('customerId', customerId);
    }

    const tableId = localStorage.getItem('tableId') || 'Unknown Table';

    // Cập nhật state với thông tin người dùng mới và tableId
    dispatch({
      type: 'SET_USER_INFO',
      userInfo: {
        name: name,
        customerId: customerId,
        tableId: tableId,
      },
    });

    localStorage.setItem('userName', name);
    setIsWelcomeModalVisible(false);
    window.location.reload();
  };


  return (
    <AnimatePresence exitBeforeEnter>
      <ToastContainer />
      <div className="w-screen h-auto min-h-[100vh] flex flex-col bg-primary">
        {showCart && <Cart />}
        {showOrderForm && <Order />}
        {showOrderDetail && <OrderDetail />}
        {showMobileNav && <Header />}
        {!(adminMode && isAdmin(user)) && <Header />}
        <main
          className={`${!(adminMode && isAdmin(user)) &&
            "mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4"
            } w-full h-auto`}
          onClick={() => { }}
        >
          {/* Routes */}
          <Routes>

            <Route path="/*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/qr-notification" element={<QRNotification />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/services" element={<Services />} />

          </Routes>
          {isWelcomeModalVisible && <WelcomeModal onClose={handleWelcomeModalClose} />}
          {!(adminMode && isAdmin(user)) && <Footer />}
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
