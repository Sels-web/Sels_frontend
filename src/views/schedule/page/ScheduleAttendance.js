import {CButton, CCard, CCardBody, CCardHeader} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {getSchedules} from "../../../api/schedule";
import {useParams} from "react-router-dom";
import ScheduleAddMemberModal from '../components/ScheduleAddMemberModal';

const ScheduleAttendance = () => {
  const {id} = useParams()
  const [dialogVisible, setDialogVisible] = useState(false);

  const [schedule, setSchedule] = useState({
    title: '',
    color: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    let params = {
      range: 'one',
      event_id: id,
      month: '',
    }
    getSchedules(params).then(r => {
      setSchedule(r.data[0])
      console.log(r);
    }).catch(r => {
      console.log(r);
      alert('오류가 발생하였습니다.');
    })
  }, []);

  return (
    <>
      <CCard>
        <CCardHeader className={'d-flex justify-content-between'}>
          <h3>{schedule.title} 참석자 명단</h3>
          <CButton color="warning" onClick={() => setDialogVisible(true)}>참석자 추가</CButton>
        </CCardHeader>
        <CCardBody>
        </CCardBody>
      </CCard>
      <ScheduleAddMemberModal show={dialogVisible} showFunc={setDialogVisible}/>
    </>
  )
}

export default ScheduleAttendance