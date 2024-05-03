import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define an interface for the userDevice object
interface UserDevice {
  deviceId: string; // or any other specific type you expect
  preAuthSessionId: string; // or any other specific type you expect
}

interface UserDetails {
  createdNewUser: boolean;
  supertokensID: string;
  email: string | null;
  phoneNumber: string | null;
  timeJoined: number;
  //tenantIds: any; // Replace 'any' with the correct type if known
}

// Define the initial state with type
const initialState = {
  userDevice: null as UserDevice | null,
  userDetails: null as UserDetails | null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // Specify the PayloadAction type
    setUserDevice: (state, action: PayloadAction<UserDevice>) => {
      state.userDevice = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDevice, setUserDetails } = loginSlice.actions;

// Define a type for the whole state if not defined elsewhere
interface RootState {
  login: {
    userDevice: UserDevice | null;
    userDetails: UserDetails | null; // Add this line
  };
}

// Export selectors for both userDevice and userDetails
export const selectUserDevice = (state: RootState) => state.login.userDevice;
export const selectUserDetails = (state: RootState) => state.login.userDetails;

export default loginSlice.reducer;