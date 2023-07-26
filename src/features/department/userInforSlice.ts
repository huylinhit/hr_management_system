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

<<<<<<< Updated upstream
=======

function getAxiosParams(userInforParams: UserInforParams) {
  const params = new URLSearchParams();

  params.append('pageNumber', userInforParams.pageNumber.toString());
  // params.append('pageSize', userInforParams.pageSize.toString());

  console.log("Search term: ", userInforParams.searchTerm)
  console.log(userInforParams);
  

  if (userInforParams.searchTerm) params.append('searchTerm', userInforParams.searchTerm.toString());
  if (userInforParams.departments?.length > 0) params.append('departments', userInforParams.departments.toString());
  return params;
}

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======

export const fetchFiltersUserInfor = createAsyncThunk(
  'userInfors/fetchFiltersUserInfor',
  async (_, thunkAPI) => {
    try {
      return agent.UserInfors.filters()
    } catch (error: any) {
      thunkAPI.rejectWithValue({ error: error.data })
    }
  }
)


function initParams() {
  return {
    pageNumber: 1,
    pageSize: 30,
    departments: [""]
  }
}

>>>>>>> Stashed changes
export const userInforSlice = createSlice({
  name: "userInfors",
  initialState: userInforsAdapter.getInitialState<UserInforState>({
    userInforsLoaded: false,
    userInforAdded: false,
    filtersLoaded: false,
    status: "idle",
  }),
  reducers: {
    setUserInforAdded: (state, action) => {
      state.userInforAdded = action.payload;
    },
  },
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

export const { setUserInforAdded } = userInforSlice.actions;
export const userInforSelectors = userInforsAdapter.getSelectors(
  (state: RootState) => state.userInfor
);
