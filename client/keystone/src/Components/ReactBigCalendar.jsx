import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const myEventsList = [
  {
    start: moment().toDate(),
    end: moment().add(1, "days").toDate(),
    title: "Some Event",
  },
  {
    start: moment().add(3, "days").toDate(),
    end: moment().add(5, "days").toDate(),
    title: "Another Event",
  },
];
const localizer = momentLocalizer(moment);
function ReactBigCalendar() {
  return (
    <div style={{ height: "500px" }}>
      test
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
