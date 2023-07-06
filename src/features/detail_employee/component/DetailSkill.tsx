import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

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

// interface
interface Props {
  employee: UserInfor | undefined;
}

export default function DetailSkill({ employee }: Props) {
  // -------------------------- VAR -----------------------------
  const dispatch = useAppDispatch();
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  const skills = useAppSelector((state) =>
    staffSkillsSelectors
      .selectAll(state)
      .filter((s) => s.staffId == employee?.staffId)
  );
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

      {skills.map((skill) => (
        <Grid key={skill.skillId}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              maxWidth: "100%",
              padding: "0 30px 10px 30px",
            }}
          >
            <Grid item xs={5}>
              <Typography sx={{ fontWeight: "600" }}>{skill.skillName}</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ fontWeight: "400" }}>{skill.level}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
