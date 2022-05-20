import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import dataReducer from 'state/dataSlice'
import userReducer from 'state/userSlice'

export function makeStore() {
  return configureStore({
    reducer: { user: userReducer, data: dataReducer },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store
