import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  // DateTimeField,
  Button,
  Zoom,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { GithubPicker } from "react-color";
import moment from "moment";
import time from "moment-timezone";
import "../css/Calendar.css";
import Attendance from "./Attendance";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom timeout={2000} ref={ref} {...props} />;
});

const today = new Date();

function Calender() {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [attendOpen, setAttendOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/sels/getAllCalendar")
      .then((response) => {
        const eventsData = response.data.orders.map((event) => ({
          id: event.eventId,
          title: event.title,
          start: moment(event.startDate)
            .utcOffset(0 * 60)
            .format("YYYY-MM-DD HH:mm:ss"),
          end: moment(event.endDate)
            .utcOffset(0 * 60)
            .format("YYYY-MM-DD HH:mm:ss"),
          color: event.color,
        }));
        setEvents(eventsData);
        console.log(events);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDialogOpen = (arg) => {
    setNewEvent({
      id: Math.random().toString(36).substring(2, 11),
      title: "",
      start: moment(arg.startStr).format("YYYY-MM-DD 00:00:00"),
      end: moment(arg.endStr).format("YYYY-MM-DD 00:00:00"),
      color: "#fccb00", //default 노란색
    });

    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setNewEvent({});
    setDialogOpen(false);
  };

  const handleColorChange = (color) => {
    console.log(color.hex);
    // setSelectedColor(color.hex);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      color: color.hex,
    }));
  };

  const handleEventClick = (arg) => {
    handleAttendOpen();
    console.log(arg.event);
    setSelectedEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      color: arg.event.backgroundColor,
    });
    console.log(selectedEvent);
  };

  const handleAttendOpen = () => {
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
    const New_event = {
      eventId: newEvent.id,
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      color: newEvent.color,
    };

    axios
      .post("http://localhost:8000/sels/postCalendar", New_event, {
        headers: {
          "Content-Type": `application/json`,
        },
        body: New_event,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log("Error!");
      });
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    console.log(events);
    handleDialogClose();
  };

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
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }}
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
              value={newEvent.title || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="시작 시간"
              type="datetime-local"
              fullWidth
              name="start"
              value={moment(newEvent.start).format("YYYY-MM-DD HH:mm:ss") || ""}
              // value={newEvent.startStr}
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
              value={moment(newEvent.end).format("YYYY-MM-DD HH:mm:ss") || ""}
              // value={newEvent.endStr}
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
        fullScreen={true}
        // maxWidth="lg"
      >
        {selectedEvent && (
          <Attendance
            selectedEvent={selectedEvent}
            events={events}
          ></Attendance>
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
