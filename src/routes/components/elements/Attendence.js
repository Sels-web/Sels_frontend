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

  const renderScheduleList = (events) =>
    events.length > 0 &&
    events.map((event) => (
      <li style={{ listStyle: "none" }} key={event.id}>
        <span
          style={{
            fontSize: "20px",
            display: "block",
            margin: 0,
          }}
        >
          <Button
            key={event.id}
            id={event.id}
            onClick={() => changeEvent(event)}
          >
            {event.title}
          </Button>
        </span>
        <span
          style={{
            fontSize: "12px",
          }}
        >
          {/* {schedule.year}-{schedule.month}-{schedule.day} */}
        </span>
      </li>
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
          backgroundColor: "rgba(247, 230, 167)",
          padding: "2rem 1rem",
        }}
      >
        {/* <SidePanel /> */}
        <ListGroup style={{ maxHeight: "500px", overflowY: "auto" }}>
          {renderScheduleList(events)}
        </ListGroup>
      </div>
      {/* 메인 리스트 */}
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            border: "1px solid red",
          }}
        >
          <div
            className="MainHeader"
            style={{ border: "1px solid red", height: "150px" }}
          >
            <div>
              <font color={SelectedEvent.backgroundColor}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    border: "1px solid red",
                  }}
                >
                  {SelectedEvent.title}
                </h3>
              </font>
            </div>
            <h2 style={{ border: "1px solid red" }}>출석 리스트</h2>
            <span
              style={{
                margin: 0,
                fontSize: "15px",
                border: "1px solid red",
              }}
            >
              {SelectedEvent.start.toLocaleString()}
            </span>
          </div>
          {/* <div className="MainHeader" style={{ height: "150px" }}>
            <span style={{ margin: 0, fontSize: "15px" }}>
              {SelectedEvent.start.toLocaleString()}{" "}
            </span>
            <h2>출석 리스트</h2>
            <h3 style={{ margin: 0, fontSize: "20px" }}>
              {SelectedEvent.title}
            </h3>
          </div> */}
          <div className="MainList" style={{ border: "1px solid red" }}>
            <IconButton
              style={{ position: "absolute", top: "0" }}
              size="large"
              aria-label="clear"
              onClick={handleDialogOpen}
              sx={{ color: "black" }}
            >
              <AddIcon />
            </IconButton>
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
            <Table striped bordered hover width="100%">
              <thead style={{ fontSize: "20px" }}>
                <tr>
                  <th width="20%">번호</th>
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
        </div>
      </div>
    </div>
  );
}
export default Attendence;
