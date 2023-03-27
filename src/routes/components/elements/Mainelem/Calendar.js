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
  Button,
  Zoom,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { GithubPicker } from "react-color";
import "../css/Calendar.css";
import Attendance from "./Attendance";
import { v4 as uuidv4 } from "uuid";

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

  //   useEffect(() => {
  //     fetch("/이벤트에 대한 정보 load")
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         throw new Error("Network response was not ok.");
  //       })
  //       .then((data) => {
  //         console.log(JSON.stringify(data));

  //         const getEvents = {
  //           color: data.color, //string
  //           end: data.end, //string
  //           id: data.eventId, //string  이벤트의 아이디
  //           start: data.start, //string
  //           title: data.title, //string
  //         };

  //         setEvents(getEvents);
  //       })
  //       .catch((error) => {
  //         console.log(`error: ${error}`);
  //       });
  //   }, []);

  const handleDialogOpen = (arg) => {
    // console.log(arg);
    setNewEvent({
      id: uuidv4(),
      title: "",
      start: arg.startStr,
      end: arg.endStr,
      color: "#fccb00", //default 노란색
    });

    // console.log(newEvent);

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
    // scrollToDown();
    handleAttendOpen();
    console.log(arg.event);
    setSelectedEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.startStr,
      end: arg.event.startStr,
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
    // const New_event = {
    //     color : newEvent.color,
    //     end : newEvent.end,
    //     eventId : newEvent.id,
    //     start : newEvent.start,
    //     title : newEvent.title
    //   };
    //   console.log(New_event);

    //   fetch("새로운 이벤트 Post", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(New_event),
    //   })
    //     .then((response) => {
    //       if (response.ok === true) {
    //         return response.json();
    //       }
    //       throw new Error("에러 발생!");
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     })
    //     .then((data) => {
    //       console.log(data);
    //     });
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    console.log(newEvent);
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
