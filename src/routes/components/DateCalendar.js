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
} from "@mui/material";

import { GithubPicker } from "react-color";
import "./css/Calendar.css";
import Attendence from "./Attendence";
import { v4 as uuidv4 } from "uuid";

function Calender() {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
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
    scrollToDown();
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
    console.log(events);
    handleDialogClose();
  };

  const scrollToDown = () => {
    window.scroll({
      top: 900,
      behavior: "smooth",
    });
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
        <div
          style={{
            width: "100%",
            border: "1px solid red",
          }}
        >
          <div
            className="MainHeader"
            style={{ border: "1px solid red", height: "150px" }}
          >
            <div style={{ width: "40%" }}>
              <font color={selectedEvent.backgroundColor}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                  }}
                >
                  {selectedEvent.title}
                </h3>
              </font>
            </div>
            <h2 style={{ width: "20%" }}>출석 리스트</h2>
            <span
              style={{
                margin: 0,
                fontSize: "15px",
                width: "40%",
              }}
            >
              {selectedEvent.start.toLocaleString()}
            </span>
          </div>
          <Attendence eventId={selectedEvent.id}></Attendence>
        </div>
      )}
    </div>
  );
}

export default Calender;
