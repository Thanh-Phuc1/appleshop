import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { addProductsToCart } from "../features/cart/cartSlice";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { fCurrency } from "../utils/numberFormat";
import { LIMIT_BUY_PRODUCT } from "./../app/config";

function CartProductList({ cart, setActiveStep }) {
  const dispatch = useDispatch();
  const cartId = cart._id;
  let productsInCart = [];
  if (cart.products) productsInCart = cart.products;

  const handleDeleteProduct = ({ productId }) => {
    const quantity = -100;
    if (cartId) {
      dispatch(addProductsToCart({ productId, cartId, quantity }));
    }
  };
  const handleActiveStep = () => {
    if (productsInCart.length > 0) {
      setActiveStep((step) => step + 1);
    }
  };

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                display: "flex",
                height: { xs: "35px", md: "45px" },
              }}
            >
              <TableCell
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "20%", md: "15%" },
                }}
              >
                Sản phẩm
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "15%", md: "25%" },
                }}
              >
                Tên sản phẩm
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "20%", md: "15%" },
                }}
              >
                Số lượng
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "18%", md: "15%" },
                }}
              >
                Đơn giá
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: "20%",
                }}
              >
                Tổng
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {productsInCart.length !== 0 &&
              productsInCart.map(
                ({ _id: productId, name, price, imageUrl, quantity }) => (
                  <TableRow
                    key={productId}
                    sx={{
                      display: "flex",
                    }}
                  >
                    <TableCell sx={{ width: { xs: "20%", md: "15%" } }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            borderRadius: 2,
                            width: { xs: "40px", md: "70px" },
                            height: { xs: "30px", md: "70px" },
                            overflow: { xs: "none", md: "hidden" },
                          }}
                        >
                          <img
                            src={imageUrl}
                            alt="product"
                            width="100%"
                            height="100%"
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        width: { xs: "20%", md: "25%" },
                      }}
                    >
                      <Typography
                        sx={{ fontSize: { xs: "0.3rem", md: "1rem" } }}
                      >
                        {name}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        width: { xs: "20%", md: "15%" },
                      }}
                    >
                      <QuantityCounter
                        dispatch={dispatch}
                        quantity={
                          quantity < LIMIT_BUY_PRODUCT
                            ? quantity
                            : LIMIT_BUY_PRODUCT
                        }
                        cartId={cartId}
                        productId={productId}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: { xs: "0.3rem", md: "1rem" },
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        width: { xs: "20%", md: "15%" },
                      }}
                    >
                      {fCurrency(price)}$
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: { xs: "0.3rem", md: "1rem" },
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        width: "15%",
                      }}
                    >
                      {fCurrency(price * quantity)}$
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: { xs: "0.3rem", md: "1rem" },
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        width: "15%",
                      }}
                    >
                      <DeleteForeverIcon
                        sx={{
                          color: "red",
                          fontSize: { xs: "8px", md: "2rem" },
                        }}
                        onClick={() => handleDeleteProduct({ productId })}
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
            <TableRow
              sx={{
                width: "85%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <TableCell />
              <TableCell />
              <TableCell
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "25%", md: "15%" },
                }}
              >
                Tổng cộng:
              </TableCell>
              <TableCell
                sx={{ fontSize: { xs: "0.4rem", md: "1rem" }, width: "15%" }}
              >
                {fCurrency(cart.totalPrice)}$
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          sx={{ fontSize: { xs: "0.4rem", md: "1rem" } }}
          onClick={() => handleActiveStep()}
        >
          Tiếp theo
        </Button>
      </Box>
    </Box>
  );
}

function QuantityCounter({ dispatch, quantity, productId, cartId }) {
  const handleDescQuantity = () => {
    if (quantity !== 1) {
      quantity = -1;
      if (cartId) dispatch(addProductsToCart({ productId, cartId, quantity }));
    }
  };
  const handleIncQuantity = () => {
    if (quantity < LIMIT_BUY_PRODUCT) {
      if (cartId) dispatch(addProductsToCart({ productId, cartId }));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IndeterminateCheckBoxIcon
        sx={{
          fontSize: { xs: "8px", md: "1.5rem" },
          color: "red",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={() => handleDescQuantity()}
      />
      <Typography sx={{ fontSize: { xs: "6px", md: "1rem" } }}>
        {quantity}
      </Typography>
      <AddBoxIcon
        onClick={() => handleIncQuantity()}
        sx={{ fontSize: { xs: "8px", md: "1.5rem" }, color: "green" }}
      />
    </Box>
  );
}

export default CartProductList;
