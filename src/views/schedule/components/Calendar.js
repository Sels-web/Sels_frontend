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
import moment from "moment";
import "../styles/Calendar.css";
import Attendance from "./Attendance";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
} from "@coreui/react";

import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom timeout={2000} ref={ref} {...props} />;
});

const today = new Date();

function Calender() {
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/sels/getAllCalendar")
      .then((response) => {
        console.log(response.data.orders);
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
          enterNames: event.enterNames,
        }));
        setEvents(eventsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDialogOpen = (arg) => {
    setNewEvent({
      id: Math.random().toString(36).substring(2, 11),
      title: "",
      start: moment(arg.startStr).format("YYYY-MM-DD 12:00:00"),
      end: moment(arg.startStr).format("YYYY-MM-DD 13:00:00"),
      color: "#fccb00", //default 노란색
      enterNames: {},
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
    handleAttendanceModalOpen();
    setSelectedEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      color: arg.event.backgroundColor,
      enterNames: arg.event.enterNames,
    });
  };

  const handleAttendanceModalOpen = () => {
    setAttendanceModalOpen(true);
  };

  const handleAttendanceModalClose = () => {
    setAttendanceModalOpen(false);
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
      enterNames: newEvent.enterNames,
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
    //이벤트 정렬해야함
    // const eventsCopy = [...events];
    // eventsCopy.sort((a, b) => {
    //   console.log(a);
    //   console.log();
    //   return new Date(a.start) - new Date(b.start);
    // });
    // setEvents(eventsCopy);

    handleDialogClose();
  };

  return (
    <div className="react-calendar">
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
      {/* <Dialog
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
      </Dialog> */}
      <CModal
        alignment="center"
        visible={dialogOpen}
        onClose={handleDialogClose}
      >
        <CModalHeader onClose={handleDialogClose}>
          <CModalTitle>일정 추가</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleFormSubmit}>
            <CFormInput
              type="text"
              // id="exampleFormControlInput1"
              label="일정 제목"
              placeholder="일정 제목"
              name="title"
              onChange={handleInputChange}
              // text="Must be 8-20 characters long."
              // aria-describedby="exampleFormControlInputHelpInline"
            />
            <p>시작 시간</p>
            <p>종료 시간</p>
            {/* <TextField
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
            /> */}
            <GithubPicker triangle="hide" onChange={handleColorChange} />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" color="primary" onClick={handleFormSubmit}>
            추가
          </CButton>
          <CButton color="secondary" onClick={handleDialogClose}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal
        alignment="center"
        visible={attendanceModalOpen}
        onClose={handleAttendanceModalClose}
        fullscreen={true}
      >
        <CModalHeader onClose={handleAttendanceModalClose}></CModalHeader>
        <CModalBody>
          {selectedEvent && (
            <Attendance
              selectedEvent={selectedEvent}
              events={events}
            ></Attendance>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" color="primary">
            추가
          </CButton>
          <CButton color="secondary" onClick={handleAttendanceModalClose}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default Calender;
