import {
  Box,
} from "@mui/material";

// component

// data

export default function DetailContract() {
  // // -------------------------- VAR -----------------------------
  // const id = 1;
  // // -------------------------- STATE ---------------------------
  // const [staffs, setStaffs] = useState<Employee[]>(USERINFOR);
  // const [contracts, setContracts] = useState<Contract[]>(CONTRACTLIST);
  // // -------------------------- REDUX ---------------------------
  // // -------------------------- EFFECT --------------------------
  // // -------------------------- FUNCTION ------------------------
  // const contract = contracts.find((c) => c.contractId === id);
  // const employee = staffs.find((s) => s.staffId === contract?.staffId);
  return (
    <Box sx={{ padding: "10px 30px 30px 30px", width: "calc(100vh - 240)" }}>
      {/* <Grid container>
        <Typography
          sx={{
            padding: "5px 0 15px 0",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}
        >
          Thông tin hợp đồng
        </Typography>
        <IconButton aria-label="delete" sx={{ padding: "10px 10px 20px 10px" }}>
          <LuEdit style={{ fontSize: "25px", color: "#007FFF" }} />
        </IconButton>
      </Grid>

      <Container
        sx={{
          boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
          backgroundColor: "white",
          padding: "35px",
        }}
      >
        <Grid
          container
          sx={{
            borderRadius: "15px",
            border: "1px solid #E2E1E5",
            background: "#FFF",
            margin: "0 10px",
            maxWidth: "1085px",
            padding: "10px 20px",
          }}
        >
          <Grid item sx={{ width: "100%", paddingTop: "25px" }}>
            {!!employee && <DetailEmployeeInfo employee={employee} />}
          </Grid>

          <Grid
            item
            sx={{ width: "100%", paddingTop: "10px", paddingBottom: "25px" }}
          >
            {!!contract && !!employee && (
              <DetailContractInfo contract={contract} employee={employee} />
            )}
          </Grid>
        </Grid>
        <Grid container sx={{
            margin: "0 10px",
            // maxWidth: "1085px",
            padding: "30px 20px 0 30px",
          }}>
            <DetailContractFooter/>
          </Grid>
      </Container> */}
    </Box>
  );
}
