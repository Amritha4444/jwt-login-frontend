import { createReducer, on } from '@ngrx/store';

import {
  login,
  loginSuccess,
  loginFailure,
  signup,
  signupSuccess,
  signupFailure,
  logout
} from './auth.actions';

export interface AuthState {
  token: string | null;
  user: { id: number; email: string } | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,

  on(login, signup, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    loading: false,
    error: null
  })),

  on(signupSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),

  on(loginFailure, signupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(logout, () => initialAuthState)
);