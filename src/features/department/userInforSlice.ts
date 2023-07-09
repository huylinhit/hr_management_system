import { createAsyncThunk, createEntityAdapter, createSlice, isAction } from "@reduxjs/toolkit";
import { UserInfor } from "../../app/models/userInfor";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { fetchDepartmentsAsync } from "./departmentSlice";

interface UserInforState {
  userInforsLoaded: boolean;
  userInforAdded: boolean;
  filtersLoaded: boolean;
  status: string;
}

const userInforsAdapter = createEntityAdapter<UserInfor>({
  selectId: (userInfor) => userInfor.staffId,
});

export const fetchUserInforsAsync = createAsyncThunk<UserInfor[], void, { state: RootState }>(
  "userInfors/fetchUserInforsAsync",
  async (_, thunkAPI) => {
    try {
      const response = await agent.UserInfors.list();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchUserInforAsync = createAsyncThunk<UserInfor, number>(
  "userInfors/fetchUserInforAsync",
  async (userInforId, thunkAPI) => {
    try {
      const userInfor = await agent.UserInfors.details(userInforId);
      return userInfor;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const userInforSlice = createSlice({
  name: "userInfors",
  initialState: userInforsAdapter.getInitialState<UserInforState>({
    userInforsLoaded: false,
    userInforAdded: false,
    filtersLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInforsAsync.pending, (state) => {
      state.status = "pendingFetchUserInfors";
    });
    builder.addCase(fetchUserInforsAsync.fulfilled, (state, action) => {
      userInforsAdapter.setAll(state, action.payload);
 
      state.status = "idle";
      state.userInforsLoaded = true;
    });
    builder.addCase(fetchUserInforsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchUserInforAsync.pending, (state, action) => {
      state.status = "pendingFetchUserInfor";
    });
    builder.addCase(fetchUserInforAsync.fulfilled, (state, action) => {
      userInforsAdapter.upsertOne(state, action.payload);
 
      state.status = "idle";
    });
    builder.addCase(fetchUserInforAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
  },
});

export const userInforSelectors = userInforsAdapter.getSelectors(
  (state: RootState) => state.userInfor
);
