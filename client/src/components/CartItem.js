import { Badge } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CartItem() {
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  let products = cart ? cart.products : [];
  const totalProducts = products?.length > 0 ? products.length : 0;
  return (
    <Badge
      sx={{
        position: "fixed",
        zIndex: 1000,
        right: 60,
        cursor: "pointer",
      }}
      badgeContent={totalProducts}
      color="secondary"
      onClick={() => navigate("/checkout")}
    >
      <ShoppingCartIcon
        sx={{
          color: "#FF0040",
          width: { xs: "20px", md: "35px" },
          height: { xs: "20px", md: "35px" },
        }}
      />
    </Badge>
  );
}

export default CartItem;
