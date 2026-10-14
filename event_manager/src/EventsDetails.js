import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { add_booking, remove_booking, already_booked } from "./slices/bookingSlice";
function EventsDetails() {
    const { id } = useParams();
    const apikey = process.env.REACT_APP_API_KEY;
    const [event_details, setEventDetails] = useState();
    const [openConfirmModal, setopenConfirmModal] = useState(false);
    const [openCancelConfirmModal, setopenCancelConfirmModal] = useState(false);
    const dispatch = useDispatch();
    const already_booked = useSelector((state) => state.booking.booking);
    const username = useSelector((state) => state.auth.username);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apikey}`);
                const data = await response.json();
                setEventDetails(data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        }
        fetchEventDetails();
    }, [id])

    const RegisterEvent = () => {
        if (already_booked.some((booking) => booking.id === event_details.id)) {
            alert("Already booked");
            setopenConfirmModal(false);
            return;
        }
        const booking = {
            id: event_details.id,
            name: event_details.name,
            date: event_details.dates.start.localDate,
            time: event_details.dates.start.localTime,
            category: event_details.classifications[0].genre.name,
            subCategory: event_details.classifications[0].segment.name,
            location: event_details._embedded?.venues[0].name,
            image: event_details.images[0].url,
            booker_username: username,
        }
        dispatch(add_booking(booking));
        alert("Booked Successfully");
        setopenConfirmModal(false);

    }
    const cancelRegistration = () => {
        if (already_booked.some((booking) => booking.id === event_details.id)) {
            dispatch(remove_booking(event_details.id));
            alert("Cancelled Successfully");
            setopenCancelConfirmModal(false);
        } else {
            alert("Not Booked");
            setopenCancelConfirmModal(false);
        }
    }
    return (
        <div className="max-w-7xl mx-auto p-4">

            <h1 className="text-3xl font-bold text-emerald-900 mb-6"> {event_details?.name} Event Details</h1>

            {event_details?._embedded?.venues?.map((venue) => (
                <div key={venue.id} className="border rounded-lg overflow-hidden bg-green-300 m-3">

                    <div className="p-4 flex justify-between items-center flex-col gap-4">
                        <h4 className="text-gray-800 font-bold"><img src={event_details.images[0].url} alt="" /></h4>
                        <h2 className="text-xl font-bold mb-2">Venue : {venue.name}</h2>
                        <div className="flex gap-5 w-full">
                            <button className="w-full py-3 bg-green-900 hover:bg-green-700 text-white font-bold px-4 rounded-xl border-black border-2" onClick={() => setopenConfirmModal(true)}>Register for Event</button>
                            <button className="w-full py-3 bg-green-900 hover:bg-green-700 text-white font-bold px-4 rounded-xl border-black border-2" onClick={() => setopenCancelConfirmModal(true)}>Cancel Registration</button>
                        </div>
                        <div>
                            {already_booked.some((booking) => booking.id === event_details.id) ? (
                                <h4 className="text-green-800 font-bold text-2xl m-3 border-2 border-green-800 bg-green-100 p-3">Booked</h4>
                            ) : (
                                <h4 className="text-red-800 font-bold text-2xl m-3 border-2 border-red-800 bg-green-100 p-3">Not Booked</h4>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 ">
                            <h4 className="text-gray-800 font-bold">Date: {event_details.dates.start.localDate}</h4>
                            <h4 className="text-gray-800 font-bold">Time: {event_details.dates.start.localTime}</h4>
                            <h4 className="text-gray-800 font-bold">Category: {event_details.classifications[0].genre.name}</h4>
                            <h4 className="text-gray-800 font-bold">Sub-Category: {event_details.classifications[0].segment.name}</h4>
                            <h4 className="text-gray-800 font-bold">Location: {venue.address.line1}</h4>
                        </div>

                    </div>
                    <h1 className="text-gray-800  text-2xl font-bold text-center m-4">Attractions</h1>
                    {event_details?._embedded?.attractions?.map((attraction) => (
                        <div key={attraction.id} className="border border-emerald-950 border-2 rounded-lg overflow-hidden bg-green-900 m-3">
                            <div className="p-4 flex justify-between items-center">
                                <h2 className="text-xl font-bold mb-2 text-white" >{attraction.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            {openConfirmModal ? (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg p-3 border-2 border-black bg-white">
                        <h2 className="text-xl font-bold mb-2">Confirm Booking</h2>
                        <p className="mb-4">Are you sure you want to book this event?</p>
                        <div className="flex justify-end gap-2">
                            <button className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl border-black border-2" onClick={() => setopenConfirmModal(false)}>Cancel</button>
                            <button className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl border-black border-2" onClick={() => RegisterEvent()}>Confirm</button>
                        </div>
                    </div>
                </div>
            ) : null}

            {openCancelConfirmModal ? (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg p-3 border-2 border-black bg-white">
                        <h2 className="text-xl font-bold mb-2">Confirm Cancellation</h2>
                        <p className="mb-4">Are you sure you want to cancel your registration for this event?</p>
                        <div className="flex justify-end gap-2">
                            <button className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl border-black border-2" onClick={() => setopenCancelConfirmModal(false)}>Cancel</button>
                            <button className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl border-black border-2" onClick={() => cancelRegistration()}>Confirm</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
export default EventsDetails;