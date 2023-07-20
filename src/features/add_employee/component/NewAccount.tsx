import { Container, Grid, TextField, Typography } from "@mui/material";
import { User } from "../model/user";

// interface
interface Props {
  setUserForm: Function;
  userForm: User;
  confirmPwd: String;
  setConfirmPwd: Function;
}
const fontStyle = "Mulish";
const verticalspacing = {
  marginBottom: "15px",
};
const fieldStyle = {
  flexGrow: 1,
  mb: "2%",
};
const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
  mb: "5px",
};

export default function NewAccount({ setUserForm, userForm, confirmPwd, setConfirmPwd }: Props) {
  const error = confirmPwd === userForm.password;
  const validateEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: any) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };
  return (
    <Grid container sx={{ mt: "50px" }}>
      {/* NHẬP USERNAME */}
      <Grid item xs={12} sx={{ ...verticalspacing }}>
        <Typography sx={headerStyle}>Tên đăng nhập</Typography>
        <TextField
          required
          type="text"
          placeholder={userForm.username === "" ? "Nhập tên đăng nhập" : ""}
          defaultValue={userForm.username === "" ? "" : userForm.username}
          sx={{ width: "100%", marginBottom: "15px" }}
          onChange={(e) =>
            setUserForm((prevForm: any) => ({
              ...prevForm,
              username: e.target.value,
            }))
          }
        />
      </Grid>

      {/* NHẬP EMAIL */}
      <Grid item xs={12} sx={{ ...verticalspacing }}>
        <Typography sx={headerStyle}>Email</Typography>
        <TextField
          required
          error={!validateEmail(userForm.email)}
          type="text"
          placeholder={userForm.email === "" ? "Nhập email" : ""}
          defaultValue={userForm.email === "" ? "" : userForm.email}
          sx={{ width: "100%", marginBottom: "15px" }}
          onChange={(e) =>
            setUserForm((prevForm: any) => ({
              ...prevForm,
              email: e.target.value,
            }))
          }
        />
      </Grid>

      {/* NHẬP PASSWORD */}
      <Grid item xs={12} sx={{ ...verticalspacing }}>
        <Typography sx={headerStyle}>Mật khẩu</Typography>
        <TextField
          required
          error={!validatePassword(userForm.password)}
          helperText={
            !validatePassword(userForm.password)
              ? "Mật khẩu cần ít nhật 1 ký tự đặc biệt, 1 chữ in hoa và một số"
              : ""
          }
          type="password"
          placeholder={userForm.password === "" ? "Nhập mật khẩu" : ""}
          defaultValue={userForm.password === "" ? "" : userForm.password}
          sx={{ width: "100%", marginBottom: "15px" }}
          onChange={(e) =>
            setUserForm((prevForm: any) => ({
              ...prevForm,
              password: e.target.value,
            }))
          }
        />
      </Grid>

      {/* NHẬP PASSWORD AGAIN */}
      <Grid item xs={12} sx={{ ...verticalspacing }}>
        <Typography sx={headerStyle}>Xác nhận mật khẩu</Typography>
        <TextField
          required
          error={confirmPwd === "" ? false : !error}
          helperText={confirmPwd === "" || error ? "" : "Mât khẩu đã nhập không khớp. Hãy thử lại."}
          type="password"
          placeholder={confirmPwd === "" ? "Nhập lại mật khẩu" : ""}
          defaultValue={confirmPwd === "" ? "" : confirmPwd}
          sx={{ width: "100%", marginBottom: "15px" }}
          onChange={(e) => setConfirmPwd(e.target.value)}
        />
      </Grid>
    </Grid>
  );
}
