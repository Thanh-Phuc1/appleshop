import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container sx={{ display: "flex" }}></Container>
        <Outlet />
      </Stack>
    </>
  );
}

export default BlankLayout;
