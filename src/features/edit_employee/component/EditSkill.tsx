import { useEffect, useState } from "react";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from '@mui/icons-material/AddCircle';

// data
import { UserInfor } from "../../../app/models/userInfor";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import {
  fetchStaffSkillsAsync,
  staffSkillsSelectors,
} from "../../skills/staffSkillSlice";
import DeleteSkillDialog from "../dialog/DeleteSkillDialog";
import { StaffSkill } from "../../../app/models/staffSkill";
import AddSkillDialog from "../dialog/AddSkillDialog";

// interface
interface Props {
  employee: UserInfor | undefined;
}

export default function EditSkill({ employee }: Props) {
  // -------------------------- VAR -----------------------------
  const dispatch = useAppDispatch();
  // -------------------------- STATE ---------------------------
  const [skillDeleted, setSkillDeleted] = useState<StaffSkill>();
  const [openDeleteSkill, setOpenDeleteSkill] = useState(false);
  const [openAddSkill, setOpenAddSkill] = useState(false);
  // -------------------------- REDUX ---------------------------
  const skills = useAppSelector((state) =>
    staffSkillsSelectors
      .selectAll(state)
      .filter((s) => s.staffId == employee?.staffId)
  );
  console.log(skills);

  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    dispatch(fetchStaffSkillsAsync());
  }, [dispatch]);
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Box sx={{ padding: "0 10px 20px 10px" }}>
      <Grid>
        <Typography
          variant="h5"
          sx={{ color: "#246DD6", fontWeight: "600", marginBottom: "10px" }}
        >
          Kỹ năng
        </Typography>
      </Grid>

      <Grid>
        {skills.map((skill) => (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "100%",
              padding: "0 30px 10px 30px",
            }}
          >
            <Grid item xs={5}>
              <Typography sx={{ fontWeight: "600" }}>
                {skill.skillName} abc
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                size="small"
                margin="dense"
                defaultValue={skill.level}
              />
            </Grid>
            <Grid item xs={1} sx={{ padding: "0 5px" }}>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setSkillDeleted(skill);
                  setOpenDeleteSkill(true);
                }}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <IconButton
          aria-label="delete"
          onClick={() => setOpenAddSkill(true)}
        >
          <AddCircleIcon sx={{ color: "#007FFF", fontSize: "35px" }} />
        </IconButton>

      </Grid>

      <AddSkillDialog open={openAddSkill} setOpen={setOpenAddSkill} />
      <DeleteSkillDialog
        open={openDeleteSkill}
        setOpen={setOpenDeleteSkill}
        item={skillDeleted}
      />
    </Box>
  );
}
