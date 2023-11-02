import { useLayoutEffect, useRef } from "react";

import { FoodItem } from "../../../types";
import Loader from "../Loader";
import { SingleFoodItem } from "../FoodItem";
import { motion } from "framer-motion";
import NotFound from "../NotFound";
import { isAdmin } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";

const Container = ({ scrollOffset, col, items, className }: { scrollOffset: number, col?: boolean; items: FoodItem[], className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (null !== containerRef.current) {
      containerRef.current.scrollTop += scrollOffset;
    }
  }, [scrollOffset]);

  const [{ user }, dispatch] = useStateValue();

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      className={`${className} w-full h-[700px]  flex flex-col items-center justify-start overflow-y-scroll scrollbar-hidden scroll-smooth p-0 m-0`}
    >
      {items && items.map((item: FoodItem) => (
        <SingleFoodItem key={item.id} item={item} col={col} admin={isAdmin(user)} />
      ))}
      {
        !items && (!col ? (<Loader progress={"Fetching Food Items....."} />) : (<NotFound text="Fetching Food Items..." />))
      }
      {
        items && items.length <= 0 && (<NotFound text="No Food Items Available " />)
      }
    </motion.div>
  );
};

export default Container;
