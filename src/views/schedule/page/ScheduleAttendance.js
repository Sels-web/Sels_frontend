import {CCard, CCardBody, CCardHeader} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {getSchedules} from "../../../api/schedule";
import {useParams} from "react-router-dom";

const ScheduleAttendance = () => {
  const {id} = useParams()
  const [schedule, setSchedule] = useState({
    title: '',
    color: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    console.log(id)
    let params = {
      range: 'one',
      event_id: id,
      month: '',
    }
    getSchedules(params).then(r => {
      setSchedule(r.data[0])
    }).catch(r => {
      console.log(r);
      alert('오류가 발생하였습니다.');
    })
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader>
          <h3>{schedule.title} 참석자 명단</h3>
        </CCardHeader>
        <CCardBody>
        </CCardBody>
      </CCard>
    </>
  )
}

export default ScheduleAttendance