import { useEffect } from "react";
import { FoodItem } from "../../../types";
import { FruitsSection, MenuSection, ShowcaseBanner } from "../../components";
import { SingleFoodItem } from "../../components/FoodItem";
import { useStateValue } from "../../context/StateProvider";
import { fetchFoodPopular } from "../../utils/functions";

const Home = () => {
  return (
    <div className="flex w-full h-auto flex-col items-center justify-center">
      <FruitsSection />
      <MenuSection />
    </div>
  );
};


export default Home;
