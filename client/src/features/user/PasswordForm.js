import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card, Box, Typography } from "@mui/material";
import React from "react";
import { FTextField, FormProvider } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";
import { updatePassword } from "./userSlice";

const UpdateUserSchema = Yup.object().shape({
  password: Yup.string().required("Nhập mật khẩu cũ"),
  newPassword: Yup.string().required("Nhập mật khẩu mới"),
  ConfirmNewPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

function PasswordForm() {
  const { user } = useAuth();

  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    password: "",
    newPassword: "",
    ConfirmNewPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updatePassword({ userId: user._id, ...data }));
    reset();
  };

  return (
    <Box sx={{ padding: 1 }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "0.9rem", md: "1.5rem" },
        }}
      >
        Đổi Mật Khẩu
      </Typography>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: "80%", md: "40%" },
            margin: 3,
            textAlign: "center",
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FTextField
              sx={{
                mt: { xs: 2, md: 0 },
                margin: { xs: 0, md: 2 },
              }}
              name="password"
              label="Nhập Mật Khẩu Hiện Tại"
              type="password"
            />
            <FTextField
              sx={{
                mt: { xs: 1, md: 0 },
                margin: { xs: 0, md: 2 },
              }}
              name="newPassword"
              label=" Nhập Mật Khẩu Mới"
              type="password"
            />
            <FTextField
              sx={{
                mt: { xs: 1, md: 0 },
                margin: { xs: 0, md: 2 },
              }}
              name="ConfirmNewPassword"
              label="Xác Nhận Mật Khẩu Mới"
              type="password"
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting || isLoading}
            >
              Xác Nhận
            </LoadingButton>
          </FormProvider>
        </Box>
      </Card>
    </Box>
  );
}

export default PasswordForm;
