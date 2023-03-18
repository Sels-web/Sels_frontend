import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CustomCalendar() {
  const [date, setDate] = useState(new Date());

  // 예시로 사용할 스케줄 데이터
  const scheduleData = [
    { date: "2023-03-01", schedule: "Meeting with clients" },
    { date: "2023-03-03", schedule: "Lunch with colleagues" },
    { date: "2023-03-05", schedule: "Dinner with family" },
  ];

  // 해당 날짜에 스케줄이 있는지 확인하는 함수
  const getSchedule = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const schedule = scheduleData.find((data) => data.date === dateString);
    return schedule ? schedule.schedule : null;
  };

  return (
    <div className="react-calendar">
      <Calendar
        locale="en-US"
        onChange={setDate}
        value={date}
        tileContent={({ activeStartDate, date, view }) => {
          if (view === "month") {
            const schedule = getSchedule(date);
            return <div>{schedule}</div>;
          }
        }}
      />
    </div>
  );
}

export default CustomCalendar;
