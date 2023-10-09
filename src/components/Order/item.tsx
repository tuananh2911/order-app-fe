import { cartItem } from "../../../types";
import { getFoodyById } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";

const OrderItem = ({ item }: { item: cartItem }) => {
  const [{ foodItems, cartItems, orderItems }, dispatch] = useStateValue();
  const { id, fid, qty } = item;
  const foodItem = getFoodyById(foodItems, fid);
  return (
    <div className="w-full p-1 px-2 rounded-lg backgroundColor hover:shadow-md flex items-center justify-between gap-2 cursor-pointer" style={{ backgroundColor: '#354270' }}>
      <div className=" flex items-center  gap-2 px-2">
        <img
          src={foodItem?.imageUrl}
          alt=""
          className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        />
        <div className="flex flex-col gap-0 ">
          <p className="text-base text-gray-50">{foodItem?.name}</p>
          <p className="text-sm block text-gray-300 font-semibold">
            <span className="text-xs text-red-600">₵</span> {foodItem?.price}
          </p>
        </div>
      </div>
      <div className="group flex items-center gap-2  cursor-pointer px-5" >
        <p className="text-sm text-gray-50 w-5 h-5 backgroundColor rounded-sm bg-cartBg flex items-center justify-center cursor-default" style={{ backgroundColor: '#354256' }}>
          {qty}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
//bg-containerbg
//bg-cardOverlay
//bg-cartItem