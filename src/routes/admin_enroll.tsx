import { Button, TextField, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdminHeader } from "../components/admin_header";
import { AdminUserItem } from "../components/admin_user_item";
import { adminApi } from "../services/adminApi";
import styles from "../styles.module.css";

interface Props {}
export interface UserFormState {
  uid: string;
  email?: string | null;
  phone_number?: string | null;
  sex?: "남성" | "여성" | null;
  age?: "10대" | "20대" | "30대" | "40대" | "50대" | "60대 이상" | null;
}

export const AdminEnroll: React.FC<Props> = () => {
  const [formData, setFormData] = useState({ uid: "" });
  const [users, setUsers] = useState<{}>({});
  const [loading, setLoading] = useState<Boolean>(true);

  async function fetchData() {
    setLoading(true);
    const data = await adminApi.getUsersExceptAnonymous();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const isValidForm = () => {
    if (formData.uid === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      if (isValidForm()) {
        adminApi.enrollNewUser(formData);
      }
    } catch (e) {
      alert("Invalid Input Form");
    }
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleDeleteUser = async (e: any) => {
    const uid = e.currentTarget.name;
    const response = window.confirm(`${uid} 사용자를 삭제하시겠습니까?`);
    if (response) {
      await adminApi.deleteUser(uid);
      await fetchData();
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <AdminHeader />
      <form className={styles.enrollUserForm} action="" onSubmit={handleSubmit}>
        <TextField required label="uId" name="uid" onChange={handleChange} />
        <TextField
          type="email"
          label="email"
          name="email"
          onChange={handleChange}
        />
        <TextField
          label="phone_number"
          name="phone_number"
          onChange={handleChange}
        />
        <TextField label="sex" name="sex" onChange={handleChange} />
        <TextField label="age" name="age" onChange={handleChange} />
        <Button variant="contained" onClick={handleSubmit}>
          Add New User
        </Button>
      </form>
      <ul className={styles.userList}>
        {Object.keys(users).map((uid) => {
          const user = users[uid];
          return (
            <AdminUserItem user={user} handleDeleteUser={handleDeleteUser} />
          );
        })}
      </ul>
    </>
  );
};
