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

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.account)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    await dispatch(signInUser(data));
    await dispatch(fetchCurrentUser());
    navigate(`/own-log-leaves`);
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt:'200px'
      }}
    >
      <Typography
        sx={{
          fontFamily: "Mulish",
          fontSize: "50px",
          fontWeight: 700,
          color: "#000000",
          padding: "12px",
          mb:"30px",
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
        <LoadingButton
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>

      </Box>
    </Container>
  );
}
