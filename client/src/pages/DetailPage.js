import {
  Box,
  Button,
  CardMedia,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductDetail,
  resetProducts,
} from "../features/products/productSlice";
import { fCurrency } from "../utils/numberFormat";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useAuth from "../hooks/useAuth";
import { LIMIT_BUY_PRODUCT } from "../app/config";
import { addProductsToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import Choce from "./../components/Choce";

function DetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(1);
  const { user } = useAuth();

  const { productsById } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);

  const { name, description, price, imageUrl, _id } = productsById;

  useEffect(() => {
    if (params.id) {
      dispatch(getProductDetail(params.id));
      dispatch(resetProducts());
    }
  }, [dispatch, params]);

  const handleAddToCart = (buyNow) => {
    if (user) {
      const cartId = user.cartId;
      const productId = _id;
      let quantity = Number(value);
      const productInCartCurrent = cart.products?.find(
        (productCart) => productCart._id === productId
      );
      let productInCart = productInCartCurrent
        ? productInCartCurrent.quantity + quantity
        : quantity;
      if (productInCart <= LIMIT_BUY_PRODUCT && productInCart > 0) {
        if (cartId) {
          dispatch(addProductsToCart({ productId, cartId, quantity }));
          if (buyNow) {
            navigate("/checkout");
          } else {
            toast.success(
              `Bạn đã thêm ${name} với số lượng là ${value} vào đơn hàng!`
            );
          }
        }
      } else {
        if (productInCart > LIMIT_BUY_PRODUCT) {
          toast.error(`Giới hạn mua sản phẩm là ${LIMIT_BUY_PRODUCT}!`);
        }
        setValue(1);
      }
    } else {
      navigate("/login");
    }
  };

  const handleAddAmount = () => {
    if (value < 100) {
      setValue(value + 1);
    }
  };

  const handleRemoveAmount = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  return (
    <>
      <Choce />
      <Container
        sx={{
          mt: 5,
          height: "100%",
          display: "flex",
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{
            height: "100%",
            maxWidth: "40%",
            borderRadius: "5px",
            marginRight: { xs: "15px", md: "25px" },
          }}
        />
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              marginBottom: 3,
              fontSize: { xs: "1rem", md: "1.3rem" },
            }}
          >
            {description}
          </Typography>
          <Divider
            sx={{
              marginBottom: 2,
              fontSize: { xs: "1rem", md: "1.3rem" },
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.4rem" },
              color: "red",
              fontWeight: "800",
              marginBottom: 3,
            }}
          >
            Giá : {fCurrency(price)}$
          </Typography>

          <Divider />

          <Typography
            sx={{
              fontWeight: "bold",
              mt: 2,
              fontSize: { xs: "0.8rem", md: "1.3rem" },
            }}
          >
            Số lượng:
          </Typography>

          <Box sx={{ display: "flex", my: 2 }}>
            <Button variant="link" onClick={handleRemoveAmount}>
              <RemoveIcon
                sx={{ fontSize: { xs: "1rem", md: "1.5rem", color: "red" } }}
              />
            </Button>
            {/* so luong */}
            <input
              style={{
                width: "50px",
                height: "100%",
                textAlign: "center",
                border: "2px solid black",
                margin: 1,
                borderRadius: "5px",
              }}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            <Button variant="link" onClick={handleAddAmount}>
              <AddIcon
                sx={{ fontSize: { xs: "1rem", md: "1.5rem", color: "blue" } }}
              />
            </Button>
          </Box>
          <Divider
            sx={{
              marginBottom: 5,
              fontSize: { xs: "1rem", md: "1.3rem" },
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              onClick={() => handleAddToCart(0)}
              color="secondary"
              variant="outlined"
              sx={{ marginRight: 2 }}
            >
              <Typography
                sx={{
                  display: { xs: 1, md: 1, fontWeight: "bold" },
                }}
              >
                Đặt Hàng
              </Typography>
            </Button>
            <Typography
              sx={{
                marginTop: 1,
                fontSize: { xs: "1rem", md: "1rem", marginRight: 10 },
              }}
            ></Typography>
          </Box>
        </Stack>
      </Container>
    </>
  );
}

export default DetailPage;
