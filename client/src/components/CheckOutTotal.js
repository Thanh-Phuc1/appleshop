import {
  Box,
  Container,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { fCurrency } from "../utils/numberFormat";
import SuccessCheckOut from "./SuccessCheckOut";

function CheckOutTotal() {
  const { cart, delivery } = useSelector((state) => state.cart);
  const { user } = useAuth();
  let cartProducts = [];
  cartProducts = cart.products ? cart.products : [];
  const totalPrice = cart.totalPrice;

  return (
    <Container>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "0.8rem", md: "1.6rem" },
        }}
      >
        Đơn hàng của bạn
      </Typography>
      <Divider />
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              opacity: "0.5",
              fontSize: { xs: "0.4rem", md: "1rem" },
            }}
          >
            Ngày đặt hàng
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.4rem", md: "1rem" },
            }}
          >
            {new Date().toLocaleDateString("en-GB")}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              opacity: "0.5",
              fontSize: { xs: "0.4rem", md: "1rem" },
            }}
          >
            Địa chỉ
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.4rem", md: "1rem" },
            }}
          >
            {delivery.address}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              opacity: "0.5",
              fontSize: { xs: "0.4rem", md: "1rem" },
            }}
          >
            Số điện thoại
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.4rem", md: "1rem" },
            }}
          >
            {delivery.numberOfPhone}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              opacity: "0.5",
              fontSize: { xs: "0.4rem", md: "1rem" },
            }}
          >
            Người nhận
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.4rem", md: "1rem" },
            }}
          >
            {delivery.receiver}
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                display: "flex",
                width: "100%",
                height: { xs: "35px", md: "45px" },
              }}
            >
              <TableCell
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "25%", md: "15%" },
                }}
              >
                Sản phẩm
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "25%", md: "25%" },
                }}
              >
                Tên
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "25%", md: "15%" },
                }}
              >
                Số lượng
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "25%", md: "15%" },
                }}
              >
                Đơn giá
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: { xs: "0.4rem", md: "1rem" },
                  width: { xs: "25%", md: "15%" },
                }}
              >
                Tổng
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {cartProducts.length > 0 &&
              cartProducts.map(({ _id, name, price, quantity, imageUrl }) => (
                <TableRow
                  key={_id}
                  sx={{
                    display: "flex",
                  }}
                >
                  <TableCell sx={{ width: { xs: "25%", md: "15%" } }}>
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
                      width: { xs: "25%", md: "25%" },
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: "0.3rem", md: "1rem" } }}>
                      {name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      width: { xs: "25%", md: "15%" },
                    }}
                  >
                    <Typography
                      sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        fontSize: { xs: "6px", md: "1rem" },
                      }}
                    >
                      {quantity}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: { xs: "0.3rem", md: "1rem" },
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      width: { xs: "25%", md: "15%" },
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
                      width: { xs: "25%", md: "15%" },
                    }}
                  >
                    {fCurrency(price * quantity)}$
                  </TableCell>
                </TableRow>
              ))}
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
        <SuccessCheckOut
          cartProducts={cartProducts}
          delivery={delivery}
          totalPrice={totalPrice}
          user={user}
        />
      </Box>
    </Container>
  );
}

export default CheckOutTotal;
