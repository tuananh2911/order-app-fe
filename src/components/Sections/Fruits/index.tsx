import { PrevNext as PrevNextButtons, Title } from "..";
import { useEffect, useState } from "react";
import { useStateValue } from "../../../context/StateProvider";
import { fetchFoodPopular } from "../../../utils/functions";
import { SingleFoodItem } from "../../FoodItem";
import { FoodItem } from "../../../../types";

function Fruits({ userName, tableId }: { userName: any, tableId: any }) {

  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems, foodItemsPopular, loading }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      await fetchFoodPopular(dispatch);
    };

    fetchData();
  }, [dispatch]);

  if (loading || !foodItemsPopular) {
    return <div>Loading...</div>;
  }
  return (
    <section className="w-full my-">
      {userName && (
        <div className="text-base flex items-center flex-col justify-center">
          <div>
            Hello,{' '}
            <span className="text-blue-500 font-semibold">{userName}</span>!
          </div>
          <div className="text-dark">Bạn đang ngồi ở bàn - {' '}
            <span className="text-base font-semibold">{tableId}</span>
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-between mb-4">
        <Title title="Best Seller" />
        <PrevNextButtons
          onNext={() => setScrollValue(10000)}
          onPrev={() => setScrollValue(-10000)}
        />
      </div>
      <div className="overflow-x-auto whitespace-nowrap">
        <div className="inline-flex space-x-8 mt-4">
          {foodItemsPopular.map((food: FoodItem) => (
            <div key={food.id} className="w-64">
              <SingleFoodItem item={food} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Fruits;
