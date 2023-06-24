import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Box, Grid, IconButton, Typography } from "@mui/material";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    arrow: true,
    tooltipPlacementRight: true,
  },
}));

export default function DetailLeaveInfo() {
  const leaveLeftInfo = () => {
    return (
      <Box>
        <Typography sx={{ paddingTop: "5px", fontSize: "18px", color: "#74736E" }}>
          Số ngày phép còn lại{" "}
        </Typography>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "20px",
          }}
        >
          <Grid item>
            <Typography
              sx={{
                fontStyle: "normal",
                fontSize: "15px",
                paddingRight: "5px", color: "#74736E"
                
              }}
            >
              Phép nghỉ sự kiện:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontStyle: "normal", fontSize: "15px", color: "#74736E" }}>
              12
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "15px", color: "#74736E"
          }}
        >
          <Grid item>
            <Typography
              sx={{
                fontStyle: "normal",
                fontSize: "15px",
                paddingRight: "5px", color: "#74736E"
              }}
            >
              Phép tinh lương:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontStyle: "normal", fontSize: "15px", color: "#74736E" }}>
              12
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "20px"
          }}
        >
          <Grid item>
            <Typography
              sx={{
                fontStyle: "normal",
                fontSize: "15px",
                paddingRight: "5px", color: "#74736E"
              }}
            >
              Phép không lương:
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontStyle: "normal", fontSize: "15px", color: "#74736E" }}>
              12
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <LightTooltip title={leaveLeftInfo()}>
      <IconButton
        color="primary"
        aria-label="show more information"
        sx={{ fontSize: "15px" }}
      >
        <AiOutlineQuestionCircle />
      </IconButton>
    </LightTooltip>
  );
}
