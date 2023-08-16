import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { GithubPicker } from "react-color";

import moment from "moment";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";

import axios from "axios";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scheduleVisible, setSchedulelVisible] = useState(false);

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

    setDialogVisible(true);
  };

  const handleDialogClose = () => {
    setNewEvent({});
    setDialogVisible(false);
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
    // handleAttendanceModalOpen();
    setSelectedEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      color: arg.event.backgroundColor,
      enterNames: arg.event.enterNames,
    });

    console.log(selectedEvent);

    setSchedulelVisible(!scheduleVisible);
  };

  const handleInputChange = (event) => {
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
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h3>셀스 일정</h3>
        </CCardHeader>
        <CCardBody>
          <FullCalendar
            className="react-calendar"
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
          <CModal
            alignment="center"
            visible={dialogVisible}
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
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
