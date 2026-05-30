import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../firebase/config";

export const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL;
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (name, email, password, photoURL) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, {
      displayName: name,
      photoURL: photoURL || "",
    });
    await axios.post(`${API}/auth/users`, {
      name,
      email,
      photoURL: photoURL || "",
    });
    return cred.user;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    await axios.post(`${API}/auth/users`, {
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    });
    return result.user;
  };

  const logout = () => {
    localStorage.removeItem("sd_token");
    return signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (current) => {
      setUser(current);
      if (current?.email) {
        try {
          const { data } = await axios.post(`${API}/auth/jwt`, {
            email: current.email,
          });
          localStorage.setItem("sd_token", data.token);
        } catch (e) {
          console.error("JWT fetch failed", e);
        }
      } else {
        localStorage.removeItem("sd_token");
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
