import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
  CCard,
  CCardBody,
  CCardHeader
} from "@coreui/react";

import ScheduleAddModal from '../components/ScheduleAddModal';

import axios from "axios";
import moment from "moment";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [selectedObject, setSelectedObject] = useState({});

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
    setSelectedObject(arg);
    setDialogVisible(true);
  };

  const handleEventClick = (arg) => {
    setSelectedEvent({
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      color: arg.event.backgroundColor,
      enterNames: arg.event.enterNames,
    });

    setScheduleVisible(!scheduleVisible);
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
        </CCardBody>
      </CCard>
      <ScheduleAddModal show={dialogVisible} showFunc={setDialogVisible}
                        selectObject={selectedObject}
                        events={events} setEvents={setEvents}/>
    </>
  );
};

export default Dashboard;
