import {
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { LuEdit } from "react-icons/lu";

// data
import { UserInfor } from "../../../app/models/userInfor";
import { useState } from "react";

// interface
interface Props {
  employee: UserInfor | undefined;
  setForm: Function
}

export default function EditAva({ employee, setForm }: Props) {
  // -------------------------- VAR -----------------------------
  // -------------------------- STATE ---------------------------
  const [openEditAva, setOpenEditAva] = useState(false);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        maxWidth: "100%",
      }}
    >
      <Grid
        item
        xs={9}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {openEditAva ? (
            <Avatar sx={{ width: "120px", height: "120px" }}>
              <Button
                variant="contained"
                component="label"
                sx={{ padding: "5px", fontSize: "13px" }}
              >
                Upload File
                <input type="file" hidden />
              </Button>
            </Avatar>
          ) : (
            <Avatar sx={{ width: "120px", height: "120px" }} />
          )}

          <IconButton
            aria-label="delete"
            sx={{ padding: "10px 10px 20px 10px" }}
            onClick={() => setOpenEditAva(!openEditAva)}
          >
            <LuEdit style={{ fontSize: "25px", color: "#007FFF" }} />
          </IconButton>
        </Grid>
        <Grid item xs={8} sx={{ paddingLeft: "10px" }}>
          <Grid sx={{ padding: "5px 0", display: "flex",
          justifyContent: "flex-start",
          alignItems: "center", }}>
            <TextField
              required
              id="outlined-required"
              label="Họ"
              size="small"
              sx={{ marginRight: "10px" }}
              defaultValue={employee?.lastName}
              onChange={(e) => setForm((prevForm : any) => ({
                ...prevForm, 
                lastName: e.target.value
              }))}
            />
            <TextField
              required
              id="outlined-required"
              label="Tên"
              size="small"
              defaultValue={employee?.firstName}
              onChange={(e) => setForm((prevForm : any) => ({
                ...prevForm, 
                firstName: e.target.value
              }))}
            />
          </Grid>
          <Grid sx={{ padding: "10px 0" }}>
          <Typography sx={{ fontWeight: "400" }}>
              {employee?.staffId}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} sx={{ maxWidth: "100%" }}></Grid>
    </Grid>
  );
}
