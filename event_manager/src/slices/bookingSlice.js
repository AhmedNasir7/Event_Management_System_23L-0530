import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        booking: [],
    },
    reducers: {
        add_booking: (state, action) => {
            state.booking.push(action.payload);
        },
        remove_booking: (state, action) => {
            state.booking = state.booking.filter((booking) => booking.id !== action.payload);
        },
        already_booked: (state, action) => {
            if (state.booking.some((booking) => booking.id === action.payload)) {
                return true;
            }
            return false;
        }
    }
});

export const { add_booking, remove_booking, already_booked } = bookingSlice.actions;
export default bookingSlice.reducer;