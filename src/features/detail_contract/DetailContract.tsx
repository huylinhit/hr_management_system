import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { LuEdit } from "react-icons/lu";

// component
import LoadingComponent from "../../app/layout/LoadingComponent";
import DetailContractFooter from "./component/DetailContractFooter";
import DetailContractInfo from "./component/DetailContractInfo";
import DetailEmployeeInfo from "./component/DetailEmployeeInfo";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { setHeaderTitle } from "../../app/layout/headerSlice";
import DeleteDialog from "./dialog/DeleteDialog";

// data
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  employeeSelectors,
  fetchEmployeeAsync,
} from "../../app/store/employee/employeeSlice";
import {
  contractSelectors,
  fetchContractAsync,
} from "../../app/store/contract/contractSlice";

const fontStyle = "Mulish";

export default function DetailContract() {
  // -------------------------- VAR -----------------------------
  const { id, staffid, prevpage } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation();
  // -------------------------- STATE ---------------------------
  const [open, setOpen] = useState(false);
  // -------------------------- REDUX ---------------------------
  const employee = useAppSelector((state) =>
    employeeSelectors.selectById(state, Number(staffid))
  );
  const { status: employeeStatus, employeesLoaded } = useAppSelector(
    (state) => state.employee
  );

  const contract = useAppSelector((state) =>
    contractSelectors.selectById(state, Number(staffid))
  );
  console.log(contract);

  const { status: contractStatus, contractsLoaded } = useAppSelector(
    (state) => state.contract
  );
  // -------------------------- EFFECT --------------------------
  useEffect(() => {
    if (!employeesLoaded) dispatch(fetchEmployeeAsync(Number(staffid)));
    if (!contractsLoaded) dispatch(fetchContractAsync(Number(staffid)));
  }, [dispatch, contractsLoaded, employeesLoaded]);

  useEffect(() => {
    if (prevpage === "list") {
      dispatch(
        setHeaderTitle([
          { title: "Hợp Đồng Nhân Viên", path: "/contracts" },
          { title: "Hợp đồng", path: "" },
        ])
      );
    } else if (prevpage === "staff") {
      dispatch(
        setHeaderTitle([
          { title: "Danh sách nhân viên", path: "/staffs" },
          {
            title: `${employee?.lastName} ${employee?.firstName}`,
            path: `/staffs/${employee?.staffId}`,
          },
          { title: "Hợp đồng", path: "" },
        ])
      );
    }
  }, [dispatch, location, contract, employee]);
  // -------------------------- FUNCTION ------------------------
  if (!contract || !employee) return <LoadingComponent message="Loading..." />;
  // -------------------------- MAIN ----------------------------
  return (
    <Container sx={{ padding: "2%", width: "80%", borderRadius: "8px" }}>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Typography
            sx={{
              padding: "5px 0",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "30px",
              lineHeight: "39px",
              fontFamily: fontStyle,
            }}
          >
            Thông tin hợp đồng
          </Typography>
          <IconButton
            aria-label="edit"
            sx={{ padding: "10px 10px 20px 10px" }}
            component={Link}
            to={`/contracts/${id}/staffs/${staffid}/${prevpage}/edit`}
          >
            <LuEdit style={{ fontSize: "25px", color: "#007FFF" }} />
          </IconButton>
        </Grid>
        <Grid item>
          {contract?.contractStatus === true ? (
            <Button
              variant="outlined"
              color="error"
              size="large"
              sx={{ fontWeight: "bold", fontSize: "15px" }}
              onClick={() => setOpen(true)}
            >
              Hủy hợp đồng
            </Button>
          ) : null}
        </Grid>
      </Grid>

      <Container>
        <Grid
          container
          sx={{
            background: "#FFF",
            margin: "0 10px",
            maxWidth: "1085px",
            padding: "10px 20px",
          }}
        >
          <Grid item sx={{ width: "100%", paddingTop: "25px" }}>
            <DetailEmployeeInfo employee={employee} />
          </Grid>

          <Grid
            item
            sx={{ width: "100%", paddingTop: "10px", paddingBottom: "25px" }}
          >
            <DetailContractInfo contract={contract} employee={employee} />
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            margin: "0 10px",
            padding: "30px 20px 0 30px",
          }}
        ></Grid>
      </Container>

      <DeleteDialog open={open} setOpen={setOpen} item={contract} prevpage={prevpage} />
    </Container>
  );
}
