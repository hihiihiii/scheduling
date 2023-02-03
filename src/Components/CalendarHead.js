import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled, { css } from "styled-components";

const CalendarHeadBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeadDateString = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

const HeadRight = styled.div`
  display: flex;
  border: 1px solid #333333;
  border-radius: 5px;
`;

const HeadItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 30px;
  border: none;
  font-size: 16px;
  line-height: 34px;
  background-color: transparent;
  cursor: pointer;

  ${(props) =>
    props.today &&
    css`
      width: 75px;
      border-left: 1px solid #333;
      border-right: 1px solid #333;
    `}
`;

const CalendarHead = ({ date, setDate }) => {
  const today = new Date();
  const dateString = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });

  //저번 달
  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };

  // 다음 달
  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  };

  const todayMonth = () => {
    setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  };

  return (
    <CalendarHeadBlock>
      <HeadDateString>{dateString}</HeadDateString>
      <HeadRight>
        <HeadItem onClick={prevMonth}>
          <MdKeyboardArrowLeft></MdKeyboardArrowLeft>
        </HeadItem>
        <HeadItem today={"today"} onClick={todayMonth}>
          Today
        </HeadItem>
        <HeadItem onClick={nextMonth}>
          <MdKeyboardArrowRight></MdKeyboardArrowRight>
        </HeadItem>
      </HeadRight>
    </CalendarHeadBlock>
  );
};

export default CalendarHead;
