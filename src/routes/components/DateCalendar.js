import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
// import { GithubPicker } from "react-color";
import "./css/Calendar.css";

function getRandomColor() {
  const colors = [
    "#b80000",
    "#db3e00",
    "#fccb00",
    "#008b02",
    "#006b76",
    "#1273de",
    "#004dcf",
    "#5300eb",
    "#eb9694",
    "#fad0c3",
    "#fef3bd",
    "#c1e1c5",
    "#bedadc",
    "#c4def6",
    "#bed3f3",
    "#d4c4fb",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function App() {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  const [profilecolor, setProfilecolor] = useState("#fff");

  const handleDateSelect = (arg) => {
    console.log(arg);
    setNewEvent({
      title: "",
      start: arg.startStr,
      end: arg.endStr,
      color: getRandomColor(),
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setNewEvent({});
    setDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleEventRender = (info) => {
    info.el.style.backgroundColor = info.event.extendedProps.color;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    handleDialogClose();
  };

  const handleChangeComplete = (color, event) => {
    setProfilecolor(color.hex);
  };

  return (
    <div className="react-calendar">
      <div>이번달 SELS 일정</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      ></div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDateSelect}
        events={events}
        eventRender={handleEventRender}
      />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>일정 추가</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="일정 제목"
              type="text"
              fullWidth
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="시작 시간"
              type="datetime-local"
              fullWidth
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="종료 시간"
              type="datetime-local"
              fullWidth
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
            />
            {/* <GithubPicker
              triangle="hide"
              onChangeComplete={handleChangeComplete}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>취소</Button>
            <Button type="submit" disabled={!newEvent.title}>
              추가
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default App;
