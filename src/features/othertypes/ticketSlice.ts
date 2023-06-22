import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Ticket } from "../../app/models/ticket";
import { async } from "q";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { UserInfo } from "os";
import { TicketType } from "../../app/models/ticketType";

interface TicketState {
  ticketsLoaded: boolean;
  ticketTypesLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
}

const ticketsAdapter = createEntityAdapter<Ticket>({
  selectId: (ticket) => ticket.ticketId,
});


export const fetchTicketsAsync = createAsyncThunk<Ticket[], void, { state: RootState }>(
  "tickets/fetchTicketsAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Ticket.list();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchTicketAsync = createAsyncThunk<Ticket, number>(
  "ticket/fetchTicketAsync",
  async (ticketId, thunkAPI) => {
    try {
      const ticket = await agent.Ticket.details(ticketId);
      return ticket;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const ticketSlice = createSlice({
  name: "tickets",
  initialState: ticketsAdapter.getInitialState<TicketState>({
    ticketsLoaded: false,
    ticketTypesLoaded: false,
    filtersLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTicketsAsync.pending, (state) => {
      state.status = "pendingFetchTickets";
    });
    builder.addCase(fetchTicketsAsync.fulfilled, (state, action) => {
      ticketsAdapter.setAll(state, action.payload);
      console.log(action.payload);
      state.status = "idle";
      state.ticketsLoaded = true;
    });
    builder.addCase(fetchTicketsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addCase(fetchTicketAsync.pending, (state, action) => {
      state.status = "pendingFetchUserInfor";
    });
    builder.addCase(fetchTicketAsync.fulfilled, (state, action) => {
      ticketsAdapter.upsertOne(state, action.payload);
      console.log(ticketsAdapter);
      state.status = "idle";
    });
    builder.addCase(fetchTicketAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
  },
});

export const ticketsSelectors = ticketsAdapter.getSelectors((state: RootState) => state.ticket);
