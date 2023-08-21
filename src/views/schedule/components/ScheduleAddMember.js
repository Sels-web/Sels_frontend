import React, { useState } from "react";

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

import axios from "axios";

const ScheduleAddMemberModal = (props) => {
  const [Users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  const handleFormSubmit = (user) => {
    user.preventDefault();
    console.log(newUser);
    const New_user = {
      eventId: newUser.eventKey,
      Username: newUser.Username,
      key: newUser.key,
    };

    console.log(New_user);

    axios
      .post(`http://localhost:8000/sels/getOneList`, New_user, {
        headers: {
          "Content-Type": `application/json`,
        },
        body: New_user,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log("Error!");
      });

    setUsers((prevUsers) => [...prevUsers, newUser]);
    console.log(Users);
    console.log(props.SelectedEvent);

    props.showFunc(false);
  };

  const handleInputChange = (user) => {
    const { name, value } = user.target;
    setNewUser((prevUsers) => ({
      ...prevUsers,
      [name]: value,
    }));
  };

  return (
    <>
      <CModal
        alignment="center"
        visible={props.show}
        onClose={() => props.showFunc(false)}
      >
        <CModalHeader onClose={() => props.showFunc(false)}>
          <CModalTitle>참석 인원 추가</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleFormSubmit}>
            <CFormInput
              type="text"
              label="이름"
              placeholder="Username"
              name="Username"
              onChange={handleInputChange}
            />
            <CFormInput
              type="text"
              label="학번"
              placeholder="Username"
              name="key"
              onChange={handleInputChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            type="submit"
            color="primary"
            onClick={() => props.showFunc(false)}
          >
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

export default ScheduleAddMemberModal;
