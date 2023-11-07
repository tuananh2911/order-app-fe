import React, { useState, useEffect } from 'react';
import { FoodItem } from "../../../types";
import { FruitsSection, MenuSection, ShowcaseBanner } from "../../components";
import { SingleFoodItem } from "../../components/FoodItem";
import { useStateValue } from "../../context/StateProvider";
import { fetchFoodPopular } from "../../utils/functions";

const Home = () => {
  const [userName, setUserName] = useState('');
  const [tableId, setTableId] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedTable = localStorage.getItem('tableId');
    if (storedName && storedTable) {
      setUserName(storedName);
      setTableId(storedTable);
    }
  }, []);
  return (
    <div className="flex w-full h-auto flex-col items-center justify-center">
      <FruitsSection userName={userName} tableId={tableId} />
      <MenuSection />
    </div>
  );
};


export default Home;
