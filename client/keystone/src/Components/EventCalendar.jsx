import { useRef } from "react";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

function EventCalendar() {
  const calendarRef = useRef(null);
  function formatTime(time) {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // Example events
  const events = [
    {
      id: "1",
      title: "Event 1",
      category: "time",
      dueDateClass: "",
      start: "2024-05-12T12:30:00+09:00",
      end: "2024-05-12T14:30:00+09:00",
    },
    {
      id: "2",
      title: "Event 2",
      category: "allday",
      dueDateClass: "",
      start: "2024-05-14",
      end: "2024-05-15",
    },
  ];

  return (
    <Calendar
      ref={calendarRef}
      defaultView="month"
      calendars={[
        {
          id: "cal1",
          name: "Personal",
          backgroundColor: "#03bd9e",
        },
        {
          id: "cal2",
          name: "Work",
          backgroundColor: "#00a9ff",
        },
      ]}
      schedules={events.map((event) => ({
        id: event.id,
        calendarId: event.calendarId || event.id, // Assuming calendarId is optional
        title: event.title,
        category: event.category,
        dueDateClass: event.dueDateClass,
        start: event.start,
        end: event.end,
      }))}
      template={{
        time(event) {
          const { start, end, title } = event;
          return `<span style="color: white;">${formatTime(start)}~${formatTime(
            end
          )} ${title}</span>`;
        },
        allday(event) {
          return `<span style="color: gray;">${event.title}</span>`;
        },
      }}
      style={{ height: "800px" }}
    />
  );
}

export default EventCalendar;
