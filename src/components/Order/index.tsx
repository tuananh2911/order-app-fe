// import { useStateValue } from "../../context/StateProvider";
// import { useState } from "react";

// const Order = () => {
//   const [{ cartItems }] = useStateValue();
//   const [orderDate, setOrderDate] = useState(new Date().toLocaleDateString());
//   const [orderStatus, setOrderStatus] = useState("Đang hoàn thành");

//   const handlePayment = () => {
//     // Logic for handling payment goes here
//     // For example, after successful payment, you can set the orderStatus to "Đã hoàn thành"
//     setOrderStatus("Đã hoàn thành");
//   };

//   return (
//     <div className="h-full w-full flex flex-col items-center justify-center px-4 bg-primary">
//       <h2 className="text-2xl mb-4">Order Details</h2>

//       <div className="w-full flex flex-col gap-4">
//         {cartItems && cartItems.length > 0 ? (
//           cartItems.map((item: any, index: number) => (
//             <div key={index} className="flex justify-between border-b pb-2">
//               <span>{item.name}</span>
//               <span>{item.price}</span>
//             </div>
//           ))
//         ) : (
//           <p>No items in the order</p>
//         )}

//         <div className="flex justify-between">
//           <span>Ngày đặt:</span>
//           <span>{orderDate}</span>
//         </div>

//         <div className="flex justify-between mb-4">
//           <span>Trạng thái đơn:</span>
//           <span>{orderStatus}</span>
//         </div>

//         <button
//           onClick={handlePayment}
//           className="text-white bg-orange-600 hover:bg-orange-700 w-full focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 block"
//         >
//           Thanh toán
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Order;
import { useStateValue } from "../../context/StateProvider";
import OrderBody from "./form";
import OrderHeader from "./header";
import { motion } from "framer-motion";
import EmptyOrder from "../EmptyOrder";
import NotFound from "../NotFound";
import Checkout from "../Checkout";
import { useState } from "react";
const Order = () => {
  const [{ cartItems }] = useStateValue();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  return (
    <>
      {checkoutOpen ? (
        <Checkout handler={setCheckoutOpen} />
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className={`w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0`}
          >
            <OrderHeader />
            {cartItems && cartItems.length > 0 ? (
              <OrderBody action={setCheckoutOpen} />
            ) : (
              <div className="h-full w-full flex-1 flex items-center justify-center">
                <EmptyOrder />
              </div>
            )}
          </motion.div>
          {!cartItems && <NotFound text={"Cart Items not available"} />}
        </>
      )}
    </>
  );
};

export default Order;
