import {
  CButton,
  CCard,
  CCardBody, CCardFooter,
  CCardHeader, CTable,
  CTableBody, CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {getSchedules} from "../../../api/schedule";
import {useParams} from "react-router-dom";
import ScheduleAddMemberModal from '../components/ScheduleAddMemberModal';
import {attend, getAttendance} from "../../../api/attendance";
import {useDispatch, useSelector} from "react-redux";
import {getAttendanceAction} from "../../../store/attendanceStore";
import ScheduleDeleteModal from "../components/ScheduleDeleteModal";
import ScheduleModifyModal from "../components/ScheduleModifyModal";
import {getSelectedScheduleAction, modifySelectedScheduleAction} from "../../../store/selectedScheduleStore";
import ScheduleDeleteMemberModal from "../components/ScheduleDeleteMemberModal";
import {getSelectedAttendanceAction} from "../../../store/selectedAttendanceStore";
import ScheduleModifyMemberModal from "../components/ScheduleModifyMemberModal";
import '../../../scss/_pagination.scss'
import Pagination from "react-js-pagination";

const ScheduleAttendance = () => {
  const {id} = useParams()
  const dispatch = useDispatch();

  const attendances = useSelector(state => state.attendanceStore)
  const [schedule, setSchedule] = useState({
    title: '',
    startDate: '',
    endDate: '',
  })
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteMemberModal, setShowDeleteMemberModal] = useState(false)
  const [showModifyMemberModal, setShowModifyMemberModal] = useState(false)
  const [showModifyModal, setShowModifyModal] = useState(false)

  const initSchedule = (eventPage) => {
    let name ='eventId';
    let value = id;
    let params = {
      range: 'one',
      event_id: id,
      month: '',
    }
    getSchedules(params).then(r => {
      dispatch(getSelectedScheduleAction(r.data[0]))
      dispatch(modifySelectedScheduleAction({name, value}))
      setSchedule(r.data[0])

      let startDate = new Date(r.data[0].startDate)
      const startMonth = String(startDate.getMonth() + 1).padStart(2, "0");
      const startDay = String(startDate.getDate()).padStart(2, "0");
      const startHours = String(startDate.getHours()).padStart(2, "0");
      const startMin = String(startDate.getMinutes()).padStart(2, "0");

      let endDate = new Date(r.data[0].endDate)
      const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
      const endDay = String(endDate.getDate()).padStart(2, "0");
      const endHours = String(endDate.getHours()).padStart(2, "0");
      const endMin = String(endDate.getMinutes()).padStart(2, "0");

      let formattedStart = startMonth + '.' + startDay + ' ' + startHours + ':' + startMin
      let formattedEnd = endMonth + '.' + endDay + ' ' + endHours + ':' + endMin

      setSchedule((prevEvent) => ({
        ...prevEvent,
        startDate: formattedStart,
        endDate: formattedEnd
      }))
    }).catch(r => {
      alert('오류가 발생하였습니다.');
    })
    let attendanceParams = {
      eventId: id,
      page: eventPage
    }
    getAttendance(attendanceParams, id, eventPage).then(r => {
      dispatch(getAttendanceAction(r.data.list))
      setTotalPage(r.data.page_count)
      setActivePage(r.data.page)
    })
  }

  useEffect(() => {
    initSchedule(1)
  }, [showModifyModal]);

  const checkAttend = (e) => {
    const TIME_ZONE = 9 * 60 * 60 * 1000; // 9시간
    const d = new Date();

    const date = new Date(d.getTime() + TIME_ZONE).toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    const today = date + 'T' + time

    let attendData = {
      event_id: id,
      current_time: today,
      school_id: e
    }
    attend(attendData).then(r => {
      alert('출석 처리 되었습니다.');
      initSchedule(activePage);
    }).catch(r => {
      alert('오류가 발생하였습니다.');
    })
  }

  return (
    <>
      <CCard>
        <CCardHeader className={'d-flex justify-content-between'}>
          <div className={'d-flex align-items-end'}>
            <h3 className={'p-0 m-0'}>{schedule.title} 참석자 명단</h3>
            <p className={'p-0 mb-0 ms-2'}>{schedule.startDate} ~ {schedule.endDate}</p>
          </div>
          <CButton color="warning" onClick={() => setShowAddModal(true)}>참석자 추가</CButton>
        </CCardHeader>
        <CCardBody>
          <CTable hover bordered>
            <CTableHead align={'center'}>
              <CTableRow>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col">이름</CTableHeaderCell>
                <CTableHeaderCell scope="col">학번</CTableHeaderCell>
                <CTableHeaderCell scope="col">참석</CTableHeaderCell>
                <CTableHeaderCell scope="col">참석 시간</CTableHeaderCell>
                <CTableHeaderCell scope="col">기능</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {attendances.length !== 0 && attendances.map((attendance, idx) => {
                return (
                  <CTableRow align={'middle'} key={idx}>
                    <CTableHeaderCell className={'text-center'}>{idx + 1}</CTableHeaderCell>
                    <CTableDataCell className={'text-center'}>{attendance.name}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{attendance.school_id}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{
                      attendance.state === 0 ? '' :
                      attendance.state === 1 ? <p className={'text-success m-0 p-0'}>출석</p> :
                      attendance.state === 2 ? <p className={'text-warning m-0 p-0'}>10분 이내 지각</p> :
                      attendance.state === 3 ? <p className={'text-warning m-0 p-0'}>10분 초과 지각</p> :
                      attendance.state === 4 ? <p className={'text-danger m-0 p-0'}>결석</p> : ''
                    }</CTableDataCell>
                    <CTableDataCell className={'text-center'}>{attendance.state === 0 ? '' : attendance.time}</CTableDataCell>
                    <CTableDataCell className={'text-center'}>
                      <CButton color={'success'} className={'me-2'} onClick={() => checkAttend(attendance.school_id)}>출석</CButton>
                      <CButton color={'danger'} className={'me-2'} onClick={() => {
                        setShowDeleteMemberModal(true)
                        dispatch(getSelectedAttendanceAction(attendance))
                      }}>삭제</CButton>
                      <CButton color={'warning'} onClick={() => {
                        setShowModifyMemberModal(true)
                        dispatch(getSelectedAttendanceAction(attendance))
                      }}>수정</CButton>
                    </CTableDataCell>
                  </CTableRow>
                )})
              }
              {attendances.length === 0 &&
                <CTableRow align={'middle'}>
                  <CTableDataCell className={'text-center'} colSpan={6}>참석자가 없습니다.</CTableDataCell>
                </CTableRow>
              }
            </CTableBody>
          </CTable>
          {attendances.length !== 0 && totalPage >= 2 &&
            <Pagination
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={10*totalPage}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              itemClassPrev={'page-prev'}
              itemClassNext={'page-next'}
              itemClassFirst={'page-first'}
              itemClassLast={'page-last'}
              onChange={initSchedule}
            />
          }
        </CCardBody>
        <CCardFooter className={'d-flex justify-content-end'}>
          <CButton color="secondary" className={'me-2'} onClick={() => setShowModifyModal(true)}>수정</CButton>
          <CButton color="danger" onClick={() => setShowDeleteModal(true)}>삭제</CButton>
        </CCardFooter>
      </CCard>
      <ScheduleAddMemberModal show={showAddModal} showFunc={setShowAddModal} initSchedule={() =>initSchedule(1)}/>
      <ScheduleDeleteMemberModal show={showDeleteMemberModal} showFunc={setShowDeleteMemberModal} initSchedule={() =>initSchedule(activePage)}/>
      <ScheduleModifyMemberModal show={showModifyMemberModal} showFunc={setShowModifyMemberModal} initSchedule={() =>initSchedule(activePage)}/>
      <ScheduleDeleteModal show={showDeleteModal} showFunc={setShowDeleteModal}/>
      <ScheduleModifyModal show={showModifyModal} showFunc={setShowModifyModal}/>
    </>
  )
}

export default ScheduleAttendance