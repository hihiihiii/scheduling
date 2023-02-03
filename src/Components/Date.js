import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useTodoStateContext } from "../TodoProvider";
import Modal from "./Modal/Modal";
import TodoList from "./TodoList/TodoList";

const DateBlock = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const DateBox = styled.div`
  cursor: pointer;
  border: 1px solid black;
  /* width: calc(100% / 7); */
  text-align: center;
  height: 70px;
  padding: 5px;
  position: relative;
`;

const DateItem = styled.div`
  opacity: ${(props) => props.other === "other" && 0.4};

  ${(props) =>
    props.condition === "this" &&
    css`
      position: relative;
      color: white;
      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: -1;
        display: block;
        width: 30px;
        height: 30px;
        background-color: #ff0000;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        content: "";
      }
    `}
`;

const DateWrapper = styled.div`
  width: calc(100% / 7);
  &:nth-child(7n + 1) {
    color: #d13e3e;
  }

  &:nth-child(7n) {
    color: #396ee2;
  }
`;

const EmptyTodo = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  right: 5px;
  top: 5px;
`;

const Dates = ({ date }) => {
  //modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectDate, setSelectDate] = useState(date);

  const state = useTodoStateContext();

  //달력만들기.
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  //전 달 마지막날
  const prevLast = new Date(viewYear, viewMonth, 0);
  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  //이번 달 마지막날
  const thisLast = new Date(viewYear, viewMonth + 1, 0);
  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  //저번달
  const prevDates = [];
  //이번달
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  // 다음달.
  const nextDates = [];

  //달력에 그려질 전 달 마지막 날.
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1); // 1이 어디있는지 확인한다.
  const lastDateIndex = dates.lastIndexOf(TLDate); // 마지막날이 어디있는지.

  //오늘 날짜.
  const today = new Date();
  const getToday = (condition) => {
    if (condition === "this") {
      if (today.getFullYear() === viewYear && today.getMonth() === viewMonth) {
        return today.getDate();
      }
    }
  };

  const showModal = (number) => {
    setIsOpen(true);
    const selectDate = new Date(date.getFullYear(), date.getMonth(), number);
    setSelectDate(selectDate);
  };

  const getDateTodo = (number) => {
    //날짜별 time
    const infomation = new Date(date.getFullYear(), date.getMonth(), number, 0);
    const infomationTo = new Date(
      date.getFullYear(),
      date.getMonth(),
      number,
      23,
      59,
      59
    );

    return state?.filter(
      (el) => el.date >= infomation && infomationTo >= el?.date
    ).length;
  };

  // useEffect(()=>{
  //   if(state >= 1){

  //   }else{

  //   }
  // },[])

  return (
    <DateBlock>
      {dates.map((date, i) => {
        //현재 상태 this || other
        const condition =
          i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
        return (
          <DateWrapper key={i}>
            {condition === "this" ? (
              <DateBox onClick={() => showModal(date)}>
                {getToday(condition) === date ? (
                  <DateItem condition={condition}>{date} </DateItem>
                ) : (
                  <DateItem other={condition}>{date}</DateItem>
                )}
                {getDateTodo(date) >= 1 && <EmptyTodo></EmptyTodo>}
              </DateBox>
            ) : (
              <DateBox onClick={(e) => e.stopPropagation()}>
                {getToday(condition) === date ? (
                  <DateItem condition={condition}>{date}</DateItem>
                ) : (
                  <DateItem other={condition}>{date}</DateItem>
                )}
              </DateBox>
            )}
          </DateWrapper>
        );
      })}
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          content={<TodoList selectDate={selectDate}></TodoList>}
          date={selectDate}
        ></Modal>
      )}
    </DateBlock>
  );
};

export default Dates;
