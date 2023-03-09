import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction 
} from '@reduxjs/toolkit';
import { 
  RootState, 
  // AppThunk 
} from '../../../app/store';
import { User } from '../types/User';
import { SignInRequest } from '../types/SignInRequest';
import { UserApi } from './api';
import { SignUpRequest } from '../types/SignUpRequest';

const { 
  // fetchUserById, 
  setNewUser, 
  fetchUserByEmailAndPassword, 
  cache
} = new UserApi();

export interface UserState {
  user: User;
  status: 'disconnected' | 'loading' | 'failed' | 'connected';
}

export const initialState: UserState = {
  user: cache.user != null ? cache.user : {
    email: '',
    fname: '',
    lname: '',
    phone: '',
    id: '',
    password: ''
  },
  status: cache.user!=null ? 'connected' : 'disconnected',
};

export const signIn = createAsyncThunk(
  'user/get',
  async ({ email, password }: SignInRequest) => {
    const response = await fetchUserByEmailAndPassword(email, password);
    return response.data;
  }
);

export const signUp = createAsyncThunk(
  'user/set',
  async (user: SignUpRequest) => {
    const response = await setNewUser(user);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setNewUser: (state, action: PayloadAction<User>) => {
    //   const {
    //     fname,
    //     lname,
    //     email,
    //     phone
    // } = action.payload;
    //   state.user = new User();
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User, string, { arg: SignUpRequest; requestId: string; requestStatus: "fulfilled"; }>) => {
        state.status = 'connected';
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state) => {
        state.status = 'failed';
      })

      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if(action.payload){
          state.status = 'connected';
          state.user = action.payload;
        }
        else {
          // TODO throw error to user using alert modal or somthing like that
          state.status = 'disconnected';
        }
      })
      .addCase(signIn.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const { 
  // setNewUser 
// } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export const selectStatus = (state: RootState) => state.user.status;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default userSlice.reducer;
