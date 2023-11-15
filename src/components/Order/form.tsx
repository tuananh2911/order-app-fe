import OrderItem from './item';
import { useStateValue } from '../../context/StateProvider';

const OrderBody = ({ action }: { action: any }) => {
    const [{ listOrders, orderItems }] = useStateValue();
    return (
        <div className='w-full h-full rounded-t-[2rem] backgroundColor flex flex-col' style={{ backgroundColor: 'white' }}>
            <div className='w-full h-[60vh] backgroundColor md:h-42 px-6 py- flex flex-col gap-3 overflow-y-scroll scrollbar-hidden' style={{ backgroundColor: 'white' }}>
                {
                    orderItems && orderItems.length > 0 && orderItems.map((item: any, index: number) => {
                        return <OrderItem key={index} item={item} />
                    })
                }
                {/* {listOrders.map((order : any) => (
                    <option key={order.id} value={order.id}>
                        {order.name}
                    </option>
                ))} */}
            </div>
        </div >
    )
}

export default OrderBody