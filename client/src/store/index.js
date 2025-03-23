// Intergrate sub-conponents
import { configureStore } from "@reduxjs/toolkit";
import billReducer from "./modules/billStore.js";
import userReducer from "./modules/userStore.js";
import reminderReducer from "./modules/reminderStore.js";

const store = configureStore({
    reducer: {
        bills: billReducer,
        user: userReducer,
        reminders: reminderReducer,
    }
})

export default store
