import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Zoom,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { GithubPicker } from "react-color";
import "../css/Calendar.css";
import Attendence from "./Attendence";
import { v4 as uuidv4 } from "uuid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom timeout={2000} ref={ref} {...props} />;
});

function Calender() {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [attendOpen, setAttendOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDialogOpen = (arg) => {
    console.log(arg);
    setNewEvent({
      id: uuidv4(),
      title: "",
      start: arg.startStr,
      end: arg.endStr,
      color: "",
    });

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
    // scrollToDown();
    handleAttendOpen();
    setSelectedEvent(arg.event);
  };

  const handleAttendOpen = () => {
    console.log(events);
    setAttendOpen(true);
  };

  const handleAttendClose = () => {
    setAttendOpen(false);
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
    console.log(events);
    handleDialogClose();
  };

  //   const scrollToDown = () => {
  //     window.scroll({
  //       top: 900,
  //       behavior: "smooth",
  //     });
  //   };

  return (
    <div className="react-calendar">
      <h2>이번 달 SELS 일정</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={handleDialogOpen}
        events={events}
        eventClick={handleEventClick}
      />
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
      >
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
      <Dialog
        open={attendOpen}
        onClose={handleAttendClose}
        TransitionComponent={Transition}
        fullScreen="true"
      >
        {selectedEvent && (
          <Attendence
            selectedEvent={selectedEvent}
            events={events}
          ></Attendence>
        )}
        <DialogActions>
          <IconButton
            style={{ position: "absolute", top: "0" }}
            size="large"
            aria-label="clear"
            onClick={handleAttendClose}
            sx={{ color: "black" }}
          >
            <ClearIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Calender;
