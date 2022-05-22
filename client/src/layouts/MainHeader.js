import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, Divider, Stack, CardMedia } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import logoImg from "../logo.png";
import useAuth from "../hooks/useAuth";
import AvatarMenu from "../components/form/AvatarMenu";
import CartItem from "./../components/CartItem";

function MainHeader() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const AccessHandle = () => (
    <div style={{ display: "flex" }}>
      <Link
        color="white"
        sx={{
          margin: 1,
          fontSize: { xs: "0.5rem", md: "1rem" },
        }}
        underline="none"
        component={RouterLink}
        to="/register "
      >
        Đăng Ký
      </Link>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Link
        color="white"
        sx={{
          margin: 1,
          fontSize: { xs: "0.5rem", md: "1rem" },
        }}
        underline="none"
        component={RouterLink}
        to="/login"
      >
        Đăng Nhập
      </Link>
    </div>
  );

  return (
    <>
      <Stack
        sx={{
          position: "fixed",
          width: "100%",
          zIndex: "900",
        }}
      >
        <AppBar>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => navigate("/")}
              ></IconButton>
              <Typography
                component="div"
                sx={{
                  margin: { xs: "5px", md: "0" },
                  fontSize: { xs: "1rem", md: "1.5rem" },
                }}
              >
                Shopping
              </Typography>
            </Box>
            <CardMedia
              component="img"
              src={logoImg}
              alt="logo"
              onClick={() => navigate("/")}
              sx={{
                width: { xs: "20px", md: "150px" },
                height: { xs: "20px", md: "50px" },
                borderRadius: "5px",
                cursor: "pointer",
              }}
            />
            <CartItem />
            {user && <AvatarMenu />}
            {!user && <AccessHandle />}
          </Toolbar>
        </AppBar>
      </Stack>
    </>
  );
}
export default MainHeader;
