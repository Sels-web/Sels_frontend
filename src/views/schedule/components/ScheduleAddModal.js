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
import {addSchedule} from "../../../api/schedule";

const ScheduleAddModal = (props) => {
  const [validated, setValidated] = useState(false)
  const [newEvent, setNewEvent] = useState({});

  useEffect( ()=> {
    const startDate = `${props.selectObject.startStr}T${new Date().getHours()}:00`
    const endDate = `${props.selectObject.startStr}T${(new Date().getHours() + 1)}:00`
    setNewEvent({
      id: Math.random().toString(36).substring(2, 11),
      title: "",
      start: startDate,
      end: endDate,
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
    setValidated(false)
  };

  const handleColorChange = (color) => {
    // setSelectedColor(color.hex);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      color: color.hex,
    }));
  };

  const handleFormSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      setValidated(true)
    } else {
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
      }).catch((r) => {
        console.log("Error!");
      });
    }
  };

  return (
    <>
      <CModal
          alignment="center"
          visible={props.show}
          onClose={handleDialogClose}
      >
        <CForm validated={validated} noValidate onSubmit={handleFormSubmit}>
          <CModalHeader>
            <CModalTitle>일정 추가</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>일정 제목</CInputGroupText>
              <CFormInput type="text"
                          placeholder="일정 제목"
                          name="title"
                          required
                          feedbackInvalid="일정 제목을 적어주세요."
                          tooltipFeedback
                          onChange={handleInputChange}/>
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>시작 시간</CInputGroupText>
              <CFormInput
                  type="datetime-local"
                  name="start"
                  required
                  feedbackInvalid="시작 시간을 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}
                  defaultValue={newEvent.start} />
            </CInputGroup>
            <CInputGroup className={'mt-3'}>
              <CInputGroupText>종료 시간</CInputGroupText>
              <CFormInput
                  type="datetime-local"
                  name="end"
                  required
                  feedbackInvalid="종료 시간을 적어주세요."
                  tooltipFeedback
                  onChange={handleInputChange}
                  defaultValue={newEvent.end}/>
            </CInputGroup>
            <GithubPicker className={'mt-3'} triangle="hide" onChange={handleColorChange} />
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" color="primary">
              추가
            </CButton>
            <CButton color="secondary" onClick={handleDialogClose}>
              취소
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default ScheduleAddModal