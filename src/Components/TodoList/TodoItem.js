import React from "react";
import { MdCheck, MdDelete } from "react-icons/md";
import styled, { css } from "styled-components";
import { useDispatchContext } from "../../TodoProvider";

const Remove = styled.div`
  font-size: 24px;
  cursor: pointer;
  display: none;
  &:hover {
    color: red;
  }
`;

const TodoItemBlock = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CircleChecked = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #ececec;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;

  ${(props) =>
    props.done &&
    css`
      border: 1px solid #2ecc71;
      color: #2ecc71;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 18px;
  font-weight: 400;

  ${(props) =>
    props.done &&
    css`
      opacity: 0.4;
    `}
`;

const TodoItem = ({ id, content, done, date }) => {
  const dispatch = useDispatchContext();
  const onToggle = () => dispatch({ type: "TOGGLE", id });
  const onRemove = () => dispatch({ type: "REMOVE", id });

  return (
    <TodoItemBlock>
      <CircleChecked onClick={onToggle} done={done}>
        {done && <MdCheck></MdCheck>}
      </CircleChecked>
      <Text done={done}>{content}</Text>
      <Remove onClick={onRemove}>
        <MdDelete></MdDelete>
      </Remove>
    </TodoItemBlock>
  );
};

export default TodoItem;
