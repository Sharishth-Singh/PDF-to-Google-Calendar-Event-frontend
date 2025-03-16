import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  // Parse event from text file
  const parseEvent = (line, date) => {
    if (!line.includes("=")) return null;

    const [timeRange, title] = line.split("=").map((part) => part.trim());
    if (!timeRange || !title) return null;

    const [startTime, endTime] = timeRange.split("-").map((t) => t.trim());
    if (!startTime || !endTime) return null;

    const startDateTime = new Date(`${date} ${startTime}`);
    const endDateTime = new Date(`${date} ${endTime}`);

    return {
      id: String(Math.random()), // Unique event ID
      title,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
    };
  };

  // Fetch events from text file
  useEffect(() => {
    fetch("/events.txt")
      .then((response) => response.text())
      .then((data) => {
        const today = new Date().toISOString().split("T")[0];
        const eventList = data
          .split("\n")
          .map((line) => parseEvent(line, today))
          .filter(Boolean);

        setEvents(eventList);
      })
      .catch((error) => console.error("Error loading events:", error));
  }, []);

  // ✅ Function to handle event title edit
  const handleEventClick = (info) => {
    const newTitle = prompt("Enter new event title:", info.event.title);
    if (newTitle !== null && newTitle.trim() !== "") {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === info.event.id ? { ...event, title: newTitle } : event
        )
      );
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto" }}>
      <h2 style={{ textAlign: "center" }}>Daily Study Planner</h2>

      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        editable={true}
        selectable={true}
        events={events}
        eventClick={handleEventClick} // ✅ Click to edit event title
        eventDrop={(info) => console.log("Event moved:", info.event)}
        eventResize={(info) => console.log("Event resized:", info.event)}
      />
    </div>
  );
};

export default CalendarComponent;
