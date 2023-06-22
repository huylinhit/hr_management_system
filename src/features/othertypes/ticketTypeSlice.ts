import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Ticket } from "../../app/models/ticket";
import { TicketType } from "../../app/models/ticketType";
import { RootState } from "../../app/store/configureStore";

interface TicketTypeState {
  ticketTypes: TicketType[] | null;
  ticketTypesLoaded: boolean;
  status: string;
}

const initialState: TicketTypeState = {
  ticketTypes: null,
  ticketTypesLoaded: false,
  status: "idle",
};

export const fetchTicketTypesAsync = createAsyncThunk<TicketType[], void, { state: RootState }>(
  "tickets/fetchTicketTypesAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.TicketType.list();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchTicketTypeAsync = createAsyncThunk<Ticket, number>(
  "ticket/fetchTicketTypeAsync",
  async (ticketTypeId, thunkAPI) => {
    try {
      const ticketType = await agent.TicketType.details(ticketTypeId);
      return ticketType;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const ticketTypeSlice = createSlice({
  name: "ticketType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTicketTypesAsync.pending, (state) => {
      state.status = "pendingFetchTicketTypes";
    });
    builder.addCase(fetchTicketTypesAsync.fulfilled, (state, action) => {
      state.ticketTypes = action.payload;
      state.ticketTypesLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchTicketTypesAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});
