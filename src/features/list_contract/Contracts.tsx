import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import { Button, Grid, IconButton, LinearProgress, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import AddIcon from "@mui/icons-material/Add";
import { Link, useLocation } from "react-router-dom";

import moment from "moment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SubjectIcon from "@mui/icons-material/Subject";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { setHeaderTitle } from "../../app/layout/headerSlice";

import { contractSelectors, fetchContractsAsync } from "../../app/store/contract/contractSlice";
import Contract from "../../app/models/contract";
import AvatarCustome from "../../app/components/Custom/Avatar/AvatarCustome";
import NumbersIcon from "@mui/icons-material/Numbers";
import ChipCustome from "../../app/components/Custom/Chip/ChipCustome";
import LoadingComponent from "../../app/layout/LoadingComponent";
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
const headerStyle = {
  color: "#7C7C7C",
  fontWeight: 700,
  fontFamily: "Mulish",
  fontSize: 15,
};
const fontStyle = "Mulish";
const cellStyle = {
  fontSize: 15,
  fontWeight: 600,
  fontFamily: fontStyle,
  color: "#000000",
};
const colors = [
  "#34BBE1",
  "#CC941A",
  "#32A772",
  "#5945B5",
  "#DB3535",
  "#FF8C00",
  "#008080",
  "#800080",
  "#FF69B4",
  "#008000",
  "#FF0000",
  "#0000FF",
  "#800000",
  "#FF00FF",
  "#00FFFF",
  "#FFD700",
];
const staffNameColors = [
  "#F1F1EF",
  "#F3EEEE",
  "#F8ECDF",
  "#FAF3DD",
  "#EEF3ED",
  "#E9F3F7",
  "#F6F3F8",
  "#F9F2F5",
  "#FAECEC",
];
export default function Contracts() {
  const handleRowClick = () => {
    dispatch(
      setHeaderTitle([
        { title: "Hợp Đồng Nhân Viên", path: "/contracts" },
        { title: "Chỉnh sửa đơn", path: `` },
      ])
    );
  };
  const columns: GridColDef[] = [
    {
      field: "button",
      headerName: "",
      width: 60,
      align: "center",
      renderCell: (params) => (
        <IconButton
          component={Link}
          to={`/contracts/${params.row.contractId}/staffs/${params.row.staffId}`}
        >
          <MoreHorizIcon />
        </IconButton>
      ),
    },
    {
      field: "contractId",
      headerName: "ID",
      flex: 100,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          ID
        </Typography>
      ),
      renderCell: (params) => <Typography sx={cellStyle}>{params.value}</Typography>,
    },

    {
      field: "staffName",
      headerName: "Tạo bởi",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <AccountCircleOutlinedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Tạo bởi</div>
        </Typography>
      ),
      renderCell: (params) => {
        const staffId = params.row.staffId;
        const staffName = `${params.row.staff?.lastName}  ${params.row.staff?.firstName}`;
        const rowIndex = staffId % staffNameColors.length;
        const staffNameColor = staffNameColors[rowIndex];
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AvatarCustome id={params.row.staffId} name={staffName} dependency={contractsLoaded} />
            <Typography sx={cellStyle}>{staffName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "contractType",
      headerName: "Loại đơn",
      width: 300,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Loại hợp đồng</div>
        </Typography>
      ),
      renderCell: (params) => {
        const rowIndex = params.row.contractTypeId % colors.length;
        const dotColor = colors[rowIndex];
        const contractTypeName = params.row.contractType.name;
        return (
          <Box display={"flex"} alignItems={"center"}>
            <span style={{ marginRight: 10, fontSize: "14px", color: dotColor }}>●</span>
            <Typography sx={{ textDecoration: "underline", ...cellStyle }}>
              {contractTypeName}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "salaryType",
      headerName: "Loại lương",
      width: 150,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Loại lương</div>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <>
            {params.row.salaryType === "Gross To Net" ? (
              <ChipCustome status="approved">{params.value}</ChipCustome>
            ) : (
              <ChipCustome status="waiting">{params.value}</ChipCustome>
            )}
          </>
        );
      },
    },
    {
      field: "noOfDependences",
      headerName: "Loại lương",
      width: 200,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <Typography sx={headerStyle}>Người phụ thuộc</Typography>
        </Typography>
      ),
      renderCell: (params) => {
        return (
          <>
            <Typography sx={cellStyle}>{params.value}</Typography>
          </>
        );
      },
    },

    {
      field: "startDate",
      headerName: "Ngày bắt đầu",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Ngày bắt đầu</div>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>{moment(params.value).format("MMM Do, YYYY, HH:mm")}</Typography>
      ),
    },
    {
      field: "endDate",
      headerName: "Ngày kết thúc",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Ngày kết thúc</div>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>{moment(params.value).format("MMM Do, YYYY, HH:mm")}</Typography>
      ),
    },
    {
      field: "salary",
      headerName: "Lương mong muốn",
      width: 200,
      editable: true,
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <div>Lương thỏa thuận</div>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.row.salary} />,
    },
    {
      field: "taxableSalary",
      headerName: "Lương đóng thuế",
      width: 200,
      editable: true,
      align: "right",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          {/* Add the phone icon here */}
          <div>Lương đóng thuế</div>
        </Typography>
      ),
      renderCell: (params) => <CurrencyFormatter value={params.row.taxableSalary} />,
    },
    {
      field: "allowance",
      headerName: "Tổng phụ cấp",
      width: 200,
      align: "left",
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <NumbersIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <Typography sx={headerStyle}>Tổng phụ cấp</Typography>
        </Typography>
      ),
      renderCell: (params) => {
        const allowances = params.row.allowances.reduce(
          (total: any, c: any) => total + c.allowanceSalary,
          0
        );
        return (
          <>
            <CurrencyFormatter value={allowances} />
          </>
        );
      },
    },
    {
      field: "contractStatus",
      headerName: "Trạng thái",
      width: 200,
      editable: true,
      align: "left",
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"left"} sx={headerStyle}>
          <FormatListBulletedIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Trạng thái</div>
        </Typography>
      ),
      renderCell(params) {
        return (
          <>
            {params.value === true ? (
              <ChipCustome status="waiting">Hiệu Lực</ChipCustome>
            ) : (
              <ChipCustome status="rejected">Hết Hạn</ChipCustome>
            )}
          </>
        );
      },
    },
    {
      field: "processNote",
      headerName: "Ghi chú",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <SubjectIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Ghi chú</div>
        </Typography>
      ),
      renderCell: (params) => (
        <Box>
          {params.value ? (
            <Typography sx={cellStyle}>{params.row.value}</Typography>
          ) : (
            <Typography sx={{ fontStyle: "italic", ...cellStyle, color: "#929292" }}>
              Chưa có ghi chú
            </Typography>
          )}
        </Box>
      ),
    },
    {
      field: "createAt",
      headerName: "Thời gian tạo",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" /> <div>Thời gian tạo</div>
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={cellStyle}>
          {moment(params.row.createAt).format("MMM Do, YYYY, HH:mm")}
        </Typography>
      ),
    },

    {
      field: "changeStatusTime",
      headerName: "Thời gian thay đổi",
      width: 250,
      editable: true,
      renderHeader: () => (
        <Typography display={"flex"} alignItems={"center"} sx={headerStyle}>
          <CalendarMonthIcon style={{ marginRight: 5 }} fontSize="small" />{" "}
          <div>Thời gian thay đổi</div>
        </Typography>
      ),
      renderCell: (params) => (
        <Box>
          {params.value ? (
            <Typography sx={cellStyle}>
              {moment(params.value).format("MMM Do, YYYY, HH:mm")}
            </Typography>
          ) : (
            <Typography sx={cellStyle}>
              {moment(params.row.createAt).format("MMM Do, YYYY, HH:mm")}
            </Typography>
          )}
        </Box>
      ),
    },
  ];
  function CurrencyFormatter(value: any) {
    const formattedValue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value.value);
    return <Typography sx={cellStyle}>{formattedValue}</Typography>;
  }

  const [gridHeight, setGridHeight] = useState(0);
  const contracts = useAppSelector(contractSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {
    contractAdded,
    contractsLoaded,
    status: contractStatus,
  } = useAppSelector((state) => state.contract);
  const [rows, setRows] = useState<Contract[]>([]);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(setHeaderTitle([{ title: "Hợp Đồng Nhân Viên", path: "/contracts" }]));
  }, [location, dispatch]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!contractsLoaded) {
      dispatch(fetchContractsAsync());
    }
  }, [dispatch, contractsLoaded]);

  console.log(contracts);

  useEffect(() => {
    if (contractsLoaded) {
      setRows(contracts);
    }
  }, [contractsLoaded, contracts]);

  if (contractStatus.includes("pending")) <LoadingComponent message="Đang Tải Hợp Đồng" />;

  return (
    <>
      <Box sx={{ paddingLeft: "3%", mt: "20px", paddingRight: "3%" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            {/* <TextField
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
            /> */}
          </Grid>
          <Grid item>
            {/* <Button
              variant="text"
              sx={{
                fontFamily: "Mulish",
                fontWeight: "600",
                textTransform: "none",
                color: "#7C7C7C",
              }}
              disableElevation={true}
              startIcon={<FilterAltOutlinedIcon />}
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
              startIcon={<ImportExportOutlinedIcon />}
              onClick={handleOpenDialog}
            >
              Sort
            </Button> */}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{
                mb: "5px",
                textTransform: "none",
                fontFamily: "Mulish",
                height: "30px",
                color: "#FFFFFF",
                backgroundColor: "#007FFF",
                "&:hover": {
                  backgroundColor: "#0073E7",
                  color: "#FFFFFF",
                },
                "&:active": {
                  backgroundColor: "#0066CD",
                  color: "#FFFFFF",
                },
              }}
            >
              Tạo đơn mới
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: "1px solid #C6C6C6" }} />
      </Box>

      <Box sx={{ width: "94%", margin: "0 auto", marginTop: "1%" }}>
        <DataGrid
          // autoHeight
          density="standard"
          getRowId={(row: any) => row.contractId}
          sx={{
            height: "83vh",
            //border: "none",
            color: "#000000",
            fontSize: 16,
            fontWeight: 550,
            fontFamily: "Mulish",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow effect
            backgroundColor: "rgba(255, 255, 255, 1)", // Set the opacity
          }}
          slots={{
            loadingOverlay: LinearProgress,
            //toolbar: CustomToolbar,
          }}
          loading={!contractsLoaded}
          rows={rows}
          columns={columns}
          //showCellVerticalBorder
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
