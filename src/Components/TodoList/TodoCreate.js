import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import styled, { css } from "styled-components";
import { useDispatchContext, useNextIdContext } from "../../TodoProvider";

const TodoCreateBlock = styled.div`
  width: 100px;
  height: 100px;
  background-color: #2ecc71;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 48px;
  cursor: pointer;
  transition: 0.25s all ease-in-out;

  &:hover {
    background-color: #00b894;
  }

  &:active {
    background-color: #27ae60;
  }

  ${(props) =>
    props.toggle &&
    css`
      background-color: #d63031;
      transform: translate(-50%, 50%) rotate(45deg);
      &:hover {
        background-color: #ff7675;
      }
      &:active {
        background-color: #e17055;
      }
    `}
`;

const InsertTodoBlock = styled.form`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
`;

const InsertTodoWrraper = styled.div`
  padding-top: 20px;
  padding-bottom: 60px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #ecf0f1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: 1px solid #333;
`;

const Input = styled.input`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
`;

const TodoCreate = ({ selectDate }) => {
  const [content, setContent] = useState("");
  const [toggle, setToggle] = useState(false);
  const onToggle = () => setToggle((current) => !current);
  const dispatch = useDispatchContext();
  const nextId = useNextIdContext();

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        content,
        //선택된 날짜의 데이터를 넣어함.
        date: selectDate.getTime(),
        done: false,
      },
    });
    nextId.current += 1;
    setToggle(false);
    setContent("");
  };

  return (
    <>
      {toggle && (
        <InsertTodoBlock onSubmit={onSubmit}>
          <InsertTodoWrraper>
            <Input
              autoFocus
              placeholder="할 일을 입력해주세요."
              value={content}
              onChange={onChange}
            ></Input>
          </InsertTodoWrraper>
        </InsertTodoBlock>
      )}
      <TodoCreateBlock onClick={onToggle} toggle={toggle}>
        <MdAdd></MdAdd>
      </TodoCreateBlock>
    </>
  );
};

export default TodoCreate;
