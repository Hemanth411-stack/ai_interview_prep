"use client"
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../Redux/slices/authslice";
import interviewReducer from "../Redux/slices/interview";

// Only persist auth if needed
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated']
};


export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    interview: interviewReducer // No persistence needed for interviews
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REGISTER', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);