import { Button } from "@mui/material";
import React from "react";

interface Props {
  user: {
    uid: string;
    answers?: {};
    rates?: {};
  };
  handleDeleteUser: (e: any) => Promise<void>;
}

export const AdminUserItem: React.FC<Props> = ({ user, handleDeleteUser }) => {
  return (
    <li key={user.uid}>
      <div className="">user id: {user.uid}</div>
      <div className="">
        answers: {user.answers ? Object.keys(user.answers).length : 0}
      </div>
      <div className="">
        rates: {user.rates ? Object.keys(user.rates).length : 0}
      </div>
      <Button
        name={user.uid}
        variant="outlined"
        color="error"
        onClick={handleDeleteUser}
      >
        Delete User
      </Button>
      <br />
      <br />
    </li>
  );
};
