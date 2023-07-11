import { useState } from "react";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// component
import AddAllowanceDialog from "../../dialog/AddAllowanceDialog";

// data
import Contract from "../../../../app/models/contract";
import { UserInfor } from "../../../../app/models/userInfor";

interface AllowanceField {
  allowanceTypeId: number;
  allowanceSalary: number;
}

// interface
interface Props {
  contract: Contract | undefined;
  employee: UserInfor | undefined;
  setContractForm: Function;
  allowanceForm: Array<AllowanceField> | undefined;
  setAllowanceForm: Function;
}

export default function EditSalary({
  contract,
  employee,
  setContractForm,
  allowanceForm,
  setAllowanceForm,
}: Props) {
  // -------------------------- VAR -----------------------------
  const allowanceList: Array<AllowanceField> = allowanceForm!
  //--------------------------- STATE ---------------------------
  const [openDeleteAllowance, setOpenDeleteAllowance] = useState(false);
  const [openAddAllowance, setOpenAddAllowance] = useState(false);
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  // -------------------------- MAIN ----------------------------
  return (
    <Grid sx={{ paddingBottom: "10px" }}>
      <Typography
        sx={{
          color: "#246DD6",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "5px",
          paddingLeft: "30px",
        }}
      >
        2. Lương, phụ cấp và các khoản bổ sung khác
      </Typography>

      <Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Lương căn bản:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              id="outlined-required"
              label="Lương căn bản"
              size="small"
              sx={{ width: "150px" }}
              margin="dense"
              defaultValue={contract?.salary}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  salary: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Lương tính thuế:
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              id="outlined-required"
              label="Lương tính thuế"
              size="small"
              sx={{ width: "150px" }}
              margin="dense"
              defaultValue={contract?.taxableSalary}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  taxableSalary: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 0 30px",
          }}
        >
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Các phụ cấp (mỗi tháng):
            </Typography>
          </Grid>
          <Grid item xs={7}></Grid>
        </Grid>
        {contract?.allowances.map((a, index) => (
          <Grid
            container
            key={a.allowanceId}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "100%",
              padding: "0 30px 5px 30px",
            }}
          >
            <Grid item xs={4}>
              <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
                {a.allowanceType.allowanceName}:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                size="small"
                sx={{ width: "150px" }}
                margin="dense"
                defaultValue={a.allowanceSalary}
                onChange={(e) =>{
                  const updateField = [...allowanceList]
                  updateField[index].allowanceSalary = Number(e.target.value)
                  setAllowanceForm(updateField)
                }}
              />
            </Grid>
          </Grid>
        ))}

        <IconButton
          aria-label="delete"
          sx={{ marginLeft: "100px" }}
          onClick={() => setOpenAddAllowance(true)}
        >
          <AddCircleIcon sx={{ color: "#007FFF", fontSize: "35px" }} />
        </IconButton>

        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 0 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "550", fontSize: "18px" }}>
              Hình thức trả lương:
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              Chuyển khoản
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
              Số tài khoản ngân hàng:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.bankAccount}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
              Chủ tài khoản:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.bankAccountName}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "100%",
            padding: "0 30px 5px 30px",
          }}
        >
          <Grid item xs={3}>
            <Typography sx={{ fontWeight: "500", fontSize: "18px" }}>
              Ngân hàng:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{ fontWeight: "400", fontSize: "18px" }}>
              {employee?.bank}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <AddAllowanceDialog
        open={openAddAllowance}
        setOpen={setOpenAddAllowance}
        id={employee?.staffId}
        contract={contract}
      />
    </Grid>
  );
}
