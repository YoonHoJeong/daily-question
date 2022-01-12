// 등록된 유저인지 확인

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

class AuthService {
  constructor() {
    console.log("auth service constructor");
  }

  async login(email: string, password: string) {
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log(user);
    } catch (e) {
      console.error(e);
    }
  }
}

export default AuthService;
