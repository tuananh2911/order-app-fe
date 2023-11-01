import { motion } from "framer-motion";
import { MdOutlineFastfood } from "react-icons/md";
import { FoodCategory } from "../../../types";
const Button = ({
  category,
  filter,
  setFilter,
  dispatch,
}: {
  category: FoodCategory;
  filter: string;
  setFilter: any;
  dispatch: any;
}) => {
  const isActive = category.urlParam === filter;
  return (
    <motion.div
      onClick={() => {
        setFilter(category.id);
      }}
      whileTap={{ scale: 1.1 }}
      className={`group ${isActive ? "bg-cartNumBg" : "bg-btnOverlay hover:bg-cartNumBg"} w-24 min-w-[6rem] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all  ease-out`}
    >
      <div
        className={`w-16 h-16 rounded-full ${isActive ? "bg-btnOverlay" : "bg-cartNumBg group-hover:bg-btnOverlay"}`}
      >
        <img
          className={`rounded-full w-16 h-16`}
          src={category.imageUrl}
          alt={category.name}
        />
      </div>
      <p className={`text-base ${isActive ? "text-white" : "text-textColor group-hover:text-white"}`}>
        {category.name}
      </p>
    </motion.div>
  );
};

export default Button;
