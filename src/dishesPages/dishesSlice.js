import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    order: {
        name: "",
        prepTime: "00:00:00",
        type: undefined
    },
    ordered: [],
    status: "iddle",
    error: null
};

export const sendRequest = createAsyncThunk("sendRequest", async obj => {
    // const state = useSelector(state => state.order);
    const response = await fetch('http://localhost:3000/posts', {
        method: "POST",
        body: JSON.stringify(obj),
        headers:{
            "Content-Type": "application/json"
        }
    });
    // console.log("response: ", response);
    if (!response.ok) throw new Error(response.status + " " + response.statusText);
    // const json = await response.json();
    // console.log("json ", json);
    return await response.json();
});

const dishesSlice = createSlice({
    initialState,
    name: 'dishes',
    reducers:{
        addOrder: (state, action) => {
            const obj = action.payload;
            if (obj.type === "pizza") obj.diameter = Number(obj.diameter);
            state.order = obj;
            state.status = "iddle";
        },
        resetStatus: state => {state.status = "iddle"}
    },
    extraReducers:{
        [sendRequest.pending]: state => {state.status = "sending"},
        [sendRequest.fulfilled]: (state, action) => {
            // console.log('action_fulfilled: ', action);
            state.status = 'complete';
            state.ordered.push(action.payload);
            // console.log('state_order: ', state.order);
        },
        [sendRequest.rejected]: (state, action) => {
            // console.log('action_reject: ', action);
            state.status = "failed";
            state.error = action.error.message;
            // console.log(state.status);
        }
    }
    });  

export const {addOrder, resetStatus} = dishesSlice.actions;
export default dishesSlice.reducer;