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
import { LSWrapper } from '../../../services';
import UserCache from '../cache';

const { 
  // fetchUserById, 
  setNewUser, 
  fetchUserByEmailAndPassword
} = new UserApi();

export interface UserState {
  user: User;
  access_token?: string;
  status: 'disconnected' | 'loading' | 'failed' | 'connected';
}

const cache: UserCache = new UserCache();

export const initialState: UserState = {
  user: cache.user != null ? cache.user : {
    email: '',
    fname: '',
    lname: '',
    phone: '',
    // id: '',
    password: ''
  },
  access_token: cache.access_token,
  status: cache.user !=null && cache.access_token!=null ? 'connected' : 'disconnected',
};

export const signIn = createAsyncThunk(
  'user/get',
  async ({ email, password }: SignInRequest) => await fetchUserByEmailAndPassword(email, password)
);

export const signUp = createAsyncThunk(
  'user/set',
  async (user: SignUpRequest) => await setNewUser(user)
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
      .addCase(signUp.fulfilled, (state, action: PayloadAction<string, string, { arg: SignUpRequest; requestId: string; requestStatus: "fulfilled"; }>) => {
        state.status = 'connected';
        state.user = action.meta.arg;
        state.access_token = action.payload;
        
        LSWrapper.setItem('auth@user', {
          user: state.user,
        });
        
        LSWrapper.setItem('auth@access_token', {
          access_token: state.access_token
        });

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
          state.access_token = action.payload;

          LSWrapper.setItem('auth@access_token', {
            access_token: state.access_token
          });
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
