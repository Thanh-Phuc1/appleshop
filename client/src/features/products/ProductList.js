import { Button, Container, Divider, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_HOME_PAGE } from "../../app/config";
import DividerText from "../../components/form/DividerText";
import ProductCard from "./ProductCard";
import { getProducts } from "./productSlice";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productsById, currentPageProducts } = useSelector(
    (state) => state.product
  );
  const products = currentPageProducts.map(
    (productId) => productsById[productId]
  );
  const limit = PRODUCTS_HOME_PAGE;

  useEffect(() => {
    dispatch(getProducts({ limit }));
  }, [dispatch, limit]);

  const arrCategoryIphone = products
    .filter((product) => product.categories === "iphone")
    .slice(0, 4);
  const arrCategorySaleOf = products
    .filter((product) => product.categories === "ipad")
    .slice(0, 4);
  const arrCategoryMac = products
    .filter((product) => product.categories === "macbook")
    .slice(0, 4);
  const arrCategoryIW = products
    .filter((product) => product.categories === "iw")
    .slice(0, 4);
  return (
    <>
      <Container
        sx={{
          mt: { xs: 8, md: 8 },
          textAlign: "center",
          fontSize: { xs: "0.4rem", md: "1.2rem" },
          justifyContent: "center",
        }}
      >
        <DividerText text="Iphone" />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid container spacing={3}>
          {arrCategoryIphone.length !== 0 &&
            arrCategoryIphone.map((product) => (
              <Grid key={product._id} item xs={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
        <Button
          sx={{
            marginBottom: { xs: 1, md: 3 },
            marginTop: 2,
            fontSize: { xs: "0.6rem", md: "1.2rem" },
            border: "1px solid black",
          }}
          onClick={() => navigate("/products/categories/Iphone")}
        >
          XEM THÊM
        </Button>

        <DividerText text="MacBook" />
        <Grid container spacing={1}>
          {arrCategoryMac.length !== 0 &&
            arrCategoryMac.map((product) => (
              <Grid key={product._id} item xs={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
        <Button
          // size="large"
          sx={{
            margin: 2,
            fontSize: { xs: "0.6rem", md: "1.2rem" },
            border: "1px solid black",
          }}
          onClick={() => navigate("/products/categories/MacBook")}
        >
          XEM THÊM
        </Button>
        <DividerText text="iPad" />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid container spacing={1}>
          {arrCategorySaleOf.length !== 0 &&
            arrCategorySaleOf.map((product) => (
              <Grid key={product._id} item xs={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
        <Button
          sx={{
            margin: 2,
            fontSize: { xs: "0.6rem", md: "1.2rem" },
            border: "1px solid black",
          }}
          onClick={() => navigate("/products/categories/Ipad")}
        >
          XEM THÊM
        </Button>

        <DividerText text="Apple Watch" />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid container spacing={1}>
          {arrCategoryIW.length !== 0 &&
            arrCategoryIW.map((product) => (
              <Grid key={product._id} item xs={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
        <Button
          sx={{
            marginBottom: { xs: 1, md: 3 },
            marginTop: 2,
            fontSize: { xs: "0.6rem", md: "1.2rem" },
            border: "1px solid black",
          }}
          onClick={() => navigate("/products/categories/Watch")}
        >
          XEM THÊM
        </Button>
      </Container>
    </>
  );
}

export default ProductList;
