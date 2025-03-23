import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const billStore = createSlice({
    name: "bills",
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        },

        addBill(state, action) {
            state.billList.push(action.payload)
        },

        updateBill(state, action) {
            const updatedBill = action.payload
            const index = state.billList.findIndex(bill => bill.id === updatedBill.id)
            if (index !== -1) {
                state.billList[index] = updatedBill
            }
        },

        deleteBill(state, action) {
            const id = action.payload
            state.billList = state.billList.filter(bill => bill.id !== id)
        }
    }
})


const { setBillList, addBill, updateBill, deleteBill } = billStore.actions;

const getBillList = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8888/transaction');
            console.log('Fetched data');
            dispatch(setBillList(response.data)); // Dispatch the action to update Redux store
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

const addBillList = (data) => {
    return async(dispatch) => {
        try {
            const res = await axios.post('http://localhost:8888/transaction', data)
            dispatch(addBill(res.data))
        } catch (error) {
            console.error("Error adding data", error)
        }
    }
}

const updateBillList = (updatedData) => {
    return async(dispatch) => {
        try {
            const response = await axios.put(`http://localhost:8888/transaction/${updatedData.id}`, updatedData)
            dispatch(updateBill(response.data))
        } catch (error) {
            console.error("Error updating data", error)
        }
    }
}

const deleteBillList = (id) => {
    return async(dispatch) => {
        try {
            await axios.delete(`http://localhost:8888/transaction/${id}`)
            dispatch(deleteBill(id))
        } catch (error) {
            console.error("Error deleting data", error)
        }
    }
}

export { getBillList, addBillList, updateBillList, deleteBillList };
const reducer = billStore.reducer;
export default reducer;

