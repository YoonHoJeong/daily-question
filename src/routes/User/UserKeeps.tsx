import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AnswersByDay from "../../components/AnswersByDay";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../hooks/useAuth";
import { DailyAnswersWithQuestions } from "../../model/interfaces";
import { getUserKeeps } from "../../services/fireDB";

interface Props {}

const UserKeeps: React.FC<Props> = () => {
  const auth = useAuth();
  const [keeps, setKeeps] = useState<DailyAnswersWithQuestions>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserKeeps(auth.user!!.uid);

      setKeeps(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <KeepsContainer>
      {loading ? (
        <Loader />
      ) : (
        Object.keys(keeps)
          .reverse()
          .map((date) => (
            <AnswersByDay
              key={date}
              date={date}
              answers={keeps[date]}
              profileOn={true}
              unKeepDisappear={true}
            />
          ))
      )}
    </KeepsContainer>
  );
};

const KeepsContainer = styled.ul``;

export default UserKeeps;
