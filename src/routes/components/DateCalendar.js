import React, { useState } from "react";
import Calendar from "react-calendar";
import "./css/Calendar.css";

function CustomCalendar() {
  const [date, setDate] = useState(new Date());

  const events = [
    {
      date: "2023-03-18",
      title: "Event 1",
      content: "This is event 1",
    },
    {
      date: "2023-03-18",
      title: "Event 2",
      content: "This is event 2",
    },
    {
      date: "2023-03-20",
      title: "Event 3",
      content: "This is event 3",
    },
  ];

  const [showEvent, setShowEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  const onClickDay = (value) => {
    const selectedDate = value.toISOString().slice(0, 10);
    const event = events.find((event) => event.date === selectedDate);
    if (event) {
      setSelectedEvent(event);
      setShowEvent(true);
    }
  };

  const onCloseEvent = () => {
    setShowEvent(false);
  };

  const tileContent = ({ date, view }) => {
    const eventDates = events.map((event) => event.date);
    const eventCount = eventDates.filter(
      (eventDate) => eventDate === date.toISOString().slice(0, 10)
    ).length;
    return eventCount > 0 && view === "month" && <div className="dot"></div>;
  };

  const eventModal = (
    <div className="event-modal">
      <h2>{selectedEvent.title}</h2>
      <p>{selectedEvent.content}</p>
      <button onClick={onCloseEvent}>Close</button>
    </div>
  );

  return (
    <div className="react-calendar">
      이번달 SELS 일정
      <Calendar
        value={date}
        onClickDay={onClickDay}
        tileContent={tileContent}
      />
      {showEvent && eventModal}
    </div>
  );
}

export default CustomCalendar;
