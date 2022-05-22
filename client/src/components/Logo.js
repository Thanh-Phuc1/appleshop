import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../logo2.png";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, height: 40, margin: "5px", ...sx }}>
      <img
        src={logoImg}
        alt="logo"
        width="100%"
        style={{ borderRadius: "10%" }}
      />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
