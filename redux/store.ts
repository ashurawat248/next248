import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage'
// import { mockTestSlice } from "./slices/mockTest";
// import { timerSlice } from "./slices/timerSlice";
import { sectionSlice } from "./slices/sectionSlice";
import { loaderSlice } from "./slices/loaderSlice";

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const rootReducer = combineReducers ({
    section:sectionSlice.reducer,
    loader: loaderSlice.reducer
  })
 
  const persistedSectionReducer = persistReducer(persistConfig, rootReducer);
  

  export const store = configureStore({
  reducer:persistedSectionReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })

  export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch