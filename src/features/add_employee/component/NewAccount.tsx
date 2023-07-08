import { Container, Grid, TextField, Typography } from "@mui/material";

// interface
interface Props {
  setUserForm: Function;
  skillForm: Object;
  setSkillForm: Function;
}

export default function NewAccount({ setUserForm, skillForm, setSkillForm }: Props) {
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
          <Typography sx={{ fontSize: "18px" }}>Tên đăng nhập</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập tên đăng nhập"
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
          <Typography sx={{ fontSize: "18px" }}>Email</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập email"
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
          <Typography sx={{ fontSize: "18px" }}>Mật khẩu</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập mật khẩu"
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

        {/* NHẬP PASSWORD AGAIN */}
        <Grid item xs={10}>
          <Typography sx={{ fontSize: "18px" }}>Xác nhận mật khẩu</Typography>
          <TextField
            required
            type="text"
            placeholder="Nhập lại mật khẩu"
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

        {/* NHẬP ROLE */}
        <Grid item xs={10}>
          <Typography sx={{ fontSize: "18px" }}>Vai trò</Typography>
          <TextField
            required
            type="text"
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
        </Grid>
      </Grid>
    </Container>
  );
}
