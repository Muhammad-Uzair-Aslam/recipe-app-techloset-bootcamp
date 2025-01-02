
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../store/slices/recipesSlice.tsx'; // Ensure slice import is correct

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Serializable check ko disable kar diya gaya hai
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
