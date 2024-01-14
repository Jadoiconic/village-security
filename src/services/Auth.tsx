import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config";

interface loginProps {
  email: string;
  password: string;
}

export const login = async ({email, password}:loginProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential;
  } catch (error) {
   console.log("Invalid Email or Password!")
    // throw error;
  }
};

export const emailVerification = async (): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    alert("No user found for email verification.");
    return;
  }

  try {
    await sendEmailVerification(user, {
      handleCodeInApp: true,
      url: "",
    });

    alert("Email verification sent successfully.");
  } catch (error) {
    alert(`Email Verification Error`);
    throw error;
  }
};

export const signup = async ({email, password}:loginProps) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredentials;
};
