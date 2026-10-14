import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove_booking } from "./slices/bookingSlice";

function MyEvents() {

    const [Bookings, setBookings] = useState([]);
    const BookingList = useSelector((state) => state.booking.booking);
    const [Time, setTime] = useState("All");
    const dispatch = useDispatch();
    const cancelRegistration = (eventId) => {
        dispatch(remove_booking(eventId));
        alert("Cancelled Successfully");
    }


    useEffect(() => {
        console.log(Time);
        if (Time === "All") {
            setBookings(BookingList);
        } else if (Time === "upcoming") {
            setBookings(BookingList.filter((booking) => new Date(booking.date) > new Date()));
        } else if (Time === "past") {
            setBookings(BookingList.filter((booking) => new Date(booking.date) < new Date()));
        }
        console.log(Bookings);
    }, [BookingList, Time])


    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-emerald-900 mb-6">My Events</h1>
            <div className="flex gap-5 w-full">
                <select value={Time} onChange={(e) => setTime(e.target.value)} id="upcoming" className="w-fit py-3 px-5 bg-green-900 hover:bg-green-700 text-white font-bold px-4 rounded-xl border-black border-2">
                    <option value="All">All</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option></select>
            </div>
            {Bookings && Bookings.length > 0 ? (
                Bookings.map((event) => (
                    <div key={event.id} className="border border-emerald-950 border-2 rounded-lg overflow-hidden bg-green-300 m-3">
                        <div className="p-4 flex flex-col justify-between items-center">
                            <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                            <div>
                                <h4 className="text-gray-800 font-bold">Date: {event.date}</h4>
                                <h4 className="text-gray-800 font-bold">Time: {event.time}</h4>
                                <h4 className="text-gray-800 font-bold">Category: {event.category}</h4>
                                <h4 className="text-gray-800 font-bold">Sub-Category: {event.subCategory}</h4>
                                <h4 className="text-gray-800 font-bold">Location: {event.location}</h4>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-green-900 hover:bg-green-700 text-white font-bold px-4 rounded-lg border-black border-2" onClick={() => cancelRegistration(event.id)}>Cancel Booking</button>
                    </div>
                ))
            ) : (
                <h1 className="text-center text-2xl font-bold text-red-800 m-4">No Events Booked</h1>
            )}
        </div>
    )
}

export default MyEvents;