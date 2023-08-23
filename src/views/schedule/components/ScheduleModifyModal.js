import React, { useState, useEffect } from "react";

import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import ScheduleAddMemberModal from "./ScheduleAddMember";

const ScheduleModifyModal = (props) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [Users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  const handleDialogClose = () => {
    // setNewUser({});
    setDialogVisible(false);
  };

  //   const handleFormSubmit = (user) => {
  //     user.preventDefault();
  //     console.log(newUser);
  //     const New_user = {
  //       eventId: newUser.eventKey,
  //       Username: newUser.Username,
  //       key: newUser.key,
  //     };

  //     console.log(New_user);

  //     axios
  //       .post(`http://localhost:8000/sels/getOneList`, New_user, {
  //         headers: {
  //           "Content-Type": `application/json`,
  //         },
  //         body: New_user,
  //       })
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((response) => {
  //         console.log("Error!");
  //       });

  //     setUsers((prevUsers) => [...prevUsers, newUser]);
  //     console.log(Users);
  //     console.log(props.SelectedEvent);
  //     handleDialogClose();
  //   };

  const handleInputChange = (user) => {
    const { name, value } = user.target;
    setNewUser((prevUsers) => ({
      ...prevUsers,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Selected Event in ScheduleAddModal:", props.selectedEvent);
  }, [props.selectedEvent]);

  return (
    <>
      <CModal
        alignment="center"
        visible={props.show}
        onClose={() => props.showFunc(false)}
        fullscreen
        backdrop="static"
      >
        <CModalHeader onClose={() => props.showFunc(false)}>
          <CModalTitle>회원 수정</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>추가 내용 작성</p>
          {props.selectedEvent && (
            <p>선택된 이벤트: {props.selectedEvent.title}</p>
          )}
          <CButton
            color="warning"
            onClick={() => setDialogVisible(!dialogVisible)}
          >
            회원 추가
          </CButton>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">저장</CButton>
          <CButton color="secondary" onClick={() => props.showFunc(false)}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
      <ScheduleAddMemberModal
        show={dialogVisible}
        showFunc={setDialogVisible}
      />
    </>
  );
};

export default ScheduleModifyModal;
