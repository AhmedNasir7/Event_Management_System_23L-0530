import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Events() {


    const selector = useSelector((state) => state);
    const isAuth = selector.auth.isAuth;
    const navigate = useNavigate();
    const [Events, setEvents] = useState([]);
    const apikey = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        if (!isAuth) {

            navigate("/");
        }
        fetch("https://app.ticketmaster.com/discovery/v2/events.json?&apikey=" + apikey)
            .then((response) => response.json())
            .then((data) => {
                setEvents(data._embedded.events);
            });
    }, [isAuth]);
    return (
        <div>
            <h1>Events</h1>
            {Events.map((event) => (
                <div key={event.id}>
                    <h1>{event.name}</h1>
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
    )
}
export default Events;
