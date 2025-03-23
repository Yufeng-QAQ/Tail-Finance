import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../utils";

const reminderStore = createSlice({
    name: "reminders",
    initialState: {
        reminderList: [],
        loading: false,
    },
    reducers: {
        setReminderList(state, action) {
            state.reminderList = action.payload;
            state.loading = false;
        },
        
        setLoading(state) {
            state.loading = true;
        }
    }
});

const { setReminderList, setLoading } = reminderStore.actions;

const getReminderList = () => {
    return async (dispatch) => {
        dispatch(setLoading());
        try {
            const response = await request.get(`/reminders/get_reminder`, localStorage.getItem('token'));
            dispatch(setReminderList(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}

const updateReminderList = (id) => {
    return async (dispatch) => {
        try {
            const response = await request.put(`/reminders/update/${id}`);
            dispatch(setReminderList(response.data));
            
        } catch (error) {
            console.error(error);
        }
    }
}

// In progress
const addReminderList = (reminder) => {
    return async (dispatch) => {
        try {
            const response = await request.post('/reminders/create_reminder', reminder);
            dispatch(setReminderList(response.data));
        } catch (error) {
            console.error(error);
        }
    }
}

export { getReminderList, updateReminderList, addReminderList };
const reminderReducer = reminderStore.reducer;
export default reminderReducer;