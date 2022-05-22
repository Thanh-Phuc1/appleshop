import * as React from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  width: "10%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

function DividerText({ text }) {
  return (
    <Root>
      <Divider>
        <Typography
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "black",
            fontSize: { xs: "1rem", md: "1.8rem" },
          }}
        >
          {text}
        </Typography>
      </Divider>
    </Root>
  );
}
export default DividerText;
