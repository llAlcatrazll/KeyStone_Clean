import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

// Define myEventsList as an array of event objects
const myEventsList = [
  {
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
    title: "Some Event",
    category: "category1", // Assign a category to each event
  },
  {
    start: moment().add(3, "days").toDate(),
    end: moment().add(5, "days").toDate(),
    title: "Another Event",
    category: "category2", // Assign a different category to another event
  },
];

// Mapping between categories and colors

function ReactBigCalendar() {
  // Function to get the style for each event based on its category

  return (
    <div style={{ height: "75vh" }}>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
      />
    </div>
  );
}

export default ReactBigCalendar;
