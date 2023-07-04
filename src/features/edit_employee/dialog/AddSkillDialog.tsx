import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  setOpen: Function;
}

export default function AddSkillDialog({ open, setOpen }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    // -----------
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{ borderRadius: "10px", textAlign: "left" }}
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{ fontSize: "25px", color: "#B9B9B9" }}
      >
        Thêm mới 1 kĩ năng
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ padding: "0 35%" }}>
          <Grid item xs={5}>
            <TextField
              required
              id="outlined-required"
              size="small"
              margin="dense"
              label="Tên kĩ năng"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              size="small"
              margin="dense"
              label="Level"
            />
          </Grid>
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: "15px" }}>
        <Button
          variant="outlined"
          sx={{ margin: "0 10px" }}
          onClick={handleClose}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          sx={{ margin: "0 10px" }}
          onClick={handleAdd}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
