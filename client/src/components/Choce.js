import { Box, Menu, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import HomeIcon from "@mui/icons-material/Home";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// menu danh muc
function Choce() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const categories = ["Iphone", "Ipad", "MacBook", "Watch"];
  const handleSubmit = (filterName) => {
    navigate(`/search?q=${filterName}`);
  };

  const handleMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMenuCategory = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleNavigateCategory(category) {
    handleMenuClose();
    navigate(`/products/categories/${category.split(" ").join("-")}`);
  }
  const categoriesMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={handleMenuOpen}
      onClose={handleMenuClose}
    >
      <Box>
        {categories.length &&
          categories.map((category, index) => (
            <MenuItem
              sx={{ fontSize: { xs: "0.6rem", md: "1.1rem" } }}
              key={index}
              onClick={() => handleNavigateCategory(category)}
            >
              {category}
            </MenuItem>
          ))}
      </Box>
    </Menu>
  );

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: { md: "70px" },
        backgroundColor: "white",
        height: "60px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: 2,
        }}
      >
        <Typography
          sx={{
            cursor: "pointer",
            fontSize: { xs: "0.6rem", md: "1.2rem", marginLeft: 146 },
          }}
          color="black"
        >
          <HomeIcon
            onClick={() => navigate("/")}
            sx={{ fontSize: { xs: "20px", md: "40px" } }}
          />
        </Typography>
        {/* menu so doc */}
        <MoreVertIcon
          sx={{ cursor: "pointer", fontSize: { xs: "20px", md: "30px" } }}
          onClick={handleOpenMenuCategory}
        />
        <Box sx={{ fontSize: { xs: "0.6rem", md: "1.2rem", marginLeft: 420 } }}>
          <SearchInput handleSubmit={handleSubmit} />
        </Box>

        {categoriesMenu}
      </Box>
    </Stack>
  );
}

export default Choce;
