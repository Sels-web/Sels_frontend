import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import bootstrapPlugin from "@fullcalendar/bootstrap";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { GithubPicker } from "react-color";
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
  console.log(colors[Math.floor(Math.random() * colors.length)]);
  return colors[Math.floor(Math.random() * colors.length)];
}

function App() {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleDialogOpen = (arg) => {
    setNewEvent({
      title: "",
      start: arg.startStr,
      end: arg.endStr,
      // color: selectedColor,
      color: getRandomColor(),
    });
    setDialogOpen(true);
    console.log(newEvent);
  };

  const handleColorChange = (color) => {
    console.log(color);
    setSelectedColor(color.hex);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [color]: color.hex,
    }));
    console.log(newEvent);
  };

  function handleEventRender(info) {
    info.el.style.backgroundColor = selectedColor;
  }

  const handleEventClick = (arg) => {
    alert(`Event ${arg.event.title} was clicked`);
  };

  const handleDialogClose = () => {
    setNewEvent({});
    setDialogOpen(false);
  };

  const handleInputChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
    console.log(newEvent);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    handleDialogClose();
  };

  return (
    <div className="react-calendar">
      <div>이번달 SELS 일정</div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDialogOpen}
        events={events}
        eventClick={handleEventClick}
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
            <GithubPicker
              triangle="hide"
              color={selectedColor}
              onChange={handleColorChange}
            />
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
