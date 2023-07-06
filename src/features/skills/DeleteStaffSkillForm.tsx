import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { debounce, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeleteStaffSkillFormm() {
  const [open, setOpen] = React.useState(false);
  const [skillName, setSkillName] = useState("");
  const [isSkillNameEmptpy, setIsSkillNameEmpty] = useState(false);
  const [isLevelEmpty, setIsLevelEmpty] = useState(false);
  const [level, setLevel] = useState("");
  const currentUser = useAppSelector((state) => state.account);

  const debouncedSkillNameInput = debounce((event: any) => {
    setSkillName(event.target.value);
    setIsSkillNameEmpty(false);
  }, 500);

  const debouncedLevelInput = debounce((event: any) => {
    setLevel(event.target.value);
    setIsLevelEmpty(false);
  }, 500);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTicket = () => {
    console.log(skillName);
    const staffSkillCreate = {
      staffId: currentUser.user?.userInfor.staffId,
      skillName: skillName,
      level: level,
    };
    if (skillName.length === 0) {
      setIsSkillNameEmpty(true);
    }
    if (level.length === 0) {
      setIsLevelEmpty(true);
    }
    if (isSkillNameEmptpy || isLevelEmpty) {
      toast.error("Bạn điền chưa đủ kìa 😥");
    }
    if (!isSkillNameEmptpy && !isLevelEmpty) {
      agent.StaffSkill.create(staffSkillCreate)
        .then((response) => {
          console.log("Staff skill created successfully", response);
          toast.success("Đã thêm kỹ năng 😊");
        })
        .catch((error) => {
          console.error("Error creating staff skill: ", error);
        });
      setOpen(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} pauseOnHover={false} theme="colored" />
      <Button variant="outlined" onClick={handleClickOpen}>
        Thêm Staff Skill
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 550, fontSize: 20 }} display={"flex"} alignItems={"center"}>
          Thêm kỹ năng
        </DialogTitle>

        <DialogContent>
          <Box display={"flex"} alignItems={"flex-end"}>
            <Typography sx={{ mr: "5%", width: "20%", fontWeight: 550, color: "#505050" }}>
              Kỹ năng
            </Typography>
            <TextField
              id="skillName"
              sx={{ mt: 1, width: "72%" }}
              variant="standard"
              error={isSkillNameEmptpy}
              onChange={debouncedSkillNameInput}
            />
          </Box>
          <Box display={"flex"} alignItems={"flex-end"}>
            <Typography sx={{ mr: "5%", width: "20%", fontWeight: 550, color: "#505050" }}>
              Trình độ
            </Typography>
            <TextField
              id="level"
              sx={{ mt: 1, width: "72%" }}
              variant="standard"
              error={isLevelEmpty}
              onChange={debouncedLevelInput}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleCreateTicket} autoFocus>
            Tạo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
