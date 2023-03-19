import React, { useState } from "react";
import Calendar from "react-calendar";
import "./css/Calendar.css";
import AddScheduleModal from "./elements/ScheduleModal";
import Modal from "react-modal";

import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom timeout={1000} ref={ref} {...props} />;
});

function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  //이미 있는 스케줄을 보여주는 모달
  const [showEvent, setShowEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});

  //스케줄 추가 기능 구현을 위한 모달
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [schedule, setSchedule] = useState({ title: "", description: "" });

  const [events, setEvents] = useState([]);

  const onClickDay = (value) => {
    const selectedDate = value.toISOString().slice(0, 10);
    const event = events.find((event) => event.date === selectedDate);
    console.log(event);
    if (event) {
      setSelectedEvent(event);
      setShowEvent(true);
    } else {
      setShowEvent(false);
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

  const handleTitleChange = (e) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      title: e.target.value,
    }));
    console.log(schedule);
  };

  const handleDescriptionChange = (e) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      description: e.target.value,
    }));
    console.log(schedule);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setEvents((prevEvent) => [
      ...prevEvent,
      {
        date: selectedDate.toISOString().slice(0, 10),
        title: schedule.title,
        content: schedule.description,
      },
    ]);

    setModalIsOpen(false);
  };

  return (
    <div className="react-calendar">
      <div>이번달 SELS 일정</div>
      <div
        style={{
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
        <div>
          {" "}
          <button onClick={openModal}>스케줄 추가</button>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <h2>스케줄 추가</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">제목</label>
                <input
                  type="text"
                  id="title"
                  value={schedule.title}
                  onChange={handleTitleChange}
                />
              </div>
              <div>
                <label htmlFor="description">내용</label>
                <textarea
                  id="description"
                  value={schedule.description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <button type="submit">추가</button>
              <button onClick={closeModal}>닫기</button>
            </form>
          </Modal>
        </div>
      </div>
      {showEvent && eventModal}
    </div>
  );
}

export default CustomCalendar;
