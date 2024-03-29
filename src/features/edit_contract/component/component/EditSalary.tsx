import { useState } from "react";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";

// component
import AddAllowanceDialog from "../../dialog/AddAllowanceDialog";

// data
import Contract from "../../../../app/models/contract";
import { UserInfor } from "../../../../app/models/userInfor";
import { useAppSelector } from "../../../../app/store/configureStore";
import { allowanceTypeSelectors } from "../../../../app/store/allowanceType/allowanceTypeSlice";
import DeleteDialog from "../../dialog/DeleteDialog";

interface AllowanceList {
  allowanceId: number;
  allowanceTypeId: number;
  allowanceSalary: number;
  allowanceName: string | undefined;
}

interface AllowanceField {
  allowanceId: number;
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
  allowanceDelete: Array<AllowanceField> | undefined
  setAllowanceDelete: Function
}
const fontStyle = "Mulish";

const headerStyle = {
  fontWeight: 700,
  fontFamily: fontStyle,
  fontSize: "16px",
};
const infoStyle = {
  fontFamily: fontStyle,
  fontWeight: 500,
  fontSize: "16px",
};
export default function EditSalary({
  contract,
  employee,
  setContractForm,
  allowanceForm,
  setAllowanceForm,
  allowanceDelete,
  setAllowanceDelete
}: Props) {
  // -------------------------- VAR -----------------------------
  const allowanceType = useAppSelector((state: any) =>
    allowanceTypeSelectors.selectAll(state)
  );
  const allowanceList: Array<AllowanceList> = allowanceForm!?.map(
    (allowance) => ({
      ...allowance,
      allowanceName: allowanceType.find(
        (a) => a.allowanceTypeId === allowance.allowanceTypeId
      )?.allowanceName,
    })
  );
  //--------------------------- STATE ---------------------------
  const [allowanceDeleted, setAllowanceDeleted] = useState<AllowanceList>()
  const [openDeleteAllowance, setOpenDeleteAllowance] = useState(false);
  const [openAddAllowance, setOpenAddAllowance] = useState(false);
  const [error1, setError1] = useState(false)
  const [error2, setError2] = useState(false)
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
          fontFamily: fontStyle,
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
          <Grid item xs={2}>
            <Typography sx={headerStyle}>Lương căn bản:</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              error={error1}
              helperText={error1 ? "Không hợp lệ":""}
              id="outlined-required"
              label="Lương căn bản"
              size="small"
              type="number"
              sx={{ width: "210px" }}
              margin="dense"
              defaultValue={contract?.salary}
              onChange={(e) =>{
                const numberValue = Number(e.target.value);
            
                if (!isNaN(numberValue) && numberValue >= 0) {
                  setContractForm((prevForm: any) => ({
                    ...prevForm,
                    salary: e.target.value,
                  }))
                  setError1(false)
                } else {
                  setError1(true)
                }
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography sx={headerStyle}>Lương tính thuế:</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              error={error2}
              helperText={error2 ? "Không hợp lệ":""}
              id="outlined-required"
              label="Lương tính thuế"
              size="small"
              sx={{ width: "210px" }}
              margin="dense"
              defaultValue={contract?.taxableSalary}
              onChange={(e) =>{
                const numberValue = Number(e.target.value);
            
                if (!isNaN(numberValue) && numberValue >= 0) {
                  setContractForm((prevForm: any) => ({
                    ...prevForm,
                    taxableSalary: e.target.value,
                  }))
                  setError2(false)
                } else {
                  setError2(true)
                }
              }}
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
            <Typography sx={headerStyle}>Các phụ cấp (mỗi tháng):</Typography>
          </Grid>
          <Grid item xs={7}></Grid>
        </Grid>

        {allowanceList?.map((a, index) => (
          <Grid
            container
            key={a.allowanceTypeId}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "100%",
              padding: "0 30px 5px 30px",
            }}
          >
            <Grid item xs={3.5}>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "18px",
                  fontFamily: "Mulish",
                }}
              >
                {a.allowanceName}:
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <TextField
                required
                id="outlined-required"
                size="small"
                sx={{ width: "150px" }}
                margin="dense"
                defaultValue={a.allowanceSalary}
                onChange={(e) => {
                  const updateField = [...allowanceList];
                  updateField[index].allowanceSalary = Number(e.target.value);
                  setAllowanceForm(updateField)
                }}
              />
            </Grid>
            <Grid item xs={5.5}>
              <IconButton
                aria-label="add"
                sx={{ marginLeft: "100px" }}
                onClick={() => {
                  setAllowanceDeleted(a)
                  setOpenDeleteAllowance(true)}}
              >
                <RemoveCircleSharpIcon
                  sx={{ color: "red", fontSize: "35px" }}
                />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <IconButton
          aria-label="add"
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
            <Typography sx={headerStyle}>Hình thức trả lương:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={infoStyle}>Chuyển khoản</Typography>
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
            <Typography
              sx={{ fontWeight: "500", fontSize: "18px", fontFamily: "Mulish" }}
            >
              Số TK ngân hàng:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={infoStyle}>{employee?.bankAccount}</Typography>
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
            <Typography
              sx={{ fontWeight: "500", fontSize: "18px", fontFamily: "Mulish" }}
            >
              Chủ tài khoản:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={infoStyle}>{employee?.bankAccountName}</Typography>
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
            <Typography
              sx={{ fontWeight: "500", fontSize: "18px", fontFamily: "Mulish" }}
            >
              Ngân hàng:
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={infoStyle}>{employee?.bank}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <AddAllowanceDialog
        open={openAddAllowance}
        setOpen={setOpenAddAllowance}
        allowanceForm={allowanceForm}
        setAllowanceForm={setAllowanceForm}
      />

      <DeleteDialog
        open={openDeleteAllowance}
        setOpen={setOpenDeleteAllowance}
        allowanceDeleted={allowanceDeleted}
        allowanceForm={allowanceForm}
        setAllowanceForm={setAllowanceForm}
        allowanceDelete={allowanceDelete}
        setAllowanceDelete={setAllowanceDelete}
      />
    </Grid>
  );
}
