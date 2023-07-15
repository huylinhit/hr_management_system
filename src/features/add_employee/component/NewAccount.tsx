import { Container, Grid, TextField, Typography } from "@mui/material";
import { User } from "../model/user";
import { useState } from "react";

// interface
interface Props {
  setUserForm: Function;
  userForm: User
}

export default function NewAccount({ setUserForm, userForm }: Props) {
  const [confirmPwd, setConfirmPwd] = useState("")
  const error = confirmPwd === userForm.password
  
  return (
    <Container
      sx={{
        margin: "20px",
        border: "solid 1px rgba(226, 225, 229, 1)",
        borderRadius: "10px",
        padding: "30px 0",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* NHẬP USERNAME */}
        <Grid item xs={10}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Tên đăng nhập</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.username === "" ? "Nhập tên đăng nhập" : ""}
            defaultValue={userForm.username === "" ? "" : userForm.username}
            size="small"
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
        <Grid item xs={10}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Email</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.email === "" ? "Nhập email" : ""}
            defaultValue={userForm.email === "" ? "" : userForm.email}
            size="small"
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
        <Grid item xs={10}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Mật khẩu</Typography>
          <TextField
            required
            type="password"
            placeholder={userForm.password === "" ? "Nhập mật khẩu" : ""}
            defaultValue={userForm.password === "" ? "" : userForm.password}
            size="small"
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
        <Grid item xs={10}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Xác nhận mật khẩu</Typography>
          <TextField
            required
            error={!error}
            type="password"
            placeholder={confirmPwd === "" ? "Nhập lại mật khẩu" : ""}
            defaultValue={confirmPwd === "" ? "" : confirmPwd}
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
        </Grid>

        {/* NHẬP ROLE */}
        {/* <Grid item xs={10}>
          <Typography sx={{ fontSize: "how to compare string1 is as same as string2" }}>Vai trò</Typography>
          <TextField
            required
            type="text"
            placeholder={userForm.role === "" ? "Nhập role" : ""}
            defaultValue={userForm.role === "" ? "" : userForm.role}
            placeholder="Nhập vai trò"
            size="small"
            sx={{ width: "100%", marginBottom: "15px" }}
            onChange={(e) =>
              setUserForm((prevForm: any) => ({
                ...prevForm,
                role: e.target.value,
              }))
            }
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
