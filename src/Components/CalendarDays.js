import React from "react";
import styled from "styled-components";

const DaysBlock = styled.div`
  display: flex;
  margin: 25px 0px 10px;
`;

const WeekDay = styled.div`
  width: calc(100% / 7);
  text-align: center;

  &:nth-child(7n + 1) {
    color: #d13e3e;
  }

  &:nth-child(7n) {
    color: #396ee2;
  }
`;

const CalendarDays = () => {
  const weekday = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <DaysBlock>
      {weekday.map((day, index) => (
        <WeekDay key={index}>{day}</WeekDay>
      ))}
    </DaysBlock>
  );
};

export default CalendarDays;
