import React, { useState } from "react";
import Modal from "react-modal";

function AddScheduleModal({ isOpen, onRequestClose, onAddSchedule }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 제목과 내용을 입력받아 새로운 스케줄을 생성
    const newSchedule = {
      title,
      description,
    };

    // 생성된 스케줄을 부모 컴포넌트로 전달하여 추가
    onAddSchedule(newSchedule);

    // 모달창 닫기
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Add Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </Modal>
  );
}

export default AddScheduleModal;
