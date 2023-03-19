import React, { useState } from "react";
import Calendar from "react-calendar";
import "./css/Calendar.css";
import AddScheduleModal from "./elements/ScheduleModal";
import Modal from "react-modal";

function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  //이미 있는 스케줄을 보여주는 모달
  const [showEvent, setShowEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  //스케줄 추가 기능 구현을 위한 모달
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div style={{ border: "2px solid red" }} className="react-calendar">
      <div style={{ border: "1px solid red" }}>이번달 SELS 일정</div>
      <div
        style={{
          border: "2px solid red",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Calendar
          value={selectedDate}
          onClickDay={onClickDay}
          tileContent={tileContent}
          onChange={setSelectedDate}
          next2Label={null}
          prev2Label={null}
        />
        <div style={{ border: "2px solid red" }}>
          {" "}
          <button onClick={openModal}>스케줄 추가</button>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <h2>스케줄 추가</h2>
            {/* 스케줄 추가 폼 */}
            <button onClick={closeModal}>닫기</button>
          </Modal>
        </div>
      </div>
      {showEvent && eventModal}
    </div>
  );
}

export default CustomCalendar;
