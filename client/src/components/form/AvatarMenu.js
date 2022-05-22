import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Menu, Avatar, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import useAuth from "../../hooks/useAuth";

function AvatarMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleComeToProfile = () => {
    handleMenuClose();
    navigate("/user/account/profile");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Avatar
          onClick={handleProfileMenuOpen}
          src={user.avatarUrl}
          alt={user.userName}
          sx={{
            width: { xs: "20px", md: "42px" },
            height: { xs: "20px", md: "42px" },
          }}
        />
        <Typography
          sx={{
            margin: "5px",
            marginRight: 0,
            fontSize: { xs: "0.6rem", md: "1rem" },
          }}
        >
          {user.userName}
        </Typography>
        <Menu
          id="menu-appbar"
          sx={{
            width: { xs: "30%", md: "50%" },
          }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={handleMenuOpen}
          onClose={handleMenuClose}
        >
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography sx={{ fontSize: { xs: "0.5rem", md: "1rem" } }}>
              {user.userName}
            </Typography>
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
          <MenuItem
            onClick={handleComeToProfile}
            sx={{
              mx: 0.5,
              my: 0,
              fontSize: { xs: "0.5rem", md: "1rem" },
            }}
          >
            Tài Khoản
          </MenuItem>
          <Divider sx={{ borderStyle: "dashed" }} />
          <MenuItem
            onClick={handleLogout}
            sx={{
              mx: 0.5,
              px: 2,
              fontSize: { xs: "0.5rem", md: "1rem" },
            }}
          >
            Đăng xuất
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default AvatarMenu;
