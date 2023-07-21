import { Button, Grid, TextField, Typography } from "@mui/material";

// data
import Contract from "../../../../app/models/contract";

// interface
interface Props {
  contract: Contract | undefined;
  setContractForm: Function;
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
export default function EditNote({ contract, setContractForm }: Props) {
  return (
    <Grid>
      <Typography
        sx={{
          color: "#246DD6",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "5px",
          paddingLeft: "30px",
        }}
      >
        3. Thời gian làm việc và ghi chú
      </Typography>

      <Grid>
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
          <Grid item xs={4}>
            <Typography sx={headerStyle}>Số ngày làm việc một tuần:</Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              id="outlined-required"
              label="Số ngày làm việc"
              disabled
              size="small"
              margin="dense"
              defaultValue={contract?.workDatePerWeek}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  workDatePerWeek: e.target.value,
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
            alignItems: "center",
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}
        >
          <Grid item xs={4}>
            <Typography sx={headerStyle}>Ghi chú:</Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              id="outlined-required"
              label="Ghi chú"
              size="small"
              margin="dense"
              defaultValue={contract?.note}
              onChange={(e) =>
                setContractForm((prevForm: any) => ({
                  ...prevForm,
                  note: e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>

        {/* <Grid sx={{
            maxWidth: "100%",
            padding: "0 30px 10px 30px",
          }}>
            <Button variant="contained" size="small" sx={{ borderRadius:"10px" }}>Xem file</Button>
          </Grid> */}
      </Grid>
    </Grid>
  );
}
