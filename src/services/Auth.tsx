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

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((error) => {
      console.error("Authentication error:", error);
      throw error;
    });

    return userCredential;
  } catch (error) {
    if ((error).code === "auth/user-not-found") {
      console.error("User not found. Please check your email.");
    } else if ((error).code === "auth/wrong-password") {
      console.error("Incorrect password. Please try again.");
    } else {
      // Log other errors
      console.error("Authentication error:", error);
    }
    throw error;
  }
};

export const emailVerification = async (): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    console.error("No user found for email verification.");
    return;
  }

  try {
    await sendEmailVerification(user, {
      handleCodeInApp: true,
      url: "",
    });

    console.log("Email verification sent successfully.");
  } catch (error) {
    const errorCode = (error as any).code;
    const errorMessage = (error as any).message;
    console.error("Email Verification Error:", errorCode, errorMessage);
    throw error;
  }
};

export const signup = async (email, password) => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (userCredentials) console.log(userCredentials);
};
