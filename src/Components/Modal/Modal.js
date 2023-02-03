import React, { useState } from "react";
import styled, { css } from "styled-components";

const ModalBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 568px;
  height: 768px;
  border-radius: 5px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  position: relative;
`;

const ModalButton = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  background-color: #ececec;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cecece;
  padding: 10px;
`;

const Modal = ({ setIsOpen, content, date }) => {
  const dateString = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <ModalBlock>
      <ModalWrapper>
        <ModalHeader>
          <div></div>
          <div>{dateString} 기록</div>
          <ModalButton onClick={() => setIsOpen(false)}>X</ModalButton>
        </ModalHeader>
        <div>{content}</div>
      </ModalWrapper>
    </ModalBlock>
  );
};

export default Modal;
