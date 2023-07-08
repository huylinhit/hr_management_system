import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  action: () => void;
}

export default function ConfirmDialog({ open, onClose, title, content, action }: Props) {
  return (
    <>
      <Dialog fullWidth maxWidth={"sm"} open={open} onClose={onClose}>
        <DialogTitle sx={{ fontSize: "23px", fontWeight: 700, fontFamily: "Mulish" }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "18px", fontWeight: 600, fontFamily: "Mulish" }}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Mulish", fontWeight: 600, textTransform: "none", color: "#969696" }}
            onClick={onClose}
          >
            Quay lại
          </Button>
          <Button
            sx={{ fontFamily: "Mulish", fontWeight: 600, textTransform: "none", color: "#007FFF" }}
            onClick={action}
            autoFocus
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
