import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from 'app/store'
import { fetchUsers, UsersResponse } from 'services/userService'
import { RequestStatuses } from 'types/RequestStatus'

export interface UserState {
  name: string | null
  initials: string | null
  fetchStatus: RequestStatuses
}

const initialState: UserState = {
  name: 'user loading...',
  initials: '',
  fetchStatus: RequestStatuses.INITIAL,
}

export const getUsers = createAsyncThunk('user/getUser', async () => {
  const response = await fetchUsers()
  return response
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload
    },
    setNickName: (state, { payload }: PayloadAction<string>) => {
      state.initials = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.fetchStatus = RequestStatuses.LOADING
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<UsersResponse>) => {
        const { name, initials } = action.payload.users[0]
        state.name = name
        state.initials = initials
        state.fetchStatus = action.payload.status
      })
  },
})

export const { setName, setNickName } = userSlice.actions

export const selectUserName = (state: AppState) => state.user.name
export const selectUserInitials = (state: AppState) => state.user.initials

export default userSlice.reducer
