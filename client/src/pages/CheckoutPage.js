import { Breadcrumbs, Container, Typography, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import CartProductList from "../components/CartProductList";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { getProductInCart } from "../features/cart/cartSlice";
import CheckOutForm from "./../components/CheckOutForm";
import CheckOutTotal from "./../components/CheckOutTotal";

function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const cartId = user.cartId;

  let { cart } = useSelector((state) => state.cart);
  // let cartProducts = Object.keys(cart) ? cart.products : [];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (cartId) {
      dispatch(getProductInCart());
    }
  }, [dispatch, cartId]);

  return (
    <>
      <Container
        sx={{
          mt: 12,
        }}
      >
        <Breadcrumbs sx={{ mb: 8 }}>
          <HomeIcon
            onClick={() => navigate("/")}
            sx={{ fontSize: { cursor: "pointer", xs: "20px", md: "40px" } }}
          />
          <Typography
            color="black"
            sx={{ fontSize: { xs: "0.7rem", md: "1.5rem" } }}
          >
            Thanh Toán
          </Typography>
        </Breadcrumbs>

        <Stack>
          {activeStep === 0 && (
            <CartProductList cart={cart} setActiveStep={setActiveStep} />
          )}
          {activeStep === 1 && (
            <CheckOutForm cartId={cart._id} setActiveStep={setActiveStep} />
          )}
          {activeStep === 2 && <CheckOutTotal />}
        </Stack>
      </Container>
    </>
  );
}

export default CheckoutPage;
