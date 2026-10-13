import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Events() {


    const selector = useSelector((state) => state);
    const isAuth = selector.auth.isAuth;
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const apikey = process.env.REACT_APP_API_KEY;
    const [SearchGenre, setSearchGenre] = useState();

    const gotoEventDetails = (eventId) => {
        navigate(`/events/${eventId}`);
    };


    useEffect(() => {
        if (!isAuth) {
            navigate("/");
            return;
        }

        const fetchEvents = async () => {

            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}`);
                const data = await response.json();
                if (data._embedded && data._embedded.events) {
                    setEvents(data._embedded.events);
                } else {
                    setEvents([]);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        const Search_Rock = () => {
            const fetchEvents = async () => {
                try {
                    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&classificationName=Rock`);
                    const data = await response.json();
                    if (data._embedded && data._embedded.events) {
                        setEvents(data._embedded.events);
                    } else {
                        setEvents([]);
                    }
                } catch (error) {
                    console.error("Error fetching events:", error);
                }
            };

            fetchEvents();
        }

        const Search_Basketball = () => {
            const fetchEvents = async () => {
                try {
                    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&classificationName=Basketball`);
                    const data = await response.json();
                    if (data._embedded && data._embedded.events) {
                        setEvents(data._embedded.events);
                    } else {
                        setEvents([]);
                    }
                } catch (error) {
                    console.error("Error fetching events:", error);
                }
            };
            fetchEvents();
        }

        if (SearchGenre === "Rock") {
            Search_Rock();
        } else if (SearchGenre === "Basketball") {
            Search_Basketball();
        } else {
            fetchEvents();
        }
    }, [isAuth, apikey, SearchGenre]);


    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-emerald-900 mb-6">Events</h1>
            <div>
                <div className="flex flex-row justify-between">
                    <div>
                        <select name="genre" id="" onChange={(e) => setSearchGenre(e.target.value)} className="border rounded-lg border-black p-2 px-4" >
                            <option value="">All Genres</option>
                            <option value="Rock">Rock</option>
                            <option value="Basketball">Basketball</option>
                        </select>
                    </div>
                    <input type="text" placeholder="Search" className="border rounded-lg border-black p-2" />
                </div>
                {events.map((event) => (
                    <div key={event.id} className="border rounded-lg overflow-hidden bg-green-300 m-3" onClick={() => gotoEventDetails(event.id)}>
                        <div className="p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold mb-2">{event.name}</h2>
                            <h4 className="text-gray-800 font-bold">Date: {event.dates.start.localDate}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Events;
