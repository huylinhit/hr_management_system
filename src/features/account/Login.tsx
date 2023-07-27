import Avatar from "@mui/material/Avatar";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Link, useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Container, Paper, Typography, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchCurrentUser, signInUser } from "./accountSlice";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [unauthorized, setUnauthorized] = useState(false);
  const { user } = useAppSelector((state) => state.account);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      await dispatch(fetchCurrentUser());

      navigate(`/own-log-overtimes`);


    } catch (error) {
      console.log(error);
      setUnauthorized(true);
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: "200px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Mulish",
          fontSize: "50px",
          fontWeight: 700,
          color: "#000000",
          padding: "12px",
          mb: "30px",
          textTransform: "none",
        }}
      >
        Đăng nhập
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          autoFocus
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors?.username?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />
        {unauthorized ? (
          <>
            <Typography sx={{ color: "red", position: "absolute", mt: "10px" }}>
              Sai tên đăng nhập hoặc mật khẩu
            </Typography>
          </>
        ) : (
          <></>
        )}
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 5, mb: 2 }}
        >
          Đăng nhập
        </LoadingButton>
      </Box>
    </Container>
  );
}
