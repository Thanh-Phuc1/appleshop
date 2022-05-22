import React, { useState } from "react";
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Box,
  Typography,
  CardMedia,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import logoImg from "../logo2.png";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    const { email, password } = data;
    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        justifyContent: {
          xs: "flex-start",
          md: "center",
        },
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        height: "85vh",
      }}
    >
      <Box>
        <Box
          sx={{
            justifyContent: "flex-start",
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "row", md: "column" },
            margin: { xs: "5px", md: "0" },
          }}
        >
          <CardMedia
            component="img"
            src={logoImg}
            alt="Logo"
            sx={{
              width: { md: "400px" },
              height: { md: "150px" },
              borderRadius: "5px",
            }}
          />
          <Typography
            sx={{
              color: "black",
              fontSize: { xs: "1.1rem", md: "2.7rem" },
            }}
          >
            Đăng Nhập
          </Typography>
        </Box>

        <Container
          maxWidth="xs"
          sx={{
            margin: { xs: "5px", md: "0" },
            marginLeft: { xs: "0", md: "20px" },
            backgroundColor: "white",
            borderRadius: "5px",
            width: { xs: "300px", md: "400px" },
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              {!!errors.responseError && (
                <Alert
                  sx={{
                    fontSize: { xs: "0.6rem", md: "0.9rem" },
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                  severity="error"
                >
                  {errors.responseError.message}
                </Alert>
              )}
              <Alert
                sx={{
                  fontSize: { xs: "0.6rem", md: "0.9rem" },
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                }}
                severity="info"
              >
                Bạn chưa có tài khoản?{" "}
                <Link
                  sx={{
                    fontSize: { xs: "0.9rem", md: "0.9rem", color: "red" },
                  }}
                  color="primary"
                  variant="subtitle2"
                  component={RouterLink}
                  to="/register"
                >
                  Đăng ký
                </Link>
              </Alert>

              <FTextField name="email" label="Nhập Email" />

              <FTextField
                name="password"
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <LoadingButton
              fullWidth
              size="small"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ fontSize: { xs: "0.6rem", md: "1rem" }, mb: 2 }}
            >
              Login
            </LoadingButton>
          </FormProvider>
        </Container>
      </Box>
    </Box>
  );
}

export default LoginPage;
