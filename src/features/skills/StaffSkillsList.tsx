import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Department } from "../../app/models/department";
import { Link, NavLink, useLocation } from "react-router-dom";


import { fetchStaffSkillsAsync, setStaffSkillAdded, staffSkillsSelectors } from "./staffSkillSlice";
import { StaffSkill } from "../../app/models/staffSkill";
import CreateStaffSkill from "./CreateStaffSkill";
import { border } from "@mui/system";
import { setHeaderTitle } from "../../app/layout/headerSlice";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const fontStyle = "Mulish";
const navStyle = {
  fontSize: 25,
  fontWeight: 800,
  fontFamily: fontStyle,
  textTransform: "none",
  color: "#333333",
  borderRadius: "10px",
  padding: "0px 10px 0px 10px",
  "&:hover": {
    backgroundColor: "#F8F8F8", // Set the hover background color
  },
};
const cardStyle = {
  border: "1px solid #CFCFCF",
  borderRadius: "8px",
  padding: "3% 4%",
  mb: "2%",
  boxShadow: "none",
};
const skillStyle = {
  backgroundColor: "#D9EFD6",
  padding: "1px 10px ",
  fontFamily: fontStyle,
  borderRadius: "6px",
  fontWeight: 700,
  color: "#343434",
  alignItems: "center",
  display: "inline-block",
  width: "fit-content",
  mb: "5%",
};
const BoardContainer = styled("div")({
  overflowX: "auto",
});
const colorOptions: { background: string; text: string }[] = [
  { background: "#D9EFD6", text: "#000000" },
  { background: "#F0D9EF", text: "#333333" },
  { background: "#C6E2E9", text: "#222222" },
  { background: "#FDE5D9", text: "#444444" },
  { background: "#F8EAC4", text: "#555555" },
];
export default function StaffSkillsList() {
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 75,
      renderCell: (params) => (
        // <IconButton onClick={() => handleButtonClick(params.row.id)}>
        //   <MoreHorizIcon />
        // </IconButton>
        <IconButton component={Link} to={`/otheruserstickets/${params.row.ticketId}`}>
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "uniqueId",
      headerName: "ID",
      width: 100,
    },
    {
      field: "skillName",
      headerName: "Tên kỹ năng",
      width: 250,
      editable: true,
    },
    {
      field: "level",
      headerName: "Trình độ",
      width: 250,
      editable: true,
    },
    {
      field: "staffName",
      headerName: "Tên nhân viên",
      width: 200,
      editable: true,
    },
  ];
  const staffSkills = useAppSelector(staffSkillsSelectors.selectAll);
  const dispatch = useAppDispatch();
  const { staffSkillAdded, filtersLoaded, staffSkillsLoaded } = useAppSelector(
    (state) => state.staffSkill
  );
  const [rows, setRows] = useState<StaffSkill[]>([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Danh sách kỹ năng", path: "/staffskills" }]));
  }, [dispatch, location]);

  console.log(staffSkills);
  const staffSkillsBySkillName = staffSkills.reduce<Record<string, StaffSkill[]>>(
    (acc, staffSkill: StaffSkill) => {
      const { skillName } = staffSkill;

      if (!acc[skillName]) {
        acc[skillName] = [];
      }
      acc[skillName].push(staffSkill);
      return acc;
    },
    {}
  );
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!staffSkillsLoaded || staffSkillAdded) {
      dispatch(fetchStaffSkillsAsync());
      dispatch(setStaffSkillAdded(false));
    }
  }, [dispatch, staffSkillsLoaded]);

  return (
    <>
      <Box sx={{ paddingLeft: "2%", mt: "20px", paddingRight: "2%" }}>
        {/* <Grid container spacing={0} alignContent="center">
          <Grid item>
            <Button
              variant="text"
              sx={navStyle}
              disableElevation={true}
              component={NavLink}
              to={`/otheruserstickets`}
              key={"/otheruserstickets"}
            >
              Danh sách kỹ năng
            </Button>
          </Grid>
        </Grid> */}
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <TextField
              id="standard-basic"
              placeholder="Nhập để tìm..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
                style: { fontFamily: fontStyle },
              }}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <Button
              variant="text"
              sx={{
                fontFamily: "Mulish",
                fontWeight: "600",
                textTransform: "none",
                color: "#7C7C7C",
              }}
              disableElevation={true}
              onClick={handleOpenDialog}
            >
              Filter
            </Button>
            <Button
              variant="text"
              sx={{
                fontFamily: "Mulish",
                fontWeight: "600",
                textTransform: "none",
                color: "#7C7C7C",
              }}
              disableElevation={true}
              onClick={handleOpenDialog}
            >
              Sort
            </Button>
            <Button
              variant="text"
              sx={{ fontWeight: "bold", textTransform: "none", color: "#007FFF" }}
              disableElevation={true}
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
            >
              Tạo kỹ năng mới
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <CreateStaffSkill open={open} onClose={handleCloseDialog} />

      <Box sx={{ overflowX: "auto", display: "flex", mt: "1%", paddingLeft: "2%" }}>
        {Object.entries(staffSkillsBySkillName).map(([skillName, staffSkills], index) => {
          const { background, text } = colorOptions[index % colorOptions.length];

          return (
            <Box
              key={skillName}
              sx={{
                flex: "0 0 250px",
                height: "auto",
                mr: "1.5%",
              }}
            >
              <Typography
                sx={{
                  backgroundColor: background,
                  padding: "1px 10px ",
                  fontFamily: fontStyle,
                  borderRadius: "6px",
                  fontWeight: 700,
                  color: text,
                  alignItems: "center",
                  display: "inline-block",
                  width: "fit-content",
                  mb: "5%",
                }}
              >
                {skillName}
              </Typography>
              {staffSkills.map((staffSkill) => (
                <Card key={staffSkill.uniqueId} sx={cardStyle}>
                  <Typography sx={{ fontFamily: fontStyle, fontWeight: "800", color: "242424" }}>
                    Chứng chỉ Google Ads
                  </Typography>

                  <Typography sx={{ fontFamily: fontStyle, fontWeight: "700", color: "#6D6D6D" }}>
                    Võ Minh Hoàng
                  </Typography>
                  <Typography sx={{ fontFamily: fontStyle, fontWeight: "500", color: "#929292" }}>
                    Phòng phát triển sản phẩm
                  </Typography>
                </Card>
              ))}
            </Box>
          );
        })}
      </Box>
    </>
  );
}

const handleButtonClick = (id: any) => {
  // Handle button click for the corresponding row ID
  console.log(`Button clicked for ID ${id}`);
};
