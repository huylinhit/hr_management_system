import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { LuEdit } from "react-icons/lu";
import { Link } from "react-router-dom";

// data
import { Employee } from "../../../app/models/employee";
import { UserInfor } from "../../../app/models/userInfor";
import { useState } from "react";

// interface
interface Props {
  employee: UserInfor | undefined;
}

export default function EditAva({ employee }: Props) {
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
          <Grid sx={{ padding: "5px 0" }}>
            <TextField
              required
              id="outlined-required"
              label="Tên"
              size="small"
              defaultValue={employee?.fullName}
            />
          </Grid>
          <Grid sx={{ padding: "10px 0" }}>
            <TextField
              required
              id="outlined-required"
              label="MSNV"
              size="small"
              defaultValue={employee?.staffId}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3} sx={{ maxWidth: "100%" }}></Grid>
    </Grid>
  );
}
