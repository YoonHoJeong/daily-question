import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "../styles.module.css";

interface Props {}

export const AdminHeader: React.FC<Props> = () => {
  const location = useLocation();
  return (
    <ul className={styles.adminHeader}>
      <li>
        <Link to={`/admin/main`}>
          <Button
            color="secondary"
            variant={
              location.pathname === "/admin/main" ? "contained" : "outlined"
            }
          >
            메인
          </Button>
        </Link>
      </li>
      <li>
        <Link to={`/admin/enroll-user`}>
          <Button
            color="secondary"
            variant={
              location.pathname === "/admin/enroll-user"
                ? "contained"
                : "outlined"
            }
          >
            사용자 등록
          </Button>
        </Link>
      </li>
      <li>
        <Link to={`/admin/enroll-question`}>
          <Button
            color="secondary"
            variant={
              location.pathname === "/admin/enroll-question"
                ? "contained"
                : "outlined"
            }
          >
            질문 등록
          </Button>
        </Link>
      </li>
    </ul>
  );
};
