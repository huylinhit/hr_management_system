import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Candidate } from "../../app/models/candidate";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { ticketSlice } from "../othertypes/ticketSlice";

interface CandidateState {
  candidatesLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  candidateAdded: boolean;
  candidateUpdated: boolean;
}

const candidatesAdapter = createEntityAdapter<Candidate>({
  selectId: (candidate) => candidate.candidateId,
});

export const fetchCandidatesAsync = createAsyncThunk<Candidate[], void, { state: RootState }>(
  "candidates/fetchCandidatesAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Candidate.list();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCandidateAsync = createAsyncThunk<Candidate, number>(
  "candidate/fetchCandidateAsync",
  async (candidateId, thunkAPI) => {
    try {
      const candidate = await agent.Candidate.details(candidateId);
      return candidate;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const candidateSlice = createSlice({
  name: "candidate",
  initialState: candidatesAdapter.getInitialState<CandidateState>({
    candidatesLoaded: false,
    filtersLoaded: false,
    status: "idle",
    candidateAdded: false,
    candidateUpdated: false,
  }),
  reducers: {
    setCandidateAdded: (state, action) => {
      state.candidateAdded = action.payload;
    },
    setCandidateUpdated: (state, action) => {
      state.candidateUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCandidatesAsync.pending, (state) => {
      state.status = "pendingFetchCandidates";
    });
    builder.addCase(fetchCandidatesAsync.fulfilled, (state, action) => {
      candidatesAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.candidatesLoaded = true;
    });
    builder.addCase(fetchCandidatesAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addCase(fetchCandidateAsync.pending, (state, action) => {
      state.status = "pendingFetchUserInfor";
    });
    builder.addCase(fetchCandidateAsync.fulfilled, (state, action) => {
      candidatesAdapter.upsertOne(state, action.payload);
      console.log(candidatesAdapter);
      state.status = "idle";
    });
    builder.addCase(fetchCandidateAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
  },
});

export const { setCandidateAdded, setCandidateUpdated } = candidateSlice.actions;
export const candidatesSelectors = candidatesAdapter.getSelectors(
  (state: RootState) => state.candidate
);
