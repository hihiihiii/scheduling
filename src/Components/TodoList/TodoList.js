import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTodoStateContext } from "../../TodoProvider";
import TodoCreate from "./TodoCreate";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 60px;
  padding-top: 32px;
`;

const TodoList = ({ selectDate }) => {
  const state = useTodoStateContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    const twelveTime = new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDate(),
      0
    ).getTime();

    const lastTime = new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      selectDate.getDate(),
      23,
      59,
      59
    ).getTime();

    setData(
      state.filter((el) => twelveTime <= el?.date && el?.date <= lastTime)
    );
  }, [state]);

  return (
    <TodoListBlock>
      {data?.map((el) => {
        return <TodoItem key={el?.id} {...el}></TodoItem>;
      })}
      <TodoCreate selectDate={selectDate}></TodoCreate>
    </TodoListBlock>
  );
};

export default TodoList;
