import { createAsyncThunk, createEntityAdapter, createSlice, isAction } from "@reduxjs/toolkit";
import { UserInfor, UserInforParams } from "../../app/models/userInfor";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { fetchDepartmentsAsync } from "./departmentSlice";
import { MetaData } from "../../app/models/pagination";

interface UserInforState {
  userInforsLoaded: boolean;
  userInforAdded: boolean;
  filtersLoaded: boolean;
  status: string;
  userInforParams: UserInforParams;
  departments: string[];
  metaData: MetaData | null
}

const userInforsAdapter = createEntityAdapter<UserInfor>({
  selectId: (userInfor) => userInfor.staffId,
});

function getAxiosParams(userInforParams: UserInforParams) {
  const params = new URLSearchParams();

  params.append('pageNumber', userInforParams.pageNumber.toString());
  // params.append('pageSize', userInforParams.pageSize.toString());
  if (userInforParams.searchTerm) params.append('searchTerm', userInforParams.searchTerm.toString());
  if (userInforParams.departments?.length > 0) params.append('departments', userInforParams.departments.toString());
  return params;
}
export const fetchUserInforsAsync = createAsyncThunk<UserInfor[], void, { state: RootState }>(
  "userInfors/fetchUserInforsAsync",
  async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().userInfor.userInforParams);
    try {
      const response = await agent.UserInfors.list(params);
      thunkAPI.dispatch(setUserInforMetaData(response.metaData))
      return response.items;
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

export const userInforSlice = createSlice({
  name: "userInfors",
  initialState: userInforsAdapter.getInitialState<UserInforState>({
    userInforsLoaded: false,
    userInforAdded: false,
    filtersLoaded: false,
    status: "idle",
    departments: [],
    userInforParams: initParams(),
    metaData: null

  }),
  reducers: {
    setUserInforAdded: (state, action) => {
      state.userInforAdded = action.payload;
    },
    setUserInforParams: (state, action) => {
      state.userInforsLoaded = false;
      state.userInforParams = { ...state.userInforParams, ...action.payload, pageNumber: 1 }
    },
    setPageNumber: (state, action) => {
      state.userInforsLoaded = false;
      state.userInforParams = { ...state, ...action.payload }
    },
    resetUserInforParams: (state) => {
      state.userInforsLoaded = false;
      state.userInforParams = initParams();
    },
    setUserInforMetaData: (state, action) => {
      state.metaData = action.payload;
    }
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
      state.status = "idle";
    });

    builder.addCase(fetchFiltersUserInfor.pending, (state) => {
      state.status = "pendingFetchFilterUserInfors"
    })
    builder.addCase(fetchFiltersUserInfor.fulfilled, (state, action) => {
      state.departments = action.payload;
      state.status = 'idle'
      state.filtersLoaded = true;
    })
    builder.addCase(fetchFiltersUserInfor.rejected, (state, action) => {
      state.status = 'idle'
    })
  },
});

export const { setUserInforAdded, setUserInforMetaData, setPageNumber, setUserInforParams , resetUserInforParams} = userInforSlice.actions;
export const userInforSelectors = userInforsAdapter.getSelectors(
  (state: RootState) => state.userInfor
);
