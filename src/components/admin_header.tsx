import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

interface Props {}

export const AdminHeader: React.FC<Props> = () => {
  const location = useLocation();

  return (
    <ul>
      <li>
        <Link to={`/admin/main`}>
          <Button>메인</Button>
        </Link>
      </li>
      <li>
        <Link to={`/admin/enroll`}>
          <Button>사용자 등록</Button>
        </Link>
      </li>
      <li>
        <Link to={`/admin/enroll-question`}>
          <Button>질문 등록</Button>
        </Link>
      </li>
    </ul>
  );
};
