import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Events() {


    const selector = useSelector((state) => state);
    const isAuth = selector.auth.isAuth;
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const apikey = process.env.REACT_APP_API_KEY;
    const [FilterGenre, setFilterGenre] = useState();
    const [SearchKeyword, setSearchKeyword] = useState();

    const gotoEventDetails = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    const SearchEvents = (keyword) => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&keyword=${keyword}`);
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

    const Filter_Genre = (genre) => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&classificationName=${genre}`);
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

    useEffect(() => {
        if (!isAuth) {
            navigate("/");
            return;
        }



        fetchEvents();
    }, [isAuth, apikey]);


    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-emerald-900 mb-6">Events</h1>
            <div>
                <div className="flex flex-row justify-between m-3">
                    <div>
                        <select name="genre" id="genre" className="border rounded-lg border-black p-2 px-4"
                            onChange={(e) => {
                                const selected = e.target.value;
                                if (selected === "Rock") {
                                    Filter_Genre("Rock");
                                    console.log("Rock");
                                }
                                else if (selected === "Basketball") {
                                    Filter_Genre("Basketball");
                                    console.log("Basketball");
                                }
                                else {
                                    fetchEvents();
                                }
                            }}>
                            <option value="genre">All Genres</option>
                            <option value="Rock">Rock</option>
                            <option value="Basketball">Basketball</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input type="text" placeholder="Search" className="border rounded-lg border-black p-2" onChange={(e) => setSearchKeyword(e.target.value)} />
                        <button onClick={() => SearchEvents(SearchKeyword)} className="border rounded-lg border-black p-2">Search</button>
                    </div>
                </div>



                {events.map((event) => (
                    <div key={event.id} className="border border-emerald-950 border-2 rounded-lg overflow-hidden bg-green-300 m-3" onClick={() => gotoEventDetails(event.id)}>
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
