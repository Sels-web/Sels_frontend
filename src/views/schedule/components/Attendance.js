import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Clock from "react-live-clock";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import "../styles/attedance.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import moment from "moment";
import "moment/locale/ko";
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

function Attendence({ selectedEvent, events }) {
  console.log(events);
  const [Users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [SelectedEvent, setSelectedEvent] = useState(selectedEvent);
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const handleUserDialogOpen = () => {
    setNewUser({
      eventKey: selectedEvent.id,
      Username: "", // 이름
      key: "", // 학번
      state: "",
    });
    setUserDialogOpen(true);
  };

  const handleUserDialogClose = () => {
    setNewUser({});
    setUserDialogOpen(false);
  };

  const handleInputChange = (user) => {
    const { name, value } = user.target;
    setNewUser((prevUsers) => ({
      ...prevUsers,
      [name]: value,
    }));
  };

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
    console.log(SelectedEvent);
    handleUserDialogClose();
  };

  const isFormVaild = (user, SelectedEvent, value) =>
    user && SelectedEvent && value;

  const handleAttend = async (user, SelectedEvent, value) => {
    if (isFormVaild(user, SelectedEvent, value)) {
      const newAttendance = {
        user_id: user.eventKey, // 연결 된 유저
        schedule_id: SelectedEvent.id, // 연결된 스케줄
        stu_num: user.key,
        state: value, // 상태
      };
      var newState = "";
      console.log(newAttendance);
      if (newAttendance.state === "출석") {
        console.log(user);
        newState = "출석";
      } else if (newAttendance.state === "지각") {
        const now = Date.now(); // 현재 시간
        const start = new Date(SelectedEvent.start).getTime(); // 시작 시간
        const diff = (now - start) / (1000 * 60); // 분 단위로 계산
        console.log(`지각한 시간: ${diff}분`);
        newState = `${diff}분 지각`;
      } else if (newAttendance.state === "결석") {
        newState = "absent";
        // 결석일 때의 처리
        // 예시: 해당 이벤트 삭제
        // setEvents(events.filter((event) => event.id !== SelectedEvent.id));
      }
      setUsers((prevUsers) => {
        // users 배열에서 수정할 user 객체를 찾음
        const modifiedUser = prevUsers.find(
          (u) => u.eventKey === user.eventKey && u.key === user.key
        );

        if (!modifiedUser) {
          return prevUsers;
        }
        // user 객체의 state 값을 value로 업데이트
        const updatedUser = {
          ...modifiedUser,
          state: value,
        };

        console.log("전체유저" + prevUsers);
        console.log("내가 선택한 유저" + modifiedUser);
        console.log("state값이 수정된 유저" + updatedUser);

        // 수정된 user 객체를 포함하는 새로운 배열을 만들어 반환
        return prevUsers.map((u) =>
          u.eventKey === user.eventKey && u.key === user.key ? updatedUser : u
        );
      });
      console.log(Users);
    }
  };

  const changeEvent = (event) => {
    setSelectedEvent(event);
    // console.log(SelectedEvent);
    // console.log(SelectedEvent);
  };

  const renderScheduleList = (Schedules) =>
    Schedules.length > 0 &&
    Schedules.map((schedule) => (
      <ListGroup.Item
        key={schedule.id}
        style={{
          backgroundColor: SelectedEvent.id === schedule.id && "#e4e4e4",
          height: "50px",
        }}
        onClick={() => changeEvent(schedule)}
      >
        <span
          style={{
            fontSize: "20px",
            display: "block",
            margin: 0,
          }}
        >
          {schedule.title}
        </span>

        <span
          style={{
            fontSize: "12px",
          }}
        >
          {schedule.start}
        </span>
      </ListGroup.Item>
    ));

  const renderUserList = (Users) =>
    Users.length > 0 &&
    Users.map(
      (user) =>
        SelectedEvent.id === user.eventKey && (
          <tr className="user" key={user.length}>
            <td width="20%">{user.key}</td>
            <td width="30%">{user.Username}</td>
            {/* <td>{user.Department}</td> */}
            <td width="30%">
              <form>
                출석
                <input
                  style={{ marginRight: "1rem" }}
                  type="radio"
                  name={user.id}
                  value="출석"
                  onChange={(e) =>
                    handleAttend(user, SelectedEvent, e.target.value)
                  }
                />
                지각
                <input
                  style={{ marginRight: "1rem" }}
                  type="radio"
                  name={user.id}
                  value="지각"
                  onChange={(e) =>
                    handleAttend(user, SelectedEvent, e.target.value)
                  }
                />
                결석
                <input
                  type="radio"
                  name={user.id}
                  value="결석"
                  onChange={(e) =>
                    handleAttend(user, SelectedEvent, e.target.value)
                  }
                />
              </form>
            </td>
            <td style={{ color: getStatusColor(user.state) }}>{user.state}</td>
          </tr>
        )
    );

  const getStatusColor = (status) => {
    switch (status) {
      case "출석":
        return "green";
      case "지각":
        return "orange";
      case "결석":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "IBMPlexSansKR-Text",
      }}
    >
      {/* 사이트 리스트 */}
      <div
        style={{
          minWidth: "300px",
          backgroundColor: "rgba(247, 230, 167)",
          padding: "2rem 1rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <>
            <div className="SideHeader">
              <img
                src="/assets/images/Sels_Logo.jpeg"
                style={{ width: "100px", height: "65px" }}
                alt=""
              />
              <h2
                style={{
                  display: "flex",
                  margin: 0,
                  padding: "1rem 0",
                  fontSize: "27px",
                  color: "whitesmoke",
                }}
              >
                {" "}
                출석부
              </h2>
              <Clock
                format={"YYYY-MM-DD HH:mm:ss"}
                ticking={true}
                timezone={"Asia/Seoul"}
                style={{
                  position: "absolute",
                  top: "110px",
                  left: "80px",
                  fontSize: "20px",
                  color: "#F2A240",
                }}
              />
            </div>
            <span
              style={{
                margin: "0rem auto 1rem",
                width: "150px",
                display: "inline-block",
                backgroundColor: "#f2a240",
                padding: "3px",
                textAlign: "center",
                borderRadius: "20px",
                color: "whitesmoke",
              }}
              onClick={handleUserDialogClose}
            >
              이번 달 일정 보기
            </span>
          </>
          <div className="SideList">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h4 style={{ color: "#F2A240", fontWeight: "bold" }}>
                일정 리스트
              </h4>
              <div>
                <AiOutlineUserAdd
                  style={{
                    fontSize: "30px",
                    color: "#F2A240",
                    fontWeight: "bold",
                    paddingTop: "10px",
                  }}
                  onClick={handleUserDialogOpen}
                />
                <CModal
                  alignment="center"
                  visible={userDialogOpen}
                  onClose={handleUserDialogClose}
                >
                  <CModalHeader onClose={handleUserDialogClose}>
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
                    <CButton type="submit" color="primary">
                      추가
                    </CButton>
                    <CButton color="secondary" onClick={handleUserDialogClose}>
                      취소
                    </CButton>
                  </CModalFooter>
                </CModal>
                {/* <Dialog open={dialogOpen} onClose={handleDialogClose}>
                  <DialogTitle>참석 인원 추가</DialogTitle>
                  <form onSubmit={handleFormSubmit}>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        label="이름"
                        type="text"
                        fullWidth
                        name="Username"
                        onChange={handleInputChange}
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        label="학번"
                        type="text"
                        fullWidth
                        name="key"
                        onChange={handleInputChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDialogClose}>취소</Button>
                      <Button type="submit">추가</Button>
                    </DialogActions>
                  </form>
                </Dialog> */}
              </div>
            </div>
            <ListGroup
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              {renderScheduleList(events)}
            </ListGroup>
          </div>
          {/* <div className="SideFooter">
            <span style={{ fontSize: "13px", color: "white" }}>
              Copyrightⓒ 2021 All rights reserved.
            </span>
          </div> */}
        </div>
      </div>
      {/* 메인 리스트 */}
      <div
        style={{
          width: "100%",
        }}
      >
        <main
          style={{
            display: "flex",
            flexDirection: "column",
            // paddingLeft: "50px",
            // paddingRight: "50px",
          }}
        >
          <div
            className="MainHeader"
            style={{
              height: "150px",
              // border: "1px solid red"
            }}
          >
            <span
              style={{
                margin: 0,
                fontSize: "15px",
                // border: "1px solid red",
                width: "30%",
                textAlign: "center",
              }}
            >
              {moment(SelectedEvent.start).format("YYYY년 MM월 DD일 HH시 mm분")}
            </span>
            <h2
              style={{
                // border: "1px solid red",
                width: "30%",
                textAlign: "center",
              }}
            >
              출석 리스트
            </h2>
            <h3
              style={{
                margin: 0,
                fontSize: "20px",
                // border: "1px solid red",
                width: "40%",
                textAlign: "center",
              }}
            >
              {SelectedEvent.title}
            </h3>
          </div>
          <div
            className="MainList"
            style={{
              height: "500px",
              overflow: "auto",
            }}
          >
            <Table striped bordered width="100%">
              <thead style={{ fontSize: "20px" }}>
                <tr>
                  <th width="20%">학번</th>
                  <th width="30%">이름</th>
                  <th width="30%">출석 여부</th>
                  <th width="20%">출석 상태</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "20px" }}>
                {renderUserList(Users)}
              </tbody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Attendence;
