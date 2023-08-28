import {
  CButton, CForm, CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {modifySelectedAttendanceAction} from "../../../store/selectedAttendanceStore";
import {modifyAttendance} from "../../../api/attendance";
import {useParams} from "react-router-dom";

const ScheduleModifyMemberModal = (props) => {
  const selectedAttendance = useSelector(state => state.selectedAttendanceStore)
  const dispatch = useDispatch()
  const {id} = useParams()
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(modifySelectedAttendanceAction({name, value}))
  };

  const modifyAttendanceFunc = () => {
    let data = {
      eventId: id,
      name: selectedAttendance.name,
      school_id: selectedAttendance.school_id,
      attendanceTime: selectedAttendance.attendanceTime
    }
    modifyAttendance(data).then(r =>{
      alert('수정되었습니다.')
      props.initSchedule()
      props.showFunc(false)
    }).catch(r=> {
      alert('오류가 발생하였습니다.')
      console.log(r)
    })
  }

  return (
    <>
      <CModal alignment="center" visible={props.show} onClose={() => props.showFunc(false)}>
        <CModalHeader>
          <CModalTitle>참석자 수정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup>
              <CInputGroupText>이름</CInputGroupText>
              <CFormInput type="text" placeholder="이름" name="name" defaultValue={selectedAttendance.name} readOnly/>
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>학번</CInputGroupText>
              <CFormInput type="text" placeholder="학번" name="school_id" defaultValue={selectedAttendance.school_id} readOnly/>
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>출석 시간</CInputGroupText>
              <CFormInput type="datetime-local" name="attendanceTime" defaultValue={selectedAttendance.attendanceTime} onChange={handleInputChange}/>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={modifyAttendanceFunc}>예</CButton>
          <CButton color="secondary" onClick={() => props.showFunc(false)}>
            아니요
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ScheduleModifyMemberModal