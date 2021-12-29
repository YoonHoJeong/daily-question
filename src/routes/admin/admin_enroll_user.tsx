import { Button, TextField, CircularProgress } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { AdminHeader } from "../../components/admin_header";
import { AdminUserItem } from "../../components/admin_user_item";
import { adminApi } from "../../services/adminApi";
import styles from "../../styles.module.css";

interface Props {}
export interface UserFormState {
  uid: string;
  email?: string | null;
  phone_number?: string | null;
  sex?: "남성" | "여성" | null;
  age?: "10대" | "20대" | "30대" | "40대" | "50대" | "60대 이상" | null;
}

export const AdminEnrollUser: React.FC<Props> = () => {
  const [formData, setFormData] = useState<UserFormState>({ uid: "" });
  const [users, setUsers] = useState<{}>({});
  const [loading, setLoading] = useState<Boolean>(true);

  async function fetchData() {
    setLoading(true);

    const data = await adminApi.getUsersExceptAnonymous();
    console.log(Object.keys(data).length);

    setUsers(data);

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const isValidForm = () => {
    const { uid, email, phone_number, sex, age } = formData;
    if (uid === "") {
      return false;
    }
    if (phone_number && phone_number.includes("@")) {
      return false;
    }
    if (email && !email.includes("@")) {
      return false;
    }
    if (sex && sex !== "남성" && sex !== "여성") {
      return false;
    }
    const ages = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];
    if (age && !ages.includes(age)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (isValidForm()) {
        await adminApi.enrollNewUser(formData);
        setFormData({ uid: "" });
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
      await adminApi.deleteUserAnonymous(uid);
      await fetchData();
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.enrollUser}>
      <main className={styles.enrollUserMain}>
        <form
          className={styles.enrollUserForm}
          action=""
          onSubmit={handleSubmit}
        >
          <TextField
            value={formData.uid}
            required
            label="uid"
            name="uid"
            onChange={handleChange}
          />
          <TextField
            type="email"
            label="email"
            name="email"
            value={formData.email ? formData.email : ""}
            onChange={handleChange}
          />
          <TextField
            value={formData.phone_number ? formData.phone_number : ""}
            label="phone_number"
            name="phone_number"
            onChange={handleChange}
          />
          <TextField
            value={formData.sex ? formData.sex : ""}
            label="sex"
            name="sex"
            onChange={handleChange}
          />
          <TextField
            value={formData.age ? formData.age : ""}
            label="age"
            name="age"
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add New User
          </Button>
        </form>
        <ul className={styles.userList}>
          {Object.keys(users).map((uid) => (
            <AdminUserItem
              user={users[uid]}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};
