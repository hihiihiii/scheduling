import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CalendarDays from "../Components/CalendarDays";
import CalendarHead from "../Components/CalendarHead";
import Dates from "../Components/Date";

const CalendarBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
`;

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <CalendarBlock>
      <CalendarHead date={date} setDate={setDate}></CalendarHead>
      <CalendarDays></CalendarDays>
      <Dates date={date}></Dates>
    </CalendarBlock>
  );
};

export default Calendar;
