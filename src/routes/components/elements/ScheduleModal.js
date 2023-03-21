import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

function ScheduleModal({
  isOpen,
  onClose,
  onAddSchedule,
  onUpdateSchedule,
  onDeleteSchedule,
  date,
}) {
  const [schedule, setSchedule] = useState({ title: "", description: "" });
  const [action, setAction] = useState("add");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (action === "add") {
      onAddSchedule({ date, ...schedule });
    } else if (action === "update") {
      onUpdateSchedule({ date, ...schedule });
    }
    onClose();
  };

  const handleDelete = () => {
    onDeleteSchedule(date);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2>{action === "add" ? "Add Schedule" : "Edit Schedule"}</h2>
        <label>
          Title
          <input
            type="text"
            value={schedule.title}
            onChange={(event) =>
              setSchedule({ ...schedule, title: event.target.value })
            }
          />
        </label>
        <label>
          Description
          <textarea
            value={schedule.description}
            onChange={(event) =>
              setSchedule({ ...schedule, description: event.target.value })
            }
          />
        </label>
        <button type="submit">{action === "add" ? "Add" : "Save"}</button>
        {action === "update" && (
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </form>
    </Modal>
  );
}

export default ScheduleModal;
