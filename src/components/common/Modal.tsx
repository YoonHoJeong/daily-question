import React, { useState } from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.form``;
const ModalHeader = styled.header``;
const HeaderTitle = styled.span``;
const CloseButton = styled.button``;
const ModalBody = styled.section``;
const ModalFooter = styled.footer``;
const AgreeButton = styled.button``;
const DeclineButton = styled.button``;

const Textarea = styled.textarea``;
const Input = styled.input``;

const Modal: React.FC = () => {
  const [show, setShow] = useState<boolean>(true);
  return show ? (
    <Background>
      <ModalContainer>
        <ModalHeader>
          <HeaderTitle></HeaderTitle>
          <CloseButton onClick={() => setShow(false)}>X</CloseButton>
        </ModalHeader>

        <ModalBody>
          <Input>publish date</Input>
          <Input>keyword</Input>
          <Textarea>question</Textarea>
        </ModalBody>
        <ModalFooter>
          <AgreeButton onClick={() => setShow(true)}>등록</AgreeButton>
          <DeclineButton onClick={() => setShow(false)}>취소</DeclineButton>
        </ModalFooter>
      </ModalContainer>
    </Background>
  ) : null;
};

export default Modal;
