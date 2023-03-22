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
import "./css/home.module.css";

function Attendence({ eventId }) {
  const [Users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [SearchUser, setSearchUser] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setNewUser({
      eventKey: eventId,
      Username: "", //이름
      key: "", //학번
      Department: "", //학과
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setNewUser({});
    setDialogOpen(false);
  };

  const handleInputChange = (user) => {
    // console.log(event.target);
    const { name, value } = user.target;
    setNewUser((prevUsers) => ({
      ...prevUsers,
      [name]: value,
    }));
  };

  const handleFormSubmit = (user) => {
    user.preventDefault();
    setUsers((prevUsers) => [...prevUsers, newUser]);
    handleDialogClose();
    console.log(Users);
  };

  const renderUserList = (Users) =>
    Users.length > 0 &&
    Users.map(
      (user) =>
        eventId === user.eventKey && (
          <tr key={user.key}>
            <td>{user.key}</td>
            <td>{user.Username}</td>
            <td>{user.Department}</td>
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
            {/* {SearchUser.map(
    (searchUser) =>
      searchUser.user_id === user.id &&
      eventId === user.eventId && (
        <td
          style={{
            color:
              (searchUser.state === "결석" && "red") ||
              (searchUser.state === "지각" && "orange") ||
              (searchUser.state === "출석" && "blue"),
          }}
        >
          {searchUser.state}
        </td>
      )
  )} */}
          </tr>
        )
    );

  return (
    <div>
      <div>
        <button onClick={handleDialogOpen}>추가</button>
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
                // value="name"
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                margin="dense"
                label="학번"
                type="text"
                fullWidth
                name="key"
                // value="student_number"
                onChange={handleInputChange}
              />
              <TextField
                autoFocus
                margin="dense"
                label="학과"
                type="text"
                fullWidth
                name="Department"
                // value="department"
                onChange={handleInputChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>취소</Button>
              <Button type="submit">추가</Button>
            </DialogActions>
          </form>
        </Dialog>
        <table border="1">
          <thead style={{ fontSize: "20px" }}>
            <tr>
              <th>학번</th>
              <th>이름</th>
              <th>학과</th>
              <th>출석 여부</th>
              <th>출석 상태</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "15px" }}>{renderUserList(Users)}</tbody>
        </table>
      </div>
    </div>
  );
}
export default Attendence;
