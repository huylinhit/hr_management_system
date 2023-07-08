import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { CandidateSkill } from "../../app/models/candidateskill";

interface CandidateSkillState {
  candidateSkillsLoaded: boolean;
  candidateSkillsByCandidateId: CandidateSkill[] | null;
  filtersLoaded: boolean;
  status: string;
  candidateSkillAdded: boolean;
}

const candidateSkillsAdapter = createEntityAdapter<CandidateSkill>({
  selectId: (candidateskill) => candidateskill.uniqueId,
});

export const fetchCandidateSkillsAsync = createAsyncThunk<
  CandidateSkill[],
  void,
  { state: RootState }
>("candidateSkills/fetchCandidateSkills", async (_, thunkAPI) => {
  try {
    const response = await agent.CandidateSkill.list();
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchCandidateSkillsByCandidateIdAsync = createAsyncThunk<
  CandidateSkill[],
  number,
  { state: RootState }
>("candidateSkills/fetchCandidateSkillsByCandidateIdAsync", async (candidateId, thunkAPI) => {
  try {
    const response = await agent.CandidateSkill.listByCandidateId(candidateId);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchCandidateSkillAsync = createAsyncThunk<CandidateSkill, number>(
  "ticket/fetchCandidateSkillAsync",
  async (candidateSkillId, thunkAPI) => {
    try {
      const candidateSkill = await agent.CandidateSkill.details(candidateSkillId);
      return candidateSkill;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const candidateSkillSlice = createSlice({
  name: "staffSkills",
  initialState: candidateSkillsAdapter.getInitialState<CandidateSkillState>({
    candidateSkillsByCandidateId: null,
    candidateSkillsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    candidateSkillAdded: false,
  }),
  reducers: {
    setCandidateSkillAdded: (state, action) => {
      state.candidateSkillsLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCandidateSkillsAsync.pending, (state) => {
      state.status = "pendingFetchStaffSkills";
    });
    builder.addCase(fetchCandidateSkillsAsync.fulfilled, (state, action) => {
      candidateSkillsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.candidateSkillsLoaded = true;
    });
    builder.addCase(fetchCandidateSkillsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addCase(fetchCandidateSkillsByCandidateIdAsync.pending, (state) => {
      state.status = "pendingFetchStaffSkills";
    });
    builder.addCase(fetchCandidateSkillsByCandidateIdAsync.fulfilled, (state, action) => {
      candidateSkillsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.candidateSkillsLoaded = true;
    });
    builder.addCase(fetchCandidateSkillsByCandidateIdAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addCase(fetchCandidateSkillAsync.pending, (state) => {
      state.status = "pendingFetchStaffSkill";
    });
    builder.addCase(fetchCandidateSkillAsync.fulfilled, (state, action) => {
      candidateSkillsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchCandidateSkillAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
  },
});

export const { setCandidateSkillAdded } = candidateSkillSlice.actions;
export const candidateSkillsSelectors = candidateSkillsAdapter.getSelectors(
  (state: RootState) => state.candidateSkill
);
