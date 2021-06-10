import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialOrder = {
        name: "",
        prepTime: "00:00:00",
        type: undefined
};

export const sendRequest = createAsyncThunk("sendRequest", async obj => {
    const response = await fetch('http://localhost:3000/dishes'   // you can set necessary URL
    ,{
        method: "POST",
        body: JSON.stringify(obj),
        headers:{
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) throw new Error("error... status: " + response.status + " " + response.statusText);
    return await response.json();
});

const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {
        order: initialOrder,
        ordered: [],
        status: "iddle",
        error: null
    },
    reducers:{
        addOrder: (state, action) => {
            const obj = action.payload;
            if (obj.type === "pizza") obj.diameter = Number(obj.diameter);
            state.order = obj;
            state.status = "iddle";
        },
        resetOrder: state => {state.order = initialOrder}
    },
    extraReducers:{
        [sendRequest.pending]: state => {state.status = "sending"},
        [sendRequest.fulfilled]: (state, action) => {
            state.status = 'complete';
            state.ordered.push(action.payload);
        },
        [sendRequest.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }
    }
    });  

export const {addOrder, resetOrder} = dishesSlice.actions;
export default dishesSlice.reducer;