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
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { GithubPicker } from "react-color";
import "./css/Calendar.css";

function Calender() {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDialogOpen = (arg) => {
    // console.log(arg);
    setNewEvent({
      title: "",
      start: arg.startStr,
      end: arg.endStr,
      color: "",
    });
    // console.log(newEvent.start);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setNewEvent({});
    setDialogOpen(false);
  };

  const handleColorChange = (color) => {
    // console.log(color);
    // setSelectedColor(color.hex);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      color: color.hex,
    }));
  };

  const handleEventClick = (arg) => {
    // alert(
    //   `${
    //     arg.event.title
    //   } ${arg.event.start.toLocaleString()}~${arg.event.end.toLocaleString()}`
    // );
    setSelectedEvent(arg.event);
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
  };

  const handleInputChange = (event) => {
    // console.log(event.target);
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
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
        // eventRender={handleEventRender}
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
              defaultvalue={newEvent.start}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              label="종료 시간"
              type="datetime-local"
              fullWidth
              name="end"
              defaultvalue={newEvent.end}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <DemoItem label={'"day", "hours"'}>
              <DateTimePicker views={["day", "hours"]} />
            </DemoItem> */}
            <GithubPicker triangle="hide" onChange={handleColorChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>취소</Button>
            <Button type="submit" disabled={!newEvent.title}>
              추가
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {selectedEvent && (
        <div className="event-modal">
          <h2>{selectedEvent.title}</h2>
          <p>{selectedEvent.start.toLocaleString()}</p>
          <p>{selectedEvent.end.toLocaleString()}</p>
          <button onClick={handleCloseEvent}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Calender;
