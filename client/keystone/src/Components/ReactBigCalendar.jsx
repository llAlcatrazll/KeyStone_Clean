import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";

function ReactBigCalendar() {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [venue, setVenue] = useState({
    event_facility: "",
  });
  const venutoFind = venue.event_facility;

  const minTime = new Date();
  minTime.setHours(6, 0, 0); // 6 AM

  const maxTime = new Date();
  maxTime.setHours(21, 0, 0); // 9 PM

  useEffect(() => {
    // Fetch venues for the dropdown
    axios
      .get("http://localhost:5000/venues")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setVenueData(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/venue_bookings_calendar?event_facility=${venutoFind}`
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          const mappedEvents = res.data.map((venue) => ({
            start: new Date(venue.event_date + "T" + venue.starting_time),
            end: new Date(venue.event_date + "T" + venue.ending_time),
            title: venue.eventname,
            category: venue.event_facility,
            bookingId: venue.booking_id,
            bookerId: venue.booker_id,
            username: venue.username,
            eventPurpose: venue.event_purpose,
            designation: venue.designation,
            collegeAffiliation: venue.college_afiliation,
          }));
          setEvents(mappedEvents);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [venutoFind]);

  const handleVenueChange = (e) => {
    setVenue({ event_facility: e.target.value });
  };

  return (
    <div style={{ height: "75vh" }}>
      <div className="d-flex justify-content-around bg-secondary-subtle">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Event Facility</span>
          </div>
          <select
            className="form-select"
            aria-label="Default select example"
            name="event_facility"
            onChange={handleVenueChange}
          >
            <option value="">Select a venue</option>
            {venueData.map((venue) => (
              <option key={venue.venue_id} value={venue.venue_name}>
                {venue.venue_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>{venue.event_facility}</div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        min={minTime}
        max={maxTime}
      />
    </div>
  );
}

export default ReactBigCalendar;
