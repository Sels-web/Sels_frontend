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
import "./css/Calendar.css";

function Attendence({ eventId }) {
  const [Users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [SearchUser, setSearchUser] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setNewUser({
      eventKey: eventId,
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
        eventId === user.eventKey && (
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
    <div className="MainList" style={{ border: "1px solid red" }}>
      <Button variant="text" sx={styled} onClick={handleDialogOpen}>
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
      <table width="100%">
        <thead style={{ fontSize: "20px" }}>
          <tr>
            <th width="20%">번호</th>
            <th width="40%">이름</th>
            <th width="40%">출석 여부</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "15px" }}>{renderUserList(Users)}</tbody>
      </table>
    </div>
  );
}
export default Attendence;
