import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";

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
import "../css/Calendar.css";
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
    handleDialogClose();
  };

  const changeEvent = (event) => {
    setSelectedEvent(event);
    console.log(SelectedEvent);
  };

  // const renderScheduleList = (events) =>
  //   events.length > 0 &&
  //   events.map((event) => (
  //     <li style={{ listStyle: "none" }} key={event.id}>
  //       <span
  //         style={{
  //           fontSize: "20px",
  //           display: "block",
  //           margin: 0,
  //         }}
  //       >
  //         <Button
  //           key={event.id}
  //           id={event.id}
  //           onClick={() => changeEvent(event)}
  //         >
  //           {event.title}
  //         </Button>
  //       </span>
  //       <span
  //         style={{
  //           fontSize: "12px",
  //         }}
  //       >
  //         {/* {schedule.year}-{schedule.month}-{schedule.day} */}
  //       </span>
  //     </li>
  //   ));
  // 스케줄 출력하기
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
            <td>{user.key}</td>
            <td>{user.Username}</td>
            {/* <td>{user.Department}</td> */}
            <td>
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
          backgroundColor: "#F2A240",
          padding: "2rem 1rem",
        }}
      >
        <div
          style={{
            minWidth: "250px",
            backgroundColor: "whitesmoke",
            padding: "2rem 1rem",
          }}
        >
          <div
            style={{
              minWidth: "250px",
              padding: "2rem 1rem",
            }}
          >
            <ListGroup style={{ maxHeight: "500px", overflowY: "auto" }}>
              {renderScheduleList(events)}
            </ListGroup>
          </div>
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
          <Table striped bordered hover width="100%">
            <thead style={{ fontSize: "20px" }}>
              <tr>
                <th width="20%">번호</th>
                <th width="30%">이름</th>
                <th width="30%">출석 여부</th>
                <th width="20%">출석 상태</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "15px" }}>{renderUserList(Users)}</tbody>
          </Table>
        </main>
      </div>
    </div>
  );
}
export default Attendence;
