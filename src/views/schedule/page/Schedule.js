import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import '../styles/Calendar.css'
import moment from "moment";

import {
  CCard,
  CCardBody,
  CCardHeader
} from "@coreui/react";

import {getSchedules} from "../../../api/schedule";
import {getScheduleAction} from "../../../store/scheduleStore";
import ScheduleAddModal from '../components/ScheduleAddModal';

const Schedule = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedObject, setSelectedObject] = useState({});
  const dispatch = useDispatch();
  const events = useSelector(state => state.scheduleStore)
  const navigate = useNavigate();

  const initSchedule = () => {
    let params = {
      range: 'all',
      event_id: '',
      month: '',
    }
    getSchedules(params).then(r => {
      const eventsData = r.data.map((event) => ({
        id: event.eventId,
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        color: event.color,
      }));
      dispatch(getScheduleAction(eventsData))
    }).catch(r => {
      console.log(r);
      alert('오류가 발생하였습니다.');
    })
  }

  useEffect(() => {
    initSchedule()
  }, []);

  const handleDialogOpen = (arg) => {
    setSelectedObject(arg);
    setDialogVisible(true);
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <h3>셀스 일정</h3>
        </CCardHeader>
        <CCardBody>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            select={handleDialogOpen}
            events={events}
            eventClick={(arg) => navigate(`/schedule/attendance/${arg.event._def.publicId}`)}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              hour12: false,
            }}
          />
        </CCardBody>
      </CCard>
      <ScheduleAddModal show={dialogVisible} showFunc={setDialogVisible}
                        selectObject={selectedObject} initSchedule={initSchedule}/>
    </>
  );
};

export default Schedule;
