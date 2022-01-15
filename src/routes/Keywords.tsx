import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Question } from '../model/interfaces';
import {getDatabase} from "firebase/database";
import { firebaseApp } from '../services/firebase';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div``;
const KeywordList = styled.ul``;
const Keyword = styled.li``;



interface Props {}

const Keywords: React.FC<Props> = () => {
  const [questions, setQuestions]= useState<Question[]>([]);

  useEffect(() => {
    const db = getDatabase(firebaseApp);
    
  }, [])


  return (
    <Container>
      <Title>키워드를 선택해 주세요.</Title>
      <KeywordList>
        <Keyword>
          <Link to={`/question/${1}`}>
            <button>방어</button>
          </Link>
        </Keyword>
        <Keyword>
          <Link to={`/question/${2}`}>
            <button>칼로리</button>
          </Link>
        </Keyword>
        <Keyword>
          <Link to={`/question/${3}`}>
            <button>밈</button>
          </Link>
        </Keyword>
      </KeywordList>
    </Container>
  );
};

export default Keywords;
