import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: { xs: "200px", md: "340px" },
        minHeight: { xs: "210px", md: "380px" },
      }}
    >
      <CardMedia
        component="img"
        image={product.imageUrl}
        alt={product.name}
        sx={{
          height: { xs: "140px", md: "250px" },
          position: "absolute",
          top: 0,
          cursor: "pointer",
        }}
        onClick={() => navigate(`/products/${product._id}`)}
      />
      <CardContent
        sx={{
          position: "absolute",
          top: "75%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Link
          sx={{
            cursor: "pointer",
            color: "black",
            fontFamily: "Helvetica",
            blur: "5px",
          }}
          component={RouterLink}
          to={`/products/${product._id}`}
        >
          {" "}
          {product.name}
        </Link>
        <Typography
          sx={{
            color: "red",
            fontFamily: "serif",
            fontSize: { xs: "0.6rem", md: "1.2rem" },
          }}
        >
          Giá : {fCurrency(product.price)}$
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
