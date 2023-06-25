import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StaffSkill } from "../../app/models/staffSkill";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface StaffSkillState {
  staffSkillsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  staffSkillAdded: boolean;
}

const staffSkillsAdapter = createEntityAdapter<StaffSkill>({
  selectId: (staffSkill) => staffSkill.uniqueId 
});

export const fetchStaffSkillsAsync = createAsyncThunk<StaffSkill[], void, { state: RootState }>(
  "staffSkills/fetchStaffSkllsAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.StaffSkill.list();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchStaffSkillAsync = createAsyncThunk<StaffSkill, number>(
  "ticket/fetchStaffSkillAsync",
  async (staffSkillId, thunkAPI) => {
    try {
      const ticket = await agent.StaffSkill.details(staffSkillId);
      return ticket;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const staffSkillSlice = createSlice({
  name: "staffSkills",
  initialState: staffSkillsAdapter.getInitialState<StaffSkillState>({
    staffSkillsLoaded: false,
    filtersLoaded: false,
    status: "idle",
    staffSkillAdded: false,
  }),
  reducers: {
    setStaffSkillAdded: (state, action) => {
      state.staffSkillsLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStaffSkillsAsync.pending, (state) => {
      state.status = "pendingFetchStaffSkills";
    });
    builder.addCase(fetchStaffSkillsAsync.fulfilled, (state, action) => {
      staffSkillsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.staffSkillsLoaded = true;
    });
    builder.addCase(fetchStaffSkillsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });

    builder.addCase(fetchStaffSkillAsync.pending, (state) => {
      state.status = "pendingFetchStaffSkill";
    });
    builder.addCase(fetchStaffSkillAsync.fulfilled, (state, action) => {
      staffSkillsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchStaffSkillAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
  },
});

export const {setStaffSkillAdded} = staffSkillSlice.actions;
export const staffSkillsSelectors = staffSkillsAdapter.getSelectors(
  (state: RootState) => state.staffSkill
);
