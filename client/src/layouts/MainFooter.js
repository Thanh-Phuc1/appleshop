import React from "react";
import { Link, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      <FontAwesomeIcon icon={faGoogle} size={"lg"} />
      {"copyright ©   "}
      <Link color="inherit" href="https://www.coderschool.vn">
        Apple
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;
