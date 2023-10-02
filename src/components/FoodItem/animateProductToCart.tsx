import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
import { FoodItem } from "../../../types";

export const animateProductToCart = (product: FoodItem) => {
  const cartIcon = (
    <motion.div
      className="cart-icon" // Đặt lớp CSS tương ứng cho biểu tượng giỏ hàng nếu cần
    >
      <MdShoppingBasket className="text-4xl cursor-pointer" />
    </motion.div>
  );

  if (cartIcon) {
    const productBounds = product.getBoundingClientRect();
    const cartBounds = cartIcon.getBoundingClientRect();

    const xOffset = cartBounds.left - productBounds.left;
    const yOffset = cartBounds.top - productBounds.top;

    const productAnimation = {
      x: xOffset,
      y: yOffset,
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    };

    const animatedProduct = (
      <motion.div
        initial={{ opacity: 1 }}
        animate={productAnimation}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          zIndex: 999,
        }}
      >
        {/* Đặt nội dung của sản phẩm ở đây */}
        {/* Ví dụ: */}
        <img src={product.image} alt={product.name} />
      </motion.div>
    );

    document.body.appendChild(animatedProduct);

    animatedProduct.addEventListener("animationend", () => {
      document.body.removeChild(animatedProduct);
    });
  }
};
