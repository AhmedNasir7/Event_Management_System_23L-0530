import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function EventsDetails() {
    const { id } = useParams();
    const apikey = process.env.REACT_APP_API_KEY;
    const [event_details, setEventDetails] = useState();
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

    return (
        <div className="max-w-7xl mx-auto p-4">

            <h1 className="text-3xl font-bold text-emerald-900 mb-6"> {event_details?.name} Event Details</h1>

            {event_details?._embedded?.venues?.map((venue) => (
                <div key={venue.id} className="border rounded-lg overflow-hidden bg-green-300 m-3">

                    <div className="p-4 flex justify-between items-center flex-col gap-4">
                        <h4 className="text-gray-800 font-bold"><img src={event_details.images[0].url} alt="" /></h4>
                        <h2 className="text-xl font-bold mb-2">Venue : {venue.name}</h2>
                        <h4 className="text-gray-800 font-bold">Date: {event_details.dates.start.localDate}</h4>
                        <h4 className="text-gray-800 font-bold">Time: {event_details.dates.start.localTime}</h4>
                        <h4 className="text-gray-800 font-bold">Category: {event_details.classifications[0].genre.name}</h4>
                        <h4 className="text-gray-800 font-bold">Sub-Category: {event_details.classifications[0].segment.name}</h4>
                        <h4 className="text-gray-800 font-bold">Location: {venue.address.line1}</h4>
                    </div>
                    <h1 className="text-gray-800  text-2xl font-bold text-center m-4">Attractions</h1>
                    {event_details?._embedded?.attractions?.map((attraction) => (
                        <div key={attraction.id} className="border rounded-lg overflow-hidden bg-blue-300 m-3">
                            <div className="p-4 flex justify-between items-center">
                                <h2 className="text-xl font-bold mb-2">{attraction.name}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
export default EventsDetails;