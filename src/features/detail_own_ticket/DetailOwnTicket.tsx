import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/configureStore";

// component
import DetailTicketContent from "./component/DetailTicketContent";
import DetailTicketFooter from "./component/DetailTicketFooter";

// data
import {  TICKET, TICKETYPES } from "../../app/store/data";

// api
import { Ticket } from "../../app/models/tickets";
import { TicketType } from "../../app/models/ticketType";

export default function DetailOwnTicket() {
  // -------------------------- VAR -----------------------------
  const [ticket, setTicket] = useState<Ticket>(TICKET);
  const [types, setTypes] = useState<TicketType[]>(TICKETYPES);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm();
  // -------------------------- STATE ---------------------------
  // -------------------------- REDUX ---------------------------
  // -------------------------- EFFECT --------------------------
  // -------------------------- FUNCTION ------------------------
  const onSubmit = (data: FieldValues) => {
    console.log("abc");

    // navigate("/viewot");
  };
  // -------------------------- MAIN ----------------------------
  return (
    <Box sx={{ padding: "10px 30px 30px 30px", minHeight: "calc(100vh - 65px)" }}>
      <Grid>
        <Typography
          sx={{
            paddingTop: "5px",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "39px",
          }}
        >Đơn gửi khác</Typography>
        <Typography
          sx={{
            paddingBottom: "15px",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "20px",
          }}
        >Mã đơn - {ticket.ticketId}</Typography>
      </Grid>

      <Container>
        <Grid
          container
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            border: "1px solid #E2E1E5",
            backgroundColor: "white",
            borderRadius: "30px",
            padding: "20px 45px",
            margin: "5px 0",
          }}  
        >
          <Grid item sx={{ width: "100%", padding: "30px 50px 0 50px" }}>
            <DetailTicketContent ticket={ticket} types={types} />
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <DetailTicketFooter ticket={ticket}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
