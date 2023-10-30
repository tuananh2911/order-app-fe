import { useState } from "react";
import { useStateValue } from '../../context/StateProvider';
import { formatNumber } from "../../utils/functions";
const OrderTotal = ({ checkoutState }: { checkoutState: any }) => {
  const [{ orderTotal }] = useStateValue();
  const [orderDate, setOrderDate] = useState(new Date().toLocaleDateString());
  const [orderStatus, setOrderStatus] = useState("Đang hoàn thành");
  const statusColor = orderStatus === "Đang hoàn thành" ? "yellow" : orderStatus === "Đã hoàn thành" ? "#1EFF34" : "white";
  return (
    <div className='w-full mt-2 md:mt-0 flex-1 rounded backgroundColor rounded-t-[2rem] px-8 py-2 flex flex-col items-center justify-evenly' style={{ backgroundColor: '#877c6d ' }}>
      <div >
        <div className="flex text-base ">
          <span>Ngày đặt: <span>{orderDate}</span></span>
        </div>
        <div className="flex mb-4 text-base ">
          <span>Trạng thái đơn: <span style={{ color: statusColor }}>{orderStatus}</span></span>
        </div>
      </div>
      <div className="w-full border-b border-gray-600 my-"></div>
      <div className="w-full flex items-center justify-between my-10">
        <p className="text-base md:text-lg uppercase">Total</p>
        <p className="ext-base md:text-lg">-</p>
        <p className="text-base md:text-lg "><span className="text-sm text-red-600"></span> {formatNumber(orderTotal)}đ</p>
      </div>
    </div>
  )
}
export default OrderTotal