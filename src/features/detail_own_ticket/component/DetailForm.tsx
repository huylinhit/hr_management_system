import { Grid, Typography } from "@mui/material";

// api

import { LogOt } from "../../../app/models/logOt";

import { OtType } from "../../../app/models/otType";
import { Ticket } from "../../../app/models/tickets";
import { TicketType } from "../../../app/models/ticketType";

// interface
interface Props {
  ticket: Ticket;
  types: TicketType[];
}

export default function DetailForm({ ticket, types }: Props) {
  const type = types.find((type) => type.ticketTypeId === ticket.ticketTypeId);
  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4}>
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Loại đơn: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {type?.ticketName}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Nội dung đơn: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
            sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {ticket.ticketReason}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "5px",
        }}
      >
        <Grid item xs={4} >
          <Typography sx={{
            fontStyle: "normal",
            fontWeight: "550",
            fontSize: "20px",
            marginBottom: "15px",
          }}>Ngày gửi đơn: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography
           sx={{ fontStyle: "normal", fontWeight: "400", fontSize: "18px " }}
          >
            {ticket.createAt}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
