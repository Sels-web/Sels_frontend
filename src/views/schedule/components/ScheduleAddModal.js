import React, { useState, useEffect } from "react";

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

import { GithubPicker } from "react-color";
import axios from "axios";

const ScheduleAddModal = (props) => {
  const [newEvent, setNewEvent] = useState({});

  const handleColorChange = (color) => {
    console.log(color.hex);
    // setSelectedColor(color.hex);
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      color: color.hex,
    }));
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
    props.eventsFunc((prevEvents) => [...prevEvents, newEvent]);
    console.log(props.events);

    props.showFunc(false);
  };

  return (
    <>
      <CModal
        alignment="center"
        visible={props.show}
        onClose={() => props.showFunc(false)}
      >
        <CModalHeader onClose={() => props.showFunc(false)}>
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
          <CButton color="secondary" onClick={() => props.showFunc(false)}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ScheduleAddModal;
