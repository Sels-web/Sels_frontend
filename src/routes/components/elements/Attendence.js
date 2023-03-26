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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../css/attedance.css";
import { FaRegCalendarPlus } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";

function Attendence({ selectedEvent, events }) {
  const [Users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [SearchUser, setSearchUser] = useState([]);
  const [SelectedEvent, setSelectedEvent] = useState(selectedEvent);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setNewUser({
      eventKey: SelectedEvent.id,
      Username: "", //이름
      key: "", //인덱스
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setNewUser({});
    setDialogOpen(false);
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
    setUsers((prevUsers) => [...prevUsers, newUser]);
    console.log(Users);
    console.log(SelectedEvent);
    handleDialogClose();
  };

  const changeEvent = (event) => {
    setSelectedEvent(event);
    // console.log(SelectedEvent);
  };

  const renderScheduleList = (Schedules) =>
    Schedules.length > 0 &&
    Schedules.map((schedule) => (
      <ListGroup.Item
        key={schedule.id}
        style={{
          backgroundColor: SelectedEvent.id === schedule.id && "#e4e4e4",
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
          <tr key={user.length}>
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
                  // onChange={(e) => handleAttend(user, schedule, e.target.value)}
                />
                지각
                <input
                  style={{ marginRight: "1rem" }}
                  type="radio"
                  name={user.id}
                  value="지각"
                  // onChange={(e) => handleAttend(user, schedule, e.target.value)}
                />
                결석
                <input
                  type="radio"
                  name={user.id}
                  value="결석"
                  // onChange={(e) => handleAttend(user, schedule, e.target.value)}
                />
              </form>
            </td>
          </tr>
        )
    );

  const styled = {
    "&.MuiButton-text": {
      color: "black",
    },
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
                src="/assets/img/Sels_Logo.jpeg"
                style={{ width: "150px", height: "100px" }}
                alt=""
              />
              <h2
                style={{
                  display: "flex",
                  margin: 0,
                  padding: "1rem 0",
                  fontSize: "27px",
                }}
              >
                {" "}
                세션리스트
              </h2>
              <Clock
                format={"YYYY-MM-DD HH:mm:ss"}
                ticking={true}
                timezone={"Asia/Seoul"}
                style={{
                  position: "absolute",
                  top: "140px",
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
                backgroundColor: "white",
                padding: "3px",
                textAlign: "center",
                borderRadius: "20px",
              }}
              // onClick={handleDialogOpen}
            >
              전체 출석 리스트 보기
            </span>
          </>
          <div className="SideList">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ color: "#F2A240", fontWeight: "bold" }}>
                일정 리스트
              </h4>
              <div>
                <AiOutlineUserAdd
                  style={{
                    fontSize: "30px",
                    color: "#F2A240",
                    fontWeight: "bold",
                  }}
                  onClick={handleDialogOpen}
                />
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
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
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDialogClose}>취소</Button>
                      <Button type="submit">추가</Button>
                    </DialogActions>
                  </form>
                </Dialog>
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
        <main style={{ display: "flex", flexDirection: "column" }}>
          <div className="MainHeader" style={{ height: "150px" }}>
            <span style={{ margin: 0, fontSize: "15px" }}>
              {SelectedEvent.start.toLocaleString()}
            </span>
            <h2>출석 리스트</h2>
            <h3 style={{ margin: 0, fontSize: "20px" }}>
              {SelectedEvent.title}
            </h3>
          </div>
          <div
            className="MainList"
            style={{ height: "500px", overflow: "auto" }}
          >
            <Table striped bordered hover width="100%">
              <thead style={{ fontSize: "20px" }}>
                <tr>
                  <th width="20%">학번</th>
                  <th width="30%">이름</th>
                  <th width="30%">출석 여부</th>
                  <th width="20%">출석 상태</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "15px" }}>
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
