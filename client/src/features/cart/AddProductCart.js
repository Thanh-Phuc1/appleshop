import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addProductsToCart } from "./cartSlice";

function AddProductCart({ product, cartId }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const productId = product._id;
  useEffect(() => {
    if (productId) dispatch(addProductsToCart({ productId, quantity }));
  }, [productId, dispatch]);

  const handleAddToCart = () => {};

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Button
        sx={{ marginRight: 1 }}
        variant="outlined"
        onClick={() => handleAddToCart()}
      >
        <AddShoppingCartIcon />
      </Button>
    </Box>
  );
}

export default AddProductCart;
