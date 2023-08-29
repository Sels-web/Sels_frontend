import {
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText, CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from "@coreui/react";
import React, {useEffect, useState} from "react";
import {GithubPicker} from "react-color";
import moment from "moment";
import {addSchedule} from "../../../api/schedule";

const ScheduleAddModal = (props) => {
  const [newEvent, setNewEvent] = useState({});

  useEffect( ()=> {
    const startDate = `${props.selectObject.startStr}T${new Date().getHours()}:00:00`
    const endDate = `${props.selectObject.startStr}T${(new Date().getHours() + 1)}:00:00`
    setNewEvent({
      id: Math.random().toString(36).substring(2, 11),
      title: "",
      start: moment(startDate).format("YYYY-MM-DDTHH:00:00"),
      end: moment(endDate).format("YYYY-MM-DDTHH:00:00"),
      color: "#fccb00", //default 노란색
    })

  },[props.selectObject])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleDialogClose = () => {
    setNewEvent({});
    props.showFunc(false);
  };

  const handleColorChange = (color) => {
    // setSelectedColor(color.hex);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      color: color.hex,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const New_event = {
      eventId: newEvent.id,
      title: newEvent.title,
      startDate: newEvent.start,
      endDate: newEvent.end,
      color: newEvent.color,
    };

    addSchedule(New_event).then(r => {
      alert('일정이 추가되었습니다.')
      props.initSchedule()
      handleDialogClose();
    }).catch((response) => {
      console.log("Error!");
    });
  };

  return (
    <>
      <CModal
          alignment="center"
          visible={props.show}
          onClose={handleDialogClose}
      >
        <CModalHeader>
          <CModalTitle>일정 추가</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleFormSubmit}>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>일정 제목</CInputGroupText>
              <CFormInput type="text" placeholder="일정 제목" name="title" onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>시작 시간</CInputGroupText>
              <CFormInput type="datetime-local" name="start" onChange={handleInputChange} defaultValue={newEvent.start} />
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>종료 시간</CInputGroupText>
              <CFormInput type="datetime-local" name="end" onChange={handleInputChange} defaultValue={newEvent.end}/>
            </CInputGroup>
            <GithubPicker className={'mt-3'} triangle="hide" onChange={handleColorChange} />
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
    </>
  )
}

export default ScheduleAddModal