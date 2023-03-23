import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import "../css/Calendar.css";

function Attendence({ selectedEvent }) {
  const [Users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [SearchUser, setSearchUser] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    console.log(selectedEvent);
    setNewUser({
      eventKey: selectedEvent.id,
      Username: "", //이름
      key: "", //인덱스
    });
    console.log(newUser);
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
    handleDialogClose();
  };

  const renderUserList = (Users) =>
    Users.length > 0 &&
    Users.map(
      (user) =>
        selectedEvent.id === user.eventKey && (
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
        width: "100%",
        border: "1px solid red",
      }}
    >
      <div
        className="MainHeader"
        style={{ border: "1px solid red", height: "150px" }}
      >
        <div style={{ width: "40%" }}>
          <font color={selectedEvent.backgroundColor}>
            <h3
              style={{
                margin: 0,
                fontSize: "20px",
              }}
            >
              {selectedEvent.title}
            </h3>
          </font>
        </div>
        <h2 style={{ width: "20%" }}>출석 리스트</h2>
        <span
          style={{
            margin: 0,
            fontSize: "15px",
            width: "40%",
          }}
        >
          {selectedEvent.start.toLocaleString()}
        </span>
      </div>
      <div className="MainList" style={{ border: "1px solid red" }}>
        <Button
          style={{ position: "relative", left: "350px" }}
          variant="text"
          sx={styled}
          onClick={handleDialogOpen}
        >
          참석 인원 추가
        </Button>
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
          <tbody style={{ fontSize: "15px" }}>{renderUserList(Users)}</tbody>
        </Table>
      </div>
    </div>
  );
}
export default Attendence;
