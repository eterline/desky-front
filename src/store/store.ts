import { configureStore } from "@reduxjs/toolkit";

export const storeRedux = configureStore({
    reducer: {

    },
});



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof storeRedux.getState>
// Inferred type
export type AppDispatch = typeof storeRedux.dispatch